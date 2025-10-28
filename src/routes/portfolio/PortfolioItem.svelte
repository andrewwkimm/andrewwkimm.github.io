<script lang="ts">
  export let title: string;
  export let description: string;
  export let additionalInfo: string = '';
  export let links: Array<{ text: string; url: string }>;
  export let imageSrc: string;
  export let imageAlt: string = '';
</script>

<div class="flex items-start mb-6">
  <!-- Text Content -->
  <div class="flex-1 pr-32">
    <h3 class="text-[1.25em] font-bold mt-0 mb-2">
      {title}
    </h3>

    <p class="mb-4">
      {description}
    </p>

    {#if additionalInfo}
      <p class="mb-4">
        {@html additionalInfo}
      </p>
    {/if}

    <p class="font-bold">
      Links:
      {#each links as link, i}
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>{#if i < links.length - 1}&nbsp;|&nbsp;{/if}
      {/each}
    </p>
  </div>

  <!-- Image -->
  <div class="flex-none w-[200px]">
    <img
      src={imageSrc}
      alt={imageAlt || title}
      class="max-w-full"
    />
  </div>
</div>