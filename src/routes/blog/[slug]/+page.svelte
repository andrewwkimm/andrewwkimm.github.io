<script>
  export let data;
</script>

<div class="blog">
  <article class="prose max-w-none">
    <h1 class="text-4xl font-medium mb-2">{data.metadata.title}</h1>

    <time class="text-gray-500 text-base font-normal block mb-6">{data.metadata.date}</time>

    <svelte:component this={data.content} />
  </article>
</div>