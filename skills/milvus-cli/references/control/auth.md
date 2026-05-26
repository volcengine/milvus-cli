# auth

管理 milvus-cli 使用的 AK/SK 凭证。

## 用途

`auth` 命令用于管理 Volcengine/BytePlus 的访问凭证。在调用控制面 API 之前，需要先保存 AK/SK 凭证。

## 前置条件

- 拥有 Volcengine 或 BytePlus 的 AK/SK 凭证
- 凭证可以通过以下方式提供：
  - 命令行参数：`--ak`, `--sk`
  - 环境变量：`VOLCSTACK_ACCESS_KEY_ID`, `VOLCSTACK_SECRET_ACCESS_KEY`

## 命令

### auth login

保存 AK/SK 凭证到本地凭证库。

```bash
milvus-cli auth login --name <name> --ak <AK> --sk <SK>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--name` | 是 | 凭证名称，用于区分不同的凭证 |
| `--ak` | 是 | Access Key ID |
| `--sk` | 是 | Secret Access Key |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 凭证名称 |
| `Site` | 站点 |
| `AccessKeyID` | Access Key ID（部分显示） |
| `CurrentProfile` | 当前 profile |

### auth status

查看当前（或指定）凭证状态。

```bash
milvus-cli auth status [--name <name>]
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--name` | 否 | 凭证名称；未指定时跟随当前 profile 的凭证引用 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | 凭证名称 |
| `Site` | 站点 |
| `AccessKeyID` | Access Key ID |
| `CurrentProfile` | 当前 profile |

### auth logout

从本地凭证库删除一个凭证。

```bash
milvus-cli auth logout [--name <name>]
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `--name` | 否 | 凭证名称；未指定时跟随当前 profile 的凭证引用 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | logged out |
| `Name` | 凭证名称 |
| `CurrentProfile` | 当前 profile |

## 示例

### 登录并保存凭证

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
```

### 查看凭证状态

```bash
milvus-cli auth status
milvus-cli auth status --name volcengine
```

### 删除凭证

```bash
milvus-cli auth logout --name volcengine
```

## 常见下一步

- 创建引用该凭证的 profile：`milvus-cli profile create --credential <name>`
- 查看当前 profile：`milvus-cli profile current`
- 切换到指定 profile：`milvus-cli profile use <name>`
