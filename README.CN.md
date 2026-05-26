# milvus-cli

[English](./README.md) | 中文

火山引擎 Milvus 命令行工具，覆盖控制面（Dedicated / Serverless 实例管理）和数据面（数据库、集合、索引、向量、用户与角色）操作。

## 安装

### Shell 脚本（macOS / Linux）

```bash
curl -fsSL https://raw.githubusercontent.com/volcengine/milvus-cli/main/install.sh | sh
```

安装后按照提示将 `~/.milvus-cli/bin` 加入 `PATH`，或在当前 shell 中执行：

```bash
export PATH="$HOME/.milvus-cli/bin:$PATH"
```

### PowerShell（Windows）

```powershell
irm https://raw.githubusercontent.com/volcengine/milvus-cli/main/install.ps1 | iex
```

### npm

```bash
npm install -g @volcengine/milvus-cli
```

### 手动下载

前往 [GitHub Releases](https://github.com/volcengine/milvus-cli/releases) 下载对应平台的预编译二进制归档，解压后将 `milvus-cli` 放到 `PATH` 路径下。

### 验证安装

```bash
milvus-cli version
milvus-cli --help
```

## 支持平台

| 操作系统 | 架构 | 归档格式 |
|---------|------|---------|
| Linux   | amd64, arm64 | tar.gz |
| macOS   | amd64, arm64 | tar.gz |
| Windows | amd64, arm64 | zip    |

## 快速上手

### 1. 创建 Profile

```bash
milvus-cli profile create \
  --name default \
  --site volcengine \
  --region cn-beijing \
  --project default \
  --credential volcengine \
  --language CN
```

### 2. 认证

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
```

### 3. 管理实例

```bash
milvus-cli instance list --output json
milvus-cli instance describe --instance-id <instance-id>
```

### 4. 建立数据面连接

```bash
milvus-cli data connection create \
  --from-instance <instance-id> \
  --password <milvus-password>
```

### 5. 管理数据

```bash
milvus-cli data database list
milvus-cli data collection list
milvus-cli data vector search --collection <name> --vector '[1.0, 2.0, 3.0]' --limit 10
```

## 命令文档

完整命令文档见 [skills/milvus-cli/references/](./skills/milvus-cli/references/README.md)。

| 命令组 | 说明 | 文档 |
|--------|------|------|
| `auth` | 登录、登出、查看鉴权状态 | [control/auth.md](./skills/milvus-cli/references/control/auth.md) |
| `profile` | 管理 site/region/project/language 上下文 | [control/profile.md](./skills/milvus-cli/references/control/profile.md) |
| `spec` | 查看版本、地域、规格、价格、VPC/子网/EIP 信息 | [control/spec.md](./skills/milvus-cli/references/control/spec.md) |
| `instance` | 管理 Dedicated 实例 | [control/instance.md](./skills/milvus-cli/references/control/instance.md) |
| `network` | 管理 Dedicated endpoint 发布与白名单 | [control/network.md](./skills/milvus-cli/references/control/network.md) |
| `version` | 查看 CLI 构建信息 | [control/version.md](./skills/milvus-cli/references/control/version.md) |
| `completion` | 生成 shell 自动补全脚本 | [control/completion.md](./skills/milvus-cli/references/control/completion.md) |
| `data connection` | 管理数据面连接配置 | [data/connection.md](./skills/milvus-cli/references/data/connection.md) |
| `data database` | 管理数据库 | [data/database.md](./skills/milvus-cli/references/data/database.md) |
| `data collection` | 管理集合 | [data/collection.md](./skills/milvus-cli/references/data/collection.md) |
| `data partition` | 管理分区 | [data/partition.md](./skills/milvus-cli/references/data/partition.md) |
| `data alias` | 管理别名 | [data/alias.md](./skills/milvus-cli/references/data/alias.md) |
| `data index` | 管理索引 | [data/index.md](./skills/milvus-cli/references/data/index.md) |
| `data vector` | 向量搜索与操作 | [data/vector.md](./skills/milvus-cli/references/data/vector.md) |
| `data user` | 管理用户 | [data/user.md](./skills/milvus-cli/references/data/user.md) |
| `data role` | 管理角色 | [data/role.md](./skills/milvus-cli/references/data/role.md) |
| `serverless instance` | 管理 Serverless 实例 | [serverless/instance.md](./skills/milvus-cli/references/serverless/instance.md) |
| `serverless network` | 管理 Serverless 网络配置 | [serverless/network.md](./skills/milvus-cli/references/serverless/network.md) |

## Agent 集成

本仓库在 `skills/milvus-cli/` 目录下提供 [Agent Skills](https://agentskills.io/) 技能包，可供 AI 编码助手（TRAE、Claude Code、Cursor、Codex、OpenCode、GitHub Copilot 等）直接消费。

各 Agent 的安装方式详见 [skills/milvus-cli/README.md](./skills/milvus-cli/README.md)。

## 许可证

[MIT](./LICENSE)
