# Install PHP using winget
winget install -e --id PHP.PHP -h
# Add PHP to PATH (if not already)
$phpPath = "$env:ProgramFiles\PHP"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $phpPath, "User")
# Test installation
php --version 