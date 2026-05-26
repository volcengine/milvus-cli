# Data Command Group

The data command group provides direct access to Milvus data plane operations, including connection management, database management, collection management, partition management, alias management, index management, vector operations, user management, and role management.

## Purpose

Through the data command group, you can:

- Create and manage local connection profiles to Milvus clusters
- Manage Milvus metadata such as databases, collections, partitions, aliases, and indexes
- Perform vector data insertion, querying, and searching
- Manage Milvus user and role RBAC permissions

## Prerequisites

1. Have an accessible Milvus instance (local or remote)
2. Prepare authentication information (Token, Username/Password, or API Key)
3. For control plane integration, complete `milvus-cli auth login` first

## Command Overview

| Subcommand | Description |
|------------|-------------|
| `connection` | Manage local data connection profiles |
| `database` | Manage Milvus databases |
| `collection` | Manage Milvus collections |
| `partition` | Manage collection partitions |
| `alias` | Manage collection aliases |
| `index` | Manage collection indexes |
| `vector` | Vector data CRUD and search operations |
| `user` | Manage Milvus users |
| `role` | Manage Milvus roles |

## Global Parameters

All data subcommands support the following global parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `--output table\|json\|yaml` | Output format, default is table | `--output json` |
| `--connection <name>` | Specify connection name (defaults to current) | `--connection local` |

## Detailed Documentation

- [connection](connection.en.md) - Connection management
- [database](database.en.md) - Database management
- [collection](collection.en.md) - Collection management
- [partition](partition.en.md) - Partition management
- [alias](alias.en.md) - Alias management
- [index](index.en.md) - Index management
- [vector](vector.en.md) - Vector operations
- [user](user.en.md) - User management
- [role](role.en.md) - Role management

## Quick Start

### 1. Create a Connection

```bash
# Using Token authentication
milvus-cli data connection create \
  --name sample \
  --address localhost:19530 \
  --auth-method token \
  --token <YOUR_TOKEN>

# Using Username/Password authentication
milvus-cli data connection create \
  --name admin \
  --address localhost:19530 \
  --auth-method username \
  --username root \
  --password <YOUR_PASSWORD>

# Create from a dedicated control-plane instance
milvus-cli data connection create \
  --from-instance <INSTANCE_ID> \
  --password <YOUR_PASSWORD>

# Create from a serverless control-plane instance and override the connection name
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <INSTANCE_ID> \
  --password <YOUR_PASSWORD>
```

### 2. Test Connection

```bash
milvus-cli data connection test sample
```

### 3. List Databases

```bash
milvus-cli data database list
```

### 4. Create Collection and Insert Data

```bash
# Create collection (auto-load is enabled by default)
milvus-cli data collection create --name demo --dim 128

# To skip auto-load, set:
# milvus-cli data collection create --name demo --dim 128 --load=false

# Insert data directly
milvus-cli data vector insert --collection demo \
  --data '[{"id": 1, "vector": [0.1, 0.2, ...]}]'
```

### 5. Perform Vector Search

```bash
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 10
```

## Connection Configuration Convention

Data commands use the `--connection` parameter to specify which connection to use, following these conventions:

1. **Connection Name**: The name specified when creating with `connection create` (e.g., `local`, `prod`, `sample`)
2. **Default Connection**: When `--connection` is not specified, the currently active connection is used (view with `connection current`)
3. **Auto Selection**: When only one connection exists locally, some commands automatically select it
4. **Connection Storage**: Connection profiles are stored in `~/.milvus-cli/connections/`
5. **Instance Inheritance**: Use `--from-instance` or `--from-serverless` to inherit the private endpoint and username from an instance visible to the current profile; you still need to provide the password with `--password`

## Output Format Explanation

### table Format (Default)

Suitable for human viewing, displayed as bordered tables.

```
+------+-----------+----------+------------+------------+--------+------------+
| Name | Address   | Database | AuthMethod | TLSEnabled | Source | LastUsedAt |
+------+-----------+----------+------------+------------+--------+------------+
| ...  | ...       | ...      | ...        | ...        | ...    | ...        |
+------+-----------+----------+------------+------------+--------+------------+
```

### json Format

Suitable for programmatic parsing, structured JSON data.

```json
{
  "connections": [
    {
      "name": "sample",
      "address": "localhost:19530",
      "database": "default"
    }
  ]
}
```

### yaml Format

Suitable for configuration management, human-readable YAML format.

```yaml
connections:
  - name: sample
    address: localhost:19530
    database: default
```

## Common Next Steps

- Read detailed documentation for each subcommand to learn full capabilities
- Use `milvus-cli data <subcommand> --help` to view help information
- Configure multiple connections to manage different Milvus environments
- Learn how to use the `--file` parameter for batch data import/export
