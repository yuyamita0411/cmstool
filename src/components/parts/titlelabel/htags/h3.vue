<template>
    <h3 class="showdata">
        <i></i>
        {{appendval}}
    </h3>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';

export default class h3tag extends Vue {
    @Prop({ required: true }) appendval!: string;
}
</script>