# Install Kotlin using winget
winget install -e --id JetBrains.Kotlin -h
# Add Kotlin to PATH (if not already)
$kotlinPath = "$env:ProgramFiles\Kotlin\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $kotlinPath, "User")
# Test installation
kotlinc -version 