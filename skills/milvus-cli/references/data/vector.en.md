# vector Command

Manage Milvus vector data.

## Purpose

The vector command group is used for CRUD and retrieval operations on vector data, including insertion, updating, querying, searching, and deletion.

## Prerequisites

1. A valid data connection created
2. The target collection created and loaded
3. Vector index created (for search operations)

## Commands

### vector insert

Insert vector data into a collection.

```bash
milvus-cli data vector insert [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--data` | Conditional | JSON array string (choose one with `--file`) | `--data '[{"id": 1, "vector": [0.1, ...]}]'` |
| `--file` | Conditional | Input file path (.json or .jsonl) | `--file ./data.json` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### vector upsert

Update or insert vector data (update if exists, insert if not).

```bash
milvus-cli data vector upsert [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--data` | Conditional | JSON array string (choose one with `--file`) | `--data '[{"id": 1, "vector": [0.1, ...]}]'` |
| `--file` | Conditional | Input file path | `--file ./data.json` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### vector get

Get vector data by primary key ID.

```bash
milvus-cli data vector get [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--ids` | Yes | Primary key ID list, comma-separated | `--ids 1,2,3` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### vector query

Query vector data with an expression.

```bash
milvus-cli data vector query [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--expr` / `--filter` | Conditional | Filter expression (choose one) | `--expr "id > 100"` |
| `--partition` | No | Partition name | `--partition p1` |
| `--output-fields` | No | Output fields, comma-separated | `--output-fields id,vector` |
| `--limit` | No | Number of results, default 100 | `--limit 100` |
| `--offset` | No | Offset, default 0 | `--offset 0` |
| `--file` | No | Export file path | `--file ./result.json` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### vector search

Search by vector similarity.

```bash
milvus-cli data vector search [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--vector` | Yes | Query vector in JSON array format | `--vector '[0.1, 0.2, ...]'` |
| `--vector-field` | No | Vector field name, default `vector` | `--vector-field embedding` |
| `--topk` | Yes | Return top K most similar results | `--topk 10` |
| `--filter` | No | Filter expression | `--filter "tag == 'red'"` |
| `--param` | No | ANN parameters, repeatable (key=value) | `--param nprobe=16` |
| `--partition` | No | Partition name | `--partition p1` |
| `--output-fields` | No | Output fields, comma-separated | `--output-fields id,distance` |
| `--offset` | No | Offset, default 0 | `--offset 0` |
| `--file` | No | Export file path | `--file ./result.json` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

**Note**: When using `--file` for export, combining with `--output json` or `--output yaml` format is suitable for automation.

### vector delete

Delete vector data.

```bash
milvus-cli data vector delete [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--collection` | Yes | Collection name | `--collection demo` |
| `--expr` / `--filter` | Conditional | Filter expression | `--expr "id in [1, 2, 3]"` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

## Examples

### Insert Data

```bash
# Direct insert JSON data
milvus-cli data vector insert \
  --collection demo \
  --data '[{"id": 1, "vector": [0.1, 0.2, 0.3, ...], "tag": "red"}]'

# Insert from file
milvus-cli data vector insert \
  --collection demo \
  --file ./data.json
```

Example data file (data.json):

```json
[
  {"id": 1, "vector": [0.1, 0.2, 0.3], "tag": "red"},
  {"id": 2, "vector": [0.2, 0.3, 0.4], "tag": "blue"}
]
```

### Vector Search

```bash
# Basic search
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, 0.3, ...]' \
  --topk 10

# Search with filter
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 10 \
  --filter "tag == 'red'"

# Export search results to file
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 100 \
  --output json \
  --file ./search_result.json
```

### Query Data

```bash
# Basic query
milvus-cli data vector query \
  --collection demo \
  --expr "id > 100"

# Query with pagination
milvus-cli data vector query \
  --collection demo \
  --expr "tag == 'red'" \
  --limit 50 \
  --offset 100

# Export query results
milvus-cli data vector query \
  --collection demo \
  --expr "id in [1, 2, 3]" \
  --output yaml \
  --file ./query_result.yaml
```

### Get Data by ID

```bash
milvus-cli data vector get \
  --collection demo \
  --ids 1,2,3,4,5
```

### Delete Data

```bash
milvus-cli data vector delete \
  --collection demo \
  --expr "id in [1, 2, 3]"
```

## Output

### vector search (table format)

```
+----+----------+----------+
| id | distance | tag      |
+----+----------+----------+
| 42 | 0.1234   | red      |
| 88 | 0.1567   | blue     |
+----+----------+----------+
```

### Export File Format

When using the `--file` argument, JSON and YAML format export files are suitable for automation:

```bash
# JSON format (suitable for programmatic parsing)
milvus-cli data vector search ... --output json --file result.json

# YAML format (suitable for configuration management)
milvus-cli data vector query ... --output yaml --file result.yaml
```

## Common Next Steps

- Use `milvus-cli data vector search` for similarity search
- Use `--file` argument for batch import/export of data
- Combine with `--output json/yaml` to implement automated workflows
- Use filter expressions for more precise query conditions
