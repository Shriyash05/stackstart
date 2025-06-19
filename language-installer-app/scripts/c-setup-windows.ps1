# Install MSYS2 (includes gcc for C)
winget install -e --id MSYS2.MSYS2 -h
# Add MSYS2 to PATH
$msysPath = "$env:ProgramFiles\MSYS2\usr\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $msysPath, "User")
# Test installation
gcc --version 