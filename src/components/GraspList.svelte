<script lang="ts">
  import { messages, filterSettings } from '../lib/messageStore';
  import Message from './Message.svelte';

  $: filteredMessages = $messages.filter(msg => {
    const f = $filterSettings;
    return (
      (f.mention && msg.grasp.mention) ||
      (f.mod && msg.grasp.mod) ||
      (f.sub && msg.grasp.sub) ||
      (f.vip && msg.grasp.vip) ||
      (f.chatcount && msg.grasp.chatcount !== false) ||
      (f.haystack && msg.grasp.haystack) ||
      (f.shorty && msg.grasp.shorty) ||
      msg.grasp.redemption
    ) && (!f.username || msg.username.toLowerCase().includes(f.username.toLowerCase()));
  });
</script>

<div class="message-list">
  {#each filteredMessages as message (message.id)}
    <Message {message} column="grasp" />
  {/each}
</div>