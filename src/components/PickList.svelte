<script lang="ts">
  import { messages, filterSettings } from '../lib/messageStore';
  import Message from './Message.svelte';

  $: filteredMessages = $messages.filter(msg => 
    msg.pick && (!$filterSettings.username || 
    msg.username.toLowerCase().includes($filterSettings.username.toLowerCase()))
  );
</script>

<div class="message-list">
  {#each filteredMessages as message (message.id)}
    <Message {message} column="picks" />
  {/each}
</div>