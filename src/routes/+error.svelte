<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="notfound">
  <h1>{page.status}</h1>
  <p class="muted">{page.error?.message ?? 'Something went wrong'}</p>
  <div class="links">
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/portfolio">Portfolio</a>
    <a href="/reading_list">Reading List</a>
  </div>
</div>
