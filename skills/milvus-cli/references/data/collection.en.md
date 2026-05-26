# collection Command

Manage Milvus collections.

## Purpose

The collection command group is used to create, view, modify, and delete Milvus collections. Collections are the basic units in Milvus for storing vector and scalar data.

## Prerequisites

1. A valid data connection created (`milvus-cli data connection`)
2. A target database selected or specified (`milvus-cli data database use`)

## Commands

### collection list

List all collections in the current database.

```bash
milvus-cli data collection list [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--connection` | No | Specify connection name | `--connection sample` |

### collection create

Create a new collection.

```bash
milvus-cli data collection create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Conditional | Collection name (required when not using `--schema`) | `--name demo` |
| `--dim` | Conditional | Vector dimension (required for quick create) | `--dim 128` |
| `--schema` | Conditional | Path to schema JSON file (alternative to `--name`) | `--schema ./schema.json` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--description` | No | Collection description | `--description "Demo collection"` |
| `--vector-field` | No | Vector field name for quick create, defaults to `vector` | `--vector-field embedding` |
| `--auto-id` | No | Enable auto-generated primary key for quick create, defaults to `true` | `--auto-id=true` |
| `--enable-dynamic-field` | No | Enable dynamic fields for quick create, defaults to `true` | `--enable-dynamic-field=true` |
| `--load` | No | Automatically load the collection after creation, defaults to `true` | `--load=false` |
| `--property` | No | Collection property, can be repeated | `--property collection.ttl.seconds=86400` |

**Quick Create Mode**: Use `--name` and `--dim` to quickly create a collection with default schema. The collection is loaded automatically after creation by default.

**Schema File Mode**: Use `--schema` to specify a custom schema JSON file. The collection is loaded automatically after creation by default.

**Auto-load Behavior**: The command loads the collection automatically after a successful create by default. Use `--load=false` to skip loading. When auto-load succeeds, the output status is `loaded`.

### collection describe

View detailed information about a specified collection.

```bash
milvus-cli data collection describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Yes | Collection name | `--name demo` |
| `--connection` | No | Specify connection name | `--connection sample` |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Collection name |
| `Description` | Collection description |
| `RowCount` | Row count |
| `Fields` | Field list (including name, type, primary key, etc.) |
| `Indexes` | Index list |
| `Properties` | Collection properties |

### collection load

Load a collection into memory.

```bash
milvus-cli data collection load [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Yes | Collection name | `--name demo` |
| `--connection` | No | Specify connection name | `--connection sample` |

**Note**: Collections must be loaded before vector search and query operations can be performed.

### collection release

Release a collection from memory.

```bash
milvus-cli data collection release [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Yes | Collection name | `--name demo` |
| `--connection` | No | Specify connection name | `--connection sample` |

### collection drop

Delete a specified collection.

```bash
milvus-cli data collection drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Yes | Collection name | `--name demo` |
| `--connection` | No | Specify connection name | `--connection sample` |

## Examples

### Quick Create Collection

```bash
# Basic quick create
milvus-cli data collection create --name demo --dim 128

# Specify vector field name
milvus-cli data collection create --name demo --dim 128 --vector-field embedding

# Disable auto-generated primary key
milvus-cli data collection create --name demo --dim 128 --auto-id=false

# Disable dynamic fields
milvus-cli data collection create --name demo --dim 128 --enable-dynamic-field=false

# Create without auto-loading
milvus-cli data collection create --name demo --dim 128 --load=false
```

Note: for boolean flags, use the `--flag=false` form instead of `--flag false`, for example `--auto-id=false`, `--enable-dynamic-field=false`, and `--load=false`.

### Create with Schema File

```bash
# Create from JSON file
milvus-cli data collection create --schema ./my-schema.json

# Create from JSON file without auto-loading
milvus-cli data collection create --schema ./my-schema.json --load=false
```

Example schema file:

```json
{
  "collection_name": "demo",
  "description": "Demo collection",
  "fields": [
    {
      "name": "id",
      "data_type": "Int64",
      "is_primary": true,
      "auto_id": true
    },
    {
      "name": "vector",
      "data_type": "FloatVector",
      "dim": 128
    },
    {
      "name": "tag",
      "data_type": "VarChar",
      "max_length": 100
    }
  ]
}
```

### View Collection Info

```bash
# List collections
milvus-cli data collection list

# Describe collection
milvus-cli data collection describe --name demo

# YAML format output
milvus-cli data collection describe --name demo --output yaml
```

### Load and Release Collection

```bash
# Load collection
milvus-cli data collection load --name demo

# Release collection
milvus-cli data collection release --name demo
```

### Drop Collection

```bash
milvus-cli data collection drop --name demo
```

## Output

### collection list (table format)

```
+----------+
| Name     |
+----------+
| demo     |
| quickstart |
+----------+
```

### collection describe (table format)

```
+-------------+------------------+
| Field       | Value            |
+-------------+------------------+
| Name        | demo             |
| Description | Demo collection  |
| RowCount    | 1000             |
+-------------+------------------+

Fields
+------+----------+------------+----------+-----------+
| name | data_type| primary    | auto_id  | ...       |
+------+----------+------------+----------+-----------+
| id   | Int64    | true       | true     | ...       |
| vector| FloatVector| false   | false    | ...       |
+------+----------+------------+----------+-----------+

Indexes
+------+-----------+-----------+------------+
| name | field_name| index_type| metric_type|
+------+-----------+-----------+------------+
| ...  | ...       | ...       | ...        |
+------+-----------+-----------+------------+
```

## Common Next Steps

- Use `milvus-cli data collection load` to load collection for search
- Use `milvus-cli data index create` to create indexes for vector fields
- Use `milvus-cli data vector insert` to insert data into collections
- Use `milvus-cli data partition create` to create partitions for data management
