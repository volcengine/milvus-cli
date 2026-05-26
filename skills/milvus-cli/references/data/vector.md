# vector 命令

管理 Milvus 向量数据。

## 用途

vector 命令组用于对向量数据进行增删改查与检索，包括插入、更新、查询、搜索、删除等操作。

## 前置条件

1. 已创建有效的数据连接
2. 已创建并加载目标集合
3. 已创建向量索引（搜索操作）

## 命令

### vector insert

向集合中插入向量数据。

```bash
milvus-cli data vector insert [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--data` | 条件 | JSON 数组字符串（与 `--file` 二选一） | `--data '[{"id": 1, "vector": [0.1, ...]}]'` |
| `--file` | 条件 | 输入文件路径（.json 或 .jsonl） | `--file ./data.json` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### vector upsert

更新或插入向量数据（存在则更新，不存在则插入）。

```bash
milvus-cli data vector upsert [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--data` | 条件 | JSON 数组字符串（与 `--file` 二选一） | `--data '[{"id": 1, "vector": [0.1, ...]}]'` |
| `--file` | 条件 | 输入文件路径 | `--file ./data.json` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### vector get

根据主键 ID 获取向量数据。

```bash
milvus-cli data vector get [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--ids` | 是 | 主键 ID 列表，逗号分隔 | `--ids 1,2,3` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### vector query

按表达式查询向量数据。

```bash
milvus-cli data vector query [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--expr` / `--filter` | 条件 | 过滤表达式（二选一） | `--expr "id > 100"` |
| `--partition` | 否 | 分区名称 | `--partition p1` |
| `--output-fields` | 否 | 返回字段，逗号分隔 | `--output-fields id,vector` |
| `--limit` | 否 | 返回条数，默认 100 | `--limit 100` |
| `--offset` | 否 | 偏移量，默认 0 | `--offset 0` |
| `--file` | 否 | 导出文件路径 | `--file ./result.json` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### vector search

向量相似度搜索。

```bash
milvus-cli data vector search [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--vector` | 是 | 查询向量（JSON 数组格式） | `--vector '[0.1, 0.2, ...]'` |
| `--vector-field` | 否 | 向量字段名，默认 `vector` | `--vector-field embedding` |
| `--topk` | 是 | 返回最相似的 K 个结果 | `--topk 10` |
| `--filter` | 否 | 过滤表达式 | `--filter "tag == 'red'"` |
| `--param` | 否 | ANN 参数，可重复（key=value） | `--param nprobe=16` |
| `--partition` | 否 | 分区名称 | `--partition p1` |
| `--output-fields` | 否 | 返回字段，逗号分隔 | `--output-fields id,distance` |
| `--offset` | 否 | 偏移量，默认 0 | `--offset 0` |
| `--file` | 否 | 导出文件路径 | `--file ./result.json` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

**注意**：使用 `--file` 导出时，配合 `--output json` 或 `--output yaml` 格式适合自动化处理。

### vector delete

删除向量数据。

```bash
milvus-cli data vector delete [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--expr` / `--filter` | 条件 | 过滤表达式 | `--expr "id in [1, 2, 3]"` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

## 示例

### 插入数据

```bash
# 直接插入 JSON 数据
milvus-cli data vector insert \
  --collection demo \
  --data '[{"id": 1, "vector": [0.1, 0.2, 0.3, ...], "tag": "red"}]'

# 从文件插入
milvus-cli data vector insert \
  --collection demo \
  --file ./data.json
```

数据文件示例（data.json）：

```json
[
  {"id": 1, "vector": [0.1, 0.2, 0.3], "tag": "red"},
  {"id": 2, "vector": [0.2, 0.3, 0.4], "tag": "blue"}
]
```

### 向量搜索

```bash
# 基础搜索
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, 0.3, ...]' \
  --topk 10

# 带过滤条件的搜索
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 10 \
  --filter "tag == 'red'"

# 导出搜索结果到文件
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 100 \
  --output json \
  --file ./search_result.json
```

### 查询数据

```bash
# 基础查询
milvus-cli data vector query \
  --collection demo \
  --expr "id > 100"

# 带分页的查询
milvus-cli data vector query \
  --collection demo \
  --expr "tag == 'red'" \
  --limit 50 \
  --offset 100

# 导出查询结果
milvus-cli data vector query \
  --collection demo \
  --expr "id in [1, 2, 3]" \
  --output yaml \
  --file ./query_result.yaml
```

### 获取指定 ID 的数据

```bash
milvus-cli data vector get \
  --collection demo \
  --ids 1,2,3,4,5
```

### 删除数据

```bash
milvus-cli data vector delete \
  --collection demo \
  --expr "id in [1, 2, 3]"
```

## 输出结果

### vector search（table 格式）

```
+----+----------+----------+
| id | distance | tag      |
+----+----------+----------+
| 42 | 0.1234   | red      |
| 88 | 0.1567   | blue     |
+----+----------+----------+
```

### 导出文件格式

当使用 `--file` 参数时，JSON 和 YAML 格式的导出文件适合自动化处理：

```bash
# JSON 格式（适合程序解析）
milvus-cli data vector search ... --output json --file result.json

# YAML 格式（适合配置管理）
milvus-cli data vector query ... --output yaml --file result.yaml
```

## 常见下一步

- 使用 `milvus-cli data vector search` 进行相似度搜索
- 使用 `--file` 参数批量导入/导出数据
- 结合 `--output json/yaml` 实现自动化工作流
- 使用过滤表达式实现更精确的查询条件
