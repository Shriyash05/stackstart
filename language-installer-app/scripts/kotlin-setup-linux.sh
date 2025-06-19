#!/bin/bash
sudo apt-get update
sudo apt-get install -y default-jdk
sudo snap install --classic kotlin
kotlinc -version 