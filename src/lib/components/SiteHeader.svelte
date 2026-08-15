<script lang="ts">
  import { page } from '$app/state';
  import { theme } from '$lib/theme.svelte';

  type NavItem = { name: string; href: string };

  const navigation: NavItem[] = [
    { name: 'Blog', href: '/blog' },
    // { name: 'Resume', href: '/resume' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Reading List', href: '/reading_list' }
  ];

  let menuOpen = $state(false);

  function isActive(href: string): boolean {
    return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
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
