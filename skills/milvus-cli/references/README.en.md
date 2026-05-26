# Command Overview

This document provides an overview of the `milvus-cli` command tree, global parameter conventions, and typical usage patterns. For detailed subcommand documentation, use:

```bash
milvus-cli <command> --help
```

---

## Documentation Index Structure

```
skills/milvus-cli/references/
├── README.md              # Chinese index
├── README.en.md           # This file (English index)
├── control/               # Control plane command docs
├── data/                  # Data plane command docs
└── serverless/            # Serverless command docs
    ├── README.md          # Serverless overview (Chinese)
    ├── README.en.md       # Serverless overview (English)
    ├── instance.md        # Instance management (Chinese)
    ├── instance.en.md     # Instance management (English)
    ├── network.md         # Network management (Chinese)
    └── network.en.md      # Network management (English)
```

---

## Top-Level Command Groups

### General & Control Plane

| Command | Description | Documentation |
|---------|-------------|---------------|
| `auth` | Login, logout, and view authentication status | [control/auth.en.md](./control/auth.en.md) |
| `profile` | Manage site/region/project/language context | [control/profile.en.md](./control/profile.en.md) |
| `spec` | View versions, regions, specifications, pricing, VPC/subnet/EIP info | [control/spec.en.md](./control/spec.en.md) |
| `instance` | Manage dedicated instances | [control/instance.en.md](./control/instance.en.md) |
| `network` | Manage dedicated endpoint publishing and allowlists | [control/network.en.md](./control/network.en.md) |
| `version` | View CLI build information | [control/version.en.md](./control/version.en.md) |
| `completion` | Generate bash/zsh/fish/powershell completion scripts | [control/completion.en.md](./control/completion.en.md) |

### Data Plane

| Command | Description | Documentation |
|---------|-------------|---------------|
| `data connection` | Manage data plane connection configurations | [data/connection.en.md](./data/connection.en.md) |
| `data database` | Manage databases | [data/database.en.md](./data/database.en.md) |
| `data collection` | Manage collections | [data/collection.en.md](./data/collection.en.md) |
| `data partition` | Manage partitions | [data/partition.en.md](./data/partition.en.md) |
| `data alias` | Manage aliases | [data/alias.en.md](./data/alias.en.md) |
| `data index` | Manage indexes | [data/index.en.md](./data/index.en.md) |
| `data vector` | Vector search and operations | [data/vector.en.md](./data/vector.en.md) |
| `data user` | Manage users | [data/user.en.md](./data/user.en.md) |
| `data role` | Manage roles | [data/role.en.md](./data/role.en.md) |

### Serverless Control Plane

| Command | Description | Documentation |
|---------|-------------|---------------|
| `serverless instance` | Manage Serverless instances | [serverless/instance.en.md](./serverless/instance.en.md) |
| `serverless network` | Manage Serverless network configuration | [serverless/network.en.md](./serverless/network.en.md) |

> **Note**: Serverless control plane is available, currently covering `instance` and `network` commands. Documentation examples use `sample/demo` placeholders for demonstration purposes only and do not indicate functional limitations. Other Serverless capabilities (such as `spec`, `collection`, `observe`, `user-auth`, `playground`) are not currently included in the command scope. See [serverless/README.en.md](./serverless/README.en.md) for details.

---

## Global Parameters

Common global parameters:

| Parameter | Description |
|-----------|-------------|
| `--output table|json|yaml` | Output format |
| `--profile` | Profile name to use |
| `--site` | Site (volcengine/byteplus) |
| `--region` | Region |
| `--project` | Project |
| `--language` | Language (CN/EN) |
| `--ak` | Access Key ID |
| `--sk` | Secret Access Key |
| `--non-interactive` | Non-interactive mode |
| `--debug` | Enable debug output |
| `--yes` | Confirm destructive operations |

---

## Typical Workflows

### Dedicated Control Plane

```bash
milvus-cli auth login --ak <AK> --sk <SK> --name volcengine
milvus-cli profile create --name default --site volcengine --region cn-beijing --project default --credential volcengine --language EN
milvus-cli spec node --version V2_5
milvus-cli instance list --output json
milvus-cli network endpoints --instance-id <instance-id>
```

### Data Plane

```bash
milvus-cli data connection create --name local --address localhost:19530 --auth-method token --token <TOKEN>
milvus-cli data database list
milvus-cli data collection create --name quickstart --dim 128
milvus-cli data vector search --collection quickstart --vector '[0.1,0.2]' --topk 10 --output json --file ./result.json
```

### Serverless

```bash
milvus-cli serverless instance list
milvus-cli serverless network public publish --instance-id <instance-id> --enabled true --eip-id <eip-id>
```

---

## Output Conventions

- Default `table` output includes table borders
- `json` / `yaml` are suitable for automated consumption
- `version --output json` can be used directly for release acceptance or troubleshooting

---

## Shell Completion

```bash
milvus-cli completion bash
milvus-cli completion zsh
milvus-cli completion fish
milvus-cli completion powershell
```

Release artifacts include shell completion files bundled with the binary.

---

## Related Documentation

- [中文文档](./README.md)
