# serverless network

> **Feature Scope Note**: Serverless `network` commands are available. Documentation examples use `sample/demo` placeholders for format demonstration purposes only. Please replace with actual values when using.

---

## Purpose

Manage network configuration for Serverless Milvus instances, including private/public domain publishing and allowlist group settings.

---

## Prerequisites

1. Authentication completed: `milvus-cli auth login --ak <AK> --sk <SK>`
2. Profile created or `--region` parameter specified
3. Existing Serverless instance (requires `--instance-id`)
4. Existing EIP ID required when enabling public access

---

## Commands

### private publish

Enable or disable private domain publishing.

```bash
milvus-cli serverless network private publish [flags]
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
# Enable private domain
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# Disable private domain
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### public publish

Enable or disable public domain publishing.

```bash
milvus-cli serverless network public publish [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--enabled` | Yes | Whether to enable: `true` or `false` |
| `--eip-id` | Conditional | EIP ID required when enabling public access |

#### Output

**table format:**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
| Enabled    | true             |
| EipID      | eip-demo456      |
+------------+------------------+
```

#### Examples

```bash
# Enable public domain (requires EIP)
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled true \
  --eip-id eip-demo456

# Disable public domain
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### allow-group public

Configure allowlist groups for public access.

```bash
milvus-cli serverless network allow-group public [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--group-name` | No | Allowlist group name, default `default` |
| `--cidr` | Yes | CIDR list, can be specified multiple times |

#### Output

**table format:**

```
+------------+--------------------------------+
| Field      | Value                          |
+------------+--------------------------------+
| Status     | Success                        |
| InstanceID | milvus-demo123                 |
| GroupName  | default                        |
| CIDRs      | 192.168.1.0/24,10.0.0.0/8      |
+------------+--------------------------------+
```

#### Examples

```bash
# Configure single CIDR
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name office \
  --cidr 203.0.113.0/24

# Configure multiple CIDRs
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name vpn \
  --cidr 192.168.1.0/24 \
  --cidr 10.0.0.0/8 \
  --cidr 172.16.0.0/12
```

---

### allow-group private

Configure allowlist groups for private access.

```bash
milvus-cli serverless network allow-group private [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--instance-id` | Yes | Instance ID |
| `--group-name` | No | Allowlist group name, default `default` |
| `--cidr` | Yes | CIDR list, can be specified multiple times |

#### Output

**table format:**

```
+------------+--------------------------------+
| Field      | Value                          |
+------------+--------------------------------+
| Status     | Success                        |
| InstanceID | milvus-demo123                 |
| GroupName  | default                        |
| CIDRs      | 192.168.1.0/24,10.0.0.0/8      |
+------------+--------------------------------+
```

#### Examples

```bash
# Configure private allowlist
milvus-cli serverless network allow-group private \
  --instance-id milvus-demo123 \
  --group-name intranet \
  --cidr 192.168.0.0/16 \
  --cidr 10.0.0.0/8
```

---

## Network Configuration Workflows

### Scenario 1: Private Access Only

```bash
# 1. Enable private domain
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# 2. Configure private allowlist
milvus-cli serverless network allow-group private \
  --instance-id milvus-demo123 \
  --cidr 192.168.0.0/16
```

### Scenario 2: Private + Public Access

```bash
# 1. Enable private domain
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# 2. Enable public domain
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled true \
  --eip-id eip-demo456

# 3. Configure public allowlist (restrict access sources)
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name office \
  --cidr 203.0.113.0/24
```

### Scenario 3: Disable Public Access

```bash
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

## Security Recommendations

1. **Private First**: For production environments, prioritize private network access; use public access only for development and testing
2. **Allowlist Restriction**: After enabling public access, configure allowlists to restrict accessible IP ranges
3. **Least Privilege**: Organize allowlist groups by purpose (e.g., office, vpn, dev), avoid using `0.0.0.0/0`
4. **Regular Audits**: Periodically review allowlist configurations and remove unnecessary IP ranges

---

## Common Next Steps

- [Manage Serverless instances](./instance.en.md)
- [View Serverless overview](./README.en.md)
- [Return to command overview](../README.en.md)

---

## Related Documentation

- [中文文档](./network.md)
- [instance command details](./instance.en.md)
- [Serverless overview](./README.en.md)
