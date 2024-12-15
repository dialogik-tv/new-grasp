<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data: { time: number; count: number }[];

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Messages per Minute',
          data: data.map(d => ({
            x: d.time,
            y: d.count
          })),
          borderColor: '#3b82f6',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            },
            grid: {
              color: '#374151'
            },
            ticks: {
              color: '#9ca3af'
            }
          },
          y: {
            beginAtZero: true,
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