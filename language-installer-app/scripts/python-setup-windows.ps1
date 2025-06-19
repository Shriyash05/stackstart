# Install Python using winget
winget install -e --id Python.Python.3 -h
# Add Python to PATH (if not already)
$pythonPath = "$env:LOCALAPPDATA\Programs\Python\Python3*"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $pythonPath, "User")
# Test installation
python --version 