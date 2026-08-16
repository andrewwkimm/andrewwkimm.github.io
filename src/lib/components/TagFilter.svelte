<script lang="ts">
  let {
    tags,
    selected = $bindable([]),
    locked = false
  }: { tags: string[]; selected?: string[]; locked?: boolean } = $props();

  let open = $state(false);

  const label = $derived(selected.length === 0 ? 'Tags' : `Tags (${selected.length})`);

  function toggle(tag: string) {
    selected = selected.includes(tag)
      ? selected.filter((value) => value !== tag)
      : [...selected, tag];
  }
</script>

<details class="drop" bind:open>
  <summary><span>{label}</span></summary>
  <div class="drop-menu">
    {#each tags as tag (tag)}
      <label class="drop-option">
        <input
          type="checkbox"
          checked={selected.includes(tag)}
          disabled={locked}
          onchange={() => toggle(tag)}
        />
        {tag}
      </label>
    {/each}
    {#if !locked}
      <button class="drop-clear" type="button" onclick={() => (selected = [])}>Clear tags</button>
    {/if}
  </div>
</details>
