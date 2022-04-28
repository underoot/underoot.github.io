---
layout: index

title: site@underoot ~
description: >-
  Aleksandr Shoronov. Software engineer. Podcaster. Believes in humankind 🚀
---
<h1>Aleksandr Shoronov</h1>
Software engineer.
Started development in the beginning of the XX century when his father
brought to home an old computer based on 80386SX.

He's been developing user interfaces in fintech, education and transport spheres.
When he is far away from his keyboard, prefers observe sky in night,
walks in new cities with his dog, reads books and learns new languages:
programming and natural. He knows
how to exit from ViM by several ways,
how to solve Hanoi Tower problem when there are three of you, but computer only one,
how to build Linux from scratch.
<address>
  {%- for contact in personal.contacts %}
    {{ contact.name }}: <a href="{{ contact.link }}" target="_blank">{{ contact.display }}</a><br />
  {%- endfor %}
</address>
<ul class="posts">
{%- for post in collections.post %}
  <li>
    <a href={{ post.url }}>
        <h2>{{ post.data.title }}</h2>
        <p>{{ post.data.description }}</p>
        <span class="more">Read more...</span>
    </a>
  </li>
{% endfor -%}
</ul>
