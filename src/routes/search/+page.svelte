<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import Suggest from '$lib/components/Suggest.svelte';
  import {
    itemsOfKind,
    KIND_ORDER,
    loadSearchIndex,
    matchItems,
    SUGGEST_LIMIT,
    type SearchItem
  } from '$lib/search';

  let query = $state(page.url.searchParams.get('q') ?? '');
  let index = $state<SearchItem[]>([]);
  let selected = $state(-1);
  let loading = $state(true);

  const shown = $derived(query.trim() === '' ? index : matchItems(index, query));
  const suggestions = $derived(matchItems(index, query).slice(0, SUGGEST_LIMIT));

  onMount(() => {
    void loadSearchIndex(fetch)
      .then((items) => {
        index = items;
      })
      .finally(() => {
        loading = false;
      });
  });

  function choose(item: SearchItem): void {
    selected = -1;
    if (item.url.startsWith('http')) {
      window.location.assign(item.url);
      return;
    }
    void goto(item.url);
  }

  function moveSelection(step: number): void {
    if (suggestions.length === 0) return;
    selected = (selected + step + suggestions.length) % suggestions.length;
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (event.key === 'Escape') {
      selected = -1;
      return;
    }
    if (event.key === 'Enter' && selected >= 0) {
      event.preventDefault();
      choose(suggestions[selected]);
    }
  }
</script>

<svelte:head>
  <title>Search — Andrew Kim</title>
</svelte:head>

<h1 class="sr-only">Search</h1>
<p class="page-lede">Search posts, projects, books, and pages.</p>

<div class="search-box">
  <input
    bind:value={query}
    placeholder="Type to search"
    autocomplete="off"
    role="combobox"
    aria-controls="page-search-suggestions"
    aria-expanded={suggestions.length > 0}
    aria-autocomplete="list"
    aria-label="Search this site"
    oninput={() => (selected = -1)}
    onkeydown={handleKeydown}
  />
  <Suggest
    id="page-search-suggestions"
    items={suggestions}
    term={query.trim()}
    bind:selected
    onchoose={choose}
  />
</div>

<p class="search-status">
  {#if loading}
    Loading search index.
  {:else if query.trim() === ''}
    Showing everything. {shown.length} items in the index.
  {:else if shown.length === 0}
    No matches for “{query.trim()}”.
  {:else}
    {shown.length} {shown.length === 1 ? 'match' : 'matches'} for “{query.trim()}”.
  {/if}
</p>

{#each KIND_ORDER as kind (kind)}
  {@const items = itemsOfKind(shown, kind)}
  {#if items.length > 0}
    <section class="result-group">
      <h2>{kind}</h2>
      <ul class="result-list">
        {#each items as item (item.url + item.title)}
          <li class="result">
            <a href={item.url}>{item.title}</a>
            <p>{item.meta}</p>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
{/each}

<noscript>
  <p class="noscript-note">
    Search needs JavaScript. Browse the <a href="/blog">blog</a>,
    <a href="/portfolio">portfolio</a>, or <a href="/reading_list">reading list</a> instead.
  </p>
</noscript>
