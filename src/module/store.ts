import { createStore } from 'vuex';

interface StoreState {
    modaldisplaystatus: string;
    whichtag: string;
    additemkey: string;
}

export const store = createStore<StoreState>({
    state: {
        modaldisplaystatus: 'modal-hide',
        whichtag: "",
        additemkey: ""
    },
    mutations: {
        toggleModal(state, display: boolean) {
            state.modaldisplaystatus = display ? 'modal-show' : 'modal-hide';
        },
        setTag(state, tag: string) {
            state.whichtag = tag;
        },
        setItemKey(state, itemkey: string) {
            state.additemkey = itemkey;
        }
    }
});
