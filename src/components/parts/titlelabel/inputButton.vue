<template>
    <div
    class="displaytest"
    v-if="displayCheck(itemkey)"
    @click="getHeight"
    @mouseover="mouseOverWrapper"
    ref="getheight"
    >
        <div
        v-if="!isEditing"
        @click="onStartEditing(itemkey, value)"
        :data-key="itemkey"
        :data-value="value"
        >
        <!-- itemkey = contenttitle1 -->
            <h2tag v-if="func.matchesPattern(itemkey, EN.tProp['h2']['matchpattern'])" :appendval="value" />
            <h3tag v-else-if="func.matchesPattern(itemkey, EN.tProp['h3']['matchpattern'])" :appendval="value" />
            <h4tag v-else-if="func.matchesPattern(itemkey, EN.tProp['h4']['matchpattern'])" :appendval="value" />
            <ptag v-else-if="func.matchesPattern(itemkey, EN.tProp['p']['matchpattern'])" :appendval="value" />
        </div>
        <div
        v-else-if="isEditing"
        class="input-wrapper showdata">
            <textarea
                v-model="internalValue"
                @input="handleInput"
                ref="textheight"
                :class="`for-${tagname}`"
            >
            </textarea>
            <button @click="stopEditing(itemkey)"><img :src="closeButtonsrc"></button>
        </div>
        <div
        v-if="!isEditing"
            @mouseover="mouseOverButton"
            @mousemove="mouseOverButton"
            @mouseout="mouseOutButton"
            :class="`addcontent-wrapper`"
        >
            <button :class="`addcontentbutton ${displayAddButton}`"
            @click="addBlockFunc"
            ><img
            :src="addcontenticon"
            :data-itemkey="itemkey"
            @click="getItemKey"></button>
            <span class="addcontent-border"></span>
        </div>
        <button :class="`trashbutton ${displayTrash}`" @click="deleteElement(itemkey)"><img :src="trashicon"></button>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { watch } from 'vue';

import { store } from '../../../module/store';
import { mapState, mapMutations } from 'vuex';

import { Function } from '../../../module/function';
import { ENV } from '../../../module/env';

import h2tag from './htags/h2.vue';
import h3tag from './htags/h3.vue';
import h4tag from './htags/h4.vue';
import ptag from './htags/p.vue';

@Options({
    components: {
        h2tag,
        h3tag,
        h4tag,
        ptag
    },
    computed: {
        ...mapState(['additemkey', 'jsondata'])
    }
})
export default class inputButton extends Vue {
    @Prop({ required: true }) itemkey!: string;
    @Prop({ required: true }) value!: string;
    @Prop({ required: true }) isEditing!: boolean;

    internalValue = this.value;

    func = new Function();
    EN = new ENV();

    closeButtonsrc = this.EN.closebutton;
    trashicon = this.EN.trashicon;
    addcontenticon = this.EN.addcontenticon;

    displayTrash = 'hide-trash';
    displayAddButton = 'hide-addbutton';

    tagname = '';

    setup(props: any) {
        watch(
            () => props.value,
            (newValue) => {
                this.internalValue = newValue;
            }
        );
    }

    displayCheck (key: string) {
        let flg = false;
        if (this.func.matchesPattern(key, this.EN.tProp['h2']['matchpattern'])) {
            flg = true;
        }
        if (this.func.matchesPattern(key, this.EN.tProp['h3']['matchpattern'])) {
            flg = true;
        }
        if (this.func.matchesPattern(key, this.EN.tProp['h4']['matchpattern'])) {
            flg = true;
        }
        if (this.func.matchesPattern(key, this.EN.tProp['p']['matchpattern'])) {
            flg = true;
        }
        return flg;
    }

    getHeight () {
        if (this.$refs.textheight) {
            const textarea: any = this.$refs.textheight;
            textarea.removeAttribute('style');
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        this.displayAddButton = 'hide-addbutton';
    }

    onStartEditing(key: string, value: string) {
        this.tagname = this.func.checkRegArr(this.itemkey, this.EN.bProp);
        this.internalValue = value;
        this.$emit('start-editing', key, value);
    }

    stopEditing(key: string) {
        this.$emit('stop-editing', key);
    }

    deleteElement(key: string) {
        this.$emit('delete-element', key);
    }

    mouseOverWrapper () {
        this.displayTrash = 'display-trash';
    }

    mouseOverButton () {
        this.displayAddButton = 'display-addbutton';
    }

    mouseOutButton () {
        this.displayAddButton = 'hide-addbutton';
    }

    addBlockFunc (key: string) {
        store.commit('toggleModal', true);
        this.$emit('stop-editing', key);
    }

    getItemKey (e: Event) {
        const target = e.target as HTMLElement;
        store.commit('setItemKey', target.dataset.itemkey);
    }

    handleInput(e: any) {
        if (this.tagname == 'p') {
            const textarea: any = this.$refs.textheight;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        this.$emit('update:value', this.internalValue);
    }
}
</script>

<style lang="scss" scoped>
.display-addbutton,
.display-trash {
    opacity: 1;
}
.hide-addbutton,
.hide-trash {
    opacity: 0;
}
.display-addbutton,
.hide-addbutton,
.display-trash,
.hide-trash {
    transition: all .3s;
}
</style>