<script lang="ts">
  let {
    title,
    organization,
    url = '',
    dates,
    location,
    children
  }: {
    title: string;
    organization: string;
    url?: string;
    dates: string;
    location: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="resume-entry">
  <h3>
    {title} at
    {#if url}
      <a href={url} target="_blank" rel="noopener noreferrer">{organization}</a>
    {:else}
      {organization}
    {/if}
  </h3>

  <p class="post-meta">
    <span class="nowrap">{dates}</span><span class="bar">|</span><span class="nowrap"
      >{location}</span
    >
  </p>

  {#if children}
    <ul class="resume-points">
      {@render children()}
    </ul>
  {/if}
</div>
