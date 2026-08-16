<script lang="ts">
  type Link = { text: string; url: string };

  let {
    title,
    links,
    imageSrc,
    imageAlt = '',
    technologies = [],
    children
  }: {
    title: string;
    links: Link[];
    imageSrc: string;
    imageAlt?: string;
    technologies?: string[];
    children: import('svelte').Snippet;
  } = $props();
</script>

<li class="project-entry">
  <div class="entry-head">
    <h3>{title}</h3>
  </div>

  {#if technologies.length}
    <div class="pill-row">
      {#each technologies as technology (technology)}
        <span class="pill">{technology}</span>
      {/each}
    </div>
  {/if}

  <div class="entry-body">
    <div class="entry-text">
      {@render children()}

      <p class="project-links">
        <strong>Links:</strong>
        {#each links as link, index (link.url)}
          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a
          >{#if index < links.length - 1}<span class="sep">|</span>{/if}
        {/each}
      </p>
    </div>

    <div class="project-media">
      <img src={imageSrc} alt={imageAlt || title} />
    </div>
  </div>
</li>
