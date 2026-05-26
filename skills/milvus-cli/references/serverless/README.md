# Serverless 命令概览

> **功能范围提示**：Serverless 控制面已可用，当前支持 `instance`（实例生命周期管理）和 `network`（网络配置）命令。文档中的示例使用 `sample/demo` 占位符仅为格式演示，不代表功能受限。以下 Serverless 能力尚未纳入当前命令范围：`spec`（规格查询）、`collection`（集合管理）、`observe`（可观测性）、`user-auth`（用户认证）、`playground`（交互式控制台）。

---

## 用途

`serverless` 命令组用于管理 Serverless Milvus 资源，包括实例生命周期管理和网络配置。

与 Dedicated 实例不同，Serverless 实例采用按量计费模式，无需预先规划节点规格，适合业务负载波动较大的场景。

---

## 前置条件

1. 已完成认证：`milvus-cli auth login --ak <AK> --sk <SK>`
2. 已创建 profile 或指定 `--region` 参数
3. 具备创建 VPC 和子网的权限（创建实例时需要）

---

## 命令列表

| 命令 | 说明 | 文档 |
|------|------|------|
| `serverless instance create` | 创建 Serverless 实例 | [instance.md](./instance.md#create) |
| `serverless instance list` | 列出 Serverless 实例 | [instance.md](./instance.md#list) |
| `serverless instance describe` | 查看实例详情 | [instance.md](./instance.md#describe) |
| `serverless instance delete` | 删除实例 | [instance.md](./instance.md#delete) |
| `serverless instance rename` | 重命名实例 | [instance.md](./instance.md#rename) |
| `serverless instance delete-protect set` | 设置删除保护 | [instance.md](./instance.md#delete-protect) |
| `serverless instance reset-password` | 重置实例密码 | [instance.md](./instance.md#reset-password) |
| `serverless network private publish` | 私网域名发布 | [network.md](./network.md#private-publish) |
| `serverless network public publish` | 公网域名发布 | [network.md](./network.md#public-publish) |
| `serverless network allow-group public` | 公网白名单配置 | [network.md](./network.md#allow-group) |
| `serverless network allow-group private` | 私网白名单配置 | [network.md](./network.md#allow-group) |

---

## 快速开始

### 1. 查看帮助

```bash
milvus-cli serverless --help
milvus-cli serverless instance --help
milvus-cli serverless network --help
```

### 2. 创建 Serverless 实例

```bash
milvus-cli serverless instance create \
  --name demo-serverless \
  --version V2_5 \
  --password <password> \
  --vpc-id vpc-demo123 \
  --subnet-id subnet-demo456 \
  --wait
```

### 3. 列出实例

```bash
milvus-cli serverless instance list
```

### 4. 配置公网访问

```bash
milvus-cli serverless network public publish \
  --instance-id milvus-demo789 \
  --enabled true \
  --eip-id eip-demo000
```

---

## 与 Dedicated 实例的区别

| 特性 | Serverless | Dedicated |
|------|------------|-----------|
| 计费模式 | 按量计费 | 包年包月/按量计费 |
| 资源规划 | 自动扩缩容 | 需预先选择规格 |
| 适用场景 | 负载波动大、测试环境 | 生产环境、稳定负载 |
| 网络配置 | 支持私网/公网 + 白名单 | 支持私网/公网 + 白名单 |

---

## 常见下一步

- [查看实例管理详情](./instance.md)
- [配置网络访问](./network.md)
- [了解数据面操作](../data/connection.md)
- [返回命令总览](../README.md)

---

## 相关文档

- [English Documentation](./README.en.md)
- [instance 命令详解](./instance.md)
- [network 命令详解](./network.md)
