<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let stats: {
    mentions: number;
    firstTime: number;
    modMessages: number;
    subMessages: number;
    vipMessages: number;
    shorties: number;
  };

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Mentions', 'First Time', 'Mod', 'Sub', 'VIP', 'Shorties'],
        datasets: [{
          data: [
            stats.mentions,
            stats.firstTime,
            stats.modMessages,
            stats.subMessages,
            stats.vipMessages,
            stats.shorties
          ],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#8b5cf6',
            '#f59e0b',
            '#ef4444',
            '#ec4899'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#fff'
            }
          }
        }
      }
    });
  });
</script>

<canvas bind:this={canvas}></canvas>