<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="blog">
  <article class="prose max-w-none">
    <h1 class="
      text-3xl
      font-medium
      mb-2"
      >{data.metadata.title}
    </h1>

    <time class="
      text-[var(--color-gray)]
      block mb-6"
      >{data.metadata.date}
    </time>

    <svelte:component this={data.content} />
  </article>
</div>