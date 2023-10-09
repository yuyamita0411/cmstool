<template>
  記事リスト
  <ul>
    <li><router-link to="/edit/1">記事</router-link></li>
    <li><router-link to="/edit/2">記事</router-link></li>
    <li><router-link to="/edit/3">記事</router-link></li>
  </ul>
</template>

<style lang="scss">
  ul li {
    list-style: none;
  }
</style>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class articleLists extends Vue {}
</script>