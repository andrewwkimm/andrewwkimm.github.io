<script>
  export let data;
</script>

<div>
  {#each data.posts as post}
    <article>
      <h2><a href="/blog/{post.slug}">{post.metadata.title}</a></h2>
      <time>{post.metadata.date}</time>
    </article>
  {/each}
</div>
