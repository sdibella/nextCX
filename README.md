# nextCX - Customer Experience Consulting Website

A Jekyll-based website for nextCX, a customer experience consulting company focused on using AI to better serve their customers.

## Features

- Clean, modern design with a focus on customer experience
- Responsive layout for all devices
- Blog section for thought leadership content
- Services section highlighting CX offerings
- Contact form for lead generation
- Coming soon section for future self-serve guides

## Technologies Used

- Jekyll 4.4.1
- SCSS for styling
- Font Awesome for icons
- Formspree for contact form handling
- Netlify for deployment

## Local Development

### Prerequisites

- Ruby 2.7.0 or higher
- Bundler
- Jekyll

### Setup

1. Clone the repository
```
git clone https://github.com/yourusername/nextCX.git
cd nextCX
```

2. Install dependencies
```
bundle install
```

3. Run the development server
```
bundle exec jekyll serve
```

4. View the site at `http://localhost:4000`

## Deployment

This site is configured for easy deployment on Netlify:

1. Push your repository to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `jekyll build`
   - Publish directory: `_site`

## Netlify Deployment

This site is configured for deployment on Netlify with specific settings to avoid the `sass-embedded` installation error and bundler version issues.

### Key Deployment Files

- **netlify.toml**: Configuration file for Netlify build settings, redirects, and headers
- **build.sh**: Simple build script that creates a custom Gemfile compatible with Netlify
- **.ruby-version**: Specifies Ruby 3.1.2 for consistency between local and Netlify environments
- **Gemfile**: Uses Jekyll 4.3.2 with jekyll-sass-converter 2.2 to avoid sass-embedded issues

### Troubleshooting Netlify Deployment

The build process has been simplified to work better with Netlify:

1. A custom Gemfile is created specifically for the Netlify environment
2. Only compatible gem versions are used (jekyll 4.3.2, jekyll-sass-converter 2.2)
3. The build script avoids specific version commands that may not be available in Netlify

This approach ensures compatibility with Netlify's build environment and avoids common errors with sass-embedded and bundler versions.

### Deployment Process

1. Push your changes to your Git repository
2. Netlify will automatically detect changes and trigger a build
3. The custom build script will install dependencies and build the site
4. The site will be deployed to your Netlify URL

If you encounter any deployment issues:
- Check the Netlify build logs for specific errors
- Test locally with `./build.sh` to simulate the Netlify environment
- If needed, simplify your Gemfile further by removing non-essential plugins

## Site Structure

- `_layouts/`: Contains the layout templates
- `_includes/`: Contains reusable components like header and footer
- `_posts/`: Contains blog posts
- `_services/`: Contains service pages
- `_sass/`: Contains SCSS files for styling
- `assets/`: Contains CSS, JavaScript, and images
- `_config.yml`: Site configuration

## Content Management

### Adding Blog Posts

Create a new Markdown file in the `_posts` directory with the format `YYYY-MM-DD-title.markdown`. Include the following front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0500
categories: category1 category2
author: Author Name
tags: tag1 tag2 tag3
---
```

### Adding Services

Create a new Markdown file in the `_services` directory with the format `service-name.md`. Include the following front matter:

```yaml
---
layout: page
title: Service Name
permalink: /services/service-name/
---
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact [info@nextcx.com](mailto:info@nextcx.com).

## Recent Fixes

The following issues were fixed in the site structure:

1. **Directory Structure**: Consolidated duplicate files from nested directories into a single coherent structure
2. **Navigation**: Fixed duplicate navigation items in the header
3. **Blog Posts**: Removed duplicate blog posts
4. **Dependencies**: Added missing Jekyll plugins (jekyll-sitemap, jekyll-seo-tag, jekyll-paginate)
5. **Netlify Configuration**: Added a netlify.toml file for deployment settings

The site now has a clean structure with:
- Proper site title and branding
- Clean navigation
- No duplicate content
- All required plugins installed 