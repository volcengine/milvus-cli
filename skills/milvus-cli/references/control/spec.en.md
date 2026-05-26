# spec

Query region/version/spec information.

## Purpose

Discover versions, zones, and specs needed before creating or scaling an instance.

## Prerequisites

- Ensure `--region` is set (via flags or the current profile)

## Commands

### spec version

List available Milvus versions.

```bash
milvus-cli spec version
```

#### Output

| Field | Description |
|-------|-------------|
| `Version` | Version number |
| `Current` | Whether it's the current default version |

### spec zone

List available zones.

```bash
milvus-cli spec zone
```

#### Output

| Field | Description |
|-------|-------------|
| `ZoneID` | Zone ID |
| `ZoneName` | Zone name |
| `Status` | Status |

### spec node

List available node specs.

```bash
milvus-cli spec node [--version <version>]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--version` | No | Milvus instance version | V2_5 |
| `--api-version` | No | OpenAPI version selector | - |

`--version` can use values returned by `spec version`, such as `V2_5`, `V2_6`, `V2_3`. Defaults to `V2_5` when omitted, use `ALL` to return specs supported by all Milvus instance versions.

#### Output

| Field | Description |
|-------|-------------|
| `SpecCode` | Spec code |
| `Name` | Spec name |
| `CPU` | CPU cores |
| `MemoryGB` | Memory size (GB) |

### spec vpc

List available VPCs.

```bash
milvus-cli spec vpc [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--name` | No | Filter by VPC name (exact match) | - |
| `--page` | No | Page number (starting from 1) | 1 |
| `--page-size` | No | Number of items per page (1-100) | 20 |

#### Output

**JSON/YAML output uses envelope format:**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 5, "returned": 5 }
}
```

| Field | Description |
|-------|-------------|
| `VpcID` | VPC ID |
| `Name` | VPC name |

### spec subnet

List available subnets.

```bash
milvus-cli spec subnet --vpc-id <vpc-id> [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--vpc-id` | Yes | VPC ID | - |
| `--name` | No | Filter by subnet name (exact match) | - |
| `--page` | No | Page number (starting from 1) | 1 |
| `--page-size` | No | Number of items per page (1-100) | 20 |

#### Output

**JSON/YAML output uses envelope format:**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 3, "returned": 3 }
}
```

| Field | Description |
|-------|-------------|
| `SubnetID` | Subnet ID |
| `Name` | Subnet name |
| `ZoneID` | Zone ID |

### spec eip

List available EIPs.

```bash
milvus-cli spec eip [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--name` | No | Filter by EIP name (substring match) | - |
| `--page` | No | Page number (starting from 1) | 1 |
| `--page-size` | No | Number of items per page (1-100) | 20 |

#### Output

**JSON/YAML output uses envelope format:**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 2, "returned": 2 }
}
```

| Field | Description |
|-------|-------------|
| `EIPID` | EIP ID |
| `Address` | IP address |
| `Bandwidth` | Bandwidth |

## Examples

### View version list

```bash
milvus-cli spec version
```

### View available zones

```bash
milvus-cli spec zone
```

### View node specs

```bash
milvus-cli spec node
milvus-cli spec node --version V2_5
milvus-cli spec node --version ALL
```

### View VPCs and subnets

```bash
milvus-cli spec vpc
milvus-cli spec vpc --name my-vpc
milvus-cli spec vpc --page 1 --page-size 10
milvus-cli spec subnet --vpc-id vpc-xxxxxx
milvus-cli spec subnet --vpc-id vpc-xxxxxx --name my-subnet
```

### View EIPs

```bash
milvus-cli spec eip
milvus-cli spec eip --name my-eip
milvus-cli spec eip --page 1 --page-size 10
```

## Common Next Steps

- Use results to build `--component-spec` for `milvus-cli instance create`
- Create an instance: `milvus-cli instance create --name my-instance ...`
