#!/bin/bash
# Enhanced build script for Netlify that optimizes for production

set -e # Exit on error
set -x # Echo commands

echo "Starting production build process for Jekyll site..."

# Clean up any previous build artifacts
echo "Cleaning up previous build artifacts..."
rm -rf _site .jekyll-cache

# Create a new Gemfile with production-optimized gems
cat > Gemfile.netlify << EOF
source "https://rubygems.org"
gem "jekyll", "~> 4.3.2"
gem "jekyll-sass-converter", "~> 2.2.0"
gem "sassc", "~> 2.4.0"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"
gem "jekyll-paginate"
gem "minima", "~> 2.5"
gem "jekyll-compress-images" if Gem::Specification::find_all_by_name('jekyll-compress-images').any?
EOF

# Back up original Gemfile and use simplified one
mv Gemfile Gemfile.original
mv Gemfile.netlify Gemfile

# Set bundle path and install dependencies
export BUNDLE_PATH="vendor/bundle"
bundle install

# Build the site with production settings
echo "Building Jekyll site with production settings..."
JEKYLL_ENV=production bundle exec jekyll build --verbose

# Post-processing: Verify the build
echo "Verifying build..."
if [ -d "_site" ]; then
  echo "Build completed successfully!"
  echo "Site structure:"
  find _site -type f | sort | head -20
  echo "..."
  echo "Total files: $(find _site -type f | wc -l)"
  echo "Total size: $(du -sh _site | cut -f1)"
else
  echo "Build failed: _site directory not found!"
  exit 1
fi

# Restore original Gemfile
mv Gemfile.original Gemfile

echo "Build process completed!" 