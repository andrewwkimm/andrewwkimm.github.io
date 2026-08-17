<script lang="ts">
  import type { SearchItem } from '$lib/search';

  let {
    id,
    items,
    term,
    selected = $bindable(-1),
    onchoose
  }: {
    id: string;
    items: SearchItem[];
    term: string;
    selected?: number;
    onchoose: (item: SearchItem) => void;
  } = $props();

  type Part = { text: string; hit: boolean };

  function parts(title: string): Part[] {
    const at = term === '' ? -1 : title.toLowerCase().indexOf(term.toLowerCase());
    if (at < 0) return [{ text: title, hit: false }];

    return [
      { text: title.slice(0, at), hit: false },
      { text: title.slice(at, at + term.length), hit: true },
      { text: title.slice(at + term.length), hit: false }
    ].filter((part) => part.text !== '');
  }
</script>

<div id={id} class="suggest" role="listbox" hidden={items.length === 0}>
  {#each items as item, index (item.url + item.title)}
    <button
      type="button"
      role="option"
      aria-selected={index === selected}
      onmousedown={(event) => {
        event.preventDefault();
        onchoose(item);
      }}
    >
      {#each parts(item.title) as part (part.text + part.hit)}
        {#if part.hit}<mark>{part.text}</mark>{:else}{part.text}{/if}
      {/each}
      <span class="sk">{item.kind}</span>
    </button>
  {/each}
</div>
