# network

管理专有网络设置。

## 用途

查看与管理实例域名（私网/公网）与白名单组。

## 前置条件

- 确保已设置 `--region`（来自 flags 或当前 profile）
- 多数子命令需要 `--instance-id`

## 命令

### network endpoints

列出实例网络域名。

```bash
milvus-cli network endpoints --instance-id <instance-id>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Type` | 类型（private/public） |
| `Domain` | 域名 |
| `Published` | 是否已发布 |

### network private publish

启用/禁用私网域名。

```bash
milvus-cli network private publish --instance-id <instance-id> --enabled <true|false>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--enabled` | 是 | 是否启用：true/false |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `Enabled` | 是否启用 |

### network public publish

启用/禁用公网域名。

```bash
milvus-cli network public publish --instance-id <instance-id> --enabled <true|false> [--eip-id <eip-id>]
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--enabled` | 是 | 是否启用：true/false |
| `--eip-id` | 否* | EIP ID（启用时为必填） |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `Enabled` | 是否启用 |
| `EIPID` | EIP ID |

### network allow-group public

配置公网域名白名单组。

```bash
milvus-cli network allow-group public --instance-id <instance-id> --group-name <name> --cidr <cidr1> --cidr <cidr2>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--group-name` | 否 | 白名单组名称 | default |
| `--cidr` | 是 | CIDR（可重复） |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `GroupName` | 组名称 |
| `CIDRs` | CIDR 列表 |

### network allow-group private

配置私网域名白名单组。

```bash
milvus-cli network allow-group private --instance-id <instance-id> --group-name <name> --cidr <cidr1> --cidr <cidr2>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--group-name` | 否 | 白名单组名称 | default |
| `--cidr` | 是 | CIDR（可重复） |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `GroupName` | 组名称 |
| `CIDRs` | CIDR 列表 |

## 示例

### 查看域名

```bash
milvus-cli network endpoints --instance-id o-xxxxxx
```

### 启用私网域名

```bash
milvus-cli network private publish --instance-id o-xxxxxx --enabled true
```

### 禁用私网域名

```bash
milvus-cli network private publish --instance-id o-xxxxxx --enabled false
```

### 启用公网域名

```bash
milvus-cli network public publish --instance-id o-xxxxxx --enabled true --eip-id eip-xxxxxx
```

### 禁用公网域名

```bash
milvus-cli network public publish --instance-id o-xxxxxx --enabled false
```

### 配置公网白名单

```bash
milvus-cli network allow-group public --instance-id o-xxxxxx --group-name my-group --cidr 10.0.0.0/8 --cidr 192.168.0.0/16
```

### 配置私网白名单

```bash
milvus-cli network allow-group private --instance-id o-xxxxxx --group-name default --cidr 172.16.0.0/12
```

## 常见下一步

- 查看实例详情：`milvus-cli instance describe --instance-id <instance-id>`
- 使用域名连接 Milvus 实例
