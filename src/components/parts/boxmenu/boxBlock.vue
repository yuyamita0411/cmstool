<template>
    <div
    v-if="func.matchesPattern(keySecond, matchpatternSecond)"
    :class="`${keySecond} spboxwrapper-${indexSecond} boxwrapper-3 showdata`"
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
    @Prop() isEditingSecond!: boolean;
    @Prop() jsonDataSecond!: object;

    func = new Function();

    isEditing: {
        [key: string]: boolean;
    } = {};

    startEditing(key: string) {
        this.isEditing = { ...this.isEditing, [key]: true };
    }
    stopEditing(key: string) {
        this.isEditing = { ...this.isEditing, [key]: false };
    }
    updateValue(target: any, newValue: string, key: string) {
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
.box-menu-divide {
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;
    .box {
        border-left: solid 1px #424479;
        border-bottom: solid 1px #424479;
        text-align: center;
        position: relative;
        display: inline-block;
        float: left;
    }
    .box-header {
        .box-title {
            color: #424479;
            background-color: #fcb900;
            font-size: 18px;
            overflow-x: scroll;
            white-space: nowrap;
            padding: .5rem;
            margin-bottom: 0;
            height: calc((18px * 1.25) + 1rem);
            border-radius: 0;
        }
    }
    .imgWrapper {
        width: 100%;
        display: inline-block;
        background: #ffffff;
        text-align: center;
    }
    .box-content {
        padding: 0;
        .box-text {
            color: #424479;
            background-color: #f3eeee;
            font-size: 16px;
            overflow-x: scroll;
            white-space: nowrap;
            padding: .5rem;
            border-radius: 0;
            float: left;
            width: 100%;
            height: calc((16px * 1.25) + 1rem);
            margin-bottom: 0;
        }
    }
}
@media (min-width: 768px){
    .boxwrapper-3 .box-menu-divide > .box {
        width: calc((100% - 4px) / 3);
    }
}
</style>