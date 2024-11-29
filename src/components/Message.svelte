<script lang="ts">
  import moment from 'moment';
  import type { Message } from '../lib/types';
  import { formatEmotes } from '../lib/emotes';
  import { getUserRoles } from '../lib/utils/roles';

  export let message: Message;
  export let column: 'chat' | 'grasp' | 'picks' = 'chat';

  function handleClick(event: MouseEvent) {
    if (event.altKey) {
      message.pick = true;
    } else if (event.ctrlKey) {
      message.pick = false;
    } else {
      message.read = !message.read;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      message.read = !message.read;
    } else if (event.altKey && event.key === 'Enter') {
      message.pick = true;
    } else if (event.ctrlKey && event.key === 'Enter') {
      message.pick = false;
    }
  }

  $: messageClasses = [
    'message',
    message.read ? 'read' : '',
    column === 'grasp' ? [
      message.grasp.redemption ? 'redemption' : '',
      message.grasp.mention ? 'mention' : '',
      message.grasp.haystack ? 'haystack' : '',
      message.grasp.chatcount === 1 ? 'first-message' : '',
      message.grasp.chatcount === 2 ? 'second-message' : '',
      message.grasp.shorty ? 'shorty' : ''
    ].join(' ') : '',
    `column-${column}`
  ].filter(Boolean).join(' ');

  $: roles = getUserRoles(message.badges);
  $: roleHeight = roles.length > 0 ? `${100 / roles.length}%` : '0';
</script>

<div 
  class={messageClasses} 
  on:click={handleClick}
  on:keydown={handleKeyDown}
  role="button"
  tabindex="0"
>
  <div class="role-indicators" aria-hidden="true">
    {#if roles.length > 0}
      {#each roles as role}
        <div 
          class={`role-indicator ${role.type}`} 
          style="height: {roleHeight}; background-color: {role.color};"
        />
      {/each}
    {/if}
  </div>

  <div class="message-content">
    <div class="message-header">
      <div class="username-container">
        <span class="username">{message.username}</span>
        <span class="timestamp">{moment(message.timestamp).fromNow()}</span>
      </div>
    </div>
    
    <div class="message-body">
      {@html formatEmotes(message.message, message.emotes)}
    </div>
  </div>
</div>

<style>
  .message {
    position: relative;
    background: #1a1a1a;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    display: flex;
  }

  .message:hover {
    background: #222;
  }

  .message.read {
    opacity: 0.5;
  }

  .role-indicators {
    flex: none;
    width: 0.25rem;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    overflow: hidden;
  }

  .role-indicator {
    transition: height 0.2s ease;
  }

  .message-content {
    flex: 1;
    padding: 0.75rem 1rem;
    min-width: 0;
  }

  .message-header {
    margin-bottom: 0.5rem;
  }

  .username-container {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
  }

  .username {
    font-size: 0.875rem;
    color: #999;
    font-weight: 500;
  }

  .timestamp {
    font-size: 0.75rem;
    color: #666;
  }

  .message-body {
    color: #e1e1e1;
    line-height: 1.4;
    word-break: break-word;
    white-space: pre-wrap;
  }

  /* Grasp column specific styles */
  .column-grasp.first-message .username {
    font-size: 1.25rem;
    background: #800080;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .column-grasp.second-message .username {
    background: rgba(128, 0, 128, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .column-grasp.mention {
    border-right: 0.25rem solid #00acee;
  }

  .column-grasp.redemption {
    border-right: 0.25rem solid #ff5e00;
  }

  .column-grasp.haystack {
    border-right: 0.25rem solid #ffd700;
  }

  .column-grasp.shorty .message-body {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.2;
  }

  :global(.emoticon) {
    height: 1.5em;
    vertical-align: middle;
    margin: 0 0.125em;
  }

  :global(.message.read .emoticon) {
    filter: grayscale(100%);
    opacity: 0.5;
  }
</style>