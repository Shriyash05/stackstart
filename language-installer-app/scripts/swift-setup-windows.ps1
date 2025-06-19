# Install Swift using winget
winget install -e --id Swift.Toolchain -h
# Add Swift to PATH (if not already)
$swiftPath = "$env:ProgramFiles\Swift\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $swiftPath, "User")
# Test installation
swift --version 