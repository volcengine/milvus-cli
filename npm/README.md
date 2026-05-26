# @volcengine/milvus-cli

A command-line tool for Volcengine Milvus, covering control-plane operations (Dedicated / Serverless instance management) and data-plane operations (databases, collections, indexes, vectors, users, and roles). The npm package downloads the prebuilt `milvus-cli` binary for your platform during installation.

## Installation

```bash
npm install -g @volcengine/milvus-cli
```

Verify the installation:

```bash
milvus-cli version --output json
milvus-cli --help
```

### Requirements

- Node.js >= 18.
- Linux, macOS, or Windows on `x64/arm64`.
- Network access to download release artifacts during postinstall.

To skip the postinstall download and manage the binary yourself:

```bash
MILVUS_CLI_SKIP_POSTINSTALL=1 npm i -g @volcengine/milvus-cli
```

To override the release artifact base URL:

```bash
MILVUS_CLI_RELEASE_BASE_URL=https://example.com/releases npm i -g @volcengine/milvus-cli
```

## 1.0.0 Highlights

- Dedicated control plane: instance creation, listing, details, nodes, scaling, billing, delete protection, endpoints, and resource specs.
- Serverless control plane: Serverless instance and private/public endpoint management.
- Data-plane access: connection, database, collection, partition, alias, index, vector, user, and role management.
- Instance-derived connections: `data connection create --from-instance` / `--from-serverless` auto-fill private address, username, TLS, and source metadata.
- Secure local storage: sensitive credential and connection fields are encrypted at rest.
- Stable output: all commands support `table|json|yaml`; control-plane list commands support pagination and JSON/YAML envelopes.
- Distribution pipeline: multi-platform archives, checksums, shell completion files, and npm installer support.

## Quick Start

### 1. Create a Profile

A profile stores site, region, project, credential reference, and language context. The newly created profile becomes the current profile automatically.

```bash
milvus-cli profile create \
  --name default \
  --site volcengine \
  --region cn-beijing \
  --project default \
  --credential volcengine \
  --language EN
```

View and switch profiles:

```bash
milvus-cli profile list
milvus-cli profile current
milvus-cli profile use default
```

### 2. Authenticate the Control Plane

Log in with AK/SK. The credential name should match the profile's `--credential` value:

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
milvus-cli auth status
```

You can also read credentials from environment variables:

```bash
export VOLCSTACK_ACCESS_KEY_ID=<AK>
export VOLCSTACK_SECRET_ACCESS_KEY=<SK>
milvus-cli auth login --name volcengine
```

### 3. Manage Dedicated Instances

```bash
milvus-cli spec version
milvus-cli spec node --version V2_6
milvus-cli spec zone
milvus-cli spec vpc --page 1 --page-size 20
milvus-cli spec subnet --vpc-id <vpc-id>

milvus-cli instance create \
  --name my-instance \
  --version V2_6 \
  --vpc-id <vpc-id> \
  --admin-password <password> \
  --ha-enabled=true \
  --wait

milvus-cli instance list --page 1 --page-size 20 --output json
milvus-cli instance describe --instance-id <instance-id>
milvus-cli instance nodes list --instance-id <instance-id>
milvus-cli network endpoints --instance-id <instance-id>
```

Note: `instance describe` renders useful summary fields in table mode, while `json/yaml` return the detailed API result.

### 4. Manage Serverless Instances

```bash
milvus-cli serverless instance list --page 1 --page-size 20
milvus-cli serverless instance describe --instance-id <instance-id>
milvus-cli serverless network private list --instance-id <instance-id>
milvus-cli serverless network public publish --instance-id <instance-id> --enabled=true --eip-id <eip-id>
```

### 5. Create a Data-Plane Connection

Create a connection manually:

```bash
milvus-cli data connection create \
  --name my-conn \
  --address <host>:19530 \
  --auth-method username \
  --username root \
  --password <password> \
  --database default
```

Create a connection from a Dedicated instance:

```bash
milvus-cli data connection create \
  --from-instance <instance-id> \
  --password <milvus-password>
```

Create a connection from a Serverless instance with a custom name:

```bash
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <instance-id> \
  --password <milvus-password>
```

View, switch, and test connections:

```bash
milvus-cli data connection list
milvus-cli data connection current
milvus-cli data connection use my-conn
milvus-cli data connection test my-conn
```

### 6. Manage Databases and Collections

```bash
milvus-cli data database list
milvus-cli data database create --database my_db
milvus-cli data database use my_db

milvus-cli data collection create --name quickstart --dim 8
milvus-cli data collection describe --name quickstart
milvus-cli data collection load --name quickstart
```

Create a collection from a schema file:

```bash
milvus-cli data collection create --schema schema.json
```

Example schema:

```json
{
  "name": "quickstart",
  "description": "demo collection",
  "autoId": false,
  "enableDynamicField": true,
  "fields": [
    {"name": "id", "dataType": "int64", "primaryKey": true},
    {"name": "name", "dataType": "varchar", "maxLength": 64},
    {"name": "vector", "dataType": "float_vector", "dimension": 8}
  ]
}
```

### 7. Vector Operations

```bash
milvus-cli data vector insert \
  --collection quickstart \
  --data '[
    {"id": 1, "name": "n1", "vector": [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]},
    {"id": 2, "name": "n2", "vector": [0.2,0.1,0.3,0.4,0.5,0.6,0.7,0.8]}
  ]'

