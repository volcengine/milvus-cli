# alias 命令

管理 Milvus 集合别名。

## 用途

alias 命令组用于创建、查看、修改和删除集合的别名。别名常用于蓝绿部署与无缝切换集合，也可以在不影响应用代码的情况下更换底层集合。

## 前置条件

1. 已创建有效的数据连接
2. 已创建目标集合

## 命令

### alias list

列出指定集合的所有别名。

```bash
milvus-cli data alias list [flags]
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
| `Alias` | 别名 |

### alias create

为指定集合创建别名。

```bash
milvus-cli data alias create [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 集合名称 | `--collection demo` |
| `--alias` | 是 | 别名 | `--alias demo_v1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### alias describe

查看指定别名的详细信息。

```bash
milvus-cli data alias describe [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--alias` | 是 | 别名 | `--alias demo_v1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

### alias alter

修改别名指向的集合（别名重定向）。

```bash
milvus-cli data alias alter [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--collection` | 是 | 新的目标集合名称 | `--collection demo_v2` |
| `--alias` | 是 | 要修改的别名 | `--alias demo` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

**注意**：此命令可以实现蓝绿部署中的无缝切换。

### alias drop

删除指定的别名。

```bash
milvus-cli data alias drop [flags]
```

#### 重要参数

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--alias` | 是 | 要删除的别名 | `--alias demo_v1` |
| `--connection` | 否 | 指定连接名称 | `--connection sample` |
| `--timeout` | 否 | 请求超时时间 | `--timeout 30s` |

## 示例

### 列出别名

```bash
milvus-cli data alias list --collection demo
```

### 创建别名

```bash
# 为集合 demo 创建别名 demo_v1
milvus-cli data alias create --collection demo --alias demo_v1

# 创建另一个别名
milvus-cli data alias create --collection demo_v2 --alias demo
```

### 查看别名详情

```bash
milvus-cli data alias describe --alias demo_v1
```

### 蓝绿部署切换

```bash
# 假设当前 demo 别名指向 demo_v1 集合
# 1. 准备好新的 demo_v2 集合并加载
milvus-cli data collection load --name demo_v2

# 2. 将别名切换到新集合（无缝切换）
milvus-cli data alias alter --collection demo_v2 --alias demo

# 3. 验证切换成功
milvus-cli data alias describe --alias demo
```

### 删除别名

```bash
milvus-cli data alias drop --alias demo_v1
```

## 输出结果

### alias list（table 格式）

```
+--------+
| Alias  |
+--------+
| demo_v1|
| demo   |
+--------+
```

## 常见下一步

- 使用别名替代集合名进行向量搜索（`milvus-cli data vector search --collection <alias>`）
- 为不同版本的集合创建别名（如 `prod_v1`、`prod_v2`）
- 在蓝绿部署中使用 `alias alter` 实现零停机切换
- 通过别名屏蔽底层集合的实际名称，提高安全性
