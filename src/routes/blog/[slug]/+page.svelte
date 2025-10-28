<script>
  export let data;
</script>

<article>
  <svelte:component this={data.content} />
</article>

<style>
  article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>