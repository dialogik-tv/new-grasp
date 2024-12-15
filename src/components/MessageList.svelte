<script lang="ts">
  import { messages } from '../lib/stores/messages/messageStore';
  import { filterSettings } from '../lib/stores/filterStore';
  import Message from './Message.svelte';

  export let column: 'chat' | 'grasp' | 'picks' = 'chat';
  
  $: displayMessages = column === 'chat' 
    ? $messages.slice(0, 100) 
    : column === 'grasp'
    ? messages.getFiltered($filterSettings)
    : $messages.filter(msg => msg.pick);
</script>

<div class="message-list">
  {#each displayMessages as message (message.id)}
    <Message {message} {column} />
  {/each}
</div>

<style>
  .message-list {
    height: calc(100vh - 8rem);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #222 #000;
    -ms-overflow-style: none;
  }

  .message-list::-webkit-scrollbar {
    width: 6px;
  }

  .message-list::-webkit-scrollbar-track {
    background: #000;
    border-radius: 3px;
  }

  .message-list::-webkit-scrollbar-thumb {
    background: #222;
    border-radius: 3px;
  }

  .message-list::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
</style>