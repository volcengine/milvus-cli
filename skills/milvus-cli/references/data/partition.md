# partition 命令

管理 Milvus 集合分区。

## 用途

partition 命令组用于创建、查看、加载、释放和删除集合的分区。分区常用于按业务/时间维度隔离数据，并减少查询扫描范围。

## 前置条件

1. 已创建有效的数据连接
2. 已创建目标集合

## 命令

### partition list

列出指定集合的所有分区。

```bash
milvus-cli data partition list [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

#### 输出结果

| 字段 | 说明 |
|------|------|
| `Partition` | 分区名称（包含 `_default` 默认分区） |

### partition create

在指定集合中创建新分区。

```bash
milvus-cli data partition create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--partition` | 是 | 分区名称 | `--partition p1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### partition describe

查看指定分区的详细信息。

```bash
milvus-cli data partition describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--partition` | 是 | 分区名称 | `--partition p1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### partition load

将分区加载到内存中。

```bash
milvus-cli data partition load [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--partition` | 是 | 分区名称 | `--partition p1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### partition release

将分区从内存中释放。

```bash
milvus-cli data partition release [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--partition` | 是 | 分区名称 | `--partition p1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### partition drop

删除指定的分区。

```bash
milvus-cli data partition drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--partition` | 是 | 分区名称 | `--partition p1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

**注意**：默认分区 `_default` 不能被删除。

## 示例

### 列出分区

```bash
# 列出所有分区
milvus-cli data partition list --collection demo

# JSON 格式输出
milvus-cli data partition list --collection demo --output json
```

### 创建分区

```bash
# 创建分区 p1
milvus-cli data partition create --collection demo --partition p1

# 创建分区 p2
milvus-cli data partition create --collection demo --partition p2
```

### 加载和释放分区

```bash
# 加载分区
milvus-cli data partition load --collection demo --partition p1

# 释放分区
milvus-cli data partition release --collection demo --partition p1
```

### 删除分区

```bash
milvus-cli data partition drop --collection demo --partition p1
```

## 输出结果

### partition list（table 格式）

```
+-----------+
| Partition |
+-----------+
| _default  |
| p1        |
| p2        |
+-----------+
```

## 常见下一步

- 使用 `milvus-cli data vector insert --partition <name>` 向指定分区插入数据
- 使用 `milvus-cli data vector search --partition <name>` 在指定分区中搜索
- 为时间序列数据按时间创建分区（如 `2025_01`、`2025_02`）
- 为多租户场景按租户创建分区
