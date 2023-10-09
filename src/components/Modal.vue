<template>
    <div :class="`modal-wrapper ${modaldisplaystatus}`">
        <button :class="`modal-close-button`" @click="modalClose"><img :src="closeButtonsrc"></button>
        <div :class="`modal`">
            <p :class="`modalmenu`" @click="modalClose">h2</p>
            <p :class="`modalmenu`" @click="modalClose">h3</p>
            <p :class="`modalmenu`" @click="modalClose">h4</p>
            <p :class="`modalmenu`" @click="modalClose">p</p>
            <p :class="`modalmenu`" @click="modalClose">box menu</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Options } from 'vue-class-component';
import { mapState, mapMutations } from 'vuex';

import {modal} from '../module/store';

import {ENV} from '../module/env';

@Options({
    computed: {
        ...mapState(['modaldisplaystatus'])
    }
})
export default class Modal extends Vue {
    EN = new ENV();
    closeButtonsrc = this.EN.closebutton;

    modalClose() {
        modal.commit('hideModal');
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