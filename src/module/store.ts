import { createStore } from 'vuex';

interface StoreState {
    modaldisplaystatus: string;
    whichtag: string;
    additemkey: string;
    jsondata: any;
}

export const store = createStore<StoreState>({
    state: {
        modaldisplaystatus: 'modal-hide',
        whichtag: "",
        additemkey: "",
        jsondata: {}
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
        },
        setJsonData(state, data: any) {
            state.jsondata = data;
        },
        addValJsonData (state, newVal: string): void {
            state.jsondata = {
                ...state.jsondata,
                [newVal]: ''
            };
        }
    }
});
