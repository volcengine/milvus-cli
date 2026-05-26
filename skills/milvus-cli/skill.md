# milvus-cli Skill

Volcengine Milvus CLI — a command-line tool for managing Volcengine Milvus services, covering control-plane (Dedicated / Serverless instance management) and data-plane (databases, collections, indexes, vectors, users, and roles) operations.

## When to Use

Use this skill when:

- The user needs to manage Volcengine Milvus instances (create, list, describe, scale, delete)
- The user needs to manage Milvus data resources (databases, collections, partitions, aliases, indexes)
- The user needs to perform vector operations (insert, search, query, delete)
- The user needs to manage Milvus users and roles (RBAC)
- The user needs to set up or troubleshoot milvus-cli authentication, profiles, or connections
- The user asks about Milvus CLI commands, flags, or output formats

## Command Groups

| Group | Description |
|-------|-------------|
| `auth` | Login, logout, view authentication status |
| `profile` | Manage site/region/project/language context |
| `spec` | View versions, regions, specs, pricing, VPC/subnet/EIP info |
| `instance` | Manage Dedicated instances |
| `network` | Manage Dedicated endpoint publishing and allowlists |
| `version` | View CLI build information |
| `completion` | Generate shell completion scripts |
| `data connection` | Manage data-plane connection configurations |
| `data database` | Manage databases |
| `data collection` | Manage collections |
| `data partition` | Manage partitions |
| `data alias` | Manage aliases |
| `data index` | Manage indexes |
| `data vector` | Vector search and operations |
| `data user` | Manage users |
| `data role` | Manage roles |
| `serverless instance` | Manage Serverless instances |
| `serverless network` | Manage Serverless network configuration |

## Global Flags

| Flag | Description |
|------|-------------|
| `--output table\|json\|yaml` | Output format (prefer `json` for automation) |
| `--profile` | Profile name to use |
| `--site` | Site (volcengine / byteplus) |
| `--region` | Region |
| `--project` | Project |
| `--language` | Language (CN / EN) |
| `--ak` | Access Key ID |
| `--sk` | Secret Access Key |
| `--non-interactive` | Non-interactive mode |
| `--yes` | Confirm destructive operations |
| `--debug` | Enable debug output |

## Typical Workflow

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
milvus-cli profile create --name default --site volcengine --region cn-beijing --project default --credential volcengine --language EN
milvus-cli instance list --output json
milvus-cli data connection create --from-instance <instance-id> --password <password>
milvus-cli data database list
milvus-cli data collection list
milvus-cli data vector search --collection <name> --vector '[1.0,2.0,3.0]' --limit 10
```

## Agent Integration Notes

- Always use `--output json` for machine-readable output.
- Always pass `--non-interactive` in automated workflows.
- Always pass `--yes` for destructive operations in automated workflows.
- Use `milvus-cli version --output json` to verify installation and get build info.

## References

Detailed command documentation is available in the `references/` directory:

- [Command Overview (EN)](references/README.en.md)
- [Command Overview (中文)](references/README.md)
- Control Plane: [auth](references/control/auth.en.md) | [profile](references/control/profile.en.md) | [spec](references/control/spec.en.md) | [instance](references/control/instance.en.md) | [network](references/control/network.en.md) | [version](references/control/version.en.md) | [completion](references/control/completion.en.md)
- Data Plane: [connection](references/data/connection.en.md) | [database](references/data/database.en.md) | [collection](references/data/collection.en.md) | [partition](references/data/partition.en.md) | [alias](references/data/alias.en.md) | [index](references/data/index.en.md) | [vector](references/data/vector.en.md) | [user](references/data/user.en.md) | [role](references/data/role.en.md)
- Serverless: [instance](references/serverless/instance.en.md) | [network](references/serverless/network.en.md)
