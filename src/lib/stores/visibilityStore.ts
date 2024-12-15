import { writable } from 'svelte/store';

interface VisibilityState {
  chatVisible: boolean;
  userlistVisible: boolean;
  statsVisible: boolean;
}

const defaultState: VisibilityState = {
  chatVisible: true,
  userlistVisible: false,
  statsVisible: false
};

function createVisibilityStore() {
  const { subscribe, update } = writable<VisibilityState>(defaultState);

  return {
    subscribe,
    toggleChat: () => update(state => ({ ...state, chatVisible: !state.chatVisible })),
    toggleUserlist: () => update(state => ({ ...state, userlistVisible: !state.userlistVisible })),
    toggleStats: () => update(state => ({ ...state, statsVisible: !state.statsVisible }))
  };
}

export const visibility = createVisibilityStore();