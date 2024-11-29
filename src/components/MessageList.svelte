<script lang="ts">
  import { chatMessages, graspMessages, pickedMessages } from '../lib/stores/messageStore';
  import Message from './Message.svelte';

  export let column: 'chat' | 'grasp' | 'picks' = 'chat';
  
  $: messages = column === 'chat' ? chatMessages :
                column === 'grasp' ? graspMessages :
                pickedMessages;
</script>

<div class="message-list">
  {#each $messages as message (message.id)}
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