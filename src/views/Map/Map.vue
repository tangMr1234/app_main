<template>
  <div id="lw-map"></div>
</template>

<script type="es6">
  import {BDMap} from '@/utils/BDMap'

  export default {
    data() {
      return {}
    },
    mounted() {
      BDMap().then(BMap => {
        // 百度地图API功能
        var map = new BMap.Map("lw-map");
        var point = new BMap.Point(116.400244, 39.92556);
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point);// 创建标注
        map.addOverlay(marker);             // 将标注添加到地图中
        marker.enableDragging();           // 不可拖拽

        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);

        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
          // 定位成功事件
          var address = '';
          address += e.addressComponent.province;
          address += e.addressComponent.city;
          address += e.addressComponent.district;
          address += e.addressComponent.street;
          address += e.addressComponent.streetNumber;
          console.log("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError", function (e) {
          // 定位失败事件
          alert(e.message);
        });
        map.addControl(geolocationControl);
      });
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
    methods: {},
	activated(){
	  this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
	}
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  body, html, #lw-map {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
