<template>
    <p class="showdata">{{appendval}}</p>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator';

export default class ptag extends Vue {
    @Prop({ required: true }) appendval!: string;
}
</script>