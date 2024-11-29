<script lang="ts">
  import { messages, filterSettings } from '../lib/messageStore';
  import Message from './Message.svelte';

  $: filteredMessages = $messages.filter(msg => 
    !$filterSettings.username || 
    msg.username.toLowerCase().includes($filterSettings.username.toLowerCase())
  );
</script>

<div class="message-list">
  {#each filteredMessages as message (message.id)}
    <Message {message} column="chat" />
  {/each}
</div>