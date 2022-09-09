<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let tabs: string[] = [];
  let active = 0;

  const dispatch = createEventDispatcher();

  function setTab(i: number) {
    active = i;
    dispatch("set-tab", i);
  }
</script>

<ul class="flex">
  {#each tabs as tab, i}
    <li
      class="px-4 py-2 border-b-2 border-transparent transition-colors duration-100 cursor-pointer select-none {i ===
      active
        ? 'font-bold border-white'
        : ''}"
      on:click={() => setTab(i)}
    >
      {tab}
    </li>
  {/each}
</ul>
