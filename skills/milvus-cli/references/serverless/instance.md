# serverless instance

> **功能范围提示**：Serverless `instance` 命令已可用。文档示例使用 `sample/demo` 占位符仅为格式演示，请替换为实际值后使用。

---

## 用途

管理 Serverless Milvus 实例，包括创建、查询、删除、重命名、设置删除保护和重置密码等操作。

---

## 前置条件

1. 已完成认证：`milvus-cli auth login --ak <AK> --sk <SK>`
2. 已创建 profile 或指定 `--region` 参数
3. 创建实例时需要提供已存在的 VPC ID 和子网 ID

---

## 命令

### create

创建 Serverless Milvus 实例。

```bash
milvus-cli serverless instance create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--name` | 是 | 实例名称 |
| `--version` | 是 | 实例版本，如 `V2_5` |
| `--password` | 是 | 实例密码 |
| `--vpc-id` | 是 | VPC ID |
| `--subnet-id` | 是 | 子网 ID |
| `--delete-protect-enabled` | 否 | 是否开启删除保护，默认 `false` |
| `--wait` | 否 | 等待实例进入 Running 状态 |
| `--wait-timeout` | 否 | 等待超时时间，默认 `30m` |

#### 输出结果

**table 格式：**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| InstanceID | milvus-demo123   |
| OrderNO    | ORDER-demo456    |
| OrderID    | 1234567890       |
| Status     | Running          |  # 仅当使用 --wait 时显示
+------------+------------------+
```

**json 格式：**

```json
{
  "instanceId": "milvus-demo123",
  "orderNo": "ORDER-demo456",
  "orderId": "1234567890",
  "status": "Running"
}
```

#### 示例

```bash
# 基础创建
milvus-cli serverless instance create \
  --name demo-instance \
  --version V2_5 \
  --password MyPassword123 \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456

# 带删除保护的创建
milvus-cli serverless instance create \
  --name protected-instance \
  --version V2_5 \
  --password MyPassword123 \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456 \
  --delete-protect-enabled

# 创建并等待就绪
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

列出当前 region 和 project 下的所有 Serverless 实例。

```bash
milvus-cli serverless instance list [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--name` | 否 | 按实例名称过滤（子串匹配） | - |
| `--page` | 否 | 页码（从 1 开始） | 1 |
| `--page-size` | 否 | 每页条数（1-100） | 20 |

#### 输出结果

**JSON/YAML 输出采用 envelope 格式：**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 10, "returned": 10 }
}
```

**table 格式：**

```
+--------------+---------------+---------+----------+----------+
| InstanceID   | Name          | Status  | Version  | Project  |
+--------------+---------------+---------+----------+----------+
| milvus-xxx1  | demo-instance | Running | V2_5     | default  |
| milvus-xxx2  | test-instance | Running | V2_5     | default  |
+--------------+---------------+---------+----------+----------+
Showing 1-2 of 2 (Page 1)
```

#### 示例

```bash
milvus-cli serverless instance list
milvus-cli serverless instance list --output json
milvus-cli serverless instance list --name demo --page 1 --page-size 10
```

---

### describe

查看指定 Serverless 实例的详细信息。

```bash
milvus-cli serverless instance describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |

#### 输出结果

**table 格式：**

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

#### 示例

```bash
milvus-cli serverless instance describe --instance-id milvus-demo123
```

---

### delete

删除（释放）Serverless 实例。**此操作不可逆。**

```bash
milvus-cli serverless instance delete [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--yes` | 是 | 确认删除（安全要求） |

#### 输出结果

**table 格式：**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Releasing        |
| InstanceID | milvus-demo123   |
+------------+------------------+
```

#### 示例

```bash
milvus-cli serverless instance delete --instance-id milvus-demo123 --yes
```

---

### rename

重命名 Serverless 实例。

```bash
milvus-cli serverless instance rename [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--name` | 是 | 新实例名称 |

#### 输出结果

**table 格式：**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
| Name       | new-name         |
+------------+------------------+
```

#### 示例

```bash
milvus-cli serverless instance rename \
  --instance-id milvus-demo123 \
  --name new-instance-name
```

---

### delete-protect set

启用或禁用实例的删除保护。

```bash
milvus-cli serverless instance delete-protect set [flags]
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
# 启用删除保护
milvus-cli serverless instance delete-protect set \
  --instance-id milvus-demo123 \
  --enabled true

# 禁用删除保护
milvus-cli serverless instance delete-protect set \
  --instance-id milvus-demo123 \
  --enabled false
```

---

### reset-password

重置 Serverless 实例的密码。

```bash
milvus-cli serverless instance reset-password [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `--instance-id` | 是 | 实例 ID |
| `--password` | 是 | 新密码 |

#### 输出结果

**table 格式：**

```
+------------+------------------+
| Field      | Value            |
+------------+------------------+
| Status     | Success          |
| InstanceID | milvus-demo123   |
+------------+------------------+
```

#### 示例

```bash
milvus-cli serverless instance reset-password \
  --instance-id milvus-demo123 \
  --password NewSecurePassword456
```

---

## 常见下一步

- [配置网络访问](./network.md)
- [查看 Serverless 概览](./README.md)
- [返回命令总览](../README.md)

---

## 相关文档

- [English Documentation](./instance.en.md)
- [network 命令详解](./network.md)
- [Serverless 概览](./README.md)
