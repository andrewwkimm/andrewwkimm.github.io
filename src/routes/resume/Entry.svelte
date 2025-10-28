<script lang="ts">
  export let title: string;
  export let organization: string;
  export let url: string;
  export let dates: string;
  export let location: string;
</script>

<div class="mt-4 mb-4">
  <!-- Title / Organization -->
  <h3 class="text-black text-lg leading-tight mb-1">
    {title} at <a class="link" href={url}>{organization}</a>
  </h3>

  <!-- Dates and Location -->
  <p class="font-light mb-2">
    <span class="whitespace-nowrap">{dates}</span>
    <span class="px-0.5 text-neutral-500">•</span>
    <span class="whitespace-nowrap">{location}</span>
  </p>

  <!-- Description -->
  <ul class="list-disc pl-7 marker:text-neutral-400 space-y-1">
    <slot />
  </ul>
</div>
