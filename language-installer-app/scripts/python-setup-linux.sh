#!/bin/bash
# Install Python using apt
sudo apt-get update
sudo apt-get install -y python3 python3-pip
# Add to PATH if needed
echo 'export PATH="/usr/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# Test installation
python3 --version 