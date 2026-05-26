# alias Command

Manage Milvus collection aliases.

## Purpose

The alias command group is used to create, view, modify, and delete collection aliases. Aliases are commonly used for blue-green deployments and seamless collection switching, and can also be used to swap underlying collections without affecting application code.

## Prerequisites

1. A valid data connection created
2. The target collection created

## Commands

### alias list

List all aliases of a specified collection.

```bash
milvus-cli data alias list [flags]
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
| `Alias` | Alias name |

### alias create

Create an alias for a specified collection.

```bash
milvus-cli data alias create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--alias` | Yes | Alias name | `--alias demo_v1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### alias describe

View detailed information about a specified alias.

```bash
milvus-cli data alias describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--alias` | Yes | Alias name | `--alias demo_v1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### alias alter

Modify the collection that an alias points to (alias redirection).

```bash
milvus-cli data alias alter [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | New target collection name | `--collection demo_v2` |
| `--alias` | Yes | Alias to modify | `--alias demo` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

**Note**: This command can achieve seamless switching in blue-green deployments.

### alias drop

Delete a specified alias.

```bash
milvus-cli data alias drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--alias` | Yes | Alias to delete | `--alias demo_v1` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

## Examples

### List Aliases

```bash
milvus-cli data alias list --collection demo
```

### Create Alias

```bash
# Create alias demo_v1 for collection demo
milvus-cli data alias create --collection demo --alias demo_v1

# Create another alias
milvus-cli data alias create --collection demo_v2 --alias demo
```

### Describe Alias

```bash
milvus-cli data alias describe --alias demo_v1
```

### Blue-Green Deployment Switch

```bash
# Assume the current 'demo' alias points to 'demo_v1' collection
# 1. Prepare the new 'demo_v2' collection and load it
milvus-cli data collection load --name demo_v2

# 2. Switch alias to the new collection (seamless switch)
milvus-cli data alias alter --collection demo_v2 --alias demo

# 3. Verify the switch
milvus-cli data alias describe --alias demo
```

### Drop Alias

```bash
milvus-cli data alias drop --alias demo_v1
```

## Output

### alias list (table format)

```
+--------+
| Alias  |
+--------+
| demo_v1|
| demo   |
+--------+
```

## Common Next Steps

- Use aliases instead of collection names for vector search (`milvus-cli data vector search --collection <alias>`)
- Create aliases for different collection versions (e.g., `prod_v1`, `prod_v2`)
- Use `alias alter` for zero-downtime switching in blue-green deployments
- Hide the actual underlying collection name through aliases for improved security
