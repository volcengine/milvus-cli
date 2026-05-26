# Changelog

## 1.0.1 (2026-05-13)

### Fixes

- `auth` 相关输出中的 Access Key 默认脱敏展示，减少凭证在终端或日志中被直接暴露的风险。
- `profile set-credential` 更新 credential 后会同步刷新当前 profile 绑定信息，避免后续命令继续读取旧凭证引用。

### Docs

- npm 分发目录补充 `LICENSE` 文件，并同步刷新中英文 changelog 与相关说明文档。

## 1.0.0 (2026-05-10)

### Features

- 发布 `milvus-cli` 首个稳定版，统一覆盖 Volcengine Milvus Dedicated 控制面、Serverless 控制面和数据面直连命令。
- Dedicated 控制面提供 `profile`、`auth`、`spec`、`instance`、`network` 命令，覆盖实例创建、列表、详情、节点、扩缩容、计费、删除保护、网络端点和资源规格查询。
- Serverless 控制面提供 `serverless instance` 和 `serverless network` 命令，支持 Serverless 实例与私网/公网端点管理。
- 数据面提供 `connection`、`database`、`collection`、`partition`、`alias`、`index`、`vector`、`user`、`role` 命令，覆盖 Milvus 常用管理和向量操作流程。
- `data connection create` 支持 `--from-instance` 和 `--from-serverless`，可从控制面实例自动补全私网地址、用户名、TLS 和来源信息。

### Improvements

- 所有命令支持稳定的 `table`、`json`、`yaml` 输出；控制面列表命令统一支持分页参数和 JSON/YAML envelope 输出。
- 提供 Linux、macOS、Windows 的 `amd64/arm64` 预编译二进制归档、checksum 校验、shell completion 和 npm 安装器分发链路。
- 补齐 Go 测试、E2E YAML 配置约定、npm installer 测试、release preflight 和 snapshot smoke 文档，完善发布质量保障。

### Security

- 本地 credential 和 data connection 的敏感字段采用加密方式落盘，减少 AK/SK、password、token、apiKey 明文暴露风险。

### Docs

- 补充 npm 包说明文档与版本变更记录，统一 1.0.0 稳定版发布口径。
