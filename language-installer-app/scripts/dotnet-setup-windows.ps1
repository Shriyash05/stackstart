# Install .NET SDK using winget
winget install -e --id Microsoft.DotNet.SDK.8 -h
# Add .NET to PATH (if not already)
$dotnetPath = "$env:ProgramFiles\dotnet"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $dotnetPath, "User")
# Test installation
dotnet --version 