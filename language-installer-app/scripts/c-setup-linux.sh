#!/bin/bash
# Install build-essential (includes gcc for C)
sudo apt-get update
sudo apt-get install -y build-essential
# Test installation
gcc --version 