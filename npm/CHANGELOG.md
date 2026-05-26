# Changelog

## 1.0.1 (2026-05-13)

### Fixes

- Access Key values are now redacted by default in `auth` output to reduce the risk of exposing credentials in terminals or logs.
- `profile set-credential` now refreshes the active profile binding after credential updates, preventing subsequent commands from reading stale credential references.

### Docs

- Added `LICENSE` to the npm distribution directory and refreshed the bilingual changelog and related package documentation.

## 1.0.0 (2026-05-10)

### Features

- First stable release of `milvus-cli`, covering Volcengine Milvus Dedicated control plane, Serverless control plane, and data-plane commands.
- Dedicated control plane provides `profile`, `auth`, `spec`, `instance`, and `network` commands for instance creation, listing, details, nodes, scaling, billing, delete protection, endpoints, and resource spec queries.
- Serverless control plane provides `serverless instance` and `serverless network` commands for Serverless instance and private/public endpoint management.
- Data plane provides `connection`, `database`, `collection`, `partition`, `alias`, `index`, `vector`, `user`, and `role` commands, covering common Milvus management and vector operation workflows.
- `data connection create` supports `--from-instance` and `--from-serverless` to auto-fill private address, username, TLS, and source metadata from control-plane instances.

### Improvements

- All commands support stable `table`, `json`, and `yaml` output; control-plane list commands support pagination parameters and JSON/YAML envelope output.
- Prebuilt binary archives for Linux, macOS, and Windows on `amd64/arm64`, with checksum verification, shell completion files, and npm installer distribution.
- Added Go tests, E2E YAML configuration conventions, npm installer tests, release preflight, and snapshot smoke documentation for release quality assurance.

### Security

- Sensitive fields in local credentials and data connections are encrypted at rest, reducing the risk of plaintext exposure for AK/SK, passwords, tokens, and API keys.

### Docs

- Added npm package documentation and changelog, aligned with the 1.0.0 stable release.
