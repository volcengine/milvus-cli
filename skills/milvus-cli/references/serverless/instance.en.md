# serverless instance

> **Feature Scope Note**: Serverless `instance` commands are available. Documentation examples use `sample/demo` placeholders for format demonstration purposes only. Please replace with actual values when using.

---

## Purpose

Manage Serverless Milvus instances, including creation, querying, deletion, renaming, setting delete protection, and resetting passwords.

---

## Prerequisites

1. Authentication completed: `milvus-cli auth login --ak <AK> --sk <SK>`
2. Profile created or `--region` parameter specified
3. Existing VPC ID and Subnet ID required when creating instances

---

## Commands

### create

Create a Serverless Milvus instance.

```bash
milvus-cli serverless instance create [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--name` | Yes | Instance name |
| `--version` | Yes | Instance version, e.g., `V2_5` |
| `--password` | Yes | Instance password |
| `--vpc-id` | Yes | VPC ID |
| `--subnet-id` | Yes | Subnet ID |
| `--delete-protect-enabled` | No | Enable delete protection, default `false` |
| `--wait` | No | Wait for instance to reach Running state |
| `--wait-timeout` | No | Wait timeout, default `30m` |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| InstanceID | milvus-demo123   |
| OrderNO    | ORDER-demo456    |
| OrderID    | 1234567890       |
| Status     | Running          |  # Only shown with --wait
+------------+------------------+
```

**json format:**

```json
{
  "instanceId": "milvus-demo123",
  "orderNo": "ORDER-demo456",
  "orderId": "1234567890",
  "status": "Running"
}
```

#### Examples

```bash
# Basic creation
milvus-cli serverless instance create \
  --name demo-instance \
  --version V2_5 \
  --password MyPassword123 \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456

# With delete protection
milvus-cli serverless instance create \
  --name protected-instance \
  --version V2_5 \
  --password MyPassword123 \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456 \
  --delete-protect-enabled

# Create and wait for ready
milvus-cli serverless instance create \
  --name demo-instance \
  --version V2_5 \
  --password MyPassword123 \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456 \
  --wait \
  --wait-timeout 20m
```

---

### list

List all Serverless instances in the current region and project.

```bash
milvus-cli serverless instance list [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--name` | No | Filter by instance name (substring match) | - |
| `--page` | No | Page number (starting from 1) | 1 |
| `--page-size` | No | Number of items per page (1-100) | 20 |

#### Output

**JSON/YAML output uses envelope format:**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 10, "returned": 10 }
}
```

**table format:**

```
+--------------+---------------+---------+----------+----------+
| InstanceID   | Name          | Status  | Version  | Project  |
+--------------+---------------+---------+----------+----------+
| milvus-xxx1  | demo-instance | Running | V2_5     | default  |
| milvus-xxx2  | test-instance | Running | V2_5     | default  |
+--------------+---------------+---------+----------+----------+
Showing 1-2 of 2 (Page 1)
```

#### Examples

```bash
milvus-cli serverless instance list
milvus-cli serverless instance list --output json
milvus-cli serverless instance list --name demo --page 1 --page-size 10
```

---

### describe

View detailed information about a specific Serverless instance.

```bash
milvus-cli serverless instance describe [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |

#### Output

**table format:**

```
+--------------+------------------+
| Field        | Value            |
+--------------+------------------+
| InstanceID   | milvus-demo123   |
| Name         | demo-instance    |
| Status       | Running          |
| Region       | cn-beijing       |
| Project      | default          |
| Version      | V2_5             |
| Username     | root             |
| Database     | default          |
+--------------+------------------+
```

#### Examples

```bash
milvus-cli serverless instance describe --instance-id milvus-demo123
```

---

### delete

Delete (release) a Serverless instance. **This operation is irreversible.**

```bash
milvus-cli serverless instance delete [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--yes` | Yes | Confirm deletion (safety requirement) |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Releasing        |
| InstanceID | milvus-demo123   |
+------------+------------------+
```

#### Examples

```bash
milvus-cli serverless instance delete --instance-id milvus-demo123 --yes
```

---

### rename

Rename a Serverless instance.

```bash
milvus-cli serverless instance rename [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--name` | Yes | New instance name |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
| Name       | new-name         |
+------------+------------------+
```

#### Examples

```bash
milvus-cli serverless instance rename \
  --instance-id milvus-demo123 \
  --name new-instance-name
```

---

### delete-protect set

Enable or disable delete protection for an instance.

```bash
milvus-cli serverless instance delete-protect set [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--enabled` | Yes | Whether to enable: `true` or `false` |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
| Enabled    | true             |
+------------+------------------+
```

#### Examples

```bash
# Enable delete protection
milvus-cli serverless instance delete-protect set \
  --instance-id milvus-demo123 \
  --enabled true

# Disable delete protection
milvus-cli serverless instance delete-protect set \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### reset-password

Reset the password for a Serverless instance.

```bash
milvus-cli serverless instance reset-password [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--password` | Yes | New password |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
+------------+------------------+
```

#### Examples

```bash
milvus-cli serverless instance reset-password \
  --instance-id milvus-demo123 \
  --password NewSecurePassword456
```

---

## Common Next Steps

- [Configure network access](./network.en.md)
- [View Serverless overview](./README.en.md)
- [Return to command overview](../README.en.md)

---

## Related Documentation

- [中文文档](./instance.md)
- [network command details](./network.en.md)
- [Serverless overview](./README.en.md)
