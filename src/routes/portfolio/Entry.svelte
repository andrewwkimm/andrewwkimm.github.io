<script lang="ts">
  type Link = { text: string; url: string };

  let {
    title,
    links,
    imageSrc,
    imageAlt = '',
    children
  }: {
    title: string;
    links: Link[];
    imageSrc: string;
    imageAlt?: string;
    children: import('svelte').Snippet;
  } = $props();
</script>

<article class="project-entry">
  <div class="entry-head">
    <h3>{title}</h3>
  </div>

  <div class="entry-body">
    <div class="entry-text">
      {@render children()}

      <p class="project-links">
        {#each links as link, i (link.url)}
          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a
          >{#if i < links.length - 1}<span class="sep">|</span>{/if}
        {/each}
      </p>
    </div>

    <div class="project-media">
      <img src={imageSrc} alt={imageAlt || title} />
    </div>
  </div>
</article>
