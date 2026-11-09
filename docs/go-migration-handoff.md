# andrewwkimm.github.io: Go static site generator handoff

Written 2026-08-15. This document carries every decision, its justification, and every open question from the design session. A new session should be able to start building from this alone.

## 1. What this project is

One private static site generator, written in Go, that reads a committed Markdown content tree and writes a static HTML site to `dist/`. GitHub Actions builds it and uploads `dist/` as the GitHub Pages artifact.

Replaces an existing SvelteKit site at `andrewwkimm.github.io`. The visual design is a near-exact preservation of the original: white background, Lora serif, 810px body, 5px dark top border, gray nav.

Constraints that shaped every decision:

- No supported Go API. Nothing external imports this.
    
- No server, no database, no authentication. GitHub Pages serves static files only and cannot process a form or set response headers.
    
- One binary.
    
- Content stays Markdown with YAML front matter, for portability if the project migrates again.
    
- Authored JavaScript stays in one file, vanilla, with no npm dependency.
    

## 2. Locked decisions

|   |   |
|---|---|
|Decision|Value|
|Language|Go|
|Module layout|One module, one `package main`, all Go files at the repository root|
|`internal/`|Not used|
|`cmd/`|Not used|
|`pkg/`|Not used|
|Output directory|`dist/`, gitignored|
|Static source directory|`static/`, flattened (no `assets/` level)|
|Content directory|`content/`|
|Template directory|`templates/`, `.html` files only|
|Page structure|Multi-page. One HTML file per URL|
|Browser code|One file, `static/js/site.js`, vanilla, `// @ts-check` plus JSDoc|
|TypeScript|No. Type checking via `jsconfig.json`, no compile step|
|Figures|Alt text becomes the caption. No numbering|
|Contact page|Removed. Email lives on the home page and in the footer|
|Resume page|Deferred, not deleted. Recoverable from session history|
|Newsletter|Footer subscribe form posting to a third-party endpoint|

### Why one flat root package

Go's [official module layout guide](https://go.dev/doc/modules/layout) sanctions this directly. Under "Basic command" it shows a larger program with code split across multiple files, all declaring `package main`, at the module root, and notes that `main.go` holding `func main` is a convention rather than a requirement. It introduces `internal/` only when a command benefits from splitting off supporting functionality, and calls `cmd/` a convention that is not strictly necessary in a repository consisting only of commands.

