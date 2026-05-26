// Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: MIT

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  defaultReleaseBaseUrl,
  resolveArtifactName,
  resolveDownloadUrl,
  resolvePlatform,
  resolveReleaseBaseUrl,
} from '../src/install.mjs';

test('resolvePlatform maps supported node platform and arch values', () => {
  assert.deepEqual(resolvePlatform('linux', 'x64'), {
    os: 'linux',
    arch: 'amd64',
    extension: 'tar.gz',
  });
  assert.deepEqual(resolvePlatform('darwin', 'arm64'), {
    os: 'darwin',
    arch: 'arm64',
    extension: 'tar.gz',
  });
  assert.deepEqual(resolvePlatform('win32', 'x64'), {
    os: 'windows',
    arch: 'amd64',
    extension: 'zip',
  });
});

test('resolveArtifactName follows release archive naming contract', () => {
  assert.equal(
    resolveArtifactName({ version: '1.2.3', os: 'linux', arch: 'amd64', extension: 'tar.gz' }),
    'milvus-cli_1.2.3_linux_amd64.tar.gz',
  );
  assert.equal(
    resolveArtifactName({ version: '1.2.3', os: 'windows', arch: 'amd64', extension: 'zip' }),
    'milvus-cli_1.2.3_windows_amd64.zip',
  );
});

test('resolveDownloadUrl composes base url, version and artifact name', () => {
  assert.equal(
    resolveDownloadUrl({
      baseUrl: 'https://downloads.example.com/milvus-cli',
      version: '1.2.3',
      platform: 'darwin',
      arch: 'arm64',
    }),
    'https://downloads.example.com/milvus-cli/v1.2.3/milvus-cli_1.2.3_darwin_arm64.tar.gz',
  );
});

test('resolveReleaseBaseUrl prefers explicit value and falls back to default', () => {
  assert.equal(resolveReleaseBaseUrl('https://downloads.example.com/milvus-cli'), 'https://downloads.example.com/milvus-cli');
  assert.equal(resolveReleaseBaseUrl(''), defaultReleaseBaseUrl);
});

test('resolvePlatform rejects unsupported platforms', () => {
  assert.throws(() => resolvePlatform('freebsd', 'x64'), /unsupported platform/i);
  assert.throws(() => resolvePlatform('linux', 'ppc64'), /unsupported architecture/i);
});
