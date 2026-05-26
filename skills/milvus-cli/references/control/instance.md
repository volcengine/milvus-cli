# instance

管理专有 Milvus 实例。

## 用途

创建、查询与管理专有 Milvus 实例。

## 前置条件

- 建议先完成鉴权与上下文：`milvus-cli auth login` + `milvus-cli profile create`
- 确保已设置 `--region`（来自 flags 或当前 profile）

## 命令

### instance create

创建专有 Milvus 实例。

```bash
milvus-cli instance create --name <name> --admin-password <password> --vpc-id <vpc-id> [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--name` | 是 | 实例名称 | - |
| `--admin-password` | 是 | 管理员密码 | - |
| `--vpc-id` | 是 | VPC ID | - |
| `--version` | 否 | Milvus 版本 | V2_6 |
| `--zone` | 否 | 可用区（可重复） | 自动选择 |
| `--subnet-id` | 否 | 子网 ID | 自动选择 |
| `--ha-enabled` | 否 | 是否启用高可用 | true |
| `--node-cu-type` | 否 | 节点规格类型：PERFORMANCE/CAPACITY | PERFORMANCE |
| `--charge-type` | 否 | 计费类型：POST/PRE | POST |
| `--delete-protect-enabled` | 否 | 创建时开启删除保护 | false |
| `--wait` | 否 | 等待实例进入 Running | false |
| `--timeout` | 否 | 等待 Running 的最大时长 | 30m |
| `--poll-interval` | 否 | 轮询间隔 | 10s |

节点规格参数（可重复）：

| 参数 | 说明 |
|------|------|
| `--meta-node-count/cpu/mem` | Meta 节点规格 |
| `--proxy-node-count/cpu/mem` | Proxy 节点规格 |
| `--query-node-count/cpu/mem` | Query 节点规格 |
| `--data-node-count/cpu/mem` | Data 节点规格 |
| `--index-node-count/cpu/mem` | Index 节点规格 |
| `--streaming-node-count/cpu/mem` | Streaming 节点规格 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |
| `OrderNO` | 订单号 |
| `Status` | 状态 |
| `OrderID` | 订单 ID（如适用） |
| `TradeConfigID` | 交易配置 ID（如适用） |
| `FinalStatus` | 最终状态（使用 --wait 时） |

### instance list

列出专有 Milvus 实例。

```bash
milvus-cli instance list [flags]
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
  "pagination": { "page": 1, "pageSize": 20, "total": 45, "returned": 20 }
}
```

**Table 输出末尾追加分页摘要行：**

```
Showing 1-20 of 45 (Page 1)
```

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |
| `Name` | 实例名称 |
| `Status` | 状态 |
| `Region` | 地域 |
| `Project` | 项目 |

### instance describe

查看专有 Milvus 实例详情。

```bash
milvus-cli instance describe --instance-id <instance-id>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |

#### 输出结果

`table` 格式展示常用摘要字段；`json/yaml` 直接返回 API 详细结果。公共表格渲染已按显示宽度对齐，中英文混排场景可正常对齐。

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |
| `Name` | 实例名称 |
| `Status` | 状态 |
| `Region` | 地域 |
| `Project` | 项目 |
| `Version` | 版本 |
| `Zones` | 可用区列表，逗号拼接展示 |
| `PrivateDomain` | 私网域名（存在时显示） |
| `PublicDomain` | 公网域名（存在时显示） |
| `SecurityUser` | 安全用户 |
| `HAEnabled` | 是否开启高可用 |
| `DeleteProtect` | 是否开启删除保护 |
| `CreateTime` | 创建时间 |

### instance nodes list

列出专有实例节点。

```bash
milvus-cli instance nodes list --instance-id <instance-id> [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--instance-id` | 是 | 实例 ID | - |
| `--name` | 否 | 按 NodeID 或 Role 过滤（子串匹配） | - |
| `--page` | 否 | 页码（从 1 开始） | 1 |
| `--page-size` | 否 | 每页条数（1-100） | 20 |

#### 输出结果

**JSON/YAML 输出采用 envelope 格式：**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 12, "returned": 12 }
}
```

**Table 输出末尾追加分页摘要行：**

```
Showing 1-12 of 12 (Page 1)
```

| 字段 | 说明 |
|------|------|
| `NodeID` | 节点 ID |
| `Role` | 角色 |
| `Status` | 状态 |

### instance scale

扩容/缩容专有 Milvus 实例。

```bash
milvus-cli instance scale --instance-id <instance-id> [node-spec-flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--instance-id` | 是 | 实例 ID | - |
| `--node-cu-type` | 否 | 节点规格类型：PERFORMANCE/CAPACITY | PERFORMANCE |
| `--wait` | 否 | 等待实例进入 Running | false |
| `--wait-timeout` | 否 | 等待 Running 的最大时长 | 30m |

节点规格参数（至少指定一组）：

| 参数 | 说明 |
|------|------|
| `--meta-node-count/cpu/mem` | Meta 节点规格 |
| `--proxy-node-count/cpu/mem` | Proxy 节点规格 |
| `--query-node-count/cpu/mem` | Query 节点规格 |
| `--data-node-count/cpu/mem` | Data 节点规格 |
| `--index-node-count/cpu/mem` | Index 节点规格 |
| `--streaming-node-count/cpu/mem` | Streaming 节点规格 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |
| `OrderNO` | 订单号 |
| `Status` | 状态 |
| `TradeConfigID` | 交易配置 ID |
| `FinalStatus` | 最终状态（使用 --wait 时） |

### instance rename

修改专有 Milvus 实例名称。

```bash
milvus-cli instance rename --instance-id <instance-id> --name <new-name>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--name` | 是 | 新实例名称 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `Name` | 新名称 |

### instance move-project

将实例移动到另一个项目（暂不支持）。

```bash
milvus-cli instance move-project --instance-id <instance-id> --project <project>
```

**注意：此命令暂时不可用。**

### instance billing prepaid

切换实例为包年包月。

```bash
milvus-cli instance billing prepaid --instance-id <instance-id> --times <times> --auto-renew <true|false>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--times` | 是 | 购买时长（月） |
| `--auto-renew` | 是 | 是否自动续费：true/false |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |
| `Times` | 购买时长 |
| `AutoRenew` | 是否自动续费 |

### instance billing postpaid

切换实例为按量计费。

```bash
milvus-cli instance billing postpaid --instance-id <instance-id>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `InstanceID` | 实例 ID |

### instance reset-password

重置实例管理员密码。

```bash
milvus-cli instance reset-password --instance-id <instance-id> --password <new-password>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--password` | 是 | 新密码 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |

### instance delete-protect set

设置实例删除保护。

```bash
milvus-cli instance delete-protect set --instance-id <instance-id> --enabled <true|false>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--enabled` | 是 | 是否启用删除保护：true/false |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |
| `Enabled` | 是否启用 |

### instance release

释放（删除）专有 Milvus 实例。

```bash
milvus-cli instance release --instance-id <instance-id> --yes
```

别名：`instance delete`

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--instance-id` | 是 | 实例 ID |
| `--yes` | 是 | 确认删除 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | 状态 |
| `InstanceID` | 实例 ID |

## 示例

### 创建实例

```bash
# 最简单的方式
milvus-cli instance create --name my-instance --admin-password <password> --vpc-id vpc-xxxxxx --wait

# 指定可用区和子网
milvus-cli instance create --name my-instance --admin-password <password> --zone cn-beijing-a --vpc-id vpc-xxxxxx --subnet-id subnet-xxxxxx --wait

# 自定义节点规格
milvus-cli instance create --name my-instance --admin-password <password> --zone cn-beijing-a --vpc-id vpc-xxxxxx --subnet-id subnet-xxxxxx --query-node-count 2 --query-node-cpu 4 --query-node-mem 16 --proxy-node-count 2 --wait
```

### 查看实例列表

```bash
milvus-cli instance list
milvus-cli instance list --page 1 --page-size 20
```

### 查看实例详情

```bash
milvus-cli instance describe --instance-id o-xxxxxx
```

### 查看实例节点

```bash
milvus-cli instance nodes list --instance-id o-xxxxxx
```

### 扩缩容实例

```bash
milvus-cli instance scale --instance-id o-xxxxxx --query-node-count 4 --wait
milvus-cli instance scale --instance-id o-xxxxxx --data-node-cpu 8 --data-node-mem 32
```

### 修改实例名称

```bash
milvus-cli instance rename --instance-id o-xxxxxx --name new-name
```

### 切换计费方式

```bash
# 包年包月
milvus-cli instance billing prepaid --instance-id o-xxxxxx --times 6 --auto-renew true

# 按量计费
milvus-cli instance billing postpaid --instance-id o-xxxxxx
```

### 重置密码

```bash
milvus-cli instance reset-password --instance-id o-xxxxxx --password newPassword123
```

### 设置删除保护

```bash
milvus-cli instance delete-protect set --instance-id o-xxxxxx --enabled true
```

### 删除实例

```bash
milvus-cli instance release --instance-id o-xxxxxx --yes
# 或
milvus-cli instance delete --instance-id o-xxxxxx --yes
```

## 常见下一步

- 查看实例详情：`milvus-cli instance describe --instance-id <instance-id>`
- 查看域名：`milvus-cli network endpoints --instance-id <instance-id>`
- 配置网络：`milvus-cli network private publish --instance-id <instance-id> --enabled true`
