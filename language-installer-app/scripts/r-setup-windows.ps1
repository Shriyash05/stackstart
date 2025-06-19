# Install R using winget
winget install -e --id RProject.R -h
# Add R to PATH (if not already)
$rPath = "$env:ProgramFiles\R\R-*\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $rPath, "User")
# Test installation
R --version 