A `site` package was proposed and rejected. Its exported surface would have been `site.Build`, `site.Render`, `site.CopyStatic`, `site.WriteRSS`, `site.WriteSearchIndex`, which restates the whole program. That fails the package-boundary test in Andrew's `Skills/go-project-layout/SKILL.md`: a shallow package whose exported identifiers teach a reader almost everything its implementation does is a defect when the package exists to contain complexity. Go's [package names blog post](https://go.dev/blog/package-names) states the same test: if you cannot come up with a package name that is a meaningful prefix for the package's contents, the package abstraction boundary may be wrong.

### Triggers for revisiting the flat layout

Extract a package when one of these becomes true, not before:

- A second binary appears and needs the same logic (a preview server, a front matter linter). Two callers make the export list a real interface.
    
- `main.go` grows work of its own: subcommand dispatch, a watch loop, config file loading.
    
- A capability develops an interface meaningfully narrower than its implementation. Search indexing is the plausible first candidate, once it grows tokenization and stemming. Extract `search/`, not `site/`.
    

Do not create empty placeholder directories while waiting.

## 3. Evidence discipline

This matters because the session initially got it wrong and had to correct.

Andrew's `Skills/go-project-layout/SKILL.md` places repository precedent at tier 6 of 7 in its evidence hierarchy, below toolchain behavior, official documentation, official review and naming guidance, the Uber style guide, and established practitioner analysis (Alex Edwards, Dave Cheney, Mat Ryer, Ben Johnson). Its "Practices to reject" section names "calling a structure idiomatic solely because several popular repositories use it." Its review standard rejects a repository citation lacking a pinned revision, inspected code, analogous constraint, or stated limitation.

Two research passes cited 22 and then 12 repositories by star count. That was tier-6 reasoning applied to questions tiers 1 through 5 already answered, and it produced one visible failure: the output directory name flip-flopped from `dist` to `public` and back.

The guide's full-stack reference states that no universal frontend directory appears, and that you choose from toolchain ownership, publication boundaries, and embedding behavior. Its default decisions say to keep non-Go content outside Go package taxonomies. That settles the structure of `content/`, `templates/`, `static/`, `dist/` and explicitly declines to name them. Their names are project judgment, and should be labeled as such rather than defended with repository counts.

Classification of every material decision:

|   |   |
|---|---|
|Decision|Evidence class|
|One module, root `package main`|Official guidance|
|No `internal`, `cmd`, `pkg`, `site`|Official guidance plus house rule|
|`Config` struct, orchestration in `build.go`, thin `main`|Style rule|
|Names `content/`, `templates/`, `static/`, `dist/`|Project judgment|
|Flattened `static/` with no `assets/` level|Project judgment|
|File names `build.go`, `frontmatter.go`, etc.|Project judgment|
|Multi-page output|Requirement (RSS item URLs, permalinks, `404.html`)|

The guide has no static-site-generator coverage and no equivalent product shape in its audit set. A candidate benchmark case was drafted but not written into the vault: a private single-binary generator that reads a committed content tree and writes generated HTML with no public Go API, whose required conclusions are that non-Go input and output directories fall outside package taxonomy, their names are project judgment, and no repository precedent establishes a convention.

## 4. Repository layout

```
andrewwkimm.github.io/
├── go.mod
├── go.sum
├── jsconfig.json              # scopes editor type checking to static/js
├── .gitignore                 # includes /dist/
├── README.md
│
├── main.go                    # shell: flags -> Config -> Build -> exit status
├── build.go                   # shell: orchestration, every read and write
├── build_test.go              # only test touching disk, via t.TempDir()
├── content.go                 # core: Page type, collection transforms
├── content_test.go
├── frontmatter.go             # core: split on ---, parse YAML
├── frontmatter_test.go
├── markdown.go                # core: Markdown body -> HTML fragment
├── render.go                  # core: template + data -> io.Writer
├── render_test.go
├── rss.go                     # core: pages -> feed bytes via encoding/xml
├── search.go                  # core: pages -> index bytes
├── search_test.go
│
├── content/
│   ├── posts/*.md
│   ├── portfolio/
│   │   ├── consulting/*.md
│   │   ├── projects/*.md
│   │   └── open-source/*.md
│   └── reading/*.md
│
├── templates/                 # .html only, no Go files, no rss.xml
│   ├── base.html
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   ├── home.html
│   ├── blog.html              # post index, also renders /tags/<tag>/
│   ├── post.html
│   ├── portfolio.html         # also renders /portfolio/<section>/
│   ├── reading.html           # also renders /reading/<status>/
│   ├── search.html
│   └── 404.html
│
├── static/                    # copied to dist/ unchanged
│   ├── css/site.css
│   ├── js/site.js
│   ├── images/
│   ├── icons/
│   ├── favicon.ico
│   └── robots.txt
│
├── dist/                      # generated, gitignored
└── .github/workflows/pages.yml
```

Thirteen root `.go` files. `favicon.ico` and `robots.txt` sit at the top of `static/` because both must land at the site root.

`templates/` holds no RSS template. Build the feed in `rss.go` with `encoding/xml`, which keeps the directory's name honest.

## 5. Output tree

Ten generated page types.

```
dist/
├── index.html
├── blog/index.html
├── posts/<slug>/index.html
├── tags/<tag>/index.html
├── portfolio/index.html
├── portfolio/<section>/index.html      # consulting, projects, open-source
├── reading/index.html
├── reading/<status>/index.html         # reading, finished, want-to-read
├── search/index.html
├── 404.html
├── rss.xml
├── search-index.json
├── css/site.css
├── js/site.js
├── images/...
├── icons/...
├── favicon.ico
└── robots.txt
```

`404.html` at the output root is the documented mechanism. GitHub's docs state that unmatched paths are handled by a `404.html` or `404.md` file in the publishing source.

`actions/upload-pages-artifact` archives the contents of the directory passed as `path`, not the directory entry itself, so the output directory name has no effect on deployment.

Filtered pages exist so tag, section, and status browsing works with JavaScript disabled, and so each is a crawlable URL. Multi-select filtering is client-side enhancement layered on top, with a `<noscript>` block linking to the single-value pages.

## 6. Package structure and the functional core

All thirteen files are one `package main`. File names do not create namespaces, so every identifier shares one namespace. This was a real bug in an earlier draft: `func Page(w io.Writer, ...)` in `render.go` collided with `type Page` in `content.go`.

Two files do I/O. Five are pure.

```go
// ---------- imperative shell ----------

// main.go
func main()   // flags -> Config -> Build -> exit status

// build.go
type Config struct {
	ContentDir   string
	TemplatesDir string
	StaticDir    string
	OutputDir    string
	BaseURL      string
	BuildTime    time.Time   // injected, never time.Now() inside the core
}

func Build(cfg Config) error
func loadPages(dir string) (pages []Page, err error)
func loadTemplates(dir string) (*template.Template, error)
func copyStatic(srcDir, dstDir string) error
func writeFile(path string, data []byte) error
func validateConfig(cfg Config) error

// ---------- functional core ----------

// frontmatter.go
func splitFrontMatter(raw []byte) (meta, body []byte, err error)
func parseFrontMatter(meta []byte) (FrontMatter, error)

// content.go
type Page struct { ... }
func newPage(path string, raw []byte) (Page, error)
func sortPagesByDate(pages []Page) []Page
func sortPagesByTitle(pages []Page) []Page      // ignores leading articles
func filterPagesBySection(pages []Page, section string) []Page
func groupPagesByTag(pages []Page) map[string][]Page

// markdown.go
func markdownToHTML(body []byte) ([]byte, error)

// render.go
func renderPage(w io.Writer, t *template.Template, name string, p Page) error
func renderIndex(w io.Writer, t *template.Template, name string, pages []Page) error

// rss.go
func renderRSS(pages []Page, baseURL string, now time.Time) ([]byte, error)

// search.go
func buildSearchIndex(pages []Page) ([]byte, error)
```

Three decisions inside that seam:

Case of top-level identifiers: nothing imports `package main`, so `Build`, `Config`, and `Page` gain nothing from being exported; lowercase names (`build`, `config`, `page`) are more honest. The exception is struct fields consumed by `html/template`, which must stay exported — template execution can only read exported fields.

`BuildTime` is injected rather than read from the clock inside `rss.go`. A feed that calls the clock internally cannot be golden-file tested, and the RSS `pubDate` is the one place a hidden clock would leak.

`renderPage` and `renderIndex` take an `io.Writer` because that is the shape `html/template`'s `Execute` wants. The shell passes a file, tests pass a `bytes.Buffer`. `renderRSS` and `buildSearchIndex` return `[]byte` instead, since each produces one small whole artifact and byte comparison is the natural assertion.

`loadTemplates` sits in the shell while `renderPage` does not. Parsing templates off disk is I/O; applying a parsed template is not. That split keeps `render_test.go` free of fixture directories.

The shell owns every `os.ReadFile`, `os.WriteFile`, `os.MkdirAll`, `filepath.WalkDir`, `template.ParseFiles`, and `time.Now`. The practical test: every core file's tests construct inputs as literals in the test body, and only `build_test.go` needs a temp directory.

### File name boundaries to keep hard

`markdown.go` converts a Markdown body to an HTML fragment and knows nothing about templates or pages. `render.go` places page data into a template and knows nothing about Markdown.

`frontmatter.go` operates on raw bytes and produces a `FrontMatter`. `content.go` assembles typed `Page` values and operates on collections. `newPage` calls into both `frontmatter` and `markdown`; neither calls back.

### Ordering inside files

Per Andrew's house rules, core files follow the Stepdown Rule: exported entry point first, then callees depth-first, each immediately after its caller, with `validate*` and `check*` helpers last. This matters most in `build.go`, where `validateConfig` goes at the bottom despite running first. Test files invert it: helpers at the top, alphabetical, then the tests.

## 7. Design tokens

Transcribed verbatim from the approved prototype. The palette and the scale are separate `:root` blocks on purpose: the dark theme overrides the palette and nothing else, so keeping them together misleads anyone who forks the CSS.

**Superseded 2026-09-17.** The block below predates the current repo. `src/app.css` now uses plain palette names (`--bg`, not `--artifact-bg`), `--space-*` (not `--sp-*`), and adds tiers this block lacks: semantic rhythm (`--space-related` through `--space-section`), widths (`--width-page/article/intro`), line heights (`--lh-body/heading/code`), icon sizes (`--icon-lg/md/sm`), and `--border-accent`. Lift tokens from the repo's `app.css` and `DESIGN.md`, not from this block.

```css
:root {
  /* Palette. The dark theme below overrides these and nothing else. */
  --artifact-bg: #ffffff;
  --artifact-text: #111111;
  --artifact-gray: #828282;
  --artifact-dark-gray: #424242;
  --artifact-border: #e8e8e8;
  --artifact-soft: #f6f6f4;
  --artifact-pill: #f2f2f0;
  --artifact-code-bg: #f4f4f2;
  --artifact-code-text: #33342e;
  --artifact-code-key: #a626a4;
  --artifact-code-str: #50a14f;
  --artifact-code-com: #a0a1a7;
  --artifact-focus: #8bbcf1;
  --artifact-mark: #fdf6dd;
}
:root {
  /* Type, space, and radius scale. Fork-safe: edit these, not individual rules. */
  --fs-hero: 3.2rem;
  --fs-brand: 30px;
  --fs-h1: 2rem;
  --fs-h2: 1.4rem;
  --fs-h3: 1.25rem;
  --fs-h4: 1.15rem;
  --fs-body: 18px;
  --fs-sm: 16px;
  --fs-meta: 15px;
  --fs-pill: .78rem;
  --fs-xs: 13px;
  --fs-code: 14px;
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 20px;
  --sp-6: 24px;
  --sp-7: 32px;
  --sp-8: 40px;
  --sp-9: 48px;
  --sp-10: 64px;
  --sp-11: 80px;
  --radius-sm: 3px;
  --radius-md: 8px;
  --radius-pill: 999px;
}
html[data-theme='dark'] {
  --artifact-bg: #181818;
  --artifact-text: #eeeeee;
  --artifact-gray: #a2a2a2;
  --artifact-dark-gray: #d0d0d0;
  --artifact-border: #363636;
  --artifact-soft: #222222;
  --artifact-pill: #262626;
  --artifact-code-bg: #202020;
  --artifact-code-text: #d8d8d2;
  --artifact-code-key: #c678dd;
  --artifact-code-str: #98c379;
  --artifact-code-com: #7f848e;
  --artifact-focus: #7db3f4;
  --artifact-mark: #33301f;
}
```

An audit found 35 distinct spacing values and 20 distinct font sizes before this pass, including six sizes between 1.10rem and 1.32rem. Every margin, padding, and gap now references a token: 162 references.

### Spacing rules, stated

These belong in `README.md`. Right now they are implicit in the values, and a fork cannot follow a rule it cannot read.

- `--sp-1` (4px): joins lines within one block. Title to author, status to genre, title to meta.
    
- `--sp-2` (8px): separates a control from what precedes it. Review toggle to its expanded panel.
    
- `--sp-5` (20px): the interval above a rule inside a document. Post body to the footnotes rule, post body to the prev/next rule.
    
- `--sp-6` (24px): separates list entries. Portfolio entry to its rule, section rule to the next entry title.
    
- `--sp-7` (32px): clearance on both sides of any full-width rule that separates page regions. Header rule to first content, content to footer rule, footer rule to social links, form to copyright, copyright to page bottom.
    
- Header bar padding is `--sp-3` (12px) and does not follow the 32px rule. A header is a container holding one line, not a region boundary. The brand is 30px against 19px nav text, so 32px padding would make it a 94px banner.
    
- Prev/next block: 20px above its rule, 80px below (4x). Composed of `--sp-9` inside `.article-foot` plus the page's own `--sp-7`.
    

### Color constraint, stated

The palette is text, dark-gray, gray, border, and two soft backgrounds. No saturated color anywhere on the page.

This is the decision most likely to be violated by someone who does not know it was deliberate. Footnote superscripts and body hyperlinks are gray, not blue, because blue is the loudest signal available and spending it on asides inverts the hierarchy. Andrew's reasoning, which is the stronger argument: a blue link pulls a reader toward a caveat instead of the argument, the same way a blue URL on a resume pulls attention from accomplishments. Links and superscripts are FYIs, not competitors for attention.

Body links inherit the text color with a gray underline. On hover the underline darkens and the text lightens. Superscripts are small and gray, unstyled until hover.

The one case to reconsider: a post that is mostly a link roundup, where links are the content.

## 8. Page-by-page specification

### Home (`dist/index.html`)

Bio only. No `<h1>`, no recent-posts list. Opens with the Queens and Daegu paragraph. Email is offered inline as the contact route.

### Blog (`dist/blog/index.html`)

No lede. Opens directly on the Tags dropdown and the post list.

Each row: title as a link to `/posts/<slug>/`, then a `Date | tags` meta line, then an optional summary. Two sample posts deliberately have no summary, which confirmed `summary` should be optional in front matter.

No reading-time estimate anywhere.

Multi-select tag dropdown with a live post count. No "All" pill, because zero boxes checked is already "all." Single-tag pages at `/tags/<tag>/` generate as real URLs and carry the full dropdown so you can move tag to tag without returning to the index.

Flat, one page. Pagination is deferred until roughly 30 posts.

### Post (`dist/posts/<slug>/index.html`)

Article head with title and date above a rule, body 20px below it.

`<h2>` sections at `--fs-h3` with 40px above and 12px below, so a heading groups with the text it introduces.

Footnotes: numbered gray superscripts linking to `#fn:N`, each note carrying a `↩` back to `#fnref:N`. Pure HTML anchors, so both directions work with JavaScript off. The script adds smooth scrolling, centered positioning, and a brief target highlight. The block sits 20px inside both its rules, with the last item's bottom margin zeroed to make that symmetric.

Prev/next footer: 20px above its rule, 80px below.

Code blocks are highlighted at build time by Chroma via [goldmark-highlighting](https://github.com/yuin/goldmark-highlighting), so a code-heavy blog ships zero additional JavaScript.

### Figures

Write plain Markdown. Nothing appended.

```markdown
![The checksum gate sits between staging and commit.](/images/pipeline-architecture.png)
```

Rules:

- An image alone in its paragraph becomes a `<figure>`. The alt text becomes the `<figcaption>`.
    
- An image inside a sentence stays inline and gets no caption.
    
- Empty alt text (`![](/images/foo.png)`) renders an uncaptioned image. That is also the correct accessibility signal for a decorative image, so the two cases align.
    
- No numbering. No `Figure 1.` label.
    
- No width syntax. The image renders at its own file dimensions, capped at the 810px body width. To change the displayed size, change the file. Export at 2x for retina.
    

The CSS that makes this work:

```css
.article-body figure { display: table; max-width: 100%; margin: var(--sp-6) auto; }
.article-body figure img { display: block; max-width: 100%; height: auto;
  border: 1px solid var(--artifact-border); border-radius: var(--radius-sm); }
.article-body figcaption { display: table-caption; caption-side: bottom;
  padding-top: var(--sp-2); color: var(--artifact-gray);
  font-size: var(--fs-meta); line-height: 1.45; }
```

`display: table` was necessary. An earlier attempt used `width: fit-content`, which sizes to the widest child, so a caption wider than a 340px image stretched the figure and broke centering. A table box shrinks to its content and a table-caption does not contribute to that width, so the figure is exactly as wide as the image, `margin: auto` centers it, and the caption wraps within the image's width.

Numbering is deferred, not rejected. The trigger: a post whose body text needs to reference a figure from a distance ("the gate in Figure 2"). At that point it is a `render.go` change, not a content change. The reason to wait is that inserting a figure mid-post renumbers everything after it, which the generator handles correctly and your prose does not, producing a silent error in published writing.

### Portfolio (`dist/portfolio/index.html`)

Three sections in fixed order: Consulting, Projects, Open source. Section names come from the `content/portfolio/` subdirectories.

Each entry: title full width, technology pills below it, then a two-column body with description text on the left and the image on the right. The image aligns to the top of the description, not the title, matching Andrew's reference. Image column is 190px inside a padded, rounded, soft-background panel.

No dates. No status words (the earlier Active / Maintained / Complete legend is gone). No "Merged" prefix on open-source entries. No GitHub star counts, which would need a runtime API call or a CI fetch.

Links row: bold black `Links:` label, then gray underlined links separated by `|`.

Section pages at `/portfolio/<section>/` carry the full filter pill row plus a "Clear filter" link, so you can go Consulting to Projects directly. Every section page keeps the same lede as the flat page, which is what keeps the pill row at an identical vertical offset across all four views.

### Reading list (`dist/reading/index.html`)

Sorted A to Z by title, ignoring leading articles. _The Devotion of Suspect X_ files under D, _A Pattern Language_ under P. That rule lives in `sortPagesByTitle` in `content.go`; a naive string sort would clump every title starting with "The."

Two-column grid, `minmax(0, 1fr)` and 25%. Left column: title (linking to Amazon, inherited black with a hover underline, never blue), author, then the Review toggle. Right column, right-aligned: status on one line, genres beneath it. Status is `--artifact-dark-gray`, genres `--artifact-gray`.

Stacked beats pipe-separated in the right column because status is a state that changes and genre is a fixed attribute. A pipe implies they are peers in one list. Right-aligned so both lines terminate at the body's right edge rather than at an arbitrary interior position. On mobile the column collapses under the title and reverts to left-aligned.

Review is a gray `+` that becomes `−` when open, with the word underlined. 5px below the author (matching title-to-author), 8px above the expanded panel. Review stays in the wide left column, not the right: the review text is long-form content, and a panel opening under a 25% column either wraps badly or breaks its grid cell.

Status vocabulary: **Reading**, **Finished**, **Want to read**. "Finished" reads as a completed action where "Read" collides with the present tense. Alternatives considered for the queue: "To read" (shorter, more neutral), "Unread" (shortest, sounds like a reproach).

No star ratings. Removing them eliminated the right-hand rating column, which is what solved the empty-space problem: the space is gone rather than filled.

Status is suppressed on `/reading/<status>/` pages, since the page already filters by it. Genres stay.

Multi-select genre dropdown, same mechanism as blog tags.

### Search (`dist/search/index.html`)

`search-index.json` is generated at build time. Each item:

```json
{
  "title": "Building a reliable data pipeline",
  "url": "/posts/building-a-reliable-data-pipeline/",
  "kind": "Blog",
  "meta": "August 12, 2026 | engineering, data",
  "text": "lowercased haystack assembled at build time"
}
```

`kind` is one of Blog, Portfolio, Reading, Pages, and drives the result group heading. Results render in that order. Each item carries a real destination URL; do not display the URL as text, since the link already is it.

Substring matching with `String.prototype.includes`. No scoring, no library.

Typeahead suggestions in both the header drawer and the page input: same substring filter, capped at six, matched letters wrapped in `<mark>`. Arrow keys navigate, Enter selects, Escape closes, outside click closes.

Results are built with `createElement` and `textContent`, never `innerHTML`, so content cannot break the markup.

### 404 (`dist/404.html`)

Large gray numeral, short message, links to the main sections.

### Header

5px `--artifact-dark-gray` top border, 1px bottom border. Brand at 30px, `--artifact-gray`, 12px padding above and below with `line-height: 1.2`.

Nav: Blog, Portfolio, Reading List, Search, theme toggle. No Contact. No Resume for now. Active page marked with an underline at 4px offset. Collapses behind a "Menu" button under 700px.

Page `<h1>` elements are `class="sr-only"`: present for screen readers and search engines, invisible on screen. Side benefit, every page starts at the same vertical position, so the filter row never shifts. Counts moved into the filter bar on the right.

This is worth an explicit decision. It reads well on Blog and Reading List, where the lede names the content. Portfolio is the weak case: its lede describes without naming, so the only label is the nav underline. Reverting is one CSS change.

### Footer

Two-column grid, `minmax(0, 1fr)` and 66.667%. Left: social list (Email, GitHub, LinkedIn, Discord, RSS) as gray icons with labels. Right: bio paragraph, subscribe lede, subscribe form full-column-width, RSS fallback.

Copyright is its own full-width band below, centered. Centered text needs a symmetric container to read as centered.

Spacing: 32px at every point. Header rule to bio, form to copyright, copyright to page bottom.

The form stretches to the full column width so its right edge aligns with the bio text above it.

### Theme

Inline `<script>` in `<head>` of `base.html`, before any rendered content. Without it every navigation flashes light theme.

```html
<script>
  try {
    var saved = localStorage.getItem('theme');
    if (saved) document.documentElement.dataset.theme = saved;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.dataset.theme = 'dark';
  } catch (error) {}
</script>
```

`var` on purpose, since it runs before anything else and needs no scoping. The `try` block means blocked storage still gets a working toggle.

## 9. Front matter fields

Not finalized. This is the first thing a new session should settle, because every template, the tag and section page generation, and the search index all thread through `Page` and `FrontMatter`.

Derive the field set from what the templates consume rather than guessing. From the approved prototype:

**Posts** need `title`, `date`, `tags`, `slug`, and optional `summary`.

**Portfolio entries** need `title`, `section` (consulting, projects, open-source), `summary`, `image`, `technologies`, `order`, and `links` as label-URL pairs. No `date`, no `status`.

**Reading entries** need `title`, `author`, `status` (reading, finished, want-to-read), `genres`, and a link (Amazon). No `rating`. Review text is the Markdown body.

Two sample shapes:

```yaml
---
title: Example engagement
section: consulting
summary: Short description used by portfolio cards and search.
image: /images/example.webp
technologies:
  - Go
  - PostgreSQL
order: 10
---

Long-form description here. No mandatory headings.
```

```yaml
---
title: On Writing Well
author: William Zinsser
status: finished
genres:
  - writing
  - nonfiction
link: https://www.amazon.com/...
---

Public review goes here.
```

Front matter drives filtering and summaries. Markdown owns the long description or review.

## 10. Browser JavaScript

One file, `static/js/site.js`, plus the five-line inline theme snippet in `<head>`. That is the honest claim: one authored file, two script locations.

Measured, not estimated. The prototype's script was 114 non-blank lines across nine concerns. Under the multi-page target:

|   |   |
|---|---|
|Concern|Lines|
|Theme toggle|27|
|Search index fetch and filter|~35|
|Typeahead suggestions|~55|
|Search drawer|~18|
|Genre and tag multi-select|~12|
|Dropdown outside-click and Escape close|12|
|Mobile nav|6|
|Footnote smooth scroll and highlight|~10|

Roughly 175 lines. The view router, tag filter, and contact handler all disappear, replaced by real `<a href>` links and generated pages.

### Type checking with no toolchain

`// @ts-check` at the top of `site.js`, JSDoc annotations, and a `jsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "checkJs": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["static/js/**/*.js"]
}
```

VS Code ships the TypeScript language service, so editor checking needs no install. TypeScript supports type checking and error reporting in `.js` files, and `@type` accepts any TypeScript type including `HTMLElement` with DOM properties.

CI checking would need `npx tsc`, which means the npm package. Skip it. The value is catching `element.value` on a possibly-null node while you type.

This is not hypothetical. A real bug in the prototype was three `getElementById` calls to elements that had been removed, each returning `null`, then throwing a `TypeError` on `.textContent` and silently breaking every filter. With `strict` on, `document.getElementById('x').textContent` is an error before the page ever loads.

Use `/** @type {HTMLInputElement | null} */ (document.getElementById('x'))` to narrow without TypeScript syntax.

### The npm tripwire

Go stays the right call while the JavaScript is one file of vanilla DOM code with no dependencies. Revisit if authored JS passes roughly 300 lines across three or more files, or if any feature requires an npm dependency in the shipped bundle.

**Safe to add, stays in one file:** copy button on code blocks (~15 lines), Cmd-K opens search (~10), URL state sync for shareable filters (~25), scroll-spy TOC via `IntersectionObserver` (~30), image lightbox (~40), client-side pagination (~30), back-to-top (~10), external-link icons (~8). All together lands near 270 lines.

**Requires npm, decline:** fuzzy or ranked search (fuse.js is 9.5 kB gzipped and 413.7 kB unpacked, minisearch 5.9 kB gzipped and 826.5 kB unpacked, flexsearch 2.33 MB unpacked), charts, browser-side math rendering, TypeScript proper, minification or bundling, any framework, animation libraries.

**Free, because it runs at build time:** syntax highlighting, table of contents, footnotes, tables, sitemap, RSS, any single-value filter page, OS-following dark mode.

Dead ends if you go looking for search libraries: lunr last published six years ago, elasticlunr ten years and deprecated.

Search is the only realistic path to the tripwire, and only if substring matching stops being adequate. With a few dozen posts it will be fine. At a few hundred, unknown.

## 11. Newsletter

Footer form posting directly to a third-party endpoint. No JavaScript, no npm, no server, no build step.

```html
<form action="https://buttondown.com/api/emails/embed-subscribe/andrewwkimm" method="post">
  <input type="email" name="email" required>
  <input type="hidden" name="embed" value="1">
  <button type="submit">Subscribe</button>
</form>
```

The field must be named `email`. `embed=1` tells the provider it came from an embedded form.

Publishing stays one `git push`. The provider polls `rss.xml` and sends or drafts an email per new post, so you never write the newsletter separately.

Provider choice is reversible: nothing in the repository changes except the `action` URL. That is the real advantage of the no-JavaScript approach.

[Buttondown's](https://buttondown.com/) free tier covers 100 subscribers, but RSS-to-email is a paid add-on at $9/month. Free alternatives that include RSS automation: Kit / ConvertKit (1,000 subscribers free), Sender (2,500), EmailOctopus (2,500, runs on Amazon SES). Skip MailerLite, whose RSS campaigns are explicitly excluded from its free plan.

Those free-tier figures come from review-site aggregation rather than vendor documentation. Verify current terms on the provider's own pricing page before signing up.

Enable "skip old items" when first connecting the feed, or existing posts get mailed out.

## 12. Deferred and rejected

**Deferred, with a trigger:**

- Resume page. Least important; refine once the big items ship. The original content is recoverable from session history: Professional Experience (Ovative, American Beauty Institute, Elevance), Skills and Interests, Education, Miscellaneous.
    
- Blog pagination. At roughly 30 posts.
    
- Figure numbering. When body text needs to reference a figure from a distance.
    
- Image width attributes. When the same file needs two display sizes in two posts.
    
- GitHub project metadata (stars, last commit) fetched during CI.
    
- `internal/<capability>`. When a capability's interface becomes narrower than its implementation.
    
- `cmd/<binary>`. When a second executable appears.
    

**Rejected:**

- Database, authentication, admin editor, server runtime.
    
- `pkg/`, multiple modules, repository abstractions, external search service, runtime GitHub API client, asset pipeline.
    
- Contact form. A static host cannot process one.
    
- Any blue in the palette.
    
- Star ratings in the reading list.
    
- Portfolio status legend and dates.
    
- TypeScript with a compile step.
    
- A `site` package, an `internal/site` package, and a `site/` wrapper directory.
    
- `static/assets/` nesting.
    

## 13. Language evaluation, for the record

Go was chosen after evaluating alternatives against four requirements: multi-page HTML output, no authored JavaScript, GitHub Pages deployment, and Markdown with YAML front matter.

**Gleam** was the closest competitor and remains viable. [lustre_ssg](https://github.com/lustre-labs/ssg) writes multi-page HTML in pure Gleam, [mork](https://hexdocs.pm/mork/) v1.12.1 is a CommonMark-compliant Markdown parser, [yamleam](https://hexdocs.pm/yamleam/) v1.0.0 handles YAML with no FFI, [varasto](https://hexdocs.pm/varasto/) gives typed `localStorage`, and [xmb](https://hexdocs.pm/xmb/) builds XML for RSS. Gleam's JavaScript target adds no runtime code. One project suffices, since `gleam.toml`'s `target` can be overridden per command.

Costs that decided it: lustre_ssg is 0.11.0 with no client-side hydration story, so mounting a client app into generated pages is undocumented integration work. mork is nine months old with a single maintainer. The Gleam version totals roughly 450 to 550 lines against Go's roughly 350 to 400 plus 100 of JavaScript. And it discards all of the layout work, since Gleam mandates `src/`.

An earlier claim that lustre_ssg forces Djot and TOML was wrong; mork and yamleam cover Markdown and YAML. Djot was evaluated and rejected anyway: `*foo*` renders as italic in Markdown and bold in Djot, which is a silent meaning change on migration, and djot.net still says the syntax is not fully stable.

**Elixir** passes on generation and fails on the browser. [Tableau](https://hexdocs.pm/tableau/) is arguably the strongest generator evaluated, with YAML front matter, a tag extension, RSS, and a GitHub Pages guide. But ElixirScript's last release was March 2018, Hologram requires a running Phoenix application, and Popcorn requires the host to send `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers, which GitHub Pages cannot do.

**Elm** fails outright. `localStorage` is unreachable without hand-written JavaScript, because effect managers are restricted to core packages so no third-party typed binding can exist.

**loco.rs** has no static export at all, and its 1.0.1 release removed server-rendered scaffolds in favor of a React SPA.

**Rails with Hotwire** fails because every client-state feature needs Stimulus, and Stimulus controllers are JavaScript files you write.

**GopherJS** was rejected for Go browser code: Go 1.21 support landed 2026-06-26, its own docs rate tooling partially compatible, and it ships the Go runtime plus stack-unwinding goroutine emulation. **Go WebAssembly** requires copying `wasm_exec.js` into the repository, version-coupled to your Go release.

**Dart with Jaspr** was the only other stack clearing all four requirements cleanly, with a ~272 KB bundle and Google running dart.dev and flutter.dev on it. Rejected for the same reason as Gleam: it discards the layout work and adds a runtime to power a substring filter.

## 14. Build sequencing

Do not build all thirteen Go files, then the templates. The visuals are settled; what is unsettled is the data shape, and the templates determine it. Building backend-first means discovering in week two that `Page` lacks a field the portfolio template needs.

Vertical slice, in order:

1. Lift the prototype CSS into `static/css/site.css` almost verbatim, minus the dev path bar and the `data-glean-id` hooks. A copy job, roughly an hour, and it retires the part that feels hardest.
    
2. Settle `Page` and `FrontMatter` by reading the templates backward. Every field exists because a template or the search index consumes it.
    
3. One post, end to end: `content/posts/foo.md` through `frontmatter.go`, `markdown.go`, `render.go`, `base.html` plus `post.html`, out to `dist/posts/foo/index.html`. Once that renders in a browser, every remaining page type is the same pipeline with a different template.
    
4. Remaining page templates.
    
5. Generated `/tags/<tag>/`, `/portfolio/<section>/`, `/reading/<status>/` pages.
    
6. `rss.go` and `search.go`.
    
7. `site.js` against the real generated index.
    
8. `.github/workflows/pages.yml` last, since it only matters once `dist/` is correct locally.
    

## 15. Open questions

1. `Page` and `FrontMatter` field sets. Blocks everything else.
    
2. Whether hidden page titles read as clean or disorienting, especially on Portfolio, where the lede never says the word "Portfolio."
    
3. Newsletter provider. The form is provider-agnostic, so this can wait.
    
4. Whether open-source portfolio entries need images at all. The Dagster and LlamaIndex logos read as decoration next to substantial descriptions.
    
5. Whether open-source technology pills are too thin (Dagster: Python, S3, Spark; LlamaIndex: Python, pathlib).
    
6. Whether to write the spacing rules and color constraint into `README.md` as stated rules rather than leaving them implicit in the token values.
    
7. Whether to draft the static-generator benchmark case for `Skills/go-project-layout/SKILL.md`.
    

## 16. Unverified claims

Everything below is from training knowledge with no retrieved source, and should be confirmed before it is relied on:

- ~~`t.TempDir` as the stdlib helper for per-test temporary directories.~~ Verified 2026-09-17: real, added in Go 1.15.
    
- Goldmark's API shape behind `markdownToHTML`, its attribute-block extension behavior, and its alt-text handling.
    
- ~~`encoding/xml` behavior for RSS generation.~~ Verified 2026-09-17: stdlib `encoding/xml` marshaling is suitable for building an RSS 2.0 document.
    
- That Goldmark and `html/template` are more battle-tested than any alternative evaluated.
    
- That exporting at 2x display width is the convention for retina sharpness.
    
- That comment widgets such as Giscus and Utterances add a third-party `<script>` tag but no authored lines.
    
- The per-feature JavaScript line estimates in section 10, which are judgment rather than measurement.
    
- Whether one Gleam project can run an Erlang-target build script and compile a JavaScript-target client app, if the Gleam path is ever revisited.
    

`Skills/go-project-layout/SKILL.md` was read from the uploaded archive during the session. It is not reachable from a fresh sandbox, since it lives in a non-Git Obsidian vault. Re-upload it if a new session needs to check a decision against it.

## Sources

- [Go module layout guide](https://go.dev/doc/modules/layout)
    
- [Effective Go, package names](https://go.dev/doc/effective_go#package-names)
    
- [Go blog, package names](https://go.dev/blog/package-names)
    
- [GitHub Pages, what is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
    
- [GitHub Pages, custom 404 pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/creating-a-custom-404-page-for-your-github-pages-site)
    
- [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)
    
- [goldmark-highlighting](https://github.com/yuin/goldmark-highlighting)
    
- [Chroma](https://github.com/alecthomas/chroma)
    
- [TypeScript, type checking JavaScript files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
    
- [VS Code, JavaScript language support](https://code.visualstudio.com/docs/languages/javascript)
    
- [Buttondown](https://buttondown.com/)
    
- [lustre_ssg](https://github.com/lustre-labs/ssg)
    
- [mork](https://hexdocs.pm/mork/)
    
- [yamleam](https://hexdocs.pm/yamleam/)
    
- [varasto](https://hexdocs.pm/varasto/)
    
- [Tableau](https://hexdocs.pm/tableau/)
    
- [Djot](https://djot.net/)