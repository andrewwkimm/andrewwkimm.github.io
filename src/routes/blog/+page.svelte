<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="blog">
  {#each data.posts as post (post.slug)}
    <article class="mb-12">
      <time class="block mb-1 text-gray-500">{post.metadata.date}</time>
      <h2 class="text-3xl font-normal">
        <a href="/blog/{post.slug}">{post.metadata.title}</a>
      </h2>
    </article>
  {/each}
</div>