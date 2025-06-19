# Install Node.js using winget
winget install -e --id OpenJS.NodeJS.LTS -h
# Add Node.js to PATH (if not already)
$nodePath = "$env:ProgramFiles\nodejs"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $nodePath, "User")
# Test installation
node --version 