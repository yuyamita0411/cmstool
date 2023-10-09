<template>
    <div v-if="!isEditingThird">
        <video
            v-if="dataval"
            @click="onStartEditing(itemkey, dataval)"
            class="for-box-movie"
            style="display:inline-block; width:100%;"
            :data-key="itemkey"
            :data-value="dataval"
            :controls="datacontroll == 'true'"
            :autoplay="datacontroll != 'true'"
            :loop="datacontroll != 'true'"
            muted
        >
            <source
                v-if="dataval"
                @click="onStartEditing(itemkey, dataval)"
                :src="dataval"
                type="video/mp4"
                :data-key="itemkey"
                :data-value="dataval"
            >
        </video>
    </div>
    
    <div
    v-else-if="isEditingThird"
    class="input-wrapper">
        <textarea
        class="for-box-movie"
        v-model="internalValue"
        @input="handleInput">
        </textarea>
        <button @click="stopEditing(itemkey)"><img :src="closeButtonsrc"></button>
    </div>
    
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { watch } from 'vue';

import {Function} from '../../../../module/function';
import {ENV} from '../../../../module/env';

export default class boxmovieEditor extends Vue {
    @Prop({ required: true }) itemkey!: string;
    @Prop({ required: true }) keySecondSecond!: string;
    @Prop({ required: true }) sectionKeySecond!: string;
    @Prop({ required: true }) boxKey!: string;
    @Prop({ required: true }) value!: string;
    @Prop({ required: true }) dataval!: string;
    @Prop({ required: true }) datatitle!: string;
    @Prop({ required: true }) datacontroll!: string;
    @Prop({ required: true }) isEditingThird!: boolean;

    func = new Function();
    EN = new ENV();

    closeButtonsrc = this.EN.closebutton;
    internalValue = this.dataval;

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
            "partkey":"url",
            "value": this.internalValue
        });
    }
}
</script>
