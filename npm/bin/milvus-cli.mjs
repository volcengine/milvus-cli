#!/usr/bin/env node

// Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
// SPDX-License-Identifier: MIT

import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const binaryName = process.platform === 'win32' ? 'milvus-cli.exe' : 'milvus-cli';
const binaryPath = join(packageRoot, 'vendor', binaryName);

if (!existsSync(binaryPath)) {
  console.error('milvus-cli binary is not installed. Re-run npm install or set MILVUS_CLI_SKIP_POSTINSTALL=1 only for development.');
  process.exit(1);
}

const child = spawn(binaryPath, process.argv.slice(2), { stdio: 'inherit' });
child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
