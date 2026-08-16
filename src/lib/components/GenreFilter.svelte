<script lang="ts">
  let { genres, selected = $bindable([]) }: { genres: string[]; selected?: string[] } = $props();

  let open = $state(false);

  const label = $derived(selected.length === 0 ? 'Genres' : `Genres (${selected.length})`);

  function toggle(genre: string) {
    selected = selected.includes(genre)
      ? selected.filter((value) => value !== genre)
      : [...selected, genre];
  }
</script>

<details class="drop drop-right" bind:open>
  <summary><span>{label}</span></summary>
  <div class="drop-menu">
    {#each genres as genre (genre)}
      <label class="drop-option">
        <input
          type="checkbox"
          checked={selected.includes(genre)}
          onchange={() => toggle(genre)}
        />
        {genre}
      </label>
    {/each}
    <button class="drop-clear" type="button" onclick={() => (selected = [])}>Clear genres</button>
  </div>
</details>
