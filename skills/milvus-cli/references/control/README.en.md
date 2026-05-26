# Control Plane Commands

milvus-cli control plane commands are used to manage Volcengine Milvus dedicated resources.

## Command Overview

| Command | Purpose |
|---------|---------|
| [auth](./auth.en.md) | Manage AK/SK credentials |
| [profile](./profile.en.md) | Manage runtime context (profiles) |
| [spec](./spec.en.md) | Query region/version/spec information |
| [instance](./instance.en.md) | Manage dedicated Milvus instances |
| [network](./network.en.md) | Manage network settings |
| [version](./version.en.md) | Show version information |
| [completion](./completion.en.md) | Generate shell completion scripts |

## Global Flags

Control plane commands support the following global flags:

| Flag | Description | Default |
|------|-------------|---------|
| `--output` | Output format: table/json/yaml | table |
| `--profile` | Profile name | - |
| `--region` | Region | - |
| `--project` | Project | default |
| `--site` | Site: volcengine/byteplus | volcengine |
| `--env` | Environment: prod/dev/test | prod |
| `--language` | Language: CN/EN | EN |
| `--ak` | Temporary Access Key | - |
| `--sk` | Temporary Secret Key | - |
| `--debug` | Enable debug logging for API requests | false |
| `--yes` | Skip confirmation for dangerous actions | false |

## Quick Start

1. Login and save credentials
```bash
milvus-cli auth login --ak <AK> --sk <SK> --name volcengine
```

2. Create a profile
```bash
milvus-cli profile create --name default --region cn-beijing --credential volcengine --language EN
```

3. View spec information
```bash
milvus-cli spec version
milvus-cli spec node --version V2_6
```

4. Create an instance
```bash
milvus-cli instance create --name my-instance --admin-password <password> --vpc-id vpc-xxx --wait
```

## Related Documentation

- [Data Plane Commands](../data/README.en.md)
- [Serverless Commands](../serverless/README.en.md)
