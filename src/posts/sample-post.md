---
title: Sample Post
date: '2026-08-16'
summary: A generic post for testing article content and presentation.
tags:
  - sample
---

This paragraph tests a [standard link](https://example.com), `inline code`, emphasis, and a
footnote reference.<sup class="fnref" id="fnref-1"><a href="#fn-1" aria-label="Footnote 1">1</a></sup>

## Text elements

> This blockquote tests indented supporting text.

An unordered list:

- First item
- Second item
- Third item

An ordered list:

1. First step
2. Second step
3. Third step

## Captioned figure

![This caption tests the figure renderer and its spacing.](/assets/images/at-the-table.webp)

## Decorative figure

![](/assets/images/american-beauty-institute.png)

## Code block

    def sample(value: str) -> str:
        """Returns a formatted sample value."""
        return f"Sample: {value}"

The closing paragraph tests the final text-to-footnote spacing.

<section class="footnotes" aria-label="Footnotes">
  <ol>
    <li class="fn" id="fn-1">
      <p>
        This note tests superscript navigation and the return link.
        <a class="fn-back" href="#fnref-1" aria-label="Return to footnote reference">↩</a>
      </p>
    </li>
  </ol>
</section>
