<script>
  export let data;
</script>

<div class="blog-list">
  <h1>Blog</h1>
  {#each data.posts as post}
    <article>
      <h2><a href="/blog/{post.slug}">{post.metadata.title}</a></h2>
      <time>{post.metadata.date}</time>
    </article>
  {/each}
</div>
