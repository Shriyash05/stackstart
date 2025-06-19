#!/bin/bash
# Install Python using Homebrew
brew install python
# Add to PATH if needed
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
# Test installation
python3 --version 