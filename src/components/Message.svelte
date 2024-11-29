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
    message.grasp.redemption ? 'redemption' : '',
    message.grasp.mention ? 'mention' : '',
    message.grasp.haystack ? 'haystack' : '',
    column === 'grasp' && message.grasp.chatcount === 1 ? 'first' : '',
    column === 'grasp' && message.grasp.chatcount === 2 ? 'second' : '',
    column === 'grasp' && message.grasp.shorty ? 'shorty' : '',
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
    margin-bottom: 1rem;
    background-color: #1b1b1b;
    padding: 0.6rem;
    cursor: pointer;
    position: relative;
    padding-left: 1.5rem;
    outline: none;
  }

  .message:focus {
    box-shadow: 0 0 0 2px rgba(62, 184, 255, 0.3);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
    column-gap: 0.5em;
  }

  .username {
    flex: 0 1 auto;
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-size: 0.7em;
    color: #444;
    font-weight: bold;
  }

  .timestamp {
    flex: 1 1 auto;
    text-align: right;
    white-space: nowrap;
    color: #444;
    font-size: 0.8rem;
  }

  .body {
    line-height: 1.5;
  }

  .message.read {
    opacity: 0.4;
    color: #444;
  }

  /* Role indicators */
  .role-indicators {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .role-indicator {
    transition: height 0.2s ease;
  }

  /* Column specific styling */
  .column-chat .role-indicators {
    width: 0.5rem;
  }

  .column-grasp .role-indicators {
    width: 0.5rem;
  }

  /* Grasp column styling */
  .column-grasp.message.redemption {
    border-right: 0.5rem solid #ff5e00;
  }

  .column-grasp.message.mention {
    border-right: 0.5rem solid #00acee;
  }

  .column-grasp.message.haystack {
    border-right: 0.5rem solid yellow;
  }

  /* Special styling for grasp column only */
  .column-grasp.message.first .meta .username {
    background-color: purple;
    color: white;
    padding: 0.5rem;
    font-size: 2.2em;
    border-radius: 0.5rem;
  }

  .column-grasp.message.second .meta .username {
    background-color: purple;
    color: white;
    padding: 0.1rem;
    border-radius: 0.5rem;
  }

  .column-grasp.message.shorty .body {
    font-size: 2.5em;
    font-weight: bold;
  }

  :global(.emoticon) {
    max-height: 2em;
    vertical-align: middle;
    margin: 0 0.1em;
  }

  :global(.message.read .emoticon) {
    filter: grayscale(100%);
    opacity: 0.5;
  }
</style>