<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data: [string, number][];

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(([name]) => name),
        datasets: [{
          label: 'Messages',
          data: data.map(([, count]) => count),
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: '#374151'
            },
            ticks: {
              color: '#9ca3af'
            }
          },
          y: {
            grid: {
              color: '#374151'
            },
            ticks: {
              color: '#9ca3af'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  });
</script>

<canvas bind:this={canvas}></canvas>