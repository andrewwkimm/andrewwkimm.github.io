<script lang="ts">
  export let name: string;
</script>

<div class="mb-8">
  <!-- Section heading: larger font to match default h2 -->
  <h2 class="text-2xl font-bold leading-tight m-0">{name}</h2>

  <!-- Thin underline immediately below the heading -->
  <hr class="border-black mt-0 mb-2 border-t" />

  <!-- Section content -->
  <div class="space-y-4">
    <slot />
  </div>
</div>
