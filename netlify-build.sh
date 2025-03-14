#!/bin/bash

# Exit if any command fails
set -e

# Show executed commands
set -x

# Print debug information
echo "====== Environment Information ======"
echo "Ruby version: $(ruby -v)"
echo "Gem version: $(gem -v)"
echo "Bundler versions: $(gem list bundler)"
echo "Current directory: $(pwd)"
echo "Directory contents: $(ls -la)"
echo "===================================="

# Try to install specific bundler versions
echo "Installing bundler 2.3.7 if needed..."
gem install bundler -v 2.3.7 || echo "Failed to install bundler 2.3.7, continuing with available version"

# Set bundler to use local path
export BUNDLE_PATH="vendor/bundle"

# Create a simplified Gemfile if necessary
if [ ! -f "Gemfile.simple" ]; then
  cat > Gemfile.simple << EOF
source "https://rubygems.org"
gem "jekyll", "~> 4.3.2"
gem "jekyll-sass-converter", "~> 2.2.0"
gem "sassc", "~> 2.4.0"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"
gem "jekyll-paginate"
gem "minima", "~> 2.5"
EOF
fi

# Try to use the normal Gemfile first
echo "Attempting to install dependencies from Gemfile..."
if bundle install; then
  echo "Successfully installed dependencies from Gemfile"
else
  echo "Failed to install dependencies from Gemfile, trying simplified Gemfile..."
  mv Gemfile Gemfile.original
  mv Gemfile.simple Gemfile
  bundle install
  echo "Successfully installed dependencies from simplified Gemfile"
fi

# Clean any old builds
echo "Cleaning previous build..."
bundle exec jekyll clean || echo "Jekyll clean failed, continuing anyway"

# Build the site
echo "Building site..."
JEKYLL_ENV=production bundle exec jekyll build

echo "Build completed successfully!"
ls -la _site 