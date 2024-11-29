<script lang="ts">
  import moment from 'moment';
  import type { Message } from '../lib/types';
  import { formatEmotes } from '../lib/emotes';

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

  $: messageClasses = [
    'message',
    message.read ? 'read' : '',
    message.grasp.mod ? 'mod' : '',
    message.grasp.sub ? 'sub' : '',
    message.grasp.vip ? 'vip' : '',
    message.grasp.redemption ? 'redemption' : '',
    message.grasp.mention ? 'mention' : '',
    message.grasp.haystack ? 'haystack' : '',
    column === 'grasp' && message.grasp.chatcount === 1 ? 'first' : '',
    column === 'grasp' && message.grasp.chatcount === 2 ? 'second' : '',
    column === 'grasp' && message.grasp.shorty ? 'shorty' : '',
    `column-${column}`
  ].filter(Boolean).join(' ');
</script>

<div class={messageClasses} on:click={handleClick}>
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
    border-left: 0.5rem solid #1b1b1b;
    border-right: 0.5rem solid #1b1b1b;
    cursor: pointer;
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

  /* Role indicators - only show one at a time in left column */
  .column-chat.message.mod {
    border-left: 0.5rem solid purple;
    border-right: 0.5rem solid #1b1b1b;
  }

  .column-chat.message.sub:not(.mod) {
    border-left: 0.5rem solid white;
    border-right: 0.5rem solid #1b1b1b;
  }

  .column-chat.message.vip:not(.mod):not(.sub) {
    border-left: 0.5rem solid #00ff00;
    border-right: 0.5rem solid #1b1b1b;
  }

  /* Grasp column styling */
  .column-grasp.message.mod {
    border-left: 0.5rem solid purple;
  }

  .column-grasp.message.sub {
    border-left: 0.5rem solid white;
  }

  .column-grasp.message.vip {
    border-left: 0.5rem solid #00ff00;
  }

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
  .column-grasp.message.first .username {
    background-color: purple;
    color: white;
    padding: 0.5rem;
    font-size: 2.2em;
    border-radius: 0.5rem;
  }

  .column-grasp.message.second .username {
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