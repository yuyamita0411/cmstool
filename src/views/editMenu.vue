<template>
    <div class="edit-wrapper">
        <div v-for="(value, key, index) in jsonData" :key="key" class="editelem">
            <!-- h2 -->
            <inputButton :itemkey="key" :value="value" :index="index" :isEditing="isEditing[key] ? isEditing[key] : false"
            :tagname="env.tProp['h2']['tagname']" :tagfor="env.tProp['h2']['tagfor']"
            :matchpattern="env.tProp['h2']['matchpattern']"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @delete-element="deleteElement(jsonData, key)"
            @update:value="updateValue(jsonData, $event, key)"
            />

            <!-- h3 -->
            <inputButton :itemkey="key" :value="value" :index="index" :isEditing="isEditing[key] ? isEditing[key] : false"
            :tagname="env.tProp['h3']['tagname']" :tagfor="env.tProp['h3']['tagfor']"
            :matchpattern="env.tProp['h3']['matchpattern']"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @delete-element="deleteElement(jsonData, key)"
            @update:value="updateValue(jsonData, $event, key)"
            />
            <!-- h3 -->

            <!-- h4 -->
            <inputButton :itemkey="key" :value="value" :index="index" :isEditing="isEditing[key] ? isEditing[key] : false"
            :tagname="env.tProp['h4']['tagname']" :tagfor="env.tProp['h4']['tagfor']"
            :matchpattern="env.tProp['h4']['matchpattern']"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @delete-element="deleteElement(jsonData, key)"
            @update:value="updateValue(jsonData, $event, key)"
            />
            <!-- h4 -->

            <!-- p -->
            <inputButton :itemkey="key" :value="value" :index="index" :isEditing="isEditing[key] ? isEditing[key] : false"
            :tagname="env.tProp['p']['tagname']" :tagfor="env.tProp['p']['tagfor']"
            :matchpattern="env.tProp['p']['matchpattern']"
            @start-editing="startEditing"
            @stop-editing="stopEditing"
            @delete-element="deleteElement(jsonData, key)"
            @update:value="updateValue(jsonData, $event, key)"
            />
            <!-- p -->

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
import {TEST} from '../module/test';

import { Vue, Options } from "vue-class-component";

import {ENV} from '../module/env';
import {Function} from '../module/function';

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
}
.editelem {
    width: 98%;
    margin: 0 auto 2rem auto;
    position: relative;
}
.editelem > * {
    cursor: pointer;
}
[class*="for-"],
.showdata {
    font-family: "YourFontFamily", sans-serif;
    display: inline-block;
    width: calc(100% - 7rem);
}
.showdata{
    padding: 1rem;
}
.input-wrapper {
    position: relative;
    button {
        bottom: .5rem;
        right: 50%;
        img {
            width: 100%;
        }
    }
    textarea {
        width: 100%;
        border: none;
        background: rgb(0, 0, 0, .05);
    }
}
.trashbutton {
    bottom: .5rem;
    right: 5rem;

    img {
        width: 100%;
    }
}

.input-wrapper button,
.trashbutton,
.addcontentbutton {
    cursor: pointer;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    background: transparent;
    border: none;
}
.addcontent-wrapper{
    height: 1.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    bottom: -1rem;
    .addcontentbutton {
        bottom: 0;
        right: 50%;

        img {
            width: 100%;
        }
    }
    .addcontent-border {
        width:100%;
        height: .5px;
        display: inline-block;
        background: rgb(0, 0, 0, .5);
    }
}

h2,
.for-h2 {
    font-size: 1.5rem;
    margin: 0 0 .5rem 0;
}

h3,
.for-h3,
.for-box-h3 {
    font-size: 1.17rem;
    margin: 0 0 .5rem 0;
}

h4,
.for-h4 {
    font-size: 1.05rem;
    margin: 0 0 .5rem 0;
}

p,
.for-p,
.for-box-description {
    font-size: 1rem;
    margin: 0 0 .5rem 0;
}

.for-box-image {}
.for-box-movie {}
</style>