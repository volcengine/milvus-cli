#!/usr/bin/env node

// Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { downloadAndInstall } from './install.mjs';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

if (process.env.MILVUS_CLI_SKIP_POSTINSTALL === '1') {
  process.exit(0);
}

const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
const baseUrl = process.env.MILVUS_CLI_RELEASE_BASE_URL || packageJson.config?.base_url || '';

try {
  const result = await downloadAndInstall({
    baseUrl,
    version: packageJson.version,
  });
  console.error(`installed milvus-cli from ${result.url}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
