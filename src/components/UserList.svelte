<script lang="ts">
  import { users } from '../lib/stores/userStore';
  
  $: sortedUsers = Object.values($users)
    .sort((a, b) => b.chatcount - a.chatcount);
</script>

<div class="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50">
  <div class="max-w-2xl mx-auto h-full p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Users ({sortedUsers.length})</h2>
      <div class="text-sm text-gray-400">Press U to close</div>
    </div>
    
    <div class="h-[calc(100vh-120px)] overflow-y-auto space-y-3">
      {#each sortedUsers as user}
        <div class="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="text-lg">{user.username}</span>
          </div>
          <span class="text-gray-400 font-mono">{user.chatcount} messages</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar styling */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>