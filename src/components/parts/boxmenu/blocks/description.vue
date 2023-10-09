<template>
    <div
    v-if="!isEditingThird"
    @click="onStartEditing(itemkey, dataval)"
    class="box-content"
    style="padding:0"
    :data-key="boxKey"
    :data-value="dataval"
    >
        <p
        @click="onStartEditing(itemkey, dataval)"
        class="box-text"
        :data-key="boxKey"
        :data-value="dataval"
        >{{dataval}}</p>
    </div>
    <div
    v-else-if="isEditingThird"
    class="input-wrapper">
        <textarea
        v-model="internalValue"
        @input="handleInput"
        class="for-box-description"
        >
        </textarea>
        <button @click="stopEditing(itemkey)"><img :src="closeButtonsrc"></button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { watch } from 'vue';

import { Function } from '../../../../module/function';
import { ENV } from '../../../../module/env';

export default class boxdescriptionEditor extends Vue {
    @Prop({ required: true }) itemkey!: string;
    @Prop({ required: true }) keySecondSecond!: string;
    @Prop({ required: true }) sectionKeySecond!: string;
    @Prop({ required: true }) boxKey!: string;
    @Prop({ required: true }) value!: string;
    @Prop({ required: true }) dataval!: string;
    @Prop({ required: true }) isEditingThird!: boolean;

    internalValue = this.dataval;

    func = new Function();
    EN = new ENV();

    closeButtonsrc = this.EN.closebutton;

    setup(props: any) {
        watch(
            () => props.value,
            (newValue) => {
                this.internalValue = newValue;
            }
        );
    }

    onStartEditing(key: string, value: string) {
        this.internalValue = value;
        this.$emit('start-editing', key, value);
    }

    stopEditing(key: string) {
        this.$emit('stop-editing', key);
    }

    handleInput() {
        this.$emit(
        'send-data',
        {
            "key": this.keySecondSecond,
            "sectionKey": this.sectionKeySecond,
            "boxKey": this.boxKey,
            "partkey":"description",
            "value": this.internalValue
        });
    }
}
</script>
