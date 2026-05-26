# completion

生成 shell 自动补全脚本。

## 用途

`completion` 命令用于为 `bash`、`zsh`、`fish`、`powershell` 生成自动补全脚本，方便在终端中补全 `milvus-cli` 命令、子命令和参数。

## 前置条件

- 已安装或构建 `milvus-cli`。
- 目标 shell 支持加载补全脚本。

## 命令

```bash
milvus-cli completion <shell>
```

支持的 shell：

| Shell | 命令 |
|------|------|
| bash | `milvus-cli completion bash` |
| zsh | `milvus-cli completion zsh` |
| fish | `milvus-cli completion fish` |
| powershell | `milvus-cli completion powershell` |

## 重要参数

`completion` 子命令通常不需要业务参数，只需要指定目标 shell。

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| `<shell>` | 是 | 目标 shell，取值为 `bash`、`zsh`、`fish`、`powershell` |
| `--help` | 否 | 查看对应 shell 的补全安装说明 |

## 输出结果

命令会将补全脚本输出到标准输出。通常需要重定向到 shell 的补全目录或在 shell 初始化文件中加载。

## 示例

### bash

```bash
milvus-cli completion bash > /usr/local/etc/bash_completion.d/milvus-cli
```

### zsh

```bash
milvus-cli completion zsh > "${fpath[1]}/_milvus-cli"
```

### fish

```bash
milvus-cli completion fish > ~/.config/fish/completions/milvus-cli.fish
```

### powershell

```powershell
milvus-cli completion powershell | Out-String | Invoke-Expression
```

## 常见下一步

- 重新打开终端或重新加载 shell 配置。
- 使用 `milvus-cli <TAB>` 验证补全是否生效。
- 返回 [控制面命令概览](./README.md)。
