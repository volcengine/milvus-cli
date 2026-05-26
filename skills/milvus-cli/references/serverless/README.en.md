# Serverless Command Overview

> **Feature Scope Note**: Serverless control plane is available, currently supporting `instance` (instance lifecycle management) and `network` (network configuration) commands. Documentation examples use `sample/demo` placeholders for format demonstration purposes only and do not indicate functional limitations. The following Serverless capabilities are not currently included in the command scope: `spec` (specification queries), `collection` (collection management), `observe` (observability), `user-auth` (user authentication), `playground` (interactive console).

---

## Purpose

The `serverless` command group manages Serverless Milvus resources, including instance lifecycle management and network configuration.

Unlike Dedicated instances, Serverless instances use pay-as-you-go billing without requiring upfront node specification planning, making them suitable for workloads with fluctuating demand.

---

## Prerequisites

1. Authentication completed: `milvus-cli auth login --ak <AK> --sk <SK>`
2. Profile created or `--region` parameter specified
3. Permissions to create VPC and subnets (required when creating instances)

---

## Command List

| Command | Description | Documentation |
|---------|-------------|---------------|
| `serverless instance create` | Create a Serverless instance | [instance.en.md](./instance.en.md#create) |
| `serverless instance list` | List Serverless instances | [instance.en.md](./instance.en.md#list) |
| `serverless instance describe` | View instance details | [instance.en.md](./instance.en.md#describe) |
| `serverless instance delete` | Delete an instance | [instance.en.md](./instance.en.md#delete) |
| `serverless instance rename` | Rename an instance | [instance.en.md](./instance.en.md#rename) |
| `serverless instance delete-protect set` | Set delete protection | [instance.en.md](./instance.en.md#delete-protect) |
| `serverless instance reset-password` | Reset instance password | [instance.en.md](./instance.en.md#reset-password) |
| `serverless network private publish` | Private domain publishing | [network.en.md](./network.en.md#private-publish) |
| `serverless network public publish` | Public domain publishing | [network.en.md](./network.en.md#public-publish) |
| `serverless network allow-group public` | Public allowlist configuration | [network.en.md](./network.en.md#allow-group) |
| `serverless network allow-group private` | Private allowlist configuration | [network.en.md](./network.en.md#allow-group) |

---

## Quick Start

### 1. View Help

```bash
milvus-cli serverless --help
milvus-cli serverless instance --help
milvus-cli serverless network --help
```

### 2. Create a Serverless Instance

```bash
milvus-cli serverless instance create \
  --name demo-serverless \
  --version V2_5 \
  --password <password> \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456 \
  --wait
```

### 3. List Instances

```bash
milvus-cli serverless instance list
```

### 4. Configure Public Access

```bash
milvus-cli serverless network public publish \
  --instance-id milvus-demo789 \
  --enabled true \
  --eip-id eip-demo000
```

---

## Differences from Dedicated Instances

| Feature | Serverless | Dedicated |
|---------|------------|-----------|
| Billing Mode | Pay-as-you-go | Subscription / Pay-as-you-go |
| Resource Planning | Auto-scaling | Requires upfront specification selection |
| Use Cases | Variable workloads, testing | Production, stable workloads |
| Network Configuration | Private/Public + Allowlist | Private/Public + Allowlist |

---

## Common Next Steps

- [View instance management details](./instance.en.md)
- [Configure network access](./network.en.md)
- [Learn about data plane operations](../data/connection.en.md)
- [Return to command overview](../README.en.md)

---

## Related Documentation

- [中文文档](./README.md)
- [instance command details](./instance.en.md)
- [network command details](./network.en.md)
