---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-index">
  <div class="posts-grid">
    {% for post in site.posts %}
    <div class="post-card">
      <div class="post-card-content">
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
      </div>
    </div>
    {% endfor %}
  </div>
</div> 