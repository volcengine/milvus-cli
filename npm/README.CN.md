# @volcengine/milvus-cli

火山引擎 Milvus 命令行工具，覆盖控制面（Dedicated / Serverless 实例管理）和数据面（数据库、集合、索引、向量、用户与角色）操作。npm 包会在安装时下载当前平台的预编译 `milvus-cli` 二进制。

## 安装

```bash
npm install -g @volcengine/milvus-cli
```

安装后验证：

```bash
milvus-cli version --output json
milvus-cli --help
```

### 前置要求

- Node.js >= 18。
- Linux、macOS 或 Windows，支持 `x64/arm64`。
- 可访问发布归档下载地址，以便 postinstall 下载二进制。

如果需要自行管理二进制，可跳过 postinstall：

```bash
MILVUS_CLI_SKIP_POSTINSTALL=1 npm i -g @volcengine/milvus-cli
```

如需覆盖下载源：

```bash
MILVUS_CLI_RELEASE_BASE_URL=https://example.com/releases npm i -g @volcengine/milvus-cli
```

## 1.0.0 亮点

- Dedicated 控制面：实例创建、查询、详情、节点、扩缩容、计费、删除保护、网络端点和资源规格查询。
- Serverless 控制面：Serverless 实例与私网/公网端点管理。
- 数据面直连：连接、数据库、集合、分区、别名、索引、向量、用户和角色管理。
- 从实例创建连接：`data connection create --from-instance` / `--from-serverless` 可自动补全私网地址、用户名、TLS 与来源信息。
- 安全存储：本地 credential 和 connection 敏感字段加密落盘。
- 稳定输出：所有命令支持 `table|json|yaml`；控制面列表命令支持分页和 JSON/YAML envelope。
- 发布分发：多平台归档、checksum、shell completion 和 npm 安装器链路。

## 快速上手

### 1. 创建 Profile

Profile 保存站点、地域、项目、凭证引用和语言等上下文。创建后会自动设为当前 profile。

```bash
milvus-cli profile create \
  --name default \
  --site volcengine \
  --region cn-beijing \
  --project default \
  --credential volcengine \
  --language CN
```

查看和切换 profile：

```bash
milvus-cli profile list
milvus-cli profile current
milvus-cli profile use default
```

### 2. 认证控制面

使用 AK/SK 登录，凭证名称建议与 profile 中的 `--credential` 一致：

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
milvus-cli auth status
```

也可以通过环境变量提供凭证：

```bash
export VOLCSTACK_ACCESS_KEY_ID=<AK>
export VOLCSTACK_SECRET_ACCESS_KEY=<SK>
milvus-cli auth login --name volcengine
```

### 3. 管理 Dedicated 实例

```bash
milvus-cli spec version
milvus-cli spec node --version V2_6
milvus-cli spec zone
milvus-cli spec vpc --page 1 --page-size 20
milvus-cli spec subnet --vpc-id <vpc-id>

milvus-cli instance create \
  --name my-instance \
  --version V2_6 \
  --vpc-id <vpc-id> \
  --admin-password <password> \
  --ha-enabled=true \
  --wait

milvus-cli instance list --page 1 --page-size 20 --output json
milvus-cli instance describe --instance-id <instance-id>
milvus-cli instance nodes list --instance-id <instance-id>
milvus-cli network endpoints --instance-id <instance-id>
```

说明：`instance describe` 的 table 输出展示常用摘要字段；`json/yaml` 输出返回 API 详细结果。

### 4. 管理 Serverless 实例

```bash
milvus-cli serverless instance list --page 1 --page-size 20
milvus-cli serverless instance describe --instance-id <instance-id>
milvus-cli serverless network private list --instance-id <instance-id>
milvus-cli serverless network public publish --instance-id <instance-id> --enabled=true --eip-id <eip-id>
```

### 5. 建立数据面连接

手动创建连接：

```bash
milvus-cli data connection create \
  --name my-conn \
  --address <host>:19530 \
  --auth-method username \
  --username root \
  --password <password> \
  --database default
```

从 Dedicated 实例创建连接：

```bash
milvus-cli data connection create \
  --from-instance <instance-id> \
  --password <milvus-password>
```

从 Serverless 实例创建连接并指定连接名：

```bash
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <instance-id> \
  --password <milvus-password>
```

查看、切换和测试连接：

```bash
milvus-cli data connection list
milvus-cli data connection current
milvus-cli data connection use my-conn
milvus-cli data connection test my-conn
```

### 6. 管理数据库与集合

```bash
milvus-cli data database list
milvus-cli data database create --database my_db
milvus-cli data database use my_db

milvus-cli data collection create --name quickstart --dim 8
milvus-cli data collection describe --name quickstart
milvus-cli data collection load --name quickstart
```

使用 schema 文件创建集合：

```bash
milvus-cli data collection create --schema schema.json
```

示例 schema：

```json
{
  "name": "quickstart",
  "description": "demo collection",
  "autoId": false,
  "enableDynamicField": true,
  "fields": [
    {"name": "id", "dataType": "int64", "primaryKey": true},
    {"name": "name", "dataType": "varchar", "maxLength": 64},
    {"name": "vector", "dataType": "float_vector", "dimension": 8}
  ]
}
```

### 7. 向量操作

```bash
milvus-cli data vector insert \
  --collection quickstart \
  --data '[
    {"id": 1, "name": "n1", "vector": [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]},
    {"id": 2, "name": "n2", "vector": [0.2,0.1,0.3,0.4,0.5,0.6,0.7,0.8]}
  ]'

