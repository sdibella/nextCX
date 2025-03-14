#!/bin/bash
# Simple build script for Netlify that uses the default environment

set -e # Exit on error
set -x # Echo commands

# Create a new Gemfile with known-good gems
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
EOF

# Back up original Gemfile and use simplified one
mv Gemfile Gemfile.original
mv Gemfile.netlify Gemfile

# Set bundle path and install dependencies
export BUNDLE_PATH="vendor/bundle"
bundle install

# Build the site
JEKYLL_ENV=production bundle exec jekyll build

echo "Build completed successfully!"
ls -la _site 