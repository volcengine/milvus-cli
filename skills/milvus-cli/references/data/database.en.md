# database Command

Manage Milvus databases.

## Purpose

The database command group is used to create, view, switch, and delete databases in a Milvus instance. Databases are logical groupings of collections and can be used for multi-tenant scenarios.

## Prerequisites

1. A tested and working data connection (`milvus-cli data connection`)
2. Sufficient privileges (usually admin privileges are required to create databases)

## Commands

### database list

List all databases in the current connection.

```bash
milvus-cli data database list [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--connection` | No | Specify connection name, defaults to current | `--connection sample` |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Database name |

### database create

Create a new database.

```bash
milvus-cli data database create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--database` | Yes | Database name | `--database analytics` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--property` | No | Database property, can be repeated, format `key=value` | `--property database.replica.number=2` |

### database describe

View detailed information about a specified database.

```bash
milvus-cli data database describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--database` | Yes | Database name | `--database analytics` |
| `--connection` | No | Specify connection name | `--connection sample` |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Database name |
| `Properties` | Database property list (if any) |

### database use

Set the default database for a connection.

```bash
milvus-cli data database use [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--database` | Yes | Database name to set as default | `--database analytics` |
| `--connection` | No | Specify connection name | `--connection sample` |

**Note**: This command only modifies the default database configuration of the local connection and does not create or delete databases in Milvus.

### database drop

Delete a specified database.

```bash
milvus-cli data database drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--database` | Yes | Database name to delete | `--database analytics` |
| `--connection` | No | Specify connection name | `--connection sample` |

**Note**: Deleting a database will delete all collections and data within it. Please proceed with caution.

## Examples

### List All Databases

```bash
# Use current connection
milvus-cli data database list

# Specify connection
milvus-cli data database list --connection sample

# JSON format output
milvus-cli data database list --output json
```

### Create Database

```bash
# Create basic database
milvus-cli data database create --database analytics

# Create database with properties
milvus-cli data database create \
  --database analytics \
  --property database.replica.number=2
```

### Describe Database

```bash
# Describe default database
milvus-cli data database describe --database default

# Describe specific database
milvus-cli data database describe --database analytics --output yaml
```

### Switch Default Database

```bash
# Switch to analytics database
milvus-cli data database use analytics

# Switch with specific connection
milvus-cli data database use analytics --connection sample
```

### Drop Database

```bash
# Drop database
milvus-cli data database drop --database analytics
```

## Output

### database list (table format)

```
+-----------+
| Name      |
+-----------+
| default   |
| analytics |
+-----------+
```

### database describe (table format)

```
+------------+-----------+
| Field      | Value     |
+------------+-----------+
| Name       | analytics |
+------------+-----------+

Properties
+----------+-------+
| Key      | Value |
+----------+-------+
| property | value |
+----------+-------+
```

## Common Next Steps

- Use `milvus-cli data collection list` to view collections in the database
- Use `milvus-cli data collection create` to create collections in the database
- Use `milvus-cli data database use` to switch working database
- Create separate databases for different business scenarios for isolation