milvus-cli data vector search \
  --collection quickstart \
  --vector '[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]' \
  --vector-field vector \
  --topk 5 \
  --output-fields id,name \
  --param metric_type=L2

milvus-cli data vector query --collection quickstart --expr 'id in [1, 2]' --output-fields id,name
milvus-cli data vector get --collection quickstart --ids 1,2 --output-fields id,name
milvus-cli data vector delete --collection quickstart --ids 1
```

混合搜索：

```bash
milvus-cli data vector hybrid-search \
  --collection quickstart \
  --requests '[
    {"vector_field":"vector","vector":[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8],"params":{"nprobe":"8"}},
    {"vector_field":"sparse","vector":{"indices":[1,3,10],"values":[0.5,1.0,0.8]}}
  ]' \
  --topk 5 \
  --output-fields id,name \
  --reranker rrf --rrf-k 60
```

### 8. 索引、分区、别名和权限

```bash
milvus-cli data index create --collection quickstart --field vector --index my_index --index-type AUTOINDEX --metric-type COSINE
milvus-cli data partition create --collection quickstart --partition region_cn
milvus-cli data alias create --collection quickstart --alias quickstart_v1

milvus-cli data user create --user demo_user --password <password>
milvus-cli data role create --role data_reader
milvus-cli data user grant --user demo_user --role data_reader
```

## 功能清单

### 控制面（Dedicated）

| 命令 | 说明 |
|------|------|
| `auth login/status/logout` | 管理 AK/SK 凭证状态 |
| `profile create/list/current/use/set/delete` | 管理运行上下文 |
| `spec version/node/zone/vpc/subnet/eip` | 查询版本、规格、可用区和网络资源 |
| `instance create/list/describe/nodes/scale/rename/billing/delete-protect/delete` | 管理 Dedicated 实例 |
| `network private/public/allow-group/endpoints` | 管理 Dedicated 网络端点 |

### 控制面（Serverless）

| 命令 | 说明 |
|------|------|
| `serverless instance create/list/describe/delete` | 管理 Serverless 实例 |
| `serverless network private/public/allow-group` | 管理 Serverless 网络端点 |

### 数据面

| 命令 | 说明 |
|------|------|
| `data connection create/list/current/use/test/delete` | 管理 Milvus 连接 |
| `data database list/create/describe/use/alter-properties/drop-properties/drop` | 管理数据库 |
| `data collection list/create/describe/load/release/flush/rename/add-field/alter-properties/alter-field-properties/drop-properties/drop` | 管理集合 |
| `data partition list/create/describe/load/release/drop` | 管理分区 |
| `data alias list/create/alter/describe/drop` | 管理别名 |
| `data index list/create/describe/alter-properties/drop-properties/drop` | 管理索引 |
| `data vector insert/upsert/get/query/search/hybrid-search/delete` | 向量数据操作 |
| `data user list/create/describe/grant/revoke/update-password/drop` | 用户管理 |
| `data role list/create/describe/grant/revoke/drop` | 角色管理 |

## 输出格式

所有命令支持：

```bash
milvus-cli instance list --output json
milvus-cli data collection list --output yaml
milvus-cli data vector search --collection quickstart \
  --vector '[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8]' \
  --vector-field vector --topk 5 \
  --output json --file ./result.json
```

- `table`：默认，适合终端阅读。
- `json`：适合脚本和 API 消费。
- `yaml`：适合人工阅读和配置管理。
- `--file`：搜索/查询结果可导出到 `.json`、`.jsonl`、`.yaml`。

控制面列表命令的 JSON/YAML 输出采用 envelope：

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "returned": 0
  }
}
```

## 本地配置与安全

默认配置目录为 `~/.milvus-cli`，可通过 `MILVUS_CLI_CONFIG_DIR` 覆盖。credential 与 data connection 中的 AK/SK、password、token、apiKey 等敏感字段会加密写入磁盘。

配置根目录优先级：

1. `--config-dir`（隐藏调试参数）
2. `MILVUS_CLI_CONFIG_DIR`
3. `~/.milvus-cli`

旧的明文配置格式不保证兼容，如遇解密或解析失败，请重新执行 `auth login` 或 `data connection create`。

## 环境变量

| 变量 | 说明 |
|------|------|
| `MILVUS_CLI_CONFIG_DIR` | 覆盖 CLI 配置目录 |
| `MILVUS_CLI_SKIP_POSTINSTALL` | 设为 `1` 跳过 npm 安装时自动下载二进制 |
| `MILVUS_CLI_RELEASE_BASE_URL` | 覆盖二进制下载基础 URL |
| `VOLCSTACK_ACCESS_KEY_ID` | 控制面 AK |
| `VOLCSTACK_SECRET_ACCESS_KEY` | 控制面 SK |

## Shell 自动补全

```bash
milvus-cli completion bash > /etc/bash_completion.d/milvus-cli
milvus-cli completion zsh > "${fpath[1]}/_milvus-cli"
milvus-cli completion fish > ~/.config/fish/completions/milvus-cli.fish
milvus-cli completion powershell > milvus-cli.ps1
```

## 相关链接

- [项目文档](https://github.com/volcengine/milvus-cli#readme)
- [问题反馈](https://github.com/volcengine/milvus-cli/issues)
- [火山引擎 Milvus](https://www.volcengine.com/docs/85665)
- [CHANGELOG](./CHANGELOG.md)

## 许可证

[MIT](./LICENSE)
