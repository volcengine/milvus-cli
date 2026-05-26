# user Command

Manage Milvus users.

## Purpose

The user command group is used to create, view, grant, revoke, and delete Milvus users. User management is an important part of RBAC (Role-Based Access Control).

## Prerequisites

1. A valid data connection created
2. Current user has administrator privileges (root or a role with User management permission)

## Commands

### user list

List all users.

```bash
milvus-cli data user list [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

#### Output

| Field | Description |
|-------|-------------|
| `User` | User name |

### user create

Create a new user.

```bash
milvus-cli data user create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name | `--user analyst` |
| `--password` | Yes | User password | `--password 'MilvusDemo#2026'` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### user describe

View user details and role bindings.

```bash
milvus-cli data user describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name | `--user analyst` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

#### Output

| Field | Description |
|-------|-------------|
| `User` | User name |
| `Roles` | List of roles bound to the user |

### user grant

Grant a role to a user.

```bash
milvus-cli data user grant [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name | `--user analyst` |
| `--role` | Yes | Role to grant | `--role readonly` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### user revoke

Revoke a role from a user.

```bash
milvus-cli data user revoke [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name | `--user analyst` |
| `--role` | Yes | Role to revoke | `--role readonly` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### user update-password

Update user password.

```bash
milvus-cli data user update-password [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name | `--user analyst` |
| `--old-password` | Yes | Old password | `--old-password 'OldPass#123'` |
| `--new-password` | Yes | New password | `--new-password 'NewPass#456'` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### user drop

Delete a user.

```bash
milvus-cli data user drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--user` | Yes | User name to delete | `--user analyst` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

## Examples

### List All Users

```bash
milvus-cli data user list --connection sample
```

### Create User and Grant Role

```bash
# Create role
milvus-cli data role create --connection sample --role readonly

# Create user
milvus-cli data user create \
  --connection sample \
  --user analyst \
  --password 'MilvusDemo#2026'

# View user details
milvus-cli data user describe --connection sample --user analyst

# Grant role
milvus-cli data user grant \
  --connection sample \
  --user analyst \
  --role readonly

# Verify grant result
milvus-cli data user describe --connection sample --user analyst --output json
```

### Revoke Role and Delete User

```bash
# Revoke role
milvus-cli data user revoke \
  --connection sample \
  --user analyst \
  --role readonly

# Delete user
milvus-cli data user drop --connection sample --user analyst

# Delete role
milvus-cli data role drop --connection sample --role readonly
```

### Update Password

```bash
milvus-cli data user update-password \
  --connection sample \
  --user analyst \
  --old-password 'MilvusDemo#2026' \
  --new-password 'MilvusDemo#2026New'
```

## Output

### user list (table format)

```
+----------+
| User     |
+----------+
| root     |
| analyst  |
+----------+
```

### user describe (table format)

```
+-------+----------+
| Field | Value    |
+-------+----------+
| User  | analyst  |
| Roles | readonly |
+-------+----------+
```

## Common Next Steps

- Use `milvus-cli data role create` to create custom roles
- Use `milvus-cli data role describe` to view role privilege details
- Grant multiple roles to users for finer-grained access control
- Regularly update passwords for security
