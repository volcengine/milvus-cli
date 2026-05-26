# Data 命令组

Data 命令组提供对 Milvus 数据面的直接操作能力，包括连接管理、数据库管理、集合管理、分区管理、别名管理、索引管理、向量操作、用户管理和角色管理等功能。

## 用途

通过 data 命令组，你可以：

- 建立并管理本地到 Milvus 集群的数据连接配置
- 管理 Milvus 中的数据库、集合、分区、别名、索引等元数据
- 执行向量数据的插入、查询、搜索等操作
- 管理 Milvus 用户和角色的 RBAC 权限

## 前置条件

1. 拥有一个可访问的 Milvus 实例（本地或远程）
2. 准备好认证信息（Token、用户名/密码或 API Key）
3. 对于控制面集成，已完成 `milvus-cli auth login`

## 命令概览

| 子命令 | 说明 |
|--------|------|
| `connection` | 管理本地数据连接配置 |
| `database` | 管理 Milvus 数据库 |
| `collection` | 管理 Milvus 集合 |
| `partition` | 管理集合分区 |
| `alias` | 管理集合别名 |
| `index` | 管理集合索引 |
| `vector` | 向量数据的增删改查与检索 |
| `user` | 管理 Milvus 用户 |
| `role` | 管理 Milvus 角色 |

## 全局参数

所有 data 子命令都支持以下全局参数：

| 参数 | 说明 | 示例 |
|------|------|------|
| `--output table\|json\|yaml` | 输出格式，默认为 table | `--output json` |
| `--connection <name>` | 指定使用的连接名称（默认为当前连接） | `--connection local` |

## 详细文档

- [connection](connection.md) - 连接管理
- [database](database.md) - 数据库管理
- [collection](collection.md) - 集合管理
- [partition](partition.md) - 分区管理
- [alias](alias.md) - 别名管理
- [index](index.md) - 索引管理
- [vector](vector.md) - 向量操作
- [user](user.md) - 用户管理
- [role](role.md) - 角色管理

## 快速开始

### 1. 创建连接

```bash
# 使用 Token 认证
milvus-cli data connection create \
  --name sample \
  --address localhost:19530 \
  --auth-method token \
  --token <YOUR_TOKEN>

# 使用用户名/密码认证
milvus-cli data connection create \
  --name admin \
  --address localhost:19530 \
  --auth-method username \
  --username root \
  --password <YOUR_PASSWORD>

# 从 dedicated 控制面实例创建连接
milvus-cli data connection create \
  --from-instance <INSTANCE_ID> \
  --password <YOUR_PASSWORD>

# 从 serverless 控制面实例创建连接，并覆盖连接名
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <INSTANCE_ID> \
  --password <YOUR_PASSWORD>
```

### 2. 测试连接

```bash
milvus-cli data connection test sample
```

### 3. 查看数据库列表

```bash
milvus-cli data database list
```

### 4. 创建集合并插入数据

```bash
# 创建集合（默认会自动加载）
milvus-cli data collection create --name demo --dim 128

# 如需跳过自动加载，可显式指定
# milvus-cli data collection create --name demo --dim 128 --load=false

# 直接插入数据
milvus-cli data vector insert --collection demo \
  --data '[{"id": 1, "vector": [0.1, 0.2, ...]}]'
```

### 5. 执行向量搜索

```bash
milvus-cli data vector search \
  --collection demo \
  --vector '[0.1, 0.2, ...]' \
  --topk 10
```

## 连接配置约定

Data 命令通过 `--connection` 参数指定要使用的连接，遵循以下约定：

1. **连接名称**：使用 `connection create` 时指定的名称（如 `local`、`prod`、`sample` 等）
2. **默认连接**：未指定 `--connection` 时使用当前激活的连接（可通过 `connection current` 查看）
3. **自动选择**：本地只有一个连接时，部分命令会自动选择该连接
4. **连接存储**：连接配置保存在 `~/.milvus-cli/connections/` 目录下
5. **实例继承**：可使用 `--from-instance` 或 `--from-serverless` 从当前 profile 可查询的控制面实例继承私网地址和用户名，仍需通过 `--password` 提供密码

## 输出格式说明

### table 格式（默认）

适合人工查看，带边框的表格形式展示。

```
+------+-----------+----------+------------+------------+--------+------------+
| Name | Address   | Database | AuthMethod | TLSEnabled | Source | LastUsedAt |
+------+-----------+----------+------------+------------+--------+------------+
| ...  | ...       | ...      | ...        | ...        | ...    | ...        |
+------+-----------+----------+------------+------------+--------+------------+
```

### json 格式

适合程序解析，结构化的 JSON 数据。

```json
{
  "connections": [
    {
      "name": "sample",
      "address": "localhost:19530",
      "database": "default"
    }
  ]
}
```

### yaml 格式

适合配置管理，人类可读的 YAML 格式。

```yaml
connections:
  - name: sample
    address: localhost:19530
    database: default
```

## 常见下一步

- 阅读各子命令的详细文档了解完整功能
- 使用 `milvus-cli data <subcommand> --help` 查看帮助信息
- 配置多个连接以管理不同的 Milvus 环境
- 了解如何使用 `--file` 参数批量导入/导出数据
