# Install Go using winget
winget install -e --id GoLang.Go -h
# Add Go to PATH (if not already)
$goPath = "$env:ProgramFiles\Go\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $goPath, "User")
# Test installation
go version 