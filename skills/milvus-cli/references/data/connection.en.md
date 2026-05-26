# connection Command

Manage local data connection profiles for connecting to Milvus clusters in subsequent data-plane commands.

## Purpose

The connection command group is used to create, view, switch, test, and delete locally saved Milvus connection configurations. These configurations are reused by all subsequent data subcommands to avoid repeatedly entering connection information.

## Prerequisites

1. For manual connections, have an accessible Milvus server endpoint (e.g., `localhost:19530` or `https://milvus.example.com:19530`)
2. For instance-derived connections, the current profile must have the region and cloud credentials required to query dedicated or serverless instances
3. Prepare one of the following authentication credentials:
   - Token authentication: a valid Token is required
   - Username/Password authentication: username and password are required
   - API Key authentication: an API Key is required

## Commands

### connection create

Create a new local data connection.

```bash
milvus-cli data connection create [flags]
```

#### Important Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `--name` | Conditional | Connection name for future reference; in source mode, defaults to the instance ID when omitted | `--name sample` |
| `--address` | Conditional | Milvus address and port; required in manual mode and auto-filled with the private endpoint in source mode | `--address localhost:19530` |
| `--auth-method` | Conditional | Auth method: `token`/`username`/`api-key`; required in manual mode and fixed to `username` in source mode | `--auth-method token` |
| `--token` | Conditional | Token value (required when auth-method=token) | `--token <TOKEN>` |
| `--username` | Conditional | Username (required when auth-method=username); auto-filled from instance metadata in source mode | `--username root` |
| `--password` | Conditional | Password (required when auth-method=username or when using source mode) | `--password <PASSWORD>` |
| `--api-key` | Conditional | API Key (required when auth-method=api-key) | `--api-key <API_KEY>` |
| `--database` | No | Default database name, defaults to `default` | `--database demo` |
| `--tls` | No | Enable TLS connection; in source mode, TLS is inferred from whether the address starts with `https://` | `--tls` |
| `--server-name` | No | Override TLS server name | `--server-name milvus.example.com` |
| `--ca-cert-path` | No | Path to custom CA certificate | `--ca-cert-path /path/to/ca.crt` |
| `--from-instance` | No | Query a dedicated instance by instance ID and auto-fill the private endpoint, username, and source metadata; mutually exclusive with `--from-serverless` | `--from-instance milvus-xxx` |
| `--from-serverless` | No | Query a serverless instance by instance ID and auto-fill the private endpoint, username, and source metadata; mutually exclusive with `--from-instance` | `--from-serverless ms-xxx` |

#### Create from Control-Plane Instances

`connection create` can query instance details from the current profile and generate a local data connection automatically:

1. `--from-instance <instance-id>`: inherit connection metadata from a dedicated instance.
2. `--from-serverless <instance-id>`: inherit connection metadata from a serverless instance.
3. The two source flags are mutually exclusive.
4. Source mode uses `username/password` authentication by default. The username is read from instance metadata, and you still need to provide the password with `--password`.
5. The address uses the private endpoint. If the address starts with `https://`, the CLI enables TLS automatically.
6. `--name` is optional. When omitted, the instance ID is used as the connection name; when provided, `--name` overrides it.
7. In source mode, do not manually pass `--address`, `--auth-method`, `--username`, `--token`, `--api-key`, `--tls`, `--server-name`, or `--ca-cert-path`.

### connection list

List all locally saved data connections.

```bash
milvus-cli data connection list [flags]
```

#### Output

| Field | Description |
|-------|-------------|
| `Name` | Connection name, active connection prefixed with `*` |
| `Address` | Milvus server address |
| `Database` | Default database |
| `AuthMethod` | Authentication method |
| `TLSEnabled` | Whether TLS is enabled |
| `Source` | Connection source |
| `LastUsedAt` | Last used time |

### connection current

Show the currently active connection profile.

```bash
milvus-cli data connection current [flags]
```

### connection use

Switch to the specified connection.

```bash
milvus-cli data connection use <name> [flags]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Connection name to switch to |

### connection test

Test the connectivity of a connection.

```bash
milvus-cli data connection test [name] [flags]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | No | Connection name to test, uses current connection if omitted |

### connection delete

Delete the specified connection profile.

```bash
milvus-cli data connection delete <name> [flags]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Connection name to delete |

**Note**: You must switch to another connection before deleting the current active connection.

## Examples

### Create Connections with Different Auth Methods

```bash
# Token authentication
milvus-cli data connection create \
  --name sample \
  --address localhost:19530 \
  --auth-method token \
  --token <YOUR_TOKEN>

# Username/Password authentication
milvus-cli data connection create \
  --name admin \
  --address localhost:19530 \
  --auth-method username \
  --username root \
  --password <YOUR_PASSWORD>

# API Key authentication + TLS
milvus-cli data connection create \
  --name cloud \
  --address https://milvus.example.com:19530 \
  --auth-method api-key \
  --api-key <YOUR_API_KEY> \
  --tls
```

### Create Connections from Control-Plane Instances

```bash
# Create from a dedicated instance; the connection name defaults to the instance ID
milvus-cli data connection create \
  --from-instance <INSTANCE_ID> \
  --password <YOUR_PASSWORD>

# Create from a serverless instance and override the connection name
milvus-cli data connection create \
  --name prod-serverless \
  --from-serverless <INSTANCE_ID> \
  --password <YOUR_PASSWORD>
```

### View and Manage Connections

```bash
# List all connections
milvus-cli data connection list

# View current connection
milvus-cli data connection current

# Switch connection
milvus-cli data connection use sample

# Test connection
milvus-cli data connection test sample

# Delete connection
milvus-cli data connection delete old-conn
```

### Using JSON/YAML Output

```bash
# JSON format output
milvus-cli data connection list --output json

# YAML format output
milvus-cli data connection current --output yaml
```

## Output

### connection list (table format)

```
+---------+-------------------+----------+------------+------------+--------+------------+
| Name    | Address           | Database | AuthMethod | TLSEnabled | Source | LastUsedAt |
+---------+-------------------+----------+------------+------------+--------+------------+
| *sample | localhost:19530   | default  | token      | false      | manual | 2026-05-01T... |
| cloud   | milvus.example... | default  | api-key    | true       | manual | 2026-04-30T... |
+---------+-------------------+----------+------------+------------+--------+------------+
```

`*` indicates the currently active connection.

### connection current (table format)

```
+------------+-----------------+
| Field      | Value           |
+------------+-----------------+
| Name       | sample          |
| Address    | localhost:19530 |
| Database   | default         |
| AuthMethod | token           |
| TLSEnabled | false           |
| Source     | manual          |
+------------+-----------------+
```

## Common Next Steps

- Use `milvus-cli data database list` to view available databases
- Use `milvus-cli data collection create` to create collections
- Use `milvus-cli data connection test` to verify connection status
- Configure multiple connections to manage different environments (dev/test/prod)
