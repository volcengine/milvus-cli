# version

显示版本信息。

## 用途

输出 milvus-cli 的版本与构建信息。

## 前置条件

无

## 命令

### version

显示版本信息。

```bash
milvus-cli version [--output <format>]
```

#### 重要参数

| 参数 | 是否必填 | 说明 | 默认值 |
|------|----------|------|--------|
| `--output` | 否 | 输出格式：table/json/yaml | table |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Version` | 版本号 |
| `Commit` | Git commit hash |
| `Build Date` | 构建日期 |
| `Built By` | 构建者 |
| `Go Version` | Go 版本 |
| `Platform` | 目标平台 |

## 示例

### 查看版本（默认 table 格式）

```bash
milvus-cli version
```

输出示例：
```
+------------+-----------+
| Field      | Value     |
+------------+-----------+
| Version    | 1.0.0     |
| Commit     | abc1234   |
| Build Date | 2025-05-01|
| Built By   | goreleaser|
| Go Version | go1.24    |
| Platform   | darwin/arm64|
+------------+-----------+
```

### 以 JSON 格式查看版本

```bash
milvus-cli version --output json
```

输出示例：
```json
{
  "version": "1.0.0",
  "commit": "abc1234",
  "buildDate": "2025-05-01",
  "builtBy": "goreleaser",
  "goVersion": "go1.24",
  "platform": "darwin/arm64"
}
```

### 以 YAML 格式查看版本

```bash
milvus-cli version --output yaml
```

## 常见下一步

- 查看帮助信息：`milvus-cli --help`
- 验证安装是否成功
