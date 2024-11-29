<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ submit: string }>();
  let channel = '';

  function handleSubmit() {
    if (channel.trim()) {
      const cleanChannel = channel.trim().toLowerCase().replace('@', '');
      window.location.href = `?channel=${cleanChannel}`;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-black text-gray-100">
  <div class="w-full max-w-md p-8">
    <form 
      on:submit|preventDefault={handleSubmit}
      class="space-y-6 text-center"
    >
      <h1 class="text-3xl font-bold mb-8">grasp</h1>
      <div>
        <input
          type="text"
          bind:value={channel}
          placeholder="Enter Twitch channel"
          class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-center font-mono"
          autocomplete="off"
          spellcheck="false"
        >
      </div>
      <p class="text-gray-500 text-sm">
        Enter a Twitch channel name to start grasping their chat
      </p>
      <button
        type="submit"
        class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!channel.trim()}
      >
        Start Grasping
      </button>
    </form>
  </div>
</div>