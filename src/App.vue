<template>
  <div id="app" style="height: 100%;">
    <!--<transition :name="'vux-pop-' + headerTransition">-->
    <router-view class="router-view"></router-view>
    <!--</transition>-->
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script type="es6">
  import {Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    components: {
      Loading
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction
      }),
      headerTransition() {
        if (!this.direction) return ''
        return this.direction === 'forward' ? 'in' : 'out'
      },
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #fbf9fe;
  }

  .router-view {
    width: 100%;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 300ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter, .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active, .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

</style>
