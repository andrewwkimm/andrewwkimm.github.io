<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { tick } from 'svelte';
  import Suggest from '$lib/components/Suggest.svelte';
  import {
    loadSearchIndex,
    matchItems,
    SUGGEST_LIMIT,
    type SearchItem
  } from '$lib/search';
  import { theme } from '$lib/theme.svelte';

  type NavItem = { name: string; href: string };

  const navigation: NavItem[] = [
    { name: 'Blog', href: '/blog' },
    // { name: 'Resume', href: '/resume' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Reading List', href: '/reading_list' }
  ];

  let menuOpen = $state(false);
  let searchOpen = $state(false);
  let query = $state('');
  let index = $state<SearchItem[]>([]);
  let selected = $state(-1);
  let searchInput: HTMLInputElement;

  const suggestions = $derived(matchItems(index, query).slice(0, SUGGEST_LIMIT));

  function isActive(href: string): boolean {
    return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
  }

  function closeSearch(): void {
    searchOpen = false;
    selected = -1;
  }

  async function toggleSearch(): Promise<void> {
    if (searchOpen) {
      closeSearch();
      return;
    }

    searchOpen = true;
    menuOpen = false;
    await tick();
    searchInput.focus();
    index = await loadSearchIndex(fetch);
  }

  function choose(item: SearchItem): void {
    closeSearch();
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

  function handleSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (event.key === 'Escape') {
      closeSearch();
      return;
    }
    if (event.key !== 'Enter') return;

    event.preventDefault();
    if (selected >= 0) {
      choose(suggestions[selected]);
      return;
    }
    if (query.trim() !== '') {
      const target = `/search/?q=${encodeURIComponent(query.trim())}`;
      closeSearch();
      void goto(target);
    }
  }
</script>

<header class="site-header">
  <div class="wrapper header-row">
    <a class="brand" href="/">Andrew Kim</a>

    <button
      class="menu-button"
      type="button"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      Menu
    </button>

    <nav class="nav" class:open={menuOpen} aria-label="Primary navigation">
      {#each navigation as item (item.href)}
        <a class="nav-link" class:active={isActive(item.href)} href={item.href}>{item.name}</a>
      {/each}

      <button
        class="icon-btn"
        class:active={isActive('/search')}
        type="button"
        aria-expanded={searchOpen}
        onclick={() => void toggleSearch()}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m16.5 16.5 4 4"></path>
        </svg>
        Search
      </button>

      <button
        class="icon-btn theme-toggle"
        type="button"
        aria-label={theme.label}
        title={theme.label}
        onclick={() => theme.toggle()}
      >
        <svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"></path>
        </svg>
        <svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
        </svg>
      </button>
    </nav>
  </div>
</header>

<div class="search-drawer" hidden={!searchOpen}>
  <div class="wrapper search-row">
    <div class="search-field">
      <input
        bind:this={searchInput}
        bind:value={query}
        placeholder="Search posts, projects, books, and pages"
        autocomplete="off"
        role="combobox"
        aria-controls="header-search-suggestions"
        aria-expanded={suggestions.length > 0}
        aria-autocomplete="list"
        aria-label="Search this site"
        oninput={() => (selected = -1)}
        onkeydown={handleSearchKeydown}
      />
      <Suggest
        id="header-search-suggestions"
        items={suggestions}
        term={query.trim()}
        bind:selected
        onchoose={choose}
      />
    </div>
    <button type="button" aria-label="Close search" onclick={closeSearch}>Close</button>
  </div>
</div>
