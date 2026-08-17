<script lang="ts">
  let {
    tags,
    selected = $bindable([]),
    locked = false
  }: { tags: string[]; selected?: string[]; locked?: boolean } = $props();

  let dropdown: HTMLDetailsElement;
  let open = $state(false);

  const label = $derived(selected.length === 0 ? 'Tags' : `Tags (${selected.length})`);

  function toggle(tag: string): void {
    selected = selected.includes(tag)
      ? selected.filter((value) => value !== tag)
      : [...selected, tag];
  }

  function closeOnOutsideClick(event: MouseEvent): void {
    const target = event.target;
    if (open && target instanceof Node && !dropdown.contains(target)) open = false;
  }

  function closeOnEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') open = false;
  }
</script>

<svelte:window onclick={closeOnOutsideClick} onkeydown={closeOnEscape} />

<details class="drop" bind:this={dropdown} bind:open>
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
