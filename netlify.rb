# This file is used by Netlify to help with dependency installation
# It ensures we use the correct versions of gems

# Detect if running on Netlify
if ENV['NETLIFY'] == 'true'
  puts "Running on Netlify environment"
  puts "Ruby version: #{RUBY_VERSION}"
  
  # Force specific versions of gems to avoid sass-embedded issues
  gem 'jekyll', '~> 4.3.2'
  gem 'jekyll-sass-converter', '~> 2.2.0'
  gem 'sassc', '~> 2.4.0'
  
  puts "Forced Jekyll version: ~> 4.3.2"
  puts "Forced jekyll-sass-converter version: ~> 2.2.0"
  puts "Forced sassc version: ~> 2.4.0"
end 