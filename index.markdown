---
layout: default
title: "Jonathan Gottlieb"
permalink: /
---

Hey! I'm Jonathan. Welcome to my blog. A space to progress capture my projects, and share my work.


## Most recent 10 posts

<table>
  {% for post in site.posts limit:10 %}
    <tr>
      <td style="white-space: nowrap; padding-right: 1em;">
        {{ post.date | date: "%b %-d %Y" }}
      </td>
      <td>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </td>
    </tr>
  {% endfor %}
</table>

<p>and <a href="/categories">all posts by category</a>: (or see <a href="/popular-posts" style="color: #c25;">popular posts</a>)</p>
