# Deployment Guide for nextCX Jekyll Site

This document provides instructions for deploying the nextCX Jekyll site to Netlify.

## Prerequisites

- A [Netlify](https://www.netlify.com/) account
- Git repository with your Jekyll site code
- Ruby 3.1.2 or later

## Deployment Steps

### 1. Connect to Git Repository

- Log in to Netlify
- Click "New site from Git"
- Connect to your Git provider (GitHub, GitLab, or Bitbucket)
- Select your repository

### 2. Configure Build Settings

Use these settings:

- **Build command**: `./build.sh`
- **Publish directory**: `_site`
- **Branch to deploy**: `main` (or your preferred branch)

### 3. Advanced Build Settings

Add these environment variables:

- `JEKYLL_ENV`: `production`
- `RUBY_VERSION`: `3.1.2` (or the version you're using)

### 4. Deploy!

Click "Deploy site" and Netlify will build and deploy your site.

## Continuous Deployment

After initial setup, Netlify will automatically deploy your site when you push changes to your repository.

## Troubleshooting

If you encounter build issues:

1. Check the build logs in Netlify
2. Ensure all gems in Gemfile are compatible with your Ruby version
3. Verify the `build.sh` script has execution permissions (`chmod +x build.sh`)
4. Ensure your repository includes all dependencies

## Custom Domain Setup

1. In Netlify, go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to set up DNS records

## Optimizations

This site is already optimized for production with:

- Asset minification 
- Caching headers for static assets
- Security headers for better protection
- SEO optimizations with sitemap and robots.txt
- HTML compression

## Maintenance

To update your site:

1. Make changes locally
2. Test using `JEKYLL_ENV=production bundle exec jekyll serve`
3. Commit and push changes
4. Netlify will automatically rebuild and deploy

## Further Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jekyll on Netlify Guide](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/) 