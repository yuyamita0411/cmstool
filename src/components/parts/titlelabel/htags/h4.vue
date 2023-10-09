<template>
    <h4 class="showdata">
        <i></i>
        {{appendval}}
    </h4>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';

export default class h4tag extends Vue {
    @Prop({ required: true }) appendval!: string;
}
</script>