<script>
  export let title;
  export let description;
  export let image;
  export let links = [];
</script>

<div class="flex flex-col md:flex-row items-start mb-8">
  <div class="flex-1 md:pr-20">
    <p class="text-xl font-bold mb-2">{title}</p>

    <!-- ✅ Correct way to render HTML -->
    <div
      class="text-base leading-relaxed text-[var(--color-text)]
             [&_a]:text-[var(--color-link)] [&_a:hover]:underline
             [&_code]:font-mono [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded"
    >
      {@html description}
    </div>

    {#if links.length}
      <p class="font-bold mt-4">
        Links:
        {#each links as { label, url }, i}
          <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>{i < links.length - 1 ? ', ' : ''}
        {/each}
      </p>
    {/if}
  </div>

  {#if image}
    <div class="flex-shrink-0 mt-6 md:mt-0 md:ml-10 w-[200px]">
      <img src={image} alt={title} class="w-full h-auto rounded" />
    </div>
  {/if}
</div>
