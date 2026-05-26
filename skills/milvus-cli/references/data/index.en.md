# index Command

Manage Milvus collection indexes.

## Purpose

The index command group is used to create, view, and delete vector indexes for collections. Indexes can significantly improve vector search performance and are an important configuration in production environments.

## Prerequisites

1. A valid data connection created
2. The target collection created with vector fields

## Commands

### index list

List all indexes of a specified collection.

```bash
milvus-cli data index list [flags]
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
| `Index` | Index name |

### index describe

View detailed information about a specified index.

```bash
milvus-cli data index describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--index` | Yes | Index name | `--index vector_idx` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### index create

Create an index for a collection.

```bash
milvus-cli data index create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--field` | Yes | Field name to create index on | `--field vector` |
| `--index-type` | Yes | Index type (e.g., IVF_FLAT, HNSW) | `--index-type IVF_FLAT` |
| `--metric-type` | Yes | Metric type (e.g., L2, IP) | `--metric-type L2` |
| `--params` | No | Index parameters in `key=value` format | `--params nlist=128` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

Common index types:

| Index Type | Use Case | Parameter Example |
|------------|----------|-------------------|
| `FLAT` | Small datasets, exact search needed | None |
| `IVF_FLAT` | Balance performance and recall | `nlist=128` |
| `IVF_SQ8` | Save storage space | `nlist=128` |
| `HNSW` | High recall, fast search | `M=16,efConstruction=200` |

### index drop

Delete a specified index.

```bash
milvus-cli data index drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--index` | Yes | Index name | `--index vector_idx` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

## Examples

### List Indexes

```bash
milvus-cli data index list --collection demo
```

### Create Index

```bash
# Create IVF_FLAT index
milvus-cli data index create \
  --collection demo \
  --field vector \
  --index-type IVF_FLAT \
  --metric-type L2 \
  --params nlist=128

# Create HNSW index
milvus-cli data index create \
  --collection demo \
  --field vector \
  --index-type HNSW \
  --metric-type IP \
  --params M=16,efConstruction=200
```

### Describe Index

```bash
milvus-cli data index describe --collection demo --index vector_idx
```

### Drop Index

```bash
milvus-cli data index drop --collection demo --index vector_idx
```

## Output

### index list (table format)

```
+------------+
| Index      |
+------------+
| vector_idx |
+------------+
```

## Index Best Practices

1. **Small datasets (< 1M)**: Use FLAT index for exact results
2. **Medium datasets (1M - 10M)**: Use IVF_FLAT or IVF_SQ8
3. **Large datasets (> 10M)**: Use HNSW for high recall
4. **After creating index**: Load the collection to use the index for search

## Common Next Steps

- Use `milvus-cli data collection load` to load the collection for index usage
- Use `milvus-cli data vector search` to test index search performance
- Choose appropriate index type and parameters based on business requirements
- Monitor index build progress and search performance
