# serverless network

> **功能范围提示**：Serverless `network` 命令已可用。文档示例使用 `sample/demo` 占位符仅为格式演示，请替换为实际值后使用。

---

## 用途

管理 Serverless Milvus 实例的网络配置，包括私网/公网域名发布和白名单组设置。

---

## 前置条件

1. 已完成认证：`milvus-cli auth login --ak <AK> --sk <SK>`
2. 已创建 profile 或指定 `--region` 参数
3. 已存在 Serverless 实例（需要 `--instance-id`）
4. 启用公网访问时需要已存在的 EIP ID

---

## 命令

### private publish

启用或禁用私网域名发布。

```bash
milvus-cli serverless network private publish [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--enabled` | 是 | 是否启用：`true` 或 `false` |

#### 输出结果

**table 格式：**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
| Enabled    | true             |
+------------+------------------+
```

#### 示例

```bash
# 启用私网域名
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# 禁用私网域名
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### public publish

启用或禁用公网域名发布。

```bash
milvus-cli serverless network public publish [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--enabled` | 是 | 是否启用：`true` 或 `false` |
| `--eip-id` | 条件 | 启用公网时需要的 EIP ID |

#### 输出结果

**table 格式：**

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

#### 示例

```bash
# 启用公网域名（需要 EIP）
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled true \
  --eip-id eip-demo456

# 禁用公网域名
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### allow-group public

配置公网访问的白名单组。

```bash
milvus-cli serverless network allow-group public [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--group-name` | 否 | 白名单组名称，默认 `default` |
| `--cidr` | 是 | CIDR 列表，可多次指定 |

#### 输出结果

**table 格式：**

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

#### 示例

```bash
# 配置单个 CIDR
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name office \
  --cidr 203.0.113.0/24

# 配置多个 CIDR
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name vpn \
  --cidr 192.168.1.0/24 \
  --cidr 10.0.0.0/8 \
  --cidr 172.16.0.0/12
```

---

### allow-group private

配置私网访问的白名单组。

```bash
milvus-cli serverless network allow-group private [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--group-name` | 否 | 白名单组名称，默认 `default` |
| `--cidr` | 是 | CIDR 列表，可多次指定 |

#### 输出结果

**table 格式：**

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

#### 示例

```bash
# 配置私网白名单
milvus-cli serverless network allow-group private \
  --instance-id milvus-demo123 \
  --group-name intranet \
  --cidr 192.168.0.0/16 \
  --cidr 10.0.0.0/8
```

---

## 网络配置流程

### 场景 1：仅私网访问

```bash
# 1. 启用私网域名
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# 2. 配置私网白名单
milvus-cli serverless network allow-group private \
  --instance-id milvus-demo123 \
  --cidr 192.168.0.0/16
```

### 场景 2：私网 + 公网访问

```bash
# 1. 启用私网域名
milvus-cli serverless network private publish \
  --instance-id milvus-demo123 \
  --enabled true

# 2. 启用公网域名
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled true \
  --eip-id eip-demo456

# 3. 配置公网白名单（限制访问来源）
milvus-cli serverless network allow-group public \
  --instance-id milvus-demo123 \
  --group-name office \
  --cidr 203.0.113.0/24
```

### 场景 3：关闭公网访问

```bash
milvus-cli serverless network public publish \
  --instance-id milvus-demo123 \
  --enabled false
```

---

## 安全建议

1. **私网优先**：生产环境建议优先使用私网访问，公网访问仅用于开发和测试
2. **白名单限制**：启用公网后务必配置白名单，限制可访问的 IP 范围
3. **最小权限**：白名单组按用途划分（如 office、vpn、dev），避免使用 `0.0.0.0/0`
4. **定期审计**：定期检查白名单配置，移除不再需要的 IP 段

---

## 常见下一步

- [管理 Serverless 实例](./instance.md)
- [查看 Serverless 概览](./README.md)
- [返回命令总览](../README.md)

---

## 相关文档

- [English Documentation](./network.en.md)
- [instance 命令详解](./instance.md)
- [Serverless 概览](./README.md)
