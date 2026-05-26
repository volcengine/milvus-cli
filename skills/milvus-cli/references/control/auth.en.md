# auth

Manage AK/SK credentials used by milvus-cli.

## Purpose

The `auth` command is used to manage access credentials for Volcengine/BytePlus. Credentials must be saved before calling control plane APIs.

## Prerequisites

- Have Volcengine or BytePlus AK/SK credentials
- Credentials can be provided via:
  - Command flags: `--ak`, `--sk`
  - Environment variables: `VOLCSTACK_ACCESS_KEY_ID`, `VOLCSTACK_SECRET_ACCESS_KEY`

## Commands

### auth login

Save AK/SK credentials to the local credential store.

```bash
milvus-cli auth login --name <name> --ak <AK> --sk <SK>
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--name` | Yes | Credential name for distinguishing different credentials |
| `--ak` | Yes | Access Key ID |
| `--sk` | Yes | Secret Access Key |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Credential name |
| `Site` | Site |
| `AccessKeyID` | Access Key ID (partially displayed) |
| `CurrentProfile` | Current profile |

### auth status

Show the current (or specified) credential status.

```bash
milvus-cli auth status [--name <name>]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--name` | No | Credential name; when omitted, follows the current profile's credential reference |

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Credential name |
| `Site` | Site |
| `AccessKeyID` | Access Key ID |
| `CurrentProfile` | Current profile |

### auth logout

Remove a credential from the local credential store.

```bash
milvus-cli auth logout [--name <name>]
```

#### Important Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `--name` | No | Credential name; when omitted, follows the current profile's credential reference |

#### Output

| Field | Description |
|-------|-------------|
| `Status` | logged out |
| `Name` | Credential name |
| `CurrentProfile` | Current profile |

## Examples

### Login and save credentials

```bash
milvus-cli auth login --name volcengine --ak <AK> --sk <SK>
```

### Check credential status

```bash
milvus-cli auth status
milvus-cli auth status --name volcengine
```

### Remove credentials

```bash
milvus-cli auth logout --name volcengine
```

## Common Next Steps

- Create a profile that references this credential: `milvus-cli profile create --credential <name>`
- Check current profile: `milvus-cli profile current`
- Switch to a specific profile: `milvus-cli profile use <name>`
