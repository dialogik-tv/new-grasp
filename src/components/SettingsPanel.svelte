<script lang="ts">
  import { filterSettings } from '../lib/stores/filterStore';
</script>

<div id="settings" class="flex justify-between items-center">
  <div class="flex flex-wrap gap-2">
    <input
      id="input-search-username"
      class="bg-[#1b1b1b] px-2 py-1 text-white placeholder-gray-500"
      bind:value={$filterSettings.username}
      placeholder="Search username"
      on:click={(e) => e.ctrlKey && ($filterSettings.username = '')}
    >

    <span class="checkbox-group">
      <span class="checkbox-holder bg-gray-500" title="Shift + C">
        <input
          type="checkbox"
          id="chatcount"
          bind:checked={$filterSettings.chatcount}
        />
        <label for="chatcount">Count</label>
      </span>
    </span>

    <span class="checkbox-group">
      <span class="checkbox-holder bg-purple-500" title="Shift + M">
        <input
          type="checkbox"
          id="mod"
          bind:checked={$filterSettings.mod}
        />
        <label for="mod">Mod</label>
      </span>
      
      <span class="checkbox-holder bg-white text-black" title="Shift + S">
        <input
          type="checkbox"
          id="sub"
          bind:checked={$filterSettings.sub}
        />
        <label for="sub">Sub</label>
      </span>
      
      <span class="checkbox-holder bg-green-500" title="Shift + V">
        <input
          type="checkbox"
          id="vip"
          bind:checked={$filterSettings.vip}
        />
        <label for="vip">VIP</label>
      </span>
    </span>
    
    <span class="checkbox-group">
      <span class="checkbox-holder bg-blue-400" title="Keyboard 'M'">
        <input
          type="checkbox"
          id="mention"
          bind:checked={$filterSettings.mention}
        />
        <label for="mention">@mention</label>
      </span>
    </span>
    
    <span class="checkbox-group">
      <span class="checkbox-holder bg-yellow-400 text-black" title="Shift + H">
        <input
          type="checkbox"
          id="haystack"
          bind:checked={$filterSettings.haystack}
        />
        <label for="haystack">Haystack</label>
      </span>
      
      <span class="checkbox-holder bg-yellow-400 text-black" title="Keyboard 'H'">
        <input
          type="checkbox"
          id="shorty"
          bind:checked={$filterSettings.shorty}
        />
        <label for="shorty">Shorties</label>
      </span>
    </span>
  </div>

  <div>
    <a 
      href="https://github.com/dialogik-tv/grasp#grasp-the-grasp-out-of-your-twitch-chat" 
      target="_blank" 
      class="text-blue-400 hover:underline"
    >
      Help
    </a>
  </div>
</div>

<style>
  #settings {
    font-family: 'Fira Code', monospace;
    letter-spacing: -1px;
  }

  input[type="checkbox"] {
    margin-right: 0.5em;
  }

  .checkbox-group {
    margin-right: 2rem;
  }

  .checkbox-holder {
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
  }

  label {
    cursor: pointer;
    font-weight: 900;
  }

  @media (max-width: 909px) {
    input#input-search-username { 
      display: none;
    }
  }

  @media (max-width: 320px), (orientation: portrait) and (hover: none) and (pointer: coarse) {
    .checkbox-group {
      display: block;
      margin-bottom: 0.7rem;
    }
    .checkbox-holder {
      padding: 0.3rem;
    }

    #settings {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 0.8rem 0.7rem 0.3rem;
      width: 100%;
      z-index: 1000;
      background: #444;
    }
  }
</style>