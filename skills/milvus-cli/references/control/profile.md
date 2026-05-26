# profile

管理 profiles（运行上下文）。

## 用途

`profile` 用于复用运行上下文：env/site/region/project/credential/language。创建 profile 后，无需在每次命令中重复指定这些参数。

## 前置条件

- 需要调用控制面 API 时，请先登录：`milvus-cli auth login`
- 准备好要引用的凭证名称

## 命令

### profile create

创建并激活 profile。

```bash
milvus-cli profile create --name <name> --region <region> [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--name` | 是 | Profile 名称 | - |
| `--region` | 是 | 地域 | - |
| `--env` | 否 | 环境：prod/dev/test | prod |
| `--site` | 否 | 站点：volcengine/byteplus | volcengine |
| `--project` | 否 | 项目 | default |
| `--credential` | 否 | 凭证引用 | 等于 site 名称 |
| `--language` | 否 | 语言：CN/EN | EN |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | Profile 名称 |
| `Env` | 环境 |
| `Site` | 站点 |
| `Region` | 地域 |
| `Project` | 项目 |
| `CredentialRef` | 凭证引用 |
| `Language` | 语言 |

### profile list

列出本地保存的 profiles。

```bash
milvus-cli profile list
```

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | Profile 名称（当前 profile 带 * 标记） |
| `Env` | 环境 |
| `Site` | 站点 |
| `Region` | 地域 |
| `Project` | 项目 |
| `CredentialRef` | 凭证引用 |
| `Language` | 语言 |

### profile current

展示当前 profile（多数命令默认使用的上下文）。

```bash
milvus-cli profile current
```

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | Profile 名称 |
| `Env` | 环境 |
| `Site` | 站点 |
| `Region` | 地域 |
| `Project` | 项目 |
| `CredentialRef` | 凭证引用 |
| `Language` | 语言 |

### profile use

切换当前 profile。

```bash
milvus-cli profile use <name>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `<name>` | 是 | Profile 名称 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | Profile 名称 |
| `Status` | active |

### profile set

更新一个已存在的 profile 字段。

```bash
milvus-cli profile set <name> [flags]
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `<name>` | 是 | Profile 名称 |
| `--env` | 否 | 环境 |
| `--site` | 否 | 站点 |
| `--region` | 否 | 地域 |
| `--project` | 否 | 项目 |
| `--credential` | 否 | 凭证引用 |
| `--language` | 否 | 语言 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Name` | Profile 名称 |
| `Env` | 环境 |
| `Site` | 站点 |
| `Region` | 地域 |
| `Project` | 项目 |
| `CredentialRef` | 凭证引用 |
| `Language` | 语言 |

### profile delete

从本地删除一个 profile。

```bash
milvus-cli profile delete <name>
```

#### 重要参数

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `<name>` | 是 | Profile 名称 |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Status` | deleted |
| `Name` | Profile 名称 |

## 示例

### 创建 profile

```bash
milvus-cli profile create --name default --region cn-beijing --credential volcengine --language CN
milvus-cli profile create --name prod --region cn-shanghai --project my-project --language EN
```

### 列出 profiles

```bash
milvus-cli profile list
```

### 查看当前 profile

```bash
milvus-cli profile current
```

### 切换 profile

```bash
milvus-cli profile use default
```

### 更新 profile

```bash
milvus-cli profile set default --project new-project
milvus-cli profile set default --language CN
```

### 删除 profile

```bash
milvus-cli profile delete test-profile
```

## 常见下一步

- 查看 spec 信息：`milvus-cli spec version`, `milvus-cli spec node`
- 创建实例：`milvus-cli instance create --name my-instance ...`
- 查看实例列表：`milvus-cli instance list`
