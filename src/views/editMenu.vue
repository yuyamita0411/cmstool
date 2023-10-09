<template>
    <div class="edit-wrapper">
        <div v-for="(value, key, index) in jsonData" :key="key" class="editelem">
            <!-- inputButton -->
            <inputButton :itemkey="key" :value="value" :index="index" :isEditing="isEditing[key] ? isEditing[key] : false"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @delete-element="deleteElement(jsonData, key)"
            @update:value="updateValue(jsonData, $event, key)"
            />
            <!-- inputButton -->

            <!-- box menu -->
            <boxBlock
            :keySecond="key" :valueSecond="value" :indexSecond="index"
            :matchpatternSecond="env.tProp['boxmenu']['matchpattern']"
            :isEditingSecond="isEditing"
            :jsonDataSecond="jsonData"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @update:title="updateBlockVal(jsonData, $event)"
            @update:image="updateBlockVal(jsonData, $event)"
            @update:movie="updateBlockVal(jsonData, $event)"
            @update:description="updateBlockVal(jsonData, $event)"
            />
            <!-- box menu -->
        </div>
        <div class="meta-setting-area">
            <input type="text" :value="jsonData['pagetitle']">
            <input type="text" :value="jsonData['description']">
        </div>
    </div>
</template>

<script lang="ts">
/* APIができたら消す */
import { TEST } from '../module/test';

import { Vue, Options } from "vue-class-component";
import { ENV } from '../module/env';
import { Function } from '../module/function';

import inputButton from '@/components/parts/titlelabel/inputButton.vue'
import boxBlock from '@/components/parts/boxmenu/boxBlock.vue'

@Options({
    components: {
        inputButton,
        boxBlock
    }
})
export default class editMenu extends Vue {
    /* APIができたら消す */
    test = new TEST();

    env = new ENV();
    func = new Function();
    jsonData: object = {};
    jsonData2: object = {};

    inputValNow!: string;
    inputKeyNow!: string;

    isEditing: {
        [key: string]: boolean;
    } = {};

    inputValues: {
        [key: string]: any;
    } = {};

    created () {
        this.jsonData = this.test.jsondata;
        const deepCopy1 = this.test.jsondata;
        const deepCopy2 = JSON.parse(JSON.stringify(this.test.jsondata));

        this.inputValues = deepCopy1;
        this.isEditing = this.func.replaceValuesWithFalse(deepCopy2);
    }

    getMinedData(e: Event){
        const target = e.target as HTMLElement
        this.inputValNow = target.dataset && target.dataset.value ? target.dataset.value : '';
        this.inputKeyNow = target.dataset && target.dataset.key ? target.dataset.key : '';
    }

    startEditing(key: string, value: string) {
        this.isEditing = { ...this.isEditing, [key]: true };
        this.inputValues = { ...this.inputValues, [key]: value };
        this.jsonData = this.inputValues;
    }
    stopEditing(key: string) {
        this.isEditing = { ...this.isEditing, [key]: false };
    }

    deleteElement(target: any, key: string) {
        delete target[key];
    }

    updateValue(target: any, newValue: string, key: string) {
        target[key] = newValue;
    }
    updateBlockVal(target: any, e: any){
        target[e["key"]][e["sectionKey"]][e["boxKey"]][e["partkey"]] = e["value"];
    }
}
</script>

<style lang="scss">
.edit-wrapper {
    max-width: 50rem;
    min-height: 100vh;
    margin: 0 auto;
    background: #ffff;
    .editelem {
        width: 98%;
        margin: 0 auto 2rem auto;
        position: relative;
    }
    .editelem > * {
        cursor: pointer;
    }
}
</style>