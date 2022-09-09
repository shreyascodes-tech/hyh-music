<script>
  import Artists from "./home/Artists.svelte";
  import Moods from "./home/Moods.svelte";
  import TopCharts from "./home/TopCharts.svelte";

  import Tabs from "./Tabs.svelte";
  const tabs = ["Top Charts", "Moods", "Artists"];
  const tabViews = [TopCharts, Moods, Artists];
  let activeTab = 0;
</script>

<div class="flex items-center">
  <nav>
    <Tabs
      on:set-tab={({ detail }) => {
        activeTab = detail;
      }}
      {tabs}
      client:load
    />
  </nav>
  <input
    class="block w-full max-w-lg px-4 py-2 mt-3 ml-auto transition-shadow rounded outline-none ring-2 ring-transparent placeholder-shown:ring-blue-900/60 ring-offset-2 ring-offset-slate-900 bg-black/40 focus:bg-black/60 focus:ring-blue-700"
    type="search"
    placeholder="Search..."
  />
</div>
<div class="tab-view-container">
  {#each tabViews as tabView, i}
    <div class="tab-view" class:active={i === activeTab}>
      <svelte:component this={tabView} />
    </div>
  {/each}
</div>

<style>
  .tab-view-container {
    position: relative;
  }

  .tab-view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
  }

  .active {
    opacity: 1;
    pointer-events: all;
  }
</style>
