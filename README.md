# milvus-cli

English | [中文](./README.CN.md)

A command-line tool for Volcengine Milvus, covering control-plane operations (Dedicated / Serverless instance management) and data-plane operations (databases, collections, indexes, vectors, users, and roles).

## Installation

### Shell Script (macOS / Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/volcengine/milvus-cli/main/install.sh | sh
```

After installation, add `~/.milvus-cli/bin` to your `PATH`:

```bash
export PATH="$HOME/.milvus-cli/bin:$PATH"
```

### PowerShell (Windows)

```powershell
irm https://raw.githubusercontent.com/volcengine/milvus-cli/main/install.ps1 | iex
```

### npm

```bash
npm install -g @volcengine/milvus-cli
```

### Manual Download

Visit [GitHub Releases](https://github.com/volcengine/milvus-cli/releases) to download the prebuilt binary archive for your platform. Extract and place `milvus-cli` in your `PATH`.

### Verify Installation

```bash
milvus-cli version
milvus-cli --help
```

## Supported Platforms

| OS      | Architecture  | Archive Format |
|---------|--------------|----------------|
| Linux   | amd64, arm64 | tar.gz         |
| macOS   | amd64, arm64 | tar.gz         |
| Windows | amd64, arm64 | zip            |

## Quick Start

### 1. Create a Profile

```bash
milvus-cli profile create \
  --name default \
  --site volcengine \
  --region cn-beijing \
  --project default \
  --credential volcengine \
  --language EN
```

### 2. Authenticate

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
```

### 3. Manage Instances

```bash
milvus-cli instance list --output json
milvus-cli instance describe --instance-id <instance-id>
```

### 4. Create a Data-Plane Connection

```bash
milvus-cli data connection create \
  --from-instance <instance-id> \
  --password <milvus-password>
```

### 5. Manage Data

```bash
milvus-cli data database list
milvus-cli data collection list
milvus-cli data vector search --collection <name> --vector '[1.0, 2.0, 3.0]' --limit 10
```

## Command Documentation

Full command documentation is available at [skills/milvus-cli/references/](./skills/milvus-cli/references/README.en.md).

| Command | Description | Documentation |
|---------|-------------|---------------|
| `auth` | Login, logout, view authentication status | [control/auth.en.md](./skills/milvus-cli/references/control/auth.en.md) |
| `profile` | Manage site/region/project/language context | [control/profile.en.md](./skills/milvus-cli/references/control/profile.en.md) |
| `spec` | View versions, regions, specs, pricing, VPC/subnet/EIP info | [control/spec.en.md](./skills/milvus-cli/references/control/spec.en.md) |
| `instance` | Manage Dedicated instances | [control/instance.en.md](./skills/milvus-cli/references/control/instance.en.md) |
| `network` | Manage Dedicated endpoint publishing and allowlists | [control/network.en.md](./skills/milvus-cli/references/control/network.en.md) |
| `version` | View CLI build information | [control/version.en.md](./skills/milvus-cli/references/control/version.en.md) |
| `completion` | Generate shell completion scripts | [control/completion.en.md](./skills/milvus-cli/references/control/completion.en.md) |
| `data connection` | Manage data plane connection configurations | [data/connection.en.md](./skills/milvus-cli/references/data/connection.en.md) |
| `data database` | Manage databases | [data/database.en.md](./skills/milvus-cli/references/data/database.en.md) |
| `data collection` | Manage collections | [data/collection.en.md](./skills/milvus-cli/references/data/collection.en.md) |
| `data partition` | Manage partitions | [data/partition.en.md](./skills/milvus-cli/references/data/partition.en.md) |
| `data alias` | Manage aliases | [data/alias.en.md](./skills/milvus-cli/references/data/alias.en.md) |
| `data index` | Manage indexes | [data/index.en.md](./skills/milvus-cli/references/data/index.en.md) |
| `data vector` | Vector search and operations | [data/vector.en.md](./skills/milvus-cli/references/data/vector.en.md) |
| `data user` | Manage users | [data/user.en.md](./skills/milvus-cli/references/data/user.en.md) |
| `data role` | Manage roles | [data/role.en.md](./skills/milvus-cli/references/data/role.en.md) |
| `serverless instance` | Manage Serverless instances | [serverless/instance.en.md](./skills/milvus-cli/references/serverless/instance.en.md) |
| `serverless network` | Manage Serverless network configuration | [serverless/network.en.md](./skills/milvus-cli/references/serverless/network.en.md) |

## Agent Integration

This repository provides an [Agent Skills](https://agentskills.io/) package under `skills/milvus-cli/`, consumable by AI coding assistants (TRAE, Claude Code, Cursor, Codex, OpenCode, GitHub Copilot, etc.).

For installation instructions per agent, see [skills/milvus-cli/README.md](./skills/milvus-cli/README.md).

## License

[MIT](./LICENSE)
