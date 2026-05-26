# milvus-cli Agent Skill

[English](#installation) | [中文](#安装)

Volcengine Milvus CLI 的 [Agent Skills](https://agentskills.io/) 技能包，让 AI 编码助手能够理解和使用 `milvus-cli` 命令来管理火山引擎 Milvus 服务。

## 技能结构

```
skills/milvus-cli/
├── README.md          # 本文件
├── skill.md           # 技能定义（指令 + 命令概览）
└── references/        # 详细命令参考文档
    ├── README.md
    ├── control/       # 控制面命令（auth, profile, spec, instance, network ...）
    ├── data/          # 数据面命令（connection, database, collection, vector ...）
    └── serverless/    # Serverless 命令（instance, network）
```

---

## 安装

下面提供各主流 AI 编码助手的安装方式。核心思路都是将 `skills/milvus-cli/` 目录放到对应 agent 能发现的位置。

### Claude Code

Claude Code 原生支持 [Agent Skills 标准](https://agentskills.io/)。

**方式一：项目级（推荐，与团队共享）**

将本仓库的 `skills/` 目录放在项目根目录即可。Claude Code 会自动递归发现 `skills/milvus-cli/skill.md`。

```bash
# 在你的项目根目录
git clone https://github.com/volcengine/milvus-cli.git /tmp/milvus-cli
cp -r /tmp/milvus-cli/skills/milvus-cli .claude/skills/milvus-cli
```

然后在 Claude Code 中使用 `/milvus-cli` 调用，或由 agent 根据上下文自动触发。

**方式二：全局安装（个人所有项目可用）**

```bash
mkdir -p ~/.claude/skills
cp -r skills/milvus-cli ~/.claude/skills/milvus-cli
```

### Cursor

Cursor 通过 `.cursor/rules/` 目录加载规则，也支持 `AGENTS.md`。

**方式一：作为 Cursor Rule**

```bash
mkdir -p .cursor/rules
# 将 skill.md 复制为 Cursor Rule 格式
cp skills/milvus-cli/skill.md .cursor/rules/milvus-cli.mdc
```

> 提示：如需 Cursor 自动匹配触发，可在 `.mdc` 文件头部添加 frontmatter：
> ```yaml
> ---
> description: "Use when managing Volcengine Milvus instances, data, or CLI operations"
> alwaysApply: false
> ---
> ```

**方式二：通过 AGENTS.md 引用**

在项目根目录的 `AGENTS.md` 中添加：

```markdown
## Milvus CLI

When working with Volcengine Milvus CLI, refer to the skill documentation at `skills/milvus-cli/skill.md` and command references under `skills/milvus-cli/references/`.
```

### TRAE

TRAE 原生支持 skills 目录结构。

**方式一：项目级（推荐，与团队共享）**

```bash
mkdir -p .trae/skills
cp -r skills/milvus-cli .trae/skills/milvus-cli
```

TRAE 会自动发现 `.trae/skills/milvus-cli/skill.md` 并加载技能。

**方式二：全局安装（个人所有项目可用）**

```bash
mkdir -p ~/.trae/skills
cp -r skills/milvus-cli ~/.trae/skills/milvus-cli
```

### OpenAI Codex

Codex 使用 `AGENTS.md` 作为项目指令文件。

**方式一：合并到 AGENTS.md**

```bash
# 在项目根目录
cat skills/milvus-cli/skill.md >> AGENTS.md
```

**方式二：通过 Codex Skills（实验性）**

Codex CLI 实验性支持 Agent Skills 格式，将 `skills/` 目录放在项目根目录即可被发现。

### OpenCode

OpenCode 使用 `AGENTS.md` 和自定义指令文件，同时兼容 Claude Code 的 skills 目录。

**方式一：通过 AGENTS.md 引用**

在项目根目录的 `AGENTS.md` 中添加对技能文件的引用：

```markdown
## Milvus CLI Skill

Refer to `skills/milvus-cli/skill.md` for milvus-cli command usage. Detailed command references are in `skills/milvus-cli/references/`.
```

**方式二：通过 opencode.json 引用**

```json
{
  "instructions": [
    "skills/milvus-cli/skill.md"
  ]
}
```

**方式三：Claude Code 兼容模式**

OpenCode 兼容 `~/.claude/skills/` 目录，按 Claude Code 方式安装即可。

### VS Code (GitHub Copilot)

VS Code 的 GitHub Copilot 支持 Agent Skills 标准。

```bash
mkdir -p .github/skills
cp -r skills/milvus-cli .github/skills/milvus-cli
```

或者将 `skills/` 目录放在项目根目录，Copilot 会自动发现。

### 通用方式

对于其他支持自定义指令的 agent，核心做法：

1. 将 `skills/milvus-cli/skill.md` 的内容追加到 agent 的指令文件中
2. 将 `skills/milvus-cli/references/` 目录放到 agent 可读取的位置
3. 确保 `skill.md` 中的 `references/` 相对路径能正确解析

```bash
# 通用：将技能内容追加到任意 agent 指令文件
cat skills/milvus-cli/skill.md >> <YOUR_AGENT_INSTRUCTIONS_FILE>
```

---

## 验证安装

安装完成后，你可以在 agent 对话中测试：

```
请列出所有 milvus-cli 支持的命令组
```

或

```
How do I create a Milvus data connection using milvus-cli?
```

如果 agent 能正确引用 `skill.md` 中的命令和参数，说明技能已生效。

---

## Installation

Below are setup instructions for mainstream AI coding agents. The core idea is to place the `skills/milvus-cli/` directory where the agent can discover it.

### Claude Code

Claude Code natively supports the [Agent Skills standard](https://agentskills.io/).

**Option A: Project-level (recommended, shared with team)**

```bash
# In your project root
git clone https://github.com/volcengine/milvus-cli.git /tmp/milvus-cli
cp -r /tmp/milvus-cli/skills/milvus-cli .claude/skills/milvus-cli
```

Invoke with `/milvus-cli` or let the agent trigger it automatically.

**Option B: Global (available across all projects)**

```bash
mkdir -p ~/.claude/skills
cp -r skills/milvus-cli ~/.claude/skills/milvus-cli
```

### Cursor

Cursor loads rules from `.cursor/rules/` and supports `AGENTS.md`.

**Option A: As a Cursor Rule**

```bash
mkdir -p .cursor/rules
cp skills/milvus-cli/skill.md .cursor/rules/milvus-cli.mdc
```

> Tip: Add frontmatter for intelligent triggering:
> ```yaml
> ---
> description: "Use when managing Volcengine Milvus instances, data, or CLI operations"
> alwaysApply: false
> ---
> ```

**Option B: Via AGENTS.md**

Add to your project's `AGENTS.md`:

```markdown
## Milvus CLI

When working with Volcengine Milvus CLI, refer to `skills/milvus-cli/skill.md` and command references under `skills/milvus-cli/references/`.
```

### TRAE

TRAE natively supports the skills directory structure.

**Option A: Project-level (recommended, shared with team)**

```bash
mkdir -p .trae/skills
cp -r skills/milvus-cli .trae/skills/milvus-cli
```

TRAE automatically discovers `.trae/skills/milvus-cli/skill.md` and loads the skill.

**Option B: Global (available across all projects)**

```bash
mkdir -p ~/.trae/skills
cp -r skills/milvus-cli ~/.trae/skills/milvus-cli
```

### OpenAI Codex

Codex uses `AGENTS.md` for project-level instructions.

**Option A: Append to AGENTS.md**

```bash
cat skills/milvus-cli/skill.md >> AGENTS.md
```

**Option B: Via Codex Skills (experimental)**

Codex CLI has experimental support for Agent Skills. Keep the `skills/` directory in the project root.

### OpenCode

OpenCode uses `AGENTS.md` and custom instruction files, with Claude Code compatibility.

**Option A: Via AGENTS.md**

```markdown
## Milvus CLI Skill

Refer to `skills/milvus-cli/skill.md` for milvus-cli command usage. Detailed references are in `skills/milvus-cli/references/`.
```

**Option B: Via opencode.json**

```json
{
  "instructions": [
    "skills/milvus-cli/skill.md"
  ]
}
```

**Option C: Claude Code compatibility**

OpenCode supports `~/.claude/skills/`. Install as described in the Claude Code section.

### VS Code (GitHub Copilot)

GitHub Copilot supports Agent Skills.

```bash
mkdir -p .github/skills
cp -r skills/milvus-cli .github/skills/milvus-cli
```

Or keep the `skills/` directory at the project root — Copilot discovers it automatically.

### Generic

For any agent that supports custom instructions:

1. Append the content of `skills/milvus-cli/skill.md` to the agent's instruction file
2. Place `skills/milvus-cli/references/` where the agent can read it
3. Ensure `references/` relative paths resolve correctly from `skill.md`

```bash
cat skills/milvus-cli/skill.md >> <YOUR_AGENT_INSTRUCTIONS_FILE>
```

---

## Verify Installation

Test in the agent chat:

```
List all milvus-cli command groups
```

or

```
How do I create a Milvus data connection using milvus-cli?
```

If the agent correctly references commands and flags from `skill.md`, the skill is active.
