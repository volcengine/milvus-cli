# instance

Manage dedicated Milvus instances.

## Purpose

Create, list, inspect, and manage dedicated Milvus instances.

## Prerequisites

- Authenticate and set context (recommended): `milvus-cli auth login` + `milvus-cli profile create`
- Ensure `--region` is set (via flags or the current profile)

## Commands

### instance create

Create a dedicated Milvus instance.

```bash
milvus-cli instance create --name <name> --admin-password <password> --vpc-id <vpc-id> [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--name` | Yes | Instance name | - |
| `--admin-password` | Yes | Admin password | - |
| `--vpc-id` | Yes | VPC ID | - |
| `--version` | No | Milvus version | V2_6 |
| `--zone` | No | Zone identifier (repeatable) | auto-selected |
| `--subnet-id` | No | Subnet ID | auto-selected |
| `--ha-enabled` | No | Whether high availability is enabled | true |
| `--node-cu-type` | No | Node CU type: PERFORMANCE/CAPACITY | PERFORMANCE |
| `--charge-type` | No | Charge type: POST/PRE | POST |
| `--delete-protect-enabled` | No | Enable delete protection on creation | false |
| `--wait` | No | Wait until instance becomes Running | false |
| `--timeout` | No | Maximum time to wait | 30m |
| `--poll-interval` | No | Polling interval | 10s |

Node spec arguments (repeatable):

| Argument | Description |
|----------|-------------|
| `--meta-node-count/cpu/mem` | Meta node spec |
| `--proxy-node-count/cpu/mem` | Proxy node spec |
| `--query-node-count/cpu/mem` | Query node spec |
| `--data-node-count/cpu/mem` | Data node spec |
| `--index-node-count/cpu/mem` | Index node spec |
| `--streaming-node-count/cpu/mem` | Streaming node spec |

#### Output

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |
| `OrderNO` | Order number |
| `Status` | Status |
| `OrderID` | Order ID (if applicable) |
| `TradeConfigID` | Trade config ID (if applicable) |
| `FinalStatus` | Final status (with --wait) |

### instance list

List dedicated Milvus instances.

```bash
milvus-cli instance list [flags]
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
  "pagination": { "page": 1, "pageSize": 20, "total": 45, "returned": 20 }
}
```

**Table output appends a pagination summary line:**

```
Showing 1-20 of 45 (Page 1)
```

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |
| `Name` | Instance name |
| `Status` | Status |
| `Region` | Region |
| `Project` | Project |

### instance describe

Describe a dedicated Milvus instance.

