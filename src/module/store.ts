import { createStore } from 'vuex';

interface State {
    modaldisplaystatus: string;
}

export const modal = createStore<State>({
    state: {
        modaldisplaystatus: 'modal-hide'
    },
    mutations: {
        showModal(state) {
            state.modaldisplaystatus = 'modal-show';
        },
        hideModal(state) {
            state.modaldisplaystatus = 'modal-hide';
        }
    }
});