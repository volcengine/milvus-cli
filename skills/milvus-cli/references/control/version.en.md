# version

Show version information.

## Purpose

Print milvus-cli version and build information.

## Prerequisites

None

## Command

### version

Show version information.

```bash
milvus-cli version [--output <format>]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--output` | No | Output format: table/json/yaml | table |

#### Output

| Field | Description |
|-------|-------------|
| `Version` | Version number |
| `Commit` | Git commit hash |
| `Build Date` | Build date |
| `Built By` | Built by |
| `Go Version` | Go version |
| `Platform` | Target platform |

## Examples

### View version (default table format)

```bash
milvus-cli version
```

Example output:
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

### View version in JSON format

```bash
milvus-cli version --output json
```

Example output:
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

### View version in YAML format

```bash
milvus-cli version --output yaml
```

## Common Next Steps

- View help: `milvus-cli --help`
- Verify installation
