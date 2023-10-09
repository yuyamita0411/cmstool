<template>
    <div
    v-if="func.matchesPattern(itemkey, matchpattern)"
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
            <h2tag v-if="tagname == 'h2'" :appendval="value" />
            <h3tag v-else-if="tagname == 'h3'" :appendval="value" />
            <h4tag v-else-if="tagname == 'h4'" :appendval="value" />
            <ptag v-else-if="tagname == 'p'" :appendval="value" />
        </div>
        <div
        v-else-if="isEditing"
        class="input-wrapper showdata">
            <textarea
                :class="tagfor"
                v-model="internalValue"
                @input="handleInput"
                ref="textheight"
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
            :src="addcontenticon"></button>
            <span class="addcontent-border"></span>
        </div>
        <button :class="`trashbutton ${displayTrash}`" @click="deleteElement(itemkey)"><img :src="trashicon"></button>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { watch } from 'vue';
import { mapMutations, mapState } from 'vuex';

import {modal} from '../../../module/store';

import {Function} from '../../../module/function';
import {ENV} from '../../../module/env';

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
    }
})
export default class inputButton extends Vue {
    @Prop({ required: true }) itemkey!: string;
    @Prop({ required: true }) value!: string;
    @Prop({ required: true }) tagname!: string;
    @Prop({ required: true }) matchpattern!: string;
    @Prop({ required: true }) isEditing!: boolean;
    @Prop({ required: true }) tagfor!: string;

    internalValue = this.value;

    func = new Function();
    EN = new ENV();

    closeButtonsrc = this.EN.closebutton;
    trashicon = this.EN.trashicon;
    addcontenticon = this.EN.addcontenticon;

    displayTrash = 'hide-trash';
    displayAddButton = 'hide-addbutton';

    setup(props: any) {
        watch(
            () => props.value,
            (newValue) => {
                this.internalValue = newValue;
            }
        );
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
        modal.commit('showModal');
        this.$emit('stop-editing', key);
    }

    handleInput() {
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