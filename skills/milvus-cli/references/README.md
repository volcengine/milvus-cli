# 命令总览

本文档提供当前 `milvus-cli` 的命令树总览、全局参数约定与典型调用方式。更细的子命令说明请直接使用：

```bash
milvus-cli <command> --help
```

---

## 文档索引结构

```
skills/milvus-cli/references/
├── README.md              # 本文件（中文总索引）
├── README.en.md           # 英文总索引
├── control/               # 控制面命令文档
├── data/                  # 数据面命令文档
└── serverless/            # Serverless 命令文档
    ├── README.md          # Serverless 概览（中文）
    ├── README.en.md       # Serverless 概览（英文）
    ├── instance.md        # 实例管理（中文）
    ├── instance.en.md     # 实例管理（英文）
    ├── network.md         # 网络管理（中文）
    └── network.en.md      # 网络管理（英文）
```

---

## 顶层命令组

### 通用与控制面 (Control)

| 命令 | 说明 | 文档 |
|------|------|------|
| `auth` | 登录、登出、查看鉴权状态 | [control/auth.md](./control/auth.md) |
| `profile` | 管理 site/region/project/language 上下文 | [control/profile.md](./control/profile.md) |
| `spec` | 查看版本、地域、规格、价格、VPC/子网/EIP 信息 | [control/spec.md](./control/spec.md) |
| `instance` | 管理 dedicated 实例 | [control/instance.md](./control/instance.md) |
| `network` | 管理 dedicated endpoint 发布与白名单 | [control/network.md](./control/network.md) |
| `version` | 查看 CLI 构建信息 | [control/version.md](./control/version.md) |
| `completion` | 生成 bash/zsh/fish/powershell 自动补全脚本 | [control/completion.md](./control/completion.md) |

### 数据面 (Data)

| 命令 | 说明 | 文档 |
|------|------|------|
| `data connection` | 管理数据面连接配置 | [data/connection.md](./data/connection.md) |
| `data database` | 管理数据库 | [data/database.md](./data/database.md) |
| `data collection` | 管理集合 | [data/collection.md](./data/collection.md) |
| `data partition` | 管理分区 | [data/partition.md](./data/partition.md) |
| `data alias` | 管理别名 | [data/alias.md](./data/alias.md) |
| `data index` | 管理索引 | [data/index.md](./data/index.md) |
| `data vector` | 向量搜索与操作 | [data/vector.md](./data/vector.md) |
| `data user` | 管理用户 | [data/user.md](./data/user.md) |
| `data role` | 管理角色 | [data/role.md](./data/role.md) |

### Serverless 控制面

| 命令 | 说明 | 文档 |
|------|------|------|
| `serverless instance` | 管理 Serverless 实例 | [serverless/instance.md](./serverless/instance.md) |
| `serverless network` | 管理 Serverless 网络配置 | [serverless/network.md](./serverless/network.md) |

> **注意**：Serverless 控制面已可用，当前覆盖 `instance` 和 `network` 命令。文档示例使用 `sample/demo` 占位符仅作为格式演示，不代表功能受限。其他 Serverless 能力（如 `spec`、`collection`、`observe`、`user-auth`、`playground`）尚未纳入当前命令范围。详见 [serverless/README.md](./serverless/README.md)。

---

## 全局参数

常用全局参数如下：

| 参数 | 说明 |
|------|------|
| `--output table|json|yaml` | 输出格式 |
| `--profile` | 使用的 profile 名称 |
| `--site` | 站点（volcengine/byteplus） |
| `--region` | 地域 |
| `--project` | 项目 |
| `--language` | 语言（CN/EN） |
| `--ak` | Access Key ID |
| `--sk` | Secret Access Key |
| `--non-interactive` | 非交互模式 |
| `--debug` | 开启调试输出 |
| `--yes` | 确认危险操作 |

---

## 典型操作流程

### Dedicated 控制面

```bash
milvus-cli auth login --ak <AK> --sk <SK> --name volcengine
milvus-cli profile create --name default --site volcengine --region cn-beijing --project default --credential volcengine --language CN
milvus-cli spec node --version V2_5
milvus-cli instance list --output json
milvus-cli network endpoints --instance-id <instance-id>
```

### 数据面

```bash
milvus-cli data connection create --name local --address localhost:19530 --auth-method token --token <TOKEN>
milvus-cli data database list
milvus-cli data collection create --name quickstart --dim 128
milvus-cli data vector search --collection quickstart --vector '[0.1,0.2]' --topk 10 --output json --file ./result.json
```

### Serverless

```bash
milvus-cli serverless instance list
milvus-cli serverless network public publish --instance-id <instance-id> --enabled true --eip-id <eip-id>
```

---

## 输出约定

- 默认 `table` 输出带表格边框
- `json` / `yaml` 适合自动化消费
- `version --output json` 可直接作为发布验收或故障排查入口

---

## 自动补全

```bash
milvus-cli completion bash
milvus-cli completion zsh
milvus-cli completion fish
milvus-cli completion powershell
```

发布产物中会随二进制一起包含对应 shell 的 completion 文件。

---

## 相关文档

- [English Documentation](./README.en.md)
