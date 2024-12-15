<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-moment';
  import { messageStats } from '../../lib/stores/statsStore';
  import { visibility } from '../../lib/stores/visibilityStore';
  import MessageTypeChart from './charts/MessageTypeChart.svelte';
  import ActivityChart from './charts/ActivityChart.svelte';
  import TopChattersChart from './charts/TopChattersChart.svelte';

  export let show = false;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      show = false;
    }
  }
</script>

{#if show}
  <div 
    class="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    on:keydown={handleKeydown}
  >
    <div class="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Chat Statistics</h2>
        <button 
          class="text-gray-400 hover:text-white"
          on:click={() => show = false}
        >
          Close
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Overview</h3>
          <div class="space-y-2">
            <p>Total Messages: {$messageStats.totalMessages}</p>
            <p>Unique Users: {$messageStats.uniqueUsers}</p>
          </div>
        </div>

        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Message Types</h3>
          <MessageTypeChart stats={$messageStats.messageTypes} />
        </div>

        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Chat Activity</h3>
          <ActivityChart data={$messageStats.messagesByMinute} />
        </div>

        <div class="bg-gray-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Top Chatters</h3>
          <TopChattersChart data={$messageStats.topChatters} />
        </div>
      </div>
    </div>
  </div>
{/if}