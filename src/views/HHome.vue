<template>
  <div style="height:100%;overflow: hidden;">
    <x-header :title="this.$route.meta.name"
              :left-options="{showBack: ($route.meta.headBack==false)?false:true}"
              style="z-index: 100;"></x-header>
    <div style="height:calc(100vh - 46px);">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>
