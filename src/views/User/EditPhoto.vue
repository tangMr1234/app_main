<template>
  <div style="height:100%;overflow-x: hidden;">
    <div style="width:200px;height:200px;border:1px solid #000;margin:20px auto;position:relative;">
      <img :src="dataUrl" style="width:100%;height:100%;display:block;position:absolute;top:0;left:0;">
      <input type="file" accept="image/png,image/gif,image/jpeg" @change='handleFileChange($event)'
             style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:5;opacity: 0;">
    </div>
    <div style="text-align: center;">
      <x-button :gradients="['#409eff', '#409eff']" style="width:200px;">确认修改</x-button>
    </div>
    <br>
  </div>
</template>

<script type="es6">
  import {XButton} from 'vux'

  export default {
    components: {
      XButton
    },
    data() {
      return {
        dataUrl: ""
      }
    },
    methods: {
      imgPreview(file) {
        let self = this;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            self.dataUrl = this.result;
          }
        }
      },
      handleFileChange(e) {
        this.file = e.target.files[0];
        // 在获取到文件对象进行预览就行了！
        this.imgPreview(this.file);
      }
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style scoped>

</style>
