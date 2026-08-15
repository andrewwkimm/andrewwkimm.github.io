<script lang="ts">
  let { name, children } = $props();
</script>

<section class="section">
  <h2 class="section-title">{name}</h2>
  {@render children()}
</section>
