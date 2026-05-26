# connection 命令

管理本地数据连接配置，用于后续数据面命令连接 Milvus 集群。

## 用途

connection 命令组用于创建、查看、切换、测试和删除本地保存的 Milvus 连接配置。这些配置被后续所有 data 子命令复用，避免重复输入连接信息。

## 前置条件

1. 手动创建连接时，拥有一个可访问的 Milvus 服务端点（如 `localhost:19530` 或 `https://milvus.example.com:19530`）
2. 从控制面实例创建连接时，当前 profile 已配置可查询 dedicated 或 serverless 实例的区域和云账号凭证
3. 准备好认证信息之一：
   - Token 认证：需要有效的 Token
   - 用户名/密码认证：需要用户名和密码
   - API Key 认证：需要 API Key

## 命令

### connection create

创建一个新的本地数据连接。

```bash
milvus-cli data connection create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--name` | 条件 | 连接名称，用于后续引用；来源模式下可省略，默认使用实例 ID | `--name sample` |
| `--address` | 条件 | Milvus 地址和端口；手动模式必填，来源模式下自动使用实例私网地址 | `--address localhost:19530` |
| `--auth-method` | 条件 | 认证方式：`token`/`username`/`api-key`；手动模式必填，来源模式下固定为 `username` | `--auth-method token` |
| `--token` | 条件 | Token 认证值（auth-method=token 时必填） | `--token <TOKEN>` |
| `--username` | 条件 | 用户名（auth-method=username 时必填）；来源模式下从实例信息自动获取 | `--username root` |
| `--password` | 条件 | 密码（auth-method=username 或来源模式时必填） | `--password <PASSWORD>` |
| `--api-key` | 条件 | API Key（auth-method=api-key 时必填） | `--api-key <API_KEY>` |
| `--database` | 否 | 默认数据库名称，默认为 `default` | `--database demo` |
| `--tls` | 否 | 启用 TLS 连接；来源模式下根据地址是否以 `https://` 开头自动判断 | `--tls` |
| `--server-name` | 否 | 覆盖 TLS server name | `--server-name milvus.example.com` |
| `--ca-cert-path` | 否 | 自定义 CA 证书路径 | `--ca-cert-path /path/to/ca.crt` |
| `--from-instance` | 否 | 根据 dedicated 实例 ID 从控制面查询并自动填入私网地址、用户名和来源信息；与 `--from-serverless` 互斥 | `--from-instance milvus-xxx` |
| `--from-serverless` | 否 | 根据 serverless 实例 ID 从控制面查询并自动填入私网地址、用户名和来源信息；与 `--from-instance` 互斥 | `--from-serverless ms-xxx` |

#### 从控制面实例创建连接

`connection create` 支持通过当前 profile 查询控制面实例详情，并自动生成本地数据连接配置：

1. `--from-instance <instance-id>`：从 dedicated 实例继承连接信息。
2. `--from-serverless <instance-id>`：从 serverless 实例继承连接信息。
3. 两个来源参数互斥，不能同时指定。
4. 来源模式默认使用 `username/password` 认证，用户名来自实例信息，用户仍需通过 `--password` 提供密码。
5. 地址使用实例私网地址；如果地址以 `https://` 开头，CLI 会自动启用 TLS。
6. `--name` 可选；省略时使用实例 ID 作为连接名，指定时使用 `--name` 覆盖。
7. 来源模式下无需手动传入 `--address`、`--auth-method`、`--username`、`--token`、`--api-key`、`--tls`、`--server-name` 或 `--ca-cert-path`。

### connection list

列出所有本地保存的数据连接。

```bash
milvus-cli data connection list [flags]
```

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 连接名称，当前激活的连接会带 `*` 前缀 |
| `Address` | Milvus 服务端地址 |
| `Database` | 默认数据库 |
| `AuthMethod` | 认证方式 |
| `TLSEnabled` | 是否启用 TLS |
| `Source` | 连接来源 |
| `LastUsedAt` | 最后使用时间 |

### connection current

显示当前激活的连接配置。

```bash
milvus-cli data connection current [flags]
```

### connection use

切换到指定的连接。

```bash
milvus-cli data connection use <name> [flags]
```

| 参数 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 要切换到的连接名称 |

### connection test

测试连接的连通性。

```bash
milvus-cli data connection test [name] [flags]
```

| 参数 | 必填 | 说明 |
|------|------|------|
| `name` | 否 | 要测试的连接名称，省略则测试当前连接 |

### connection delete

删除指定的连接配置。

```bash
milvus-cli data connection delete <name> [flags]
```

| 参数 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 要删除的连接名称 |

**注意**：删除当前激活的连接前，需先切换到其他连接。

## 示例

### 创建不同认证方式的连接

```bash
# Token 认证
milvus-cli data connection create \
  --name sample \
  --address localhost:19530 \
  --auth-method token \
  --token <YOUR_TOKEN>

# 用户名/密码认证
milvus-cli data connection create \
  --name admin \
  --address localhost:19530 \
  --auth-method username \
  --username root \
  --password <YOUR_PASSWORD>

# API Key 认证 + TLS
milvus-cli data connection create \
  --name cloud \
  --address https://milvus.example.com:19530 \
  --auth-method api-key \
  --api-key <YOUR_API_KEY> \
  --tls
```

### 从控制面实例创建连接

```bash
# 从 dedicated 实例创建连接，连接名默认使用实例 ID
milvus-cli data connection create \
  --from-instance <INSTANCE_ID> \
  --password <YOUR_PASSWORD>

# 从 serverless 实例创建连接，并覆盖连接名
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <INSTANCE_ID> \
  --password <YOUR_PASSWORD>
```

### 查看和管理连接

```bash
# 列出所有连接
milvus-cli data connection list

# 查看当前连接
milvus-cli data connection current

# 切换连接
milvus-cli data connection use sample

# 测试连接
milvus-cli data connection test sample

# 删除连接
milvus-cli data connection delete old-conn
```

### 使用 JSON/YAML 输出

```bash
# JSON 格式输出
milvus-cli data connection list --output json

# YAML 格式输出
milvus-cli data connection current --output yaml
```

## 输出结果

### connection list（table 格式）

```
+---------+-------------------+----------+------------+------------+--------+------------+
| Name    | Address           | Database | AuthMethod | TLSEnabled | Source | LastUsedAt |
+---------+-------------------+----------+------------+------------+--------+------------+
| *sample | localhost:19530   | default  | token      | false      | manual | 2026-05-01T... |
| cloud   | milvus.example... | default  | api-key    | true       | manual | 2026-04-30T... |
+---------+-------------------+----------+------------+------------+--------+------------+
```

`*` 表示当前激活的连接。

### connection current（table 格式）

```
+------------+-----------------+
| Field      | Value           |
+------------+-----------------+
| Name       | sample          |
| Address    | localhost:19530 |
| Database   | default         |
| AuthMethod | token           |
| TLSEnabled | false           |
| Source     | manual          |
+------------+-----------------+
```

## 常见下一步

- 使用 `milvus-cli data database list` 查看可用数据库
- 使用 `milvus-cli data collection create` 创建集合
- 使用 `milvus-cli data connection test` 验证连接状态
- 配置多个连接以管理不同环境（开发/测试/生产）
