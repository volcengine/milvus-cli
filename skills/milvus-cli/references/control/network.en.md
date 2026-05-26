# network

Manage dedicated network settings.

## Purpose

Inspect and manage instance endpoints (private/public) and allow groups.

## Prerequisites

- Ensure `--region` is set (via flags or the current profile)
- Most commands require `--instance-id`

## Commands

### network endpoints

List instance network endpoints.

```bash
milvus-cli network endpoints --instance-id <instance-id>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |

#### Output

| Field | Description |
|-------|-------------|
| `Type` | Type (private/public) |
| `Domain` | Domain |
| `Published` | Whether published |

### network private publish

Enable or disable private domain publishing.

```bash
milvus-cli network private publish --instance-id <instance-id> --enabled <true|false>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--enabled` | Yes | Whether enabled: true/false |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `Enabled` | Whether enabled |

### network public publish

Enable or disable public domain publishing.

```bash
milvus-cli network public publish --instance-id <instance-id> --enabled <true|false> [--eip-id <eip-id>]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--enabled` | Yes | Whether enabled: true/false |
| `--eip-id` | No* | EIP ID (required when enabling) |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `Enabled` | Whether enabled |
| `EIPID` | EIP ID |

### network allow-group public

Configure public endpoint allow groups.

```bash
milvus-cli network allow-group public --instance-id <instance-id> --group-name <name> --cidr <cidr1> --cidr <cidr2>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--group-name` | No | Allow group name | default |
| `--cidr` | Yes | CIDR (repeatable) |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `GroupName` | Group name |
| `CIDRs` | CIDR list |

### network allow-group private

Configure private endpoint allow groups.

```bash
milvus-cli network allow-group private --instance-id <instance-id> --group-name <name> --cidr <cidr1> --cidr <cidr2>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--group-name` | No | Allow group name | default |
| `--cidr` | Yes | CIDR (repeatable) |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | Status |
| `InstanceID` | Instance ID |
| `GroupName` | Group name |
| `CIDRs` | CIDR list |

## Examples

### View endpoints

```bash
milvus-cli network endpoints --instance-id o-xxxxxx
```

### Enable private domain

```bash
milvus-cli network private publish --instance-id o-xxxxxx --enabled true
```

### Disable private domain

```bash
milvus-cli network private publish --instance-id o-xxxxxx --enabled false
```

### Enable public domain

```bash
milvus-cli network public publish --instance-id o-xxxxxx --enabled true --eip-id eip-xxxxxx
```

### Disable public domain

```bash
milvus-cli network public publish --instance-id o-xxxxxx --enabled false
```

### Configure public allow group

```bash
milvus-cli network allow-group public --instance-id o-xxxxxx --group-name my-group --cidr 10.0.0.0/8 --cidr 192.168.0.0/16
```

### Configure private allow group

```bash
milvus-cli network allow-group private --instance-id o-xxxxxx --group-name default --cidr 172.16.0.0/12
```

## Common Next Steps

- Get instance details: `milvus-cli instance describe --instance-id <instance-id>`
- Connect to the Milvus instance using the domain
