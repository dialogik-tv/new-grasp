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
  {#if roles.length > 0}
    <div class="role-indicators" aria-hidden="true">
      {#each roles as role}
        <div 
          class={`role-indicator ${role.type}`} 
          style="height: {roleHeight}; background-color: {role.color};"
        />
      {/each}
    </div>
  {/if}
  <div class="meta">
    <div class="username">{message.username}</div>
    <div class="timestamp">{moment(message.timestamp).fromNow()}</div>
  </div>
  <div class="body break-words whitespace-pre-wrap">
    {@html formatEmotes(message.message, message.emotes)}
  </div>
</div>

<style>
  .message {
    margin-bottom: 0.75rem;
    background-color: #1b1b1b;
    padding: 0.75rem 1rem 0.75rem 1.5rem;
    cursor: pointer;
    position: relative;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .message:hover {
    background-color: #252525;
  }

  .message:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(62, 184, 255, 0.3);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .username {
    font-size: 0.875rem;
    color: #999;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .timestamp {
    font-size: 0.75rem;
    color: #666;
    padding-left: 0.5rem;
  }

  .body {
    line-height: 1.4;
    font-size: 1rem;
    color: #e1e1e1;
  }

  .message.read {
    opacity: 0.4;
  }

  /* Role indicators - vertical bars only */
  .role-indicators {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
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

  /* First message styling - more prominent but not too large */
  .column-grasp.first-message .username {
    font-size: 1.5rem;
    background-color: purple;
    color: white;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    font-weight: bold;
    display: inline-block;
  }

  .column-grasp.second-message .username {
    background-color: purple;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  /* Special indicators - grasp column only */
  .column-grasp.mention {
    border-right: 0.25rem solid #00acee;
  }

  .column-grasp.redemption {
    border-right: 0.25rem solid #ff5e00;
  }

  .column-grasp.haystack {
    border-right: 0.25rem solid yellow;
  }

  .column-grasp.shorty .body {
    font-size: 1.75rem;
    font-weight: bold;
    line-height: 1.2;
    margin-top: 0.375rem;
  }

  :global(.emoticon) {
    max-height: 1.5em;
    vertical-align: middle;
    margin: 0 0.125em;
  }

  :global(.message.read .emoticon) {
    filter: grayscale(100%);
    opacity: 0.5;
  }
</style>