# 控制面命令

milvus-cli 控制面命令用于管理 Volcengine Milvus 的 dedicated 资源。

## 命令概览

| 命令 | 用途 |
|------|------|
| [auth](./auth.md) | 管理 AK/SK 凭证 |
| [profile](./profile.md) | 管理运行上下文（profile） |
| [spec](./spec.md) | 查询地域/版本/规格信息 |
| [instance](./instance.md) | 管理专有 Milvus 实例 |
| [network](./network.md) | 管理网络设置 |
| [version](./version.md) | 显示版本信息 |
| [completion](./completion.md) | 生成 shell 自动补全脚本 |

## 全局参数

控制面命令支持以下全局参数：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--output` | 输出格式：table/json/yaml | table |
| `--profile` | Profile 名称 | - |
| `--region` | 地域 | - |
| `--project` | 项目 | default |
| `--site` | 站点：volcengine/byteplus | volcengine |
| `--env` | 环境：prod/dev/test | prod |
| `--language` | 语言：CN/EN | EN |
| `--ak` | 临时 Access Key | - |
| `--sk` | 临时 Secret Key | - |
| `--debug` | 启用 API 请求调试日志 | false |
| `--yes` | 跳过危险操作确认 | false |

## 快速开始

1. 登录并保存凭证
```bash
milvus-cli auth login --ak <AK> --sk <SK> --name volcengine
```

2. 创建 profile
```bash
milvus-cli profile create --name default --region cn-beijing --credential volcengine --language CN
```

3. 查看规格信息
```bash
milvus-cli spec version
milvus-cli spec node --version V2_6
```

4. 创建实例
```bash
milvus-cli instance create --name my-instance --admin-password <password> --vpc-id vpc-xxx --wait
```

## 相关文档

- [数据面命令](../data/README.md)
- [Serverless 命令](../serverless/README.md)
