<template>
    <div class="echarts-element">
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <i class="collapse-icon el-icon-document"> 折线图</i>
                </template>
                <img src="@/assets/images/line.jpg" class="collapse-img" ref="img1" @dblclick="addLineEle" @mousedown="moveLine">
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="collapse-icon el-icon-document"> 柱状图</i>
                </template>
                <img src="@/assets/images/line.jpg" class="collapse-img" ref="img2" @dblclick="addBarEle" @mousedown="moveBar">
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="collapse-icon el-icon-document"> 饼状图</i>
                </template>
                <img src="@/assets/images/line.jpg" class="collapse-img" ref="img3" @dblclick="addPieEle" @mousedown="movePie">
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="collapse-icon el-icon-document"> 地图</i>
                </template>
                <img src="@/assets/images/line.jpg" class="collapse-img" ref="img4" @dblclick="addMapEle" @mousedown="moveMap">
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
  name: 'echarts_element',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    moveLine (e) {
      let odiv = e.target // 获取目标元素
      // 阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
      e.preventDefault()
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      //   let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        // 因为img居中对齐，所以还要减去目标元素距离body的偏移量
        let left = e.clientX - disX - odiv.offsetLeft
        // let top = e.clientY - disY
        // 移动当前元素
        // odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px'

        document.onmouseup = (e) => {
          if (left < -200) {
            let ele = {
              text: 'Blueviolet',
              width: 340,
              height: 400,
              top: 20,
              left: 20,
              itemId: 'echartsLine',
              widths: '250px',
              heights: '250px',
              option: {
                title: { text: '折线图', left: 'center' },
                xAxis: {
                  type: 'category',
                  name: '折线',
                  boundaryGap: false,
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                  areaStyle: {}
                }]
              }
            }
            document.onmousemove = null
            document.onmouseup = null
            this.$store.commit('saveEchartsEle', ele)
          }
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    moveBar (e) {
      let odiv = e.target // 获取目标元素
      // 阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
      e.preventDefault()
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      //   let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        // 因为img居中对齐，所以还要减去目标元素距离body的偏移量
        let left = e.clientX - disX - odiv.offsetLeft
        // let top = e.clientY - disY
        // 移动当前元素
        // odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px'
        document.onmouseup = (e) => {
          if (left < -200) {
            let ele = {
              text: 'Hotpink',
              width: 340,
              height: 400,
              top: 20,
              left: 380,
              itemId: 'echartsBar',
              widths: '250px',
              heights: '250px',
              option: {
                title: { text: '柱状图', left: 'center' },
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: 'bar'
                }]
              }
            }
            document.onmousemove = null
            document.onmouseup = null
            this.$store.commit('saveEchartsEle', ele)
          }
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    movePie (e) {
      let odiv = e.target // 获取目标元素
      // 阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
      e.preventDefault()
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      //   let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        // 因为img居中对齐，所以还要减去目标元素距离body的偏移量
        let left = e.clientX - disX - odiv.offsetLeft
        // let top = e.clientY - disY
        // 移动当前元素
        // odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px'
        document.onmouseup = (e) => {
          if (left < -200) {
            let ele = {
              text: 'Gold',
              width: 340,
              height: 400,
              top: 20,
              left: 740,
              itemId: 'echartsPie',
              widths: '250px',
              heights: '250px',
              option: {
                title: { text: '饼状图', left: 'center' },
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
                    data: [
                      { value: 335, name: '直接访问' },
                      { value: 310, name: '邮件营销' },
                      { value: 234, name: '联盟广告' },
                      { value: 135, name: '视频广告' },
                      { value: 1548, name: '搜索引擎' }
                    ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              }
            }
            document.onmousemove = null
            document.onmouseup = null
            this.$store.commit('saveEchartsEle', ele)
          }
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    moveMap (e) {
      let odiv = e.target // 获取目标元素
      // 阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
      e.preventDefault()
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      //   let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        // 因为img居中对齐，所以还要减去目标元素距离body的偏移量
        let left = e.clientX - disX - odiv.offsetLeft
        // let top = e.clientY - disY
        // 移动当前元素
        // odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px'
        document.onmouseup = (e) => {
          if (left < -200) {
            let ele = {
              text: 'Gainsboro',
              width: 800,
              height: 600,
              top: 50,
              left: 150,
              itemId: 'echartsMap',
              option: {
                title: { text: '疫情地图', left: 'center' },
                tooltip: { // 鼠标移到图里面的浮动提示框
                // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
                  formatter (params, ticket, callback) {
                  // params.data 就是series配置项中的data数据遍历
                    let localValue,
                      perf,
                      downloadSpeep,
                      usability,
                      point
                    if (params.data) {
                      localValue = params.data.value
                      perf = params.data.perf
                      downloadSpeep = params.data.downloadSpeep
                      usability = params.data.usability
                      point = params.data.point
                    } else { // 为了防止没有定义数据的时候报错写的
                      localValue = 0
                      perf = 0
                      downloadSpeep = 0
                      usability = 0
                      point = 0
                    }
                    let htmlStr = `<div style='font-size:18px;'> ${params.name}</div><p style='text-align:left;margin-top:0px;'>现有确诊${localValue}例`
                    return htmlStr
                  }
                // backgroundColor:"#ff7f50",//提示标签背景颜色
                // textStyle:{color:"#fff"} //提示标签字体颜色
                },
                // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
                visualMap: { // 左下角的颜色区域
                  type: 'piecewise', // 定义为分段型 visualMap
                  min: 0,
                  max: 1000,
                  itemWidth: 40,
                  bottom: 60,
                  left: 20,
                  pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                    { gt: 10000, label: '≥10000', color: '#3B1014' },
                    { gt: 1000, lte: 9999, label: '1000~9999', color: '#872424' },
                    { gt: 500, lte: 999, label: '500~999', color: '#C44728' },
                    { gt: 100, lte: 499, label: '100~499', color: '#F9760B' },
                    { gt: 10, lte: 99, label: '10~99', color: '#F1A465' },
                    { gt: 0, lte: 9, label: '0~9', color: '#F8D3B5' }
                  ]
                },
                // geo配置详解： https://echarts.baidu.com/option.html#geo
                geo: { // 地理坐标系组件用于地图的绘制
                  map: 'china', // 表示中国地图
                  // roam: true, // 是否开启鼠标缩放和平移漫游
                  zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
                  label: {
                    show: true
                  },
                  itemStyle: { // 地图区域的多边形 图形样式。
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    emphasis: { // 高亮状态下的多边形和标签样式
                      shadowBlur: 20,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                },
                series: [
                  {
                    name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
                    type: 'map',
                    geoIndex: 0,
                    label: {
                      show: true
                    },
                    // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
                    data: [
                      {
                        'name': '湖北',
                        'value': 67466
                      },
                      {
                        'name': '新疆',
                        'value': 76
                      },
                      {
                        'name': '西藏',
                        'value': 1
                      },
                      {
                        'name': '青海',
                        'value': 18
                      },
                      {
                        'name': '内蒙古',
                        'value': 75
                      },
                      {
                        'name': '甘肃',
                        'value': 91
                      },
                      {
                        'name': '宁夏',
                        'value': 75
                      },
                      {
                        'name': '四川',
                        'value': 539
                      },
                      {
                        'name': '云南',
                        'value': 174
                      },
                      {
                        'name': '广西',
                        'value': 252
                      },
                      {
                        'name': '广东',
                        'value': 1350
                      },
                      {
                        'name': '海南',
                        'value': 168
                      },
                      {
                        'name': '香港',
                        'value': 104
                      },
                      {
                        'name': '台湾',
                        'value': 42
                      },
                      {
                        'name': '澳门',
                        'value': 10
                      },
                      {
                        'name': '山东',
                        'value': 758
                      },
                      {
                        'name': '浙江',
                        'value': 1215
                      },
                      {
                        'name': '黑龙江',
                        'value': 481
                      },
                      {
                        'name': '湖南',
                        'value': 1018
                      },
                      {
                        'name': '重庆',
                        'value': 576
                      },
                      {
                        'name': '江苏',
                        'value': 631
                      },
                      {
                        'name': '江西',
                        'value': 935
                      },
                      {
                        'name': '上海',
                        'value': 339
                      },
                      {
                        'name': '贵州',
                        'value': 146
                      },
                      {
                        'name': '安徽',
                        'value': 990
                      },
                      {
                        'name': '福建',
                        'value': 296
                      },
                      {
                        'name': '陕西',
                        'value': 245
                      },
                      {
                        'name': '辽宁',
                        'value': 125
                      },
                      {
                        'name': '河南',
                        'value': 1272
                      },
                      {
                        'name': '河北',
                        'value': 318
                      },
                      {
                        'name': '山西',
                        'value': 133
                      },
                      {
                        'name': '吉林',
                        'value': 93
                      },
                      {
                        'name': '天津',
                        'value': 136
                      },
                      {
                        'name': '北京',
                        'value': 418
                      }
                    ]
                  }
                ]
              }
            }
            document.onmousemove = null
            document.onmouseup = null
            this.$store.commit('saveEchartsEle', ele)
          }
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    addLineEle () {
      let ele = {
        text: 'Blueviolet',
        width: 340,
        height: 400,
        top: 20,
        left: 20,
        itemId: 'echartsLine',
        widths: '250px',
        heights: '250px',
        option: {
          title: { text: '折线图', left: 'center' },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }]
        }
      }
      this.$store.commit('saveEchartsEle', ele)
    },
    addBarEle () {
      let ele = {
        text: 'Hotpink',
        width: 340,
        height: 400,
        top: 20,
        left: 380,
        itemId: 'echartsBar',
        option: {
          title: { text: '柱状图', left: 'center' },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
      }
      this.$store.commit('saveEchartsEle', ele)
    },
    addPieEle () {
      let ele = {
        text: 'Gold',
        width: 340,
        height: 400,
        top: 20,
        left: 740,
        itemId: 'echartsPie',
        widths: '250px',
        heights: '250px',
        option: {
          title: { text: '饼状图', left: 'center' },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
      this.$store.commit('saveEchartsEle', ele)
    },
    addMapEle () {
      let ele = {
        text: 'Gainsboro',
        width: 800,
        height: 600,
        top: 50,
        left: 150,
        itemId: 'echartsMap',
        option: {
          title: { text: '疫情地图', left: 'center' },
          tooltip: { // 鼠标移到图里面的浮动提示框
            formatter (params, ticket, callback) {
              // params.data 就是series配置项中的data数据遍历
              let localValue,
                perf,
                downloadSpeep,
                usability,
                point
              if (params.data) {
                localValue = params.data.value
                perf = params.data.perf
                downloadSpeep = params.data.downloadSpeep
                usability = params.data.usability
                point = params.data.point
              } else { // 为了防止没有定义数据的时候报错写的
                localValue = 0
                perf = 0
                downloadSpeep = 0
                usability = 0
                point = 0
              }
              let htmlStr = `<div style='font-size:18px;'> ${params.name}</div><p style='text-align:left;margin-top:0px;'>现有确诊${localValue}例`
              return htmlStr
            }
            // backgroundColor:"#ff7f50",//提示标签背景颜色
            // textStyle:{color:"#fff"} //提示标签字体颜色
          },
          // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
          visualMap: { // 左下角的颜色区域
            type: 'piecewise', // 定义为分段型 visualMap
            min: 0,
            max: 1000,
            itemWidth: 40,
            bottom: 60,
            left: 20,
            pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
              { gt: 10000, label: '≥10000', color: '#3B1014' },
              { gt: 1000, lte: 9999, label: '1000~9999', color: '#872424' },
              { gt: 500, lte: 999, label: '500~999', color: '#C44728' },
              { gt: 100, lte: 499, label: '100~499', color: '#F9760B' },
              { gt: 10, lte: 99, label: '10~99', color: '#F1A465' },
              { gt: 0, lte: 9, label: '0~9', color: '#F8D3B5' }
            ]
          },
          // geo配置详解： https://echarts.baidu.com/option.html#geo
          geo: { // 地理坐标系组件用于地图的绘制
            map: 'china', // 表示中国地图
            // roam: true, // 是否开启鼠标缩放和平移漫游
            zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
            label: {
              show: true
            },
            itemStyle: { // 地图区域的多边形 图形样式。
              borderColor: 'rgba(0, 0, 0, 0.2)',
              emphasis: { // 高亮状态下的多边形和标签样式
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
              type: 'map',
              geoIndex: 0,
              label: {
                show: true
              },
              // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
              data: [
                {
                  'name': '湖北',
                  'value': 67466
                },
                {
                  'name': '新疆',
                  'value': 76
                },
                {
                  'name': '西藏',
                  'value': 1
                },
                {
                  'name': '青海',
                  'value': 18
                },
                {
                  'name': '内蒙古',
                  'value': 75
                },
                {
                  'name': '甘肃',
                  'value': 91
                },
                {
                  'name': '宁夏',
                  'value': 75
                },
                {
                  'name': '四川',
                  'value': 539
                },
                {
                  'name': '云南',
                  'value': 174
                },
                {
                  'name': '广西',
                  'value': 252
                },
                {
                  'name': '广东',
                  'value': 1350
                },
                {
                  'name': '海南',
                  'value': 168
                },
                {
                  'name': '香港',
                  'value': 104
                },
                {
                  'name': '台湾',
                  'value': 42
                },
                {
                  'name': '澳门',
                  'value': 10
                },
                {
                  'name': '山东',
                  'value': 758
                },
                {
                  'name': '浙江',
                  'value': 1215
                },
                {
                  'name': '黑龙江',
                  'value': 481
                },
                {
                  'name': '湖南',
                  'value': 1018
                },
                {
                  'name': '重庆',
                  'value': 576
                },
                {
                  'name': '江苏',
                  'value': 631
                },
                {
                  'name': '江西',
                  'value': 935
                },
                {
                  'name': '上海',
                  'value': 339
                },
                {
                  'name': '贵州',
                  'value': 146
                },
                {
                  'name': '安徽',
                  'value': 990
                },
                {
                  'name': '福建',
                  'value': 296
                },
                {
                  'name': '陕西',
                  'value': 245
                },
                {
                  'name': '辽宁',
                  'value': 125
                },
                {
                  'name': '河南',
                  'value': 1272
                },
                {
                  'name': '河北',
                  'value': 318
                },
                {
                  'name': '山西',
                  'value': 133
                },
                {
                  'name': '吉林',
                  'value': 93
                },
                {
                  'name': '天津',
                  'value': 136
                },
                {
                  'name': '北京',
                  'value': 418
                }
              ]
            }
          ]
        }
      }
      this.$store.commit('saveEchartsEle', ele)
    }
  }
}
</script>
<style lang="scss" scoped>
    .echarts-element {
        /deep/ .el-collapse-item__content {
            padding-bottom: 0px;
        }
        /deep/ .el-collapse-item__header {
            padding-left:10px;
            background-color: #f3f3f3;
            border-bottom: 1px solid #e1e1e1!important;
        }
        .collapse-icon {
            font-size: 12px;
            color: #333;
        }
        /deep/ .el-icon-arrow-right {
            color: #333!important;
        }
        .collapse-img {
            position: relative;
            top: 5px;
            left: 50px;
        }
    }
</style>
