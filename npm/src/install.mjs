// Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: MIT

import { chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
export const defaultReleaseBaseUrl = 'https://github.com/volcengine/milvus-cli/releases/download';

export function resolvePlatform(platform, arch) {
  const osMap = new Map([
    ['linux', { os: 'linux', extension: 'tar.gz' }],
    ['darwin', { os: 'darwin', extension: 'tar.gz' }],
    ['win32', { os: 'windows', extension: 'zip' }],
  ]);
  const archMap = new Map([
    ['x64', 'amd64'],
    ['arm64', 'arm64'],
  ]);

  const osInfo = osMap.get(platform);
  if (!osInfo) {
    throw new Error(`unsupported platform: ${platform}`);
  }
  const resolvedArch = archMap.get(arch);
  if (!resolvedArch) {
    throw new Error(`unsupported architecture: ${arch}`);
  }

  return { os: osInfo.os, arch: resolvedArch, extension: osInfo.extension };
}

export function normalizeVersion(version) {
  const cleaned = String(version ?? '').trim();
  if (!cleaned) {
    throw new Error('version is required');
  }
  return cleaned.startsWith('v') ? cleaned.slice(1) : cleaned;
}

export function resolveArtifactName({ version, os, arch, extension }) {
  const normalizedVersion = normalizeVersion(version);
  return `milvus-cli_${normalizedVersion}_${os}_${arch}.${extension}`;
}

export function resolveDownloadUrl({ baseUrl, version, platform, arch }) {
  const normalizedBaseUrl = resolveReleaseBaseUrl(baseUrl);
  const normalizedVersion = normalizeVersion(version);
  const target = resolvePlatform(platform, arch);
  const artifactName = resolveArtifactName({ version: normalizedVersion, ...target });
  return `${normalizedBaseUrl}/v${normalizedVersion}/${artifactName}`;
}

export function resolveReleaseBaseUrl(baseUrl) {
  const normalizedBaseUrl = String(baseUrl ?? '').trim().replace(/\/$/, '');
  if (!normalizedBaseUrl) {
    return defaultReleaseBaseUrl;
  }
  return normalizedBaseUrl;
}

export async function downloadAndInstall({
  baseUrl,
  version,
  platform = process.platform,
  arch = process.arch,
  destinationDir = join(packageRoot, 'vendor'),
} = {}) {
  const target = resolvePlatform(platform, arch);
  const normalizedVersion = normalizeVersion(version);
  const url = resolveDownloadUrl({ baseUrl, version: normalizedVersion, platform, arch });

  mkdirSync(destinationDir, { recursive: true });
  const tempRoot = mkdtempSync(join(tmpdir(), 'milvus-cli-'));
  const archiveName = resolveArtifactName({ version: normalizedVersion, ...target });
  const archivePath = join(tempRoot, archiveName);
  const extractDir = join(tempRoot, 'extract');

  try {
    const archiveResponse = await fetch(url);
    if (!archiveResponse.ok) {
      throw new Error(`download failed: ${archiveResponse.status} ${archiveResponse.statusText}`);
    }
    const archiveBuffer = Buffer.from(await archiveResponse.arrayBuffer());
    writeFileSync(archivePath, archiveBuffer);
    mkdirSync(extractDir, { recursive: true });
    extractArchive(archivePath, extractDir, target.extension);

    const extractedBinary = findBinary(extractDir, target.os === 'windows' ? 'milvus-cli.exe' : 'milvus-cli');
    const destinationBinary = join(destinationDir, target.os === 'windows' ? 'milvus-cli.exe' : 'milvus-cli');
    copyFileSync(extractedBinary, destinationBinary);
    if (target.os !== 'windows') {
      chmodSync(destinationBinary, 0o755);
    }
    return { url, destinationBinary };
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function extractArchive(archivePath, destinationDir, extension) {
  if (extension === 'tar.gz') {
    runCommand('tar', ['-xzf', archivePath, '-C', destinationDir]);
    return;
  }
  if (extension === 'zip') {
    if (process.platform === 'win32') {
      runCommand('powershell', ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${archivePath}' -DestinationPath '${destinationDir}' -Force`]);
      return;
    }
    runCommand('unzip', ['-q', archivePath, '-d', destinationDir]);
    return;
  }
  throw new Error(`unsupported archive extension: ${extension}`);
}

function runCommand(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`${command} failed with exit code ${result.status ?? 'unknown'}`);
  }
}

function findBinary(rootDir, binaryName) {
  const directPath = resolve(rootDir, binaryName);
  if (existsSync(directPath)) {
    return directPath;
  }
  const nestedPath = resolve(rootDir, 'milvus-cli', binaryName);
  if (existsSync(nestedPath)) {
    return nestedPath;
  }
  throw new Error(`binary ${binaryName} not found in archive`);
}
