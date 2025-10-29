<script>
  export let data;
</script>

<div class="blog">
  {#each data.posts as post}
    <article class="mb-12">
      <time class="block mb-1 text-gray-500">{post.metadata.date}</time>

      <h2 class="text-3xl font-normal">
        <a href="/blog/{post.slug}" class="hover:underline">{post.metadata.title}</a>
      </h2>
    </article>
  {/each}
</div>
