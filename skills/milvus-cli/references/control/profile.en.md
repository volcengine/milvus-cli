# profile

Manage runtime context (profiles).

## Purpose

`profile` provides reusable runtime context: env/site/region/project/credential/language. After creating a profile, you don't need to repeat these parameters in every command.

## Prerequisites

- To call control plane APIs, login first: `milvus-cli auth login`
- Prepare the credential name to reference

## Commands

### profile create

Create and activate a profile.

```bash
milvus-cli profile create --name <name> --region <region> [flags]
```

#### Important Arguments

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| `--name` | Yes | Profile name | - |
| `--region` | Yes | Region | - |
| `--env` | No | Environment: prod/dev/test | prod |
| `--site` | No | Site: volcengine/byteplus | volcengine |
| `--project` | No | Project | default |
| `--credential` | No | Credential reference | equals site name |
| `--language` | No | Language: CN/EN | EN |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Profile name |
| `Env` | Environment |
| `Site` | Site |
| `Region` | Region |
| `Project` | Project |
| `CredentialRef` | Credential reference |
| `Language` | Language |

### profile list

List profiles stored locally.

```bash
milvus-cli profile list
```

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Profile name (current profile marked with *) |
| `Env` | Environment |
| `Site` | Site |
| `Region` | Region |
| `Project` | Project |
| `CredentialRef` | Credential reference |
| `Language` | Language |

### profile current

Print the current profile (the default context for most commands).

```bash
milvus-cli profile current
```

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Profile name |
| `Env` | Environment |
| `Site` | Site |
| `Region` | Region |
| `Project` | Project |
| `CredentialRef` | Credential reference |
| `Language` | Language |

### profile use

Switch the current profile.

```bash
milvus-cli profile use <name>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<name>` | Yes | Profile name |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Profile name |
| `Status` | active |

### profile set

Update fields of an existing profile.

```bash
milvus-cli profile set <name> [flags]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<name>` | Yes | Profile name |
| `--env` | No | Environment |
| `--site` | No | Site |
| `--region` | No | Region |
| `--project` | No | Project |
| `--credential` | No | Credential reference |
| `--language` | No | Language |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Profile name |
| `Env` | Environment |
| `Site` | Site |
| `Region` | Region |
| `Project` | Project |
| `CredentialRef` | Credential reference |
| `Language` | Language |

### profile delete

Delete a profile from local storage.

```bash
milvus-cli profile delete <name>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<name>` | Yes | Profile name |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | deleted |
| `Name` | Profile name |

## Examples

### Create a profile

```bash
milvus-cli profile create --name default --region cn-beijing --credential volcengine --language EN
milvus-cli profile create --name prod --region cn-shanghai --project my-project --language EN
```

### List profiles

```bash
milvus-cli profile list
```

### Check current profile

```bash
milvus-cli profile current
```

### Switch profile

```bash
milvus-cli profile use default
```

### Update a profile

```bash
milvus-cli profile set default --project new-project
milvus-cli profile set default --language CN
```

### Delete a profile

```bash
milvus-cli profile delete test-profile
```

## Common Next Steps

- View spec information: `milvus-cli spec version`, `milvus-cli spec node`
- Create an instance: `milvus-cli instance create --name my-instance ...`
- List instances: `milvus-cli instance list`
