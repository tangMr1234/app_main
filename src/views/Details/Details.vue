<template>
  <div style="height: 100%;">
    <pull-to>
      <template>
        <div>
          <form-preview :header-label="headData.label" :header-value="headData.value" :body-items="list"></form-preview>
        </div>
      </template>
    </pull-to>
  </div>
</template>

<script type="es6">
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo
    },
    data() {
      return {
        headData: {
          label: "高温预警",
          value: "53.2℃"
        },
        list: [{
          label: '设备名',
          value: '江桥一号冰箱'
        }, {
          label: '报警探头',
          value: '江桥一号冰箱001号探头'
        }, {
          label: '探头编号',
          value: this.$utils.getUrlKey("id")
        }, {
          label: '所属温区',
          value: '冷藏'
        }, {
          label: '报警时间',
          value: '2018-03-08 15:04:22'
        }, {
          label: '上传时间',
          value: '2018-03-08 15:00:12'
        }]
      }
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style>
  .vux-header-back {
    color: #fff !important;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #fff !important;
  }
</style>
