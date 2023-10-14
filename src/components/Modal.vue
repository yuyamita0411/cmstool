<template>
    <div :class="`modal-wrapper ${modaldisplaystatus}`">
        <button :class="`modal-close-button`" @click="modalClose"><img :src="closeButtonsrc"></button>
        <div :class="`modal`">
            <p :class="`modalmenu`" :data-itemkey="EN.tProp.h2.matchpattern" @click="clickTagButton">h2</p>
            <p :class="`modalmenu`" :data-itemkey="EN.tProp.h3.matchpattern" @click="clickTagButton">h3</p>
            <p :class="`modalmenu`" :data-itemkey="EN.tProp.h4.matchpattern" @click="clickTagButton">h4</p>
            <p :class="`modalmenu`" :data-itemkey="EN.tProp.p.matchpattern" @click="clickTagButton">p</p>
            <p :class="`modalmenu`" :data-itemkey="EN.tProp.boxmenu.matchpattern" @click="clickTagButton">box menu</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Options } from 'vue-class-component';

import { store } from '../module/store';
import { mapState, mapMutations } from 'vuex';

import { ENV } from '../module/env';

@Options({
    computed: {
        ...mapState(['modaldisplaystatus', 'whichtag', 'additemkey', 'jsondata'])
    }
})
export default class Modal extends Vue {
    EN: any = new ENV();
    closeButtonsrc = this.EN.closebutton;

    clickTagButton (e: Event) {
        this.modalClose(e);
        this.chooseWhichTag(e);
    }

    modalClose(e: Event) {
        store.commit('toggleModal', false);
    }
    chooseWhichTag(e: Event) {
/*
        1. クリックした瞬間に+ボタンのdata-itemkeyを取得する store.state.additemkey
        2. data-itemkeyをキーに持つ値がjsonDataでの中でどの位置(何番目)かを取得する index
        3. サイドバーをクリックした時のdata-itemkeyを取得する target.dataset.itemkey
        4. {3で取得した文字列}{数字}の形式になってるキーがjsonDataの中の3で取得した数字番目までの中にいくつ含まれるかを取得する
        5. 4で取得した数字に1を足して{3で取得した文字列}{4で取得した数字+1}をキーとする
        6. jsonDataの中の3で取得した数字番目以降の{3で取得した文字列}{数字}の形式になってるキーの数字を1+する
        7. 新しい値をjsonDataの中へ追加する
*/
        const target = e.target as HTMLElement;
        store.commit('setTag', this.EN.tProp[target.innerText]["matchpattern"]);

        const regex = new RegExp(target.dataset.itemkey + "\\d*$");
        const keys = Object.keys(store.state.jsondata);

        let extractedNumber = 1;
        let firstHalf: any = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            firstHalf[key] = store.state.jsondata[key];
            if (regex.test(key)) {
                extractedNumber = Number(key.match(/\d+/g)) + 1;
            }
            if (key === store.state.additemkey) {
                break;
            }
        }
        firstHalf[`${target.dataset.itemkey}${extractedNumber}`] = '';

        let firstKeys = Object.keys(firstHalf);
        let lastHalf: any = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!firstKeys.includes(key)) {
                if (regex.test(key)) {
                    let nextnum = Number(key.match(/\d+/g)) + 1;
                    let newKey = `${target.dataset.itemkey}${nextnum}`;
                    lastHalf[newKey] = store.state.jsondata[key];
                } else {
                    lastHalf[key] = store.state.jsondata[key];
                }
            }
        }
        store.state.jsondata = { ...firstHalf, ...lastHalf };
    }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    background:#ffff;
    top:0;
    width:10rem;
    min-height:100vh;
    display:inline-block;
    border-right: solid .4px;
    .modal {
        display: inline-block;
        width: 100%;
        position:relative;
        top:3rem;
        .modalmenu {
            cursor: pointer;
            font-size: 24px;
            padding:1rem 0 1rem 0;
            flex: 1;
            margin-bottom: 0;
            box-shadow: .1px .3px 2px rgba(0, 0, 0, 0.3);
        }
    }
    .modal-close-button {
        position: absolute;
        top: .3rem;
        right: .3rem;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        background: transparent;
        border: none;
        cursor:pointer;
        img {
            width: 100%;
        }
    }
}
.modal-show {
    opacity: 1;
    left:4rem;
}
.modal-hide {
    opacity: 0;
    left:0;
    pointer-events:none;
}
.modal-show,
.modal-hide {
    transition: all .5s;
}
</style>