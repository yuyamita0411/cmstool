<template>
    <div
    v-if="func.matchesPattern(keySecond, matchpatternSecond)"
    :class="`${keySecond} spboxwrapper-${indexSecond} showdata`"
    >
        <div :class="`box-menu-divide ${keySecond}`" v-for="(sectionValue, sectionKey) in valueSecond" :key="sectionKey" >
            <div :class="`box`" v-for="(boxValue, boxKey) in sectionValue" :key="boxKey" >

                <boxtitleEditor
                :keySecondSecond="keySecond"
                :sectionKeySecond="sectionKey"
                :boxKey="boxKey"
                :value="valueSecond"
                :index="indexSecond"
                :itemkey="`${sectionKey}-${boxKey}-title`"
                :dataval="boxValue['title']"
                :isEditingThird="isEditing[`${sectionKey}-${boxKey}-title`] ? isEditing[`${sectionKey}-${boxKey}-title`] : false"
                @start-editing="startEditing"
                @stop-editing="stopEditing"
                @send-data="sendData"
                />

                <boximgEditor
                :keySecondSecond="keySecond"
                :sectionKeySecond="sectionKey"
                :boxKey="boxKey"
                :value="valueSecond"
                :index="indexSecond"
                :itemkey="`${sectionKey}-${boxKey}-image`"
                :dataval="boxValue['title']"
                :dataurl="boxValue['imageurl']"
                :isEditingThird="isEditing[`${sectionKey}-${boxKey}-image`] ? isEditing[`${sectionKey}-${boxKey}-image`] : false"
                @start-editing="startEditing"
                @stop-editing="stopEditing"
                @send-data="sendData"
                />

                <boxmovieEditor
                :keySecondSecond="keySecond"
                :sectionKeySecond="sectionKey"
                :boxKey="boxKey"
                :value="valueSecond"
                :index="indexSecond"
                :itemkey="`${sectionKey}-${boxKey}-movie`"
                :dataval="boxValue['url']"
                :datatitle="boxValue['title']"
                :datacontroll="boxValue['controll']"
                :isEditingThird="isEditing[`${sectionKey}-${boxKey}-movie`] ? isEditing[`${sectionKey}-${boxKey}-movie`] : false"
                @start-editing="startEditing"
                @stop-editing="stopEditing"
                @send-data="sendData"
                />

                <boxdescriptionEditor
                :keySecondSecond="keySecond"
                :sectionKeySecond="sectionKey"
                :boxKey="boxKey"
                :value="valueSecond"
                :index="indexSecond"
                :itemkey="`${sectionKey}-${boxKey}-description`"
                :dataval="boxValue['description']"
                :isEditingThird="isEditing[`${sectionKey}-${boxKey}-description`] ? isEditing[`${sectionKey}-${boxKey}-description`] : false"
                @start-editing="startEditing"
                @stop-editing="stopEditing"
                @send-data="sendData"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { watch } from 'vue';

import boxtitleEditor from '@/components/parts/boxmenu/blocks/boxtitle.vue'
import boximgEditor from '@/components/parts/boxmenu/blocks/boximg.vue'
import boxmovieEditor from '@/components/parts/boxmenu/blocks/boxmovie.vue'
import boxdescriptionEditor from '@/components/parts/boxmenu/blocks/description.vue'

import {Function} from '../../../module/function';

@Options({
    components: {
        boxtitleEditor,
        boximgEditor,
        boxmovieEditor,
        boxdescriptionEditor,
    }
})
export default class boxBlock extends Vue {
    @Prop({ required: true }) keySecond!: string;
    @Prop({ required: true }) valueSecond!: string;
    @Prop({ required: true }) matchpatternSecond!: string;
    @Prop({ required: true }) indexSecond!: number;
    @Prop() isEditingSecond!: any;
    @Prop() jsonDataSecond!: any;

    func = new Function();

    isEditing: {
        [key: string]: boolean;
    } = {};

    internalValue = this.dataval;

    startEditing(key: any, value: any) {
        this.isEditing = { ...this.isEditing, [key]: true };
        this.inputValues = { ...this.inputValues, [key]: value };
        this.jsonData = this.inputValues;
    }
    stopEditing(key: any) {
        this.isEditing = { ...this.isEditing, [key]: false };
    }
    updateValue(target: any, newValue: any, key: any) {
        target[key] = newValue;
    }
    sendData(e: any) {
        this.$emit('update:title', e);
        this.$emit('update:image', e);
        this.$emit('update:movie', e);
        this.$emit('update:description', e);
    }
}
</script>

<style lang="scss" scoped>
</style>