<script lang="ts">
  import { messages } from '../lib/stores/messageStore';
  import { filterSettings } from '../lib/stores/filterStore';
  import { filterMessages } from '../lib/utils/messageFilters';
  import Message from './Message.svelte';

  export let column: 'chat' | 'grasp' | 'picks' = 'chat';
  
  $: displayMessages = column === 'chat' 
    ? $messages.slice(0, 100) 
    : column === 'grasp'
    ? filterMessages($messages, $filterSettings)
    : $messages.filter(msg => msg.pick);

  $: filteredMessages = $filterSettings.username
    ? displayMessages.filter(msg => 
        msg.username.toLowerCase().includes($filterSettings.username.toLowerCase())
      )
    : displayMessages;
</script>

<div class="message-list">
  {#each filteredMessages as message (message.id)}
    <Message {message} {column} />
  {/each}
</div>

<style>
  .message-list {
    height: 94vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-top: 1rem;
    padding-right: 1rem;
  }

  .message-list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .message-list::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 3px;
  }

  .message-list::-webkit-scrollbar-thumb:hover {
    background-color: #444;
  }

  .message-list::-webkit-scrollbar-track {
    background-color: #000;
    border-radius: 3px;
  }
</style>