milvus-cli data vector search \
  --collection quickstart \
  --vector '[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]' \
  --vector-field vector \
  --topk 5 \
  --output-fields id,name \
  --param metric_type=L2

milvus-cli data vector query --collection quickstart --expr 'id in [1, 2]' --output-fields id,name
milvus-cli data vector get --collection quickstart --ids 1,2 --output-fields id,name
milvus-cli data vector delete --collection quickstart --ids 1
```

Hybrid search:

```bash
milvus-cli data vector hybrid-search \
  --collection quickstart \
  --requests '[
    {"vector_field":"vector","vector":[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8],"params":{"nprobe":"8"}},
    {"vector_field":"sparse","vector":{"indices":[1,3,10],"values":[0.5,1.0,0.8]}}
  ]' \
  --topk 5 \
  --output-fields id,name \
  --reranker rrf --rrf-k 60
```

### 8. Indexes, Partitions, Aliases, and RBAC

```bash
milvus-cli data index create --collection quickstart --field vector --index my_index --index-type AUTOINDEX --metric-type COSINE
milvus-cli data partition create --collection quickstart --partition region_cn
milvus-cli data alias create --collection quickstart --alias quickstart_v1

milvus-cli data user create --user demo_user --password <password>
milvus-cli data role create --role data_reader
milvus-cli data user grant --user demo_user --role data_reader
```

## Feature Matrix

### Dedicated Control Plane

| Command | Description |
|---------|-------------|
| `auth login/status/logout` | Manage AK/SK credential status |
| `profile create/list/current/use/set/delete` | Manage runtime context |
| `spec version/node/zone/vpc/subnet/eip` | Query versions, specs, zones, and network resources |
| `instance create/list/describe/nodes/scale/rename/billing/delete-protect/delete` | Manage Dedicated instances |
| `network private/public/allow-group/endpoints` | Manage Dedicated endpoints |

### Serverless Control Plane

| Command | Description |
|---------|-------------|
| `serverless instance create/list/describe/delete` | Manage Serverless instances |
| `serverless network private/public/allow-group` | Manage Serverless endpoints |

### Data Plane

| Command | Description |
|---------|-------------|
| `data connection create/list/current/use/test/delete` | Manage Milvus connections |
| `data database list/create/describe/use/alter-properties/drop-properties/drop` | Manage databases |
| `data collection list/create/describe/load/release/flush/rename/add-field/alter-properties/alter-field-properties/drop-properties/drop` | Manage collections |
| `data partition list/create/describe/load/release/drop` | Manage partitions |
| `data alias list/create/alter/describe/drop` | Manage aliases |
| `data index list/create/describe/alter-properties/drop-properties/drop` | Manage indexes |
| `data vector insert/upsert/get/query/search/hybrid-search/delete` | Vector operations |
| `data user list/create/describe/grant/revoke/update-password/drop` | User management |
| `data role list/create/describe/grant/revoke/drop` | Role management |

## Output Formats

All commands support:

```bash
milvus-cli instance list --output json
milvus-cli data collection list --output yaml
milvus-cli data vector search --collection quickstart \
  --vector '[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]' \
  --vector-field vector --topk 5 \
  --output json --file ./result.json
```

- `table`: default terminal-friendly output.
- `json`: structured output for scripts and APIs.
- `yaml`: structured output for reading and configuration workflows.
- `--file`: search/query results can be exported to `.json`, `.jsonl`, or `.yaml`.

Control-plane list commands use an envelope for JSON/YAML output:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "returned": 0
  }
}
```

## Local Configuration and Security

The default config directory is `~/.milvus-cli`; override it with `MILVUS_CLI_CONFIG_DIR`. Sensitive fields in credentials and data connections, including AK/SK, password, token, and apiKey, are encrypted at rest.

Config root precedence:

1. `--config-dir` (hidden debug flag)
2. `MILVUS_CLI_CONFIG_DIR`
3. `~/.milvus-cli`

Old plaintext config formats are not guaranteed to be compatible. If decryption or parsing fails, recreate credentials with `auth login` or connections with `data connection create`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MILVUS_CLI_CONFIG_DIR` | Override CLI config directory |
| `MILVUS_CLI_SKIP_POSTINSTALL` | Set to `1` to skip binary download during npm install |
| `MILVUS_CLI_RELEASE_BASE_URL` | Override binary download base URL |
| `VOLCSTACK_ACCESS_KEY_ID` | Control-plane AK |
| `VOLCSTACK_SECRET_ACCESS_KEY` | Control-plane SK |

## Shell Completion

```bash
milvus-cli completion bash > /etc/bash_completion.d/milvus-cli
milvus-cli completion zsh > "${fpath[1]}/_milvus-cli"
milvus-cli completion fish > ~/.config/fish/completions/milvus-cli.fish
milvus-cli completion powershell > milvus-cli.ps1
```

## Links

- [Documentation](https://github.com/volcengine/milvus-cli#readme)
- [Report Issues](https://github.com/volcengine/milvus-cli/issues)
- [BytePlus Milvus](https://docs.byteplus.com/en/docs/Milvus_for_VectorDB/What_is_Milvus_for_VectorDB)
- [CHANGELOG](./CHANGELOG.md)

## License

[MIT](./LICENSE)
