#!/bin/bash

# Exit if any command fails
set -e

# Show executed commands
set -x

# Set bundler to use local path
export BUNDLE_PATH="vendor/bundle"

# Install dependencies
bundle config --local path vendor/bundle
bundle install

# Build the site
bundle exec jekyll build 