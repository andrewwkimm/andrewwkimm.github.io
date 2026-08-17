# Frontend contract

## Purpose

The generated browser output is the product. SvelteKit, Go, or another generator may produce it. A generator change must preserve the routes, HTML structure, class names, behavior, and visual rules defined here.

Use this document with the files in `docs/frontend/fixtures/`. The fixtures define stable DOM shapes with illustrative content.

## Acceptance rule

A migration is complete when the new generator produces the same:

- public routes and trailing-slash behavior;
- semantic elements and class names shown in the fixtures;
- responsive layout at the documented breakpoints;
- keyboard and pointer behavior;
- light, dark, and print presentation;
- search, filtering, footnotes, figures, and adjacent-post navigation;
- RSS and newsletter endpoints.

Intentional changes require an update to this file and the affected fixture in the same commit.

## Routes

| Route | Output |
| --- | --- |
| `/` | Home page |
| `/blog/` | Blog index |
| `/blog/<slug>/` | Article |
| `/blog/tags/<tag>/` | Generated tag page |
| `/portfolio/` | Full portfolio |
| `/portfolio/<section>/` | Generated portfolio section |
| `/reading_list/` | Alphabetical reading list |
| `/search/` | Search page |
| `/search-index.json` | Generated search index |
| `/rss.xml` | RSS feed |
| Any missing route | Error page |

Static HTML routes use trailing slashes. Assets live under `/assets/`.

## Page shell

Every page uses this order:

1. `header.site-header`
2. optional `.search-drawer`
3. `main > .wrapper.page`
4. `footer.site-footer`

`body` is a full-height column flex container. `main` uses `flex: 1` to absorb only unused viewport height. Short pages push the footer to the viewport floor. Long pages keep the footer after the content in normal document flow. The footer is never fixed and never covers content.

`.wrapper` sets the shared content width. `.page` owns the space between the header rule and page content. `.site-footer` owns the space on both sides of its content. Final children end with zero bottom margin, which prevents extra boundary space.

The visible page title may be omitted when the page context is obvious, but every page must retain one `h1`. Use `.sr-only` for an intentionally hidden title.

## Spacing

The primitive scale is fixed in 4px steps. Primitive tokens describe size. Semantic tokens describe purpose.

| Semantic token | Value | Use |
| --- | ---: | --- |
| `--space-related` | 8px | Closely related text or controls |
| `--space-control` | 12px | Control interiors and compact groups |
| `--space-row` | 16px | Header interiors and list-row padding |
| `--space-rule` | 20px | Space on each side of an internal rule |
| `--space-item` | 24px | Peer items and filter-to-content separation |
| `--space-page` | 32px | Header-to-content and footer boundaries |
| `--space-article` | 40px | New article sections |
| `--space-section` | 48px | Major page sections |

Rules:

- Use semantic tokens for vertical page rhythm.
- Use primitive tokens for local geometry when no semantic role applies.
- Every spacing value comes from the documented scale.
- Adjacent regions that serve the same role use the same token.
- A full-width page rule has `--space-page` clearance from the nearest page content unless the rule is inside an article. Article rules use `--space-rule`.

## Typography

The body uses Lora with Georgia and Times New Roman fallbacks. The type scale lives in `src/app.css`. Headings use weight 600 and compact line height. Body text uses an 18px base size and 1.6 line height.

The body keeps one font family. Monospace is limited to code and generated code highlighting.

## Color

The palette is neutral. Links inherit text color and use underlines. Gray communicates secondary information. Saturated color is reserved for focus indication.

Dark mode changes palette tokens only. Component rules remain theme-neutral.

## Components

### Header and search

The brand links home. Primary navigation contains Blog, Portfolio, Reading List, Search, and the theme control. Mobile navigation uses the same links in a vertical layout.

Search requirements:

- substring matching only;
- at most six suggestions;
- Arrow Up and Arrow Down move selection;
- Enter opens the selected result;
- Enter with no selection opens `/search/?q=<value>`;
- Escape closes suggestions or the drawer;
- each combobox declares `aria-controls` for its listbox.

### Filters

Tag filters use a native `details` element. The menu stays open while selecting values. Outside click and Escape close it. Zero selected tags means all posts.

### Lists

Blog posts, books, portfolio entries, and search results use one rule between peer items. The final item has no bottom rule or bottom padding. Reading-list titles sort alphabetically while ignoring leading `A`, `An`, and `The`.

### Articles

Articles support headings, links, blockquotes, ordered and unordered lists, inline code, fenced code, captioned figures, decorative images, superscript footnotes, and previous/next navigation.

Adjacent-post links are ordered by publication date. A missing side remains empty. With one post, the navigation is absent.

### Footer

The footer has one top rule. These three gaps all use `--space-page`:

1. page content to the footer rule;
2. footer rule to the social and subscription row;
3. footer row to the copyright and page bottom.

The footer follows the sticky-footer pattern defined by the page shell. It remains in normal document flow. `main`, not the footer, receives unused viewport height.

The desktop footer uses a one-third/two-thirds grid. Mobile uses one column.

## Responsive behavior

The primary breakpoint is 700px.

Below it:

- navigation collapses behind the Menu button;
- portfolio media moves below its text;
- footer columns stack;
- article navigation stacks;
- page boundary spacing remains `--space-page`.

## Accessibility

Use native elements before ARIA. Every interactive control must be keyboard reachable and show a visible focus ring. Decorative images use empty alt text. Informative images require useful alt text. Each page has one `h1`. Listboxes and comboboxes must be connected with stable IDs.

## Migration procedure

A new generator must:

1. render the fixtures' DOM structure and class names;
2. copy `src/app.css` and static assets without visual changes;
3. generate the route table above;
4. implement the documented browser behavior;
5. compare desktop and mobile screenshots for every fixture;
6. verify keyboard search, filters, theme persistence, footnotes, and article navigation.

Backend templates may differ. Browser output changes only through an intentional contract update.
