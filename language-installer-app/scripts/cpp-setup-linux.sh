#!/bin/bash
# Install build-essential (includes g++ for C++)
sudo apt-get update
sudo apt-get install -y build-essential
# Test installation
g++ --version 