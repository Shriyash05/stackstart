# Install Rust using winget
winget install -e --id Rustlang.Rustup -h
# Add Rust to PATH (if not already)
$rustPath = "$env:USERPROFILE\.cargo\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $rustPath, "User")
# Test installation
rustc --version 