```bash
milvus-cli instance describe --instance-id <instance-id>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |

#### Output

`table` shows a compact summary view; `json/yaml` return the detailed API result directly. The shared table renderer now aligns by display width, so mixed Chinese/English content stays aligned.

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |
| `Name` | Instance name |
| `Status` | Status |
| `Region` | Region |
| `Project` | Project |
| `Version` | Version |
| `Zones` | Zone list, shown as comma-separated values |
| `PrivateDomain` | Private domain (shown when present) |
| `PublicDomain` | Public domain (shown when present) |
| `SecurityUser` | Security user |
| `HAEnabled` | Whether HA is enabled |
| `DeleteProtect` | Whether delete protection is enabled |
| `CreateTime` | Create time |

### instance nodes list

List nodes of a dedicated instance.

```bash
milvus-cli instance nodes list --instance-id <instance-id> [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--instance-id` | Yes | Instance ID | - |
| `--name` | No | Filter by NodeID or Role (substring match) | - |
| `--page` | No | Page number (starting from 1) | 1 |
| `--page-size` | No | Number of items per page (1-100) | 20 |

#### Output

**JSON/YAML output uses envelope format:**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 12, "returned": 12 }
}
```

**Table output appends a pagination summary line:**

```
Showing 1-12 of 12 (Page 1)
```

| Field | Description |
|-------|-------------|
| `NodeID` | Node ID |
| `Role` | Role |
| `Status` | Status |

### instance scale

Scale a dedicated Milvus instance.

```bash
milvus-cli instance scale --instance-id <instance-id> [node-spec-flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--instance-id` | Yes | Instance ID | - |
| `--node-cu-type` | No | Node CU type: PERFORMANCE/CAPACITY | PERFORMANCE |
| `--wait` | No | Wait until instance becomes Running | false |
| `--wait-timeout` | No | Maximum time to wait | 30m |

Node spec arguments (at least one group required):

| Argument | Description |
|----------|-------------|
| `--meta-node-count/cpu/mem` | Meta node spec |
| `--proxy-node-count/cpu/mem` | Proxy node spec |
| `--query-node-count/cpu/mem` | Query node spec |
| `--data-node-count/cpu/mem` | Data node spec |
| `--index-node-count/cpu/mem` | Index node spec |
| `--streaming-node-count/cpu/mem` | Streaming node spec |

#### Output

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |
| `OrderNO` | Order number |
| `Status` | Status |
| `TradeConfigID` | Trade config ID |
| `FinalStatus` | Final status (with --wait) |

### instance rename

Rename a dedicated Milvus instance.

```bash
milvus-cli instance rename --instance-id <instance-id> --name <new-name>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--name` | Yes | New instance name |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `Name` | New name |

### instance move-project

Move instance to another project (temporarily unsupported).

```bash
milvus-cli instance move-project --instance-id <instance-id> --project <project>
```

**Note: This command is temporarily unavailable.**

### instance billing prepaid

Switch instance billing to prepaid.

```bash
milvus-cli instance billing prepaid --instance-id <instance-id> --times <times> --auto-renew <true|false>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--times` | Yes | Prepaid duration (months) |
| `--auto-renew` | Yes | Whether auto renews: true/false |

#### Output

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |
| `Times` | Duration |
| `AutoRenew` | Whether auto renews |

### instance billing postpaid

Switch instance billing to postpaid.

```bash
milvus-cli instance billing postpaid --instance-id <instance-id>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |

#### Output

| Field | Description |
|-------|-------------|
| `InstanceID` | Instance ID |

### instance reset-password

Reset instance admin password.

```bash
milvus-cli instance reset-password --instance-id <instance-id> --password <new-password>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--password` | Yes | New password |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |

### instance delete-protect set

Set instance delete protection.

```bash
milvus-cli instance delete-protect set --instance-id <instance-id> --enabled <true|false>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--enabled` | Yes | Whether delete protection is enabled: true/false |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `Enabled` | Whether enabled |

### instance release

Release (delete) a dedicated Milvus instance.

```bash
milvus-cli instance release --instance-id <instance-id> --yes
```

Alias: `instance delete`

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--yes` | Yes | Confirm deletion |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |

## Examples

### Create an instance

```bash
# Simplest way
milvus-cli instance create --name my-instance --admin-password <password> --vpc-id vpc-xxxxxx --wait

# Specify zone and subnet
milvus-cli instance create --name my-instance --admin-password <password> --zone cn-beijing-a --vpc-id vpc-xxxxxx --subnet-id subnet-xxxxxx --wait

# Custom node specs
milvus-cli instance create --name my-instance --admin-password <password> --zone cn-beijing-a --vpc-id vpc-xxxxxx --subnet-id subnet-xxxxxx --query-node-count 2 --query-node-cpu 4 --query-node-mem 16 --proxy-node-count 2 --wait
```

### List instances

```bash
milvus-cli instance list
milvus-cli instance list --page 1 --page-size 20
```

### Describe an instance

```bash
milvus-cli instance describe --instance-id o-xxxxxx
```

### List instance nodes

```bash
milvus-cli instance nodes list --instance-id o-xxxxxx
```

### Scale an instance

```bash
milvus-cli instance scale --instance-id o-xxxxxx --query-node-count 4 --wait
milvus-cli instance scale --instance-id o-xxxxxx --data-node-cpu 8 --data-node-mem 32
```

### Rename an instance

```bash
milvus-cli instance rename --instance-id o-xxxxxx --name new-name
```

### Switch billing mode

```bash
# Prepaid
milvus-cli instance billing prepaid --instance-id o-xxxxxx --times 6 --auto-renew true

# Postpaid
milvus-cli instance billing postpaid --instance-id o-xxxxxx
```

### Reset password

```bash
milvus-cli instance reset-password --instance-id o-xxxxxx --password newPassword123
```

### Set delete protection

```bash
milvus-cli instance delete-protect set --instance-id o-xxxxxx --enabled true
```

### Release an instance

```bash
milvus-cli instance release --instance-id o-xxxxxx --yes
# or
milvus-cli instance delete --instance-id o-xxxxxx --yes
```

## Common Next Steps

- Get instance details: `milvus-cli instance describe --instance-id <instance-id>`
- Check endpoints: `milvus-cli network endpoints --instance-id <instance-id>`
- Configure network: `milvus-cli network private publish --instance-id <instance-id> --enabled true`
