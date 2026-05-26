# partition Command

Manage Milvus collection partitions.

## Purpose

The partition command group is used to create, view, load, release, and delete partitions of collections. Partitions are commonly used to isolate data by business/time dimensions and reduce query scan scope.

## Prerequisites

1. A valid data connection created
2. The target collection created

## Commands

### partition list

List all partitions of a specified collection.

```bash
milvus-cli data partition list [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

#### Output

| Field | Description |
|-------|-------------|
| `Partition` | Partition name (includes `_default` default partition) |

### partition create

Create a new partition in a specified collection.

```bash
milvus-cli data partition create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--partition` | Yes | Partition name | `--partition p1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### partition describe

View detailed information about a specified partition.

```bash
milvus-cli data partition describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--partition` | Yes | Partition name | `--partition p1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### partition load

Load a partition into memory.

```bash
milvus-cli data partition load [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--partition` | Yes | Partition name | `--partition p1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### partition release

Release a partition from memory.

```bash
milvus-cli data partition release [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--partition` | Yes | Partition name | `--partition p1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### partition drop

Delete a specified partition.

```bash
milvus-cli data partition drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--partition` | Yes | Partition name | `--partition p1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

**Note**: The default partition `_default` cannot be deleted.

## Examples

### List Partitions

```bash
# List all partitions
milvus-cli data partition list --collection demo

# JSON format output
milvus-cli data partition list --collection demo --output json
```

### Create Partition

```bash
# Create partition p1
milvus-cli data partition create --collection demo --partition p1

# Create partition p2
milvus-cli data partition create --collection demo --partition p2
```

### Load and Release Partition

```bash
# Load partition
milvus-cli data partition load --collection demo --partition p1

# Release partition
milvus-cli data partition release --collection demo --partition p1
```

### Drop Partition

```bash
milvus-cli data partition drop --collection demo --partition p1
```

## Output

### partition list (table format)

```
+-----------+
| Partition |
+-----------+
| _default  |
| p1        |
| p2        |
+-----------+
```

## Common Next Steps

- Use `milvus-cli data vector insert --partition <name>` to insert data into a specific partition
- Use `milvus-cli data vector search --partition <name>` to search within a specific partition
- Create partitions by time for time-series data (e.g., `2025_01`, `2025_02`)
- Create partitions by tenant for multi-tenant scenarios
