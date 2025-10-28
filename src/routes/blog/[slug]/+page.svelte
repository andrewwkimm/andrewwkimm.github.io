<script>
  export let data;
</script>

<article class="prose max-w-none">
  <h1 class="text-4xl mb-2">{data.metadata.title}</h1>

  <time class="text-gray-500 text-base block mb-6">{data.metadata.date}</time>

  <svelte:component this={data.content} />
</article>
