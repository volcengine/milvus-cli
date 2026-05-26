# completion

Generate shell completion scripts.

## Purpose

The `completion` command generates completion scripts for `bash`, `zsh`, `fish`, and `powershell`, making it easier to complete `milvus-cli` commands, subcommands, and flags in a terminal.

## Prerequisites

- `milvus-cli` has been installed or built.
- The target shell supports loading completion scripts.

## Command

```bash
milvus-cli completion <shell>
```

Supported shells:

| Shell | Command |
|-------|---------|
| bash | `milvus-cli completion bash` |
| zsh | `milvus-cli completion zsh` |
| fish | `milvus-cli completion fish` |
| powershell | `milvus-cli completion powershell` |

## Important Arguments

The `completion` command usually does not require business arguments. Specify only the target shell.

| Argument | Required | Description |
|----------|----------|-------------|
| `<shell>` | Yes | Target shell: `bash`, `zsh`, `fish`, or `powershell` |
| `--help` | No | Show installation guidance for the selected shell |

## Output

The command writes the generated completion script to stdout. Redirect it to the shell completion directory or load it from the shell initialization file.

## Examples

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

## Common Next Steps

- Restart the terminal or reload the shell configuration.
- Run `milvus-cli <TAB>` to verify completion works.
- Return to the [control command overview](./README.en.md).
