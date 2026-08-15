<script lang="ts">
  let { title, children } = $props();
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <div class="project-list">
    {@render children()}
  </div>
</section>
