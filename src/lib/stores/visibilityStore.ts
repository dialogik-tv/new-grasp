import { writable } from 'svelte/store';

interface VisibilityState {
  chatVisible: boolean;
  userlistVisible: boolean;
}

const defaultState: VisibilityState = {
  chatVisible: true,
  userlistVisible: false
};

function createVisibilityStore() {
  const { subscribe, update } = writable<VisibilityState>(defaultState);

  return {
    subscribe,
    toggleChat: () => update(state => ({ ...state, chatVisible: !state.chatVisible })),
    toggleUserlist: () => update(state => ({ ...state, userlistVisible: !state.userlistVisible }))
  };
}

export const visibility = createVisibilityStore();