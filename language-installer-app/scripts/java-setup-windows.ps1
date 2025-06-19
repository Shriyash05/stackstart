# Install OpenJDK (Java) using winget
winget install -e --id EclipseAdoptium.Temurin.17.JDK -h
# Add Java to PATH (if not already)
$javaPath = "$env:ProgramFiles\Eclipse Adoptium\jdk-17*\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $javaPath, "User")
# Test installation
java -version 