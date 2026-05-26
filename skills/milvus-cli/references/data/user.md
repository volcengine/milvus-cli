# user 命令

管理 Milvus 用户。

## 用途

user 命令组用于创建、查看、授权、撤销和删除 Milvus 用户。用户管理是 RBAC（基于角色的访问控制）的重要组成部分。

## 前置条件

1. 已创建有效的数据连接
2. 当前用户拥有管理员权限（root 或具有 User 管理权限的角色）

## 命令

### user list

列出所有用户。

```bash
milvus-cli data user list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `User` | 用户名 |

### user create

创建新用户。

```bash
milvus-cli data user create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 用户名 | `--user analyst` |
| `--password` | 是 | 用户密码 | `--password 'MilvusDemo#2026'` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### user describe

查看用户详情及其角色绑定。

```bash
milvus-cli data user describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 用户名 | `--user analyst` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `User` | 用户名 |
| `Roles` | 用户绑定的角色列表 |

### user grant

为用户授予角色。

```bash
milvus-cli data user grant [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 用户名 | `--user analyst` |
| `--role` | 是 | 要授予的角色 | `--role readonly` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### user revoke

撤销用户的角色。

```bash
milvus-cli data user revoke [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 用户名 | `--user analyst` |
| `--role` | 是 | 要撤销的角色 | `--role readonly` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### user update-password

更新用户密码。

```bash
milvus-cli data user update-password [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 用户名 | `--user analyst` |
| `--old-password` | 是 | 旧密码 | `--old-password 'OldPass#123'` |
| `--new-password` | 是 | 新密码 | `--new-password 'NewPass#456'` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### user drop

删除用户。

```bash
milvus-cli data user drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--user` | 是 | 要删除的用户名 | `--user analyst` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

## 示例

### 列出所有用户

```bash
milvus-cli data user list --connection sample
```

### 创建用户并授权

```bash
# 创建角色
milvus-cli data role create --connection sample --role readonly

# 创建用户
milvus-cli data user create \
  --connection sample \
  --user analyst \
  --password 'MilvusDemo#2026'

# 查看用户详情
milvus-cli data user describe --connection sample --user analyst

# 授予角色
milvus-cli data user grant \
  --connection sample \
  --user analyst \
  --role readonly

# 验证授权结果
milvus-cli data user describe --connection sample --user analyst --output json
```

### 撤销角色和删除用户

```bash
# 撤销角色
milvus-cli data user revoke \
  --connection sample \
  --user analyst \
  --role readonly

# 删除用户
milvus-cli data user drop --connection sample --user analyst

# 删除角色
milvus-cli data role drop --connection sample --role readonly
```

### 更新密码

```bash
milvus-cli data user update-password \
  --connection sample \
  --user analyst \
  --old-password 'MilvusDemo#2026' \
  --new-password 'MilvusDemo#2026New'
```

## 输出结果

### user list（table 格式）

```
+----------+
| User     |
+----------+
| root     |
| analyst  |
+----------+
```

### user describe（table 格式）

```
+-------+----------+
| Field | Value    |
+-------+----------+
| User  | analyst  |
| Roles | readonly |
+-------+----------+
```

## 常见下一步

- 使用 `milvus-cli data role create` 创建自定义角色
- 使用 `milvus-cli data role describe` 查看角色的权限详情
- 为用户授予多个角色以实现更细粒度的权限控制
- 定期更新密码以保证安全
