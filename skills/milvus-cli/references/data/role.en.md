# role Command

Manage Milvus roles.

## Purpose

The role command group is used to create, view, grant, revoke, and delete Milvus roles. Role management is the core of RBAC (Role-Based Access Control), allowing unified management of a set of permissions through roles.

## Prerequisites

1. A valid data connection created
2. Current user has administrator privileges (root or a role with Role management permission)

## Commands

### role list

List all roles.

```bash
milvus-cli data role list [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

#### Output

| Field | Description |
|-------|-------------|
| `Role` | Role name |

### role create

Create a new role.

```bash
milvus-cli data role create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--role` | Yes | Role name | `--role readonly` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### role describe

View role details and privileges.

```bash
milvus-cli data role describe [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--role` | Yes | Role name | `--role readonly` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

#### Output

| Field | Description |
|-------|-------------|
| `name` | Role name |
| `privilege_count` | Number of privileges |
| `Privileges` | Privilege list (database, object, object_name, privilege, grantor) |

### role grant

Grant a role to a user (role-centric view).

```bash
milvus-cli data role grant [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--role` | Yes | Role name | `--role readonly` |
| `--user` | Yes | User name | `--user analyst` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### role revoke

Revoke a role from a user (role-centric view).

```bash
milvus-cli data role revoke [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--role` | Yes | Role name | `--role readonly` |
| `--user` | Yes | User name | `--user analyst` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

### role drop

Delete a role.

```bash
milvus-cli data role drop [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--role` | Yes | Role name | `--role readonly` |
| `--connection` | No | Specify connection name | `--connection sample` |
| `--timeout` | No | Request timeout | `--timeout 30s` |

**Note**: This command can also be used with alias `delete`.

## Examples

### List All Roles

```bash
milvus-cli data role list --connection sample
```

### Create Role and Bind User

```bash
# Create user
milvus-cli data user create \
  --connection sample \
  --user analyst \
  --password 'MilvusDemo#2026'

# Create role
milvus-cli data role create --connection sample --role readonly

# View role details
milvus-cli data role describe --connection sample --role readonly

# Grant role to user (role-centric view)
milvus-cli data role grant \
  --connection sample \
  --role readonly \
  --user analyst

# Verify grant result
milvus-cli data role describe --connection sample --role readonly --output json
```

### Revoke Role and Cleanup

```bash
# Revoke role from user
milvus-cli data role revoke \
  --connection sample \
  --role readonly \
  --user analyst

# Drop role
milvus-cli data role drop --connection sample --role readonly

# Drop user
milvus-cli data user drop --connection sample --user analyst
```

## Output

### role list (table format)

```
+-----------+
| Role      |
+-----------+
| admin     |
| readonly  |
+-----------+
```

### role describe (table format)

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

## Common Next Steps

- Use `milvus-cli data user create` to create users
- Use `milvus-cli data role describe` to view role privilege details
- Use `milvus-cli data user grant` to grant from user-centric view
- Create different roles for different business scenarios (e.g., readonly, readwrite, admin)
