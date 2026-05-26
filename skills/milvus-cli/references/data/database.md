# database 命令

管理 Milvus 数据库。

## 用途

database 命令组用于在 Milvus 实例中创建、查看、切换和删除数据库。数据库是集合（Collection）的逻辑分组，可用于多租户场景。

## 前置条件

1. 已创建并测试通过的数据连接（`milvus-cli data connection`）
2. 拥有足够的权限（通常需要管理员权限创建数据库）

## 命令

### database list

列出当前连接中的所有数据库。

```bash
milvus-cli data database list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--connection` | 否 | 指定连接名称，默认使用当前连接 | `--connection sample` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 数据库名称 |

### database create

创建一个新的数据库。

```bash
milvus-cli data database create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--database` | 是 | 数据库名称 | `--database analytics` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--property` | 否 | 数据库属性，可重复设置，格式为 `key=value` | `--property database.replica.number=2` |

### database describe

查看指定数据库的详细信息。

```bash
milvus-cli data database describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--database` | 是 | 数据库名称 | `--database analytics` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 数据库名称 |
| `Properties` | 数据库属性列表（如有） |

### database use

设置连接的默认数据库。

```bash
milvus-cli data database use [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--database` | 是 | 要设为默认的数据库名称 | `--database analytics` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

**注意**：此命令只修改本地连接的默认数据库配置，不会在 Milvus 中创建或删除数据库。

### database drop

删除指定的数据库。

```bash
milvus-cli data database drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--database` | 是 | 要删除的数据库名称 | `--database analytics` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |

**注意**：删除数据库会删除其中的所有集合和数据，请谨慎操作。

## 示例

### 列出所有数据库

```bash
# 使用当前连接
milvus-cli data database list

# 指定连接
milvus-cli data database list --connection sample

# JSON 格式输出
milvus-cli data database list --output json
```

### 创建数据库

```bash
# 创建基础数据库
milvus-cli data database create --database analytics

# 创建带属性的数据库
milvus-cli data database create \
  --database analytics \
  --property database.replica.number=2
```

### 查看数据库详情

```bash
# 查看默认数据库
milvus-cli data database describe --database default

# 查看指定数据库
milvus-cli data database describe --database analytics --output yaml
```

### 切换默认数据库

```bash
# 切换到 analytics 数据库
milvus-cli data database use analytics

# 指定连接切换
milvus-cli data database use analytics --connection sample
```

### 删除数据库

```bash
# 删除数据库
milvus-cli data database drop --database analytics
```

## 输出结果

### database list（table 格式）

```
+-----------+
| Name      |
+-----------+
| default   |
| analytics |
+-----------+
```

### database describe（table 格式）

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

## 常见下一步

- 使用 `milvus-cli data collection list` 查看数据库中的集合
- 使用 `milvus-cli data collection create` 在数据库中创建集合
- 使用 `milvus-cli data database use` 切换工作数据库
- 为不同业务场景创建独立的数据库进行隔离
