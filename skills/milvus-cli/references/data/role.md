# role 命令

管理 Milvus 角色。

## 用途

role 命令组用于创建、查看、授权、撤销和删除 Milvus 角色。角色管理是 RBAC（基于角色的访问控制）的核心，通过角色可以统一管理一组权限。

## 前置条件

1. 已创建有效的数据连接
2. 当前用户拥有管理员权限（root 或具有 Role 管理权限的角色）

## 命令

### role list

列出所有角色。

```bash
milvus-cli data role list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Role` | 角色名称 |

### role create

创建新角色。

```bash
milvus-cli data role create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--role` | 是 | 角色名称 | `--role readonly` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### role describe

查看角色详情及其权限。

```bash
milvus-cli data role describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--role` | 是 | 角色名称 | `--role readonly` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `name` | 角色名称 |
| `privilege_count` | 权限数量 |
| `Privileges` | 权限列表（数据库、对象、对象名、权限、授权者） |

### role grant

将角色授予用户（角色视角）。

```bash
milvus-cli data role grant [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--role` | 是 | 角色名称 | `--role readonly` |
| `--user` | 是 | 用户名 | `--user analyst` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### role revoke

从用户撤销角色（角色视角）。

```bash
milvus-cli data role revoke [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--role` | 是 | 角色名称 | `--role readonly` |
| `--user` | 是 | 用户名 | `--user analyst` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### role drop

删除角色。

```bash
milvus-cli data role drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--role` | 是 | 角色名称 | `--role readonly` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

**注意**：也可以别名 `delete` 使用此命令。

## 示例

### 列出所有角色

```bash
milvus-cli data role list --connection sample
```

### 创建角色并绑定用户

```bash
# 创建用户
milvus-cli data user create \
  --connection sample \
  --user analyst \
  --password 'MilvusDemo#2026'

# 创建角色
milvus-cli data role create --connection sample --role readonly

# 查看角色详情
milvus-cli data role describe --connection sample --role readonly

# 将角色授予用户（角色视角）
milvus-cli data role grant \
  --connection sample \
  --role readonly \
  --user analyst

# 验证授权结果
milvus-cli data role describe --connection sample --role readonly --output json
```

### 撤销角色和清理

```bash
# 从用户撤销角色
milvus-cli data role revoke \
  --connection sample \
  --role readonly \
  --user analyst

# 删除角色
milvus-cli data role drop --connection sample --role readonly

# 删除用户
milvus-cli data user drop --connection sample --user analyst
```

## 输出结果

### role list（table 格式）

```
+-----------+
| Role      |
+-----------+
| admin     |
| readonly  |
+-----------+
```

### role describe（table 格式）

```
+------------------+----------+
| name             | readonly |
| privilege_count  | 5        |
+------------------+----------+

Privileges
+----------+--------+-------------+-----------+----------+
| database | object | object_name | privilege | grantor  |
+----------+--------+-------------+-----------+----------+
| *        | Collection | *       | Search    | root     |
| *        | Collection | *       | Query     | root     |
+----------+--------+-------------+-----------+----------+
```

## 常见下一步

- 使用 `milvus-cli data user create` 创建用户
- 使用 `milvus-cli data role describe` 查看角色的权限详情
- 使用 `milvus-cli data user grant` 从用户视角进行授权
- 为不同业务场景创建不同角色（如 readonly、readwrite、admin）
