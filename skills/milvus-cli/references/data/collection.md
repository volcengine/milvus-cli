# collection 命令

管理 Milvus 集合。

## 用途

collection 命令组用于创建、查看、修改和删除 Milvus 集合。集合是 Milvus 中存储向量和标量数据的基本单元。

## 前置条件

1. 已创建有效的数据连接（`milvus-cli data connection`）
2. 已选择或指定目标数据库（`milvus-cli data database use`）

## 命令

### collection list

列出当前数据库中的所有集合。

```bash
milvus-cli data collection list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

### collection create

创建一个新的集合。

```bash
milvus-cli data collection create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 条件 | 集合名称（未使用 `--schema` 时必填） | `--name demo` |
| `--dim` | 条件 | 向量维度（快速创建时必填） | `--dim 128` |
| `--schema` | 条件 | Schema JSON 文件路径（与 `--name` 二选一） | `--schema ./schema.json` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--description` | 否 | 集合描述 | `--description "Demo collection"` |
| `--vector-field` | 否 | 向量字段名（快速创建），默认为 `vector` | `--vector-field embedding` |
| `--auto-id` | 否 | 快速创建时启用自动生成主键，默认为 `true` | `--auto-id=true` |
| `--enable-dynamic-field` | 否 | 快速创建时启用动态字段，默认为 `true` | `--enable-dynamic-field=true` |
| `--load` | 否 | 创建成功后自动加载集合，默认为 `true` | `--load=false` |
| `--property` | 否 | 集合属性，可重复 | `--property collection.ttl.seconds=86400` |

**快速创建模式**：使用 `--name` 和 `--dim` 快速创建默认 schema 的集合，默认创建后自动加载。

**Schema 文件模式**：使用 `--schema` 指定自定义 schema JSON 文件，默认创建后自动加载。

**自动加载行为**：命令默认会在创建成功后自动加载集合；使用 `--load=false` 可跳过加载。自动加载成功时，输出状态为 `loaded`。

### collection describe

查看指定集合的详细信息。

```bash
milvus-cli data collection describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 是 | 集合名称 | `--name demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 集合名称 |
| `Description` | 集合描述 |
| `RowCount` | 行数 |
| `Fields` | 字段列表（含字段名、类型、主键等） |
| `Indexes` | 索引列表 |
| `Properties` | 集合属性 |

### collection load

将集合加载到内存中。

```bash
milvus-cli data collection load [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 是 | 集合名称 | `--name demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

**注意**：集合必须先加载才能进行向量搜索和查询操作。

### collection release

将集合从内存中释放。

```bash
milvus-cli data collection release [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 是 | 集合名称 | `--name demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

### collection drop

删除指定的集合。

```bash
milvus-cli data collection drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 是 | 集合名称 | `--name demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

## 示例

### 快速创建集合

```bash
# 基础快速创建
milvus-cli data collection create --name demo --dim 128

# 指定向量字段名
milvus-cli data collection create --name demo --dim 128 --vector-field embedding

# 关闭自动生成主键
milvus-cli data collection create --name demo --dim 128 --auto-id=false

# 关闭动态字段
milvus-cli data collection create --name demo --dim 128 --enable-dynamic-field=false

# 创建后不自动加载
milvus-cli data collection create --name demo --dim 128 --load=false
```

说明：布尔参数请使用 `--flag=false` 形式，不要写成 `--flag false`，例如 `--auto-id=false`、`--enable-dynamic-field=false`、`--load=false`。

### 使用 Schema 文件创建

```bash
# 从 JSON 文件创建
milvus-cli data collection create --schema ./my-schema.json

# 从 JSON 文件创建，但不自动加载
milvus-cli data collection create --schema ./my-schema.json --load=false
```

Schema 文件示例：

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

### 查看集合信息

```bash
# 查看列表
milvus-cli data collection list

# 查看详情
milvus-cli data collection describe --name demo

# YAML 格式输出
milvus-cli data collection describe --name demo --output yaml
```

### 加载和释放集合

```bash
# 加载集合
milvus-cli data collection load --name demo

# 释放集合
milvus-cli data collection release --name demo
```

### 删除集合

```bash
milvus-cli data collection drop --name demo
```

## 输出结果

### collection list（table 格式）

```
+----------+
| Name     |
+----------+
| demo     |
| quickstart |
+----------+
```

### collection describe（table 格式）

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

## 常见下一步

- 使用 `milvus-cli data collection load` 加载集合以进行搜索
- 使用 `milvus-cli data index create` 为向量字段创建索引
- 使用 `milvus-cli data vector insert` 向集合中插入数据
- 使用 `milvus-cli data partition create` 创建分区管理数据
