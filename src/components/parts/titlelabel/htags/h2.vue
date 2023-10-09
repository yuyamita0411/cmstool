<template>
    <h2 class="showdata">
        <i class="fa-check" style="color:#fcb900; margin:0 .2em;"></i>
        {{appendval}}
    </h2>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';

export default class h2tag extends Vue {
    @Prop({ required: true }) appendval!: string;
}
</script>