# index 命令

管理 Milvus 集合索引。

## 用途

index 命令组用于创建、查看和删除集合的向量索引。索引可以显著提高向量搜索的性能，是生产环境中的重要配置。

## 前置条件

1. 已创建有效的数据连接
2. 已创建目标集合且包含向量字段

## 命令

### index list

列出指定集合的所有索引。

```bash
milvus-cli data index list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Index` | 索引名称 |

### index describe

查看指定索引的详细信息。

```bash
milvus-cli data index describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--index` | 是 | 索引名称 | `--index vector_idx` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### index create

为集合创建索引。

```bash
milvus-cli data index create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--field` | 是 | 要创建索引的字段名 | `--field vector` |
| `--index-type` | 是 | 索引类型（如 IVF_FLAT、HNSW） | `--index-type IVF_FLAT` |
| `--metric-type` | 是 | 度量类型（如 L2、IP） | `--metric-type L2` |
| `--params` | 否 | 索引参数，格式为 `key=value` | `--params nlist=128` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

常用索引类型：

| 索引类型 | 适用场景 | 参数示例 |
|----------|----------|----------|
| `FLAT` | 小数据集，需要精确搜索 | 无 |
| `IVF_FLAT` | 平衡性能和召回率 | `nlist=128` |
| `IVF_SQ8` | 节省存储空间 | `nlist=128` |
| `HNSW` | 高召回率，快速搜索 | `M=16,efConstruction=200` |

### index drop

删除指定的索引。

```bash
milvus-cli data index drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--index` | 是 | 索引名称 | `--index vector_idx` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

## 示例

### 列出索引

```bash
milvus-cli data index list --collection demo
```

### 创建索引

```bash
# 创建 IVF_FLAT 索引
milvus-cli data index create \
  --collection demo \
  --field vector \
  --index-type IVF_FLAT \
  --metric-type L2 \
  --params nlist=128

# 创建 HNSW 索引
milvus-cli data index create \
  --collection demo \
  --field vector \
  --index-type HNSW \
  --metric-type IP \
  --params M=16,efConstruction=200
```

### 查看索引详情

```bash
milvus-cli data index describe --collection demo --index vector_idx
```

### 删除索引

```bash
milvus-cli data index drop --collection demo --index vector_idx
```

## 输出结果

### index list（table 格式）

```
+------------+
| Index      |
+------------+
| vector_idx |
+------------+
```

## 索引最佳实践

1. **小数据集（< 100万）**：使用 FLAT 索引获得精确结果
2. **中等数据集（100万 - 1000万）**：使用 IVF_FLAT 或 IVF_SQ8
3. **大数据集（> 1000万）**：使用 HNSW 获得高召回率
4. **创建索引后**：需要加载集合才能使用索引进行搜索

## 常见下一步

- 使用 `milvus-cli data collection load` 加载集合以使用索引
- 使用 `milvus-cli data vector search` 测试索引搜索性能
- 根据业务需求选择合适的索引类型和参数
- 监控索引构建进度和搜索性能
