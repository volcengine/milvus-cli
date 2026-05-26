# Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
# SPDX-License-Identifier: MIT

$ErrorActionPreference = "Stop"

$Repo = "volcengine/milvus-cli"
$BinaryName = "milvus-cli"
$InstallDir = Join-Path $env:USERPROFILE ".milvus-cli" "bin"

function Get-Arch {
    $arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
    switch ($arch) {
        "X64"   { return "amd64" }
        "Arm64" { return "arm64" }
        default { throw "Unsupported architecture: $arch" }
    }
}

function Get-LatestVersion {
    $url = "https://api.github.com/repos/$Repo/releases/latest"
    $response = Invoke-RestMethod -Uri $url -UseBasicParsing
    return $response.tag_name
}

function Main {
    $arch = Get-Arch
    $os = "windows"
    $ext = "zip"

    if ($env:MILVUS_CLI_VERSION) {
        $version = $env:MILVUS_CLI_VERSION
    } else {
        $version = Get-LatestVersion
    }
    $version = $version -replace "^v", ""

    $artifact = "${BinaryName}_${version}_${os}_${arch}.${ext}"
    $url = "https://github.com/$Repo/releases/download/v${version}/$artifact"

    Write-Host "Detected platform: $os/$arch"
    Write-Host "Installing milvus-cli $version ..."

    $tmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

    try {
        $archivePath = Join-Path $tmpDir $artifact
        Write-Host "Downloading $url ..."
        Invoke-WebRequest -Uri $url -OutFile $archivePath -UseBasicParsing

        Write-Host "Extracting ..."
        Expand-Archive -LiteralPath $archivePath -DestinationPath $tmpDir -Force

        if (-not (Test-Path $InstallDir)) {
            New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
        }

        $src = Join-Path $tmpDir "$BinaryName.exe"
        if (-not (Test-Path $src)) {
            $src = Join-Path $tmpDir "milvus-cli" "$BinaryName.exe"
        }
        if (-not (Test-Path $src)) {
            throw "binary not found in archive"
        }

        Copy-Item -Path $src -Destination (Join-Path $InstallDir "$BinaryName.exe") -Force

        Write-Host ""
        Write-Host "milvus-cli installed to $InstallDir\$BinaryName.exe"

        $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
        if ($currentPath -notlike "*$InstallDir*") {
            Write-Host ""
            Write-Host "Add $InstallDir to your PATH by running:"
            Write-Host ""
            Write-Host "  [Environment]::SetEnvironmentVariable('Path', '$InstallDir;' + [Environment]::GetEnvironmentVariable('Path', 'User'), 'User')"
            Write-Host ""
        }

        Write-Host "Run 'milvus-cli version' to verify the installation."
    } finally {
        Remove-Item -Path $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Main
