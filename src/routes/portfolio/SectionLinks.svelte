<script lang="ts">
  import { SECTION_ORDER, SECTIONS, type PortfolioSection } from '$lib/portfolio';

  let { active = null }: { active?: PortfolioSection | null } = $props();
</script>

<div class="filter-links">
  {#each SECTION_ORDER as section (section)}
    <a href="/portfolio/{section}" class:active={active === section}>{SECTIONS[section].title}</a>
  {/each}
</div>
