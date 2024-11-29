<script lang="ts">
  import { onMount } from 'svelte';
  import { GraspAnalyzer } from './lib/grasp';
  import MessageList from './components/MessageList.svelte';
  import SettingsPanel from './components/SettingsPanel.svelte';
  import ChannelInput from './components/ChannelInput.svelte';
  import UserList from './components/UserList.svelte';
  import { initializeTwitchChat } from './lib/services/twitchChat';
  import { initializeKeyboardShortcuts } from './lib/utils/keyboard';
  import { getChannelFromUrl, getUrlParams } from './lib/urlParams';
  import { getLanguageData } from './lib/languages';
  import { visibility } from './lib/stores/visibilityStore';

  const channel = getChannelFromUrl();
  let grasp: GraspAnalyzer;

  onMount(async () => {
    if (channel) {
      const langData = await getLanguageData(getUrlParams());
      grasp = new GraspAnalyzer(channel, langData);
      
      await initializeTwitchChat(channel, grasp);
      initializeKeyboardShortcuts();
      document.title = `grasping #${channel}`;
    }
  });
</script>

{#if channel}
  <div class="min-h-screen bg-black text-gray-100">
    <header class="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div class="container mx-auto p-4">
        <SettingsPanel />
      </div>
    </header>
    
    <main class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#if $visibility.chatVisible}
          <MessageList column="chat" />
        {/if}
        <MessageList column="grasp" />
        <MessageList column="picks" />
      </div>
      {#if $visibility.userlistVisible}
        <UserList />
      {/if}
    </main>
  </div>
{:else}
  <ChannelInput />
{/if}