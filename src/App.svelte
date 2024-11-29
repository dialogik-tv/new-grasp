<script lang="ts">
  import { onMount } from 'svelte';
  import { GraspAnalyzer } from './lib/grasp';
  import MessageList from './components/MessageList.svelte';
  import GraspList from './components/GraspList.svelte';
  import PickList from './components/PickList.svelte';
  import SettingsPanel from './components/SettingsPanel.svelte';
  import ChannelInput from './components/ChannelInput.svelte';
  import { initializeChat } from './lib/chat';
  import { getChannelFromUrl, getUrlParams } from './lib/urlParams';
  import { initializeKeyboardShortcuts } from './lib/keyboard';
  import { getLanguageData } from './lib/languages';

  const channel = getChannelFromUrl();
  let grasp: GraspAnalyzer;

  onMount(async () => {
    if (channel) {
      const langData = await getLanguageData(getUrlParams());
      grasp = new GraspAnalyzer(channel, langData);
      
      await initializeChat(channel, grasp);
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
        <MessageList />
        <GraspList />
        <PickList />
      </div>
    </main>
  </div>
{:else}
  <ChannelInput />
{/if}