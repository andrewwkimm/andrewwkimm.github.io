<script lang="ts">
  export let title: string;
</script>

<section class="mb-12">
  <h2 class="text-2xl font-bold mb-6">{title}</h2>
  <div class="flex flex-col gap-6">
    <slot />
  </div>
</section>
