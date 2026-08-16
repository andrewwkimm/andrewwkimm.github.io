<script lang="ts">
  let { title, children }: { title: string; children: import('svelte').Snippet } = $props();
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <ul class="project-list">
    {@render children()}
  </ul>
</section>
