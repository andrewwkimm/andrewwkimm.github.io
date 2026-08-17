<script lang="ts">
  let { genres, selected = $bindable([]) }: { genres: string[]; selected?: string[] } = $props();

  let dropdown: HTMLDetailsElement;
  let open = $state(false);
  const label = $derived(selected.length === 0 ? 'Genres' : `Genres (${selected.length})`);

  function toggle(genre: string): void {
    selected = selected.includes(genre)
      ? selected.filter((value) => value !== genre)
      : [...selected, genre];
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

<details class="drop drop-right" bind:this={dropdown} bind:open>
  <summary><span>{label}</span></summary>
  <div class="drop-menu">
    {#each genres as genre (genre)}
      <label class="drop-option">
        <input type="checkbox" checked={selected.includes(genre)} onchange={() => toggle(genre)} />
        {genre}
      </label>
    {/each}
    <button class="drop-clear" type="button" onclick={() => (selected = [])}>Clear genres</button>
  </div>
</details>
