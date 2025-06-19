# Install Ruby using winget
winget install -e --id RubyInstallerTeam.RubyWithDevKit -h
# Add Ruby to PATH (if not already)
$rubyPath = "$env:ProgramFiles\Ruby*\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $rubyPath, "User")
# Test installation
ruby --version 