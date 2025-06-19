# Install Perl using winget
winget install -e --id StrawberryPerl.StrawberryPerl -h
# Add Perl to PATH (if not already)
$perlPath = "$env:ProgramFiles\Strawberry\perl\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $perlPath, "User")
# Test installation
perl --version 