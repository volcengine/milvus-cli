# spec

查看地域/版本/规格信息。

## 用途

在创建/扩缩容实例前，查询可用版本、可用区与规格。

## 前置条件

- 确保已设置 `--region`（来自 flags 或当前 profile）

## 命令

### spec version

列出可用 Milvus 版本。

```bash
milvus-cli spec version
```

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Version` | 版本号 |
| `Current` | 是否为当前默认版本 |

### spec zone

列出可用可用区。

```bash
milvus-cli spec zone
```

#### 输出结果

| 字段 | 说明 |
|------|------|
| `ZoneID` | 可用区 ID |
| `ZoneName` | 可用区名称 |
| `Status` | 状态 |

### spec node

列出可用节点规格。

```bash
milvus-cli spec node [--version <version>]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--version` | 否 | Milvus 实例版本 | V2_5 |
| `--api-version` | 否 | OpenAPI 版本选择器 | - |

`--version` 可使用 `spec version` 返回的版本值，例如 `V2_5`、`V2_6`、`V2_3`；不传时默认 `V2_5`，传 `ALL` 表示返回所有 Milvus 实例版本支持的规格。

#### 输出结果

| 字段 | 说明 |
|------|------|
| `SpecCode` | 规格代码 |
| `Name` | 规格名称 |
| `CPU` | CPU 核数 |
| `MemoryGB` | 内存大小（GB） |

### spec vpc

查看可用 VPC。

```bash
milvus-cli spec vpc [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--name` | 否 | 按 VPC 名称过滤（精确匹配） | - |
| `--page` | 否 | 页码（从 1 开始） | 1 |
| `--page-size` | 否 | 每页条数（1-100） | 20 |

#### 输出结果

**JSON/YAML 输出采用 envelope 格式：**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 5, "returned": 5 }
}
```

| 字段 | 说明 |
|------|------|
| `VpcID` | VPC ID |
| `Name` | VPC 名称 |

### spec subnet

查看可用子网。

```bash
milvus-cli spec subnet --vpc-id <vpc-id> [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--vpc-id` | 是 | VPC ID | - |
| `--name` | 否 | 按子网名称过滤（精确匹配） | - |
| `--page` | 否 | 页码（从 1 开始） | 1 |
| `--page-size` | 否 | 每页条数（1-100） | 20 |

#### 输出结果

**JSON/YAML 输出采用 envelope 格式：**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 3, "returned": 3 }
}
```

| 字段 | 说明 |
|------|------|
| `SubnetID` | 子网 ID |
| `Name` | 子网名称 |
| `ZoneID` | 可用区 ID |

### spec eip

查看可用 EIP。

```bash
milvus-cli spec eip [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--name` | 否 | 按 EIP 名称过滤（子串匹配） | - |
| `--page` | 否 | 页码（从 1 开始） | 1 |
| `--page-size` | 否 | 每页条数（1-100） | 20 |

#### 输出结果

**JSON/YAML 输出采用 envelope 格式：**

```json
{
  "items": [...],
  "pagination": { "page": 1, "pageSize": 20, "total": 2, "returned": 2 }
}
```

| 字段 | 说明 |
|------|------|
| `EIPID` | EIP ID |
| `Address` | IP 地址 |
| `Bandwidth` | 带宽 |

## 示例

### 查看版本列表

```bash
milvus-cli spec version
```

### 查看可用区

```bash
milvus-cli spec zone
```

### 查看节点规格

```bash
milvus-cli spec node
milvus-cli spec node --version V2_5
milvus-cli spec node --version ALL
```

### 查看 VPC 和子网

```bash
milvus-cli spec vpc
milvus-cli spec vpc --name my-vpc
milvus-cli spec vpc --page 1 --page-size 10
milvus-cli spec subnet --vpc-id vpc-xxxxxx
milvus-cli spec subnet --vpc-id vpc-xxxxxx --name my-subnet
```

### 查看 EIP

```bash
milvus-cli spec eip
milvus-cli spec eip --name my-eip
milvus-cli spec eip --page 1 --page-size 10
```

## 常见下一步

- 结合结果组装 `milvus-cli instance create` 的 `--component-spec`
- 创建实例：`milvus-cli instance create --name my-instance ...`
