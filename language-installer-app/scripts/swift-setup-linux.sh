#!/bin/bash
sudo apt-get update
sudo apt-get install -y clang libicu-dev
wget https://swift.org/builds/swift-5.9.2-release/ubuntu2204/swift-5.9.2-RELEASE/swift-5.9.2-RELEASE-ubuntu22.04.tar.gz
sudo tar xzf swift-5.9.2-RELEASE-ubuntu22.04.tar.gz -C /opt/
export PATH=/opt/swift-5.9.2-RELEASE-ubuntu22.04/usr/bin:$PATH
swift --version 