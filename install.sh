#!/bin/sh

# Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
# SPDX-License-Identifier: MIT

set -e

REPO="volcengine/milvus-cli"
INSTALL_DIR="$HOME/.milvus-cli/bin"
BINARY_NAME="milvus-cli"

main() {
  need_cmd curl
  need_cmd uname

  local os arch ext version url artifact tmp_dir

  os="$(detect_os)"
  arch="$(detect_arch)"
  ext="$(archive_ext "$os")"
  version="${MILVUS_CLI_VERSION:-$(latest_version)}"
  version="$(echo "$version" | sed 's/^v//')"
  artifact="${BINARY_NAME}_${version}_${os}_${arch}.${ext}"
  url="https://github.com/${REPO}/releases/download/v${version}/${artifact}"

  printf "Detected platform: %s/%s\n" "$os" "$arch"
  printf "Installing milvus-cli %s ...\n" "$version"

  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "$tmp_dir"' EXIT

  printf "Downloading %s ...\n" "$url"
  curl -fSL -o "${tmp_dir}/${artifact}" "$url"

  printf "Extracting ...\n"
  extract "${tmp_dir}/${artifact}" "$tmp_dir" "$ext"

  mkdir -p "$INSTALL_DIR"

  local src="${tmp_dir}/${BINARY_NAME}"
  if [ ! -f "$src" ]; then
    src="${tmp_dir}/milvus-cli/${BINARY_NAME}"
  fi
  if [ ! -f "$src" ]; then
    err "binary not found in archive"
  fi

  cp "$src" "${INSTALL_DIR}/${BINARY_NAME}"
  chmod +x "${INSTALL_DIR}/${BINARY_NAME}"

  printf "\nmilvus-cli installed to %s/%s\n" "$INSTALL_DIR" "$BINARY_NAME"

  if ! echo "$PATH" | tr ':' '\n' | grep -qx "$INSTALL_DIR"; then
    printf "\nAdd the following to your shell profile (~/.bashrc, ~/.zshrc, etc.):\n"
    printf "\n  export PATH=\"%s:\$PATH\"\n\n" "$INSTALL_DIR"
  fi

  printf "Run 'milvus-cli version' to verify the installation.\n"
}

detect_os() {
  local uname_os
  uname_os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  case "$uname_os" in
    linux*)  echo "linux"  ;;
    darwin*) echo "darwin" ;;
    *)       err "unsupported OS: $uname_os" ;;
  esac
}

detect_arch() {
  local uname_arch
  uname_arch="$(uname -m)"
  case "$uname_arch" in
    x86_64|amd64)  echo "amd64" ;;
    arm64|aarch64) echo "arm64" ;;
    *)             err "unsupported architecture: $uname_arch" ;;
  esac
}

archive_ext() {
  echo "tar.gz"
}

latest_version() {
  local url="https://api.github.com/repos/${REPO}/releases/latest"
  local tag
  tag="$(curl -fsSL "$url" | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
  if [ -z "$tag" ]; then
    err "failed to determine latest version from GitHub"
  fi
  echo "$tag"
}

extract() {
  local archive="$1" dest="$2" ext="$3"
  case "$ext" in
    tar.gz) tar -xzf "$archive" -C "$dest" ;;
    *)      err "unsupported archive format: $ext" ;;
  esac
}

need_cmd() {
  if ! command -v "$1" > /dev/null 2>&1; then
    err "need '$1' (command not found)"
  fi
}

err() {
  printf "error: %s\n" "$1" >&2
  exit 1
}

main "$@"
