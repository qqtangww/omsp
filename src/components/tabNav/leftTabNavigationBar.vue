<template>
  <div class="navigationBar">
    <div class="title">
      <span><i class="iconfont icon-biaotibiao"></i> {{tabstitle}}</span>
    </div>
    <ul class='tabBox'>
      <li
        :class="['tabs',{'indentation':item.i_IsSetBlank === '1'},{'pitchOn': index === tabIndex },{'isBlank': blank === 0}]"
        v-for="(item, index) in list "
        :key="index"
        @click="uploadData(item,index)"
      > <span> <i :class="item.v_IconURL"></i> {{item.v_TabsFlagName }}</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'leftTabNavigationBar',
  props: {
    tabData: Array,
    title: String,
    TabsIndex: Number,
    isBlank: Number
  },
  data () {
    return {
      list: [],
      tabstitle: '',
      tabIndex: 0,
      // 是否缩进标题
      blank: ''
    }
  },
  watch: {
    tabData: {
      handler: function (newList, oldList) {
        this.list = newList
      },
      deep: true
    },
    TabsIndex: {
      handler: function (num) {
        this.tabIndex = num
      },
      immediate: true
    },
    isBlank: {
      handler: function (num) {
        this.blank = num
      },
      immediate: true
    }
  },
  methods: {
    uploadData (data, index) {
      if (data.i_IsSetBlank === '0') {
        this.tabIndex = index
        this.$emit('update:navData', data)
      }
    }
  },
  mounted () {
    this.tabstitle = this.title
  }
}
</script>
<style lang="scss" scoped>
.navigationBar {
  width:200px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabBox {
    list-style: none;
    padding: 2px 8px;
    margin: 0;
    // height: 100%;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    .tabs {
      width: 100%;
      height: 30px;
      border: 1px solid #f0f0f0;
      line-height: 30px;
      margin-top: 2px;
      background: rgba(248, 252, 255, 1);
      box-sizing: border-box;
      padding-left: 27px;
      &:hover {
        background-color: #c2ddfc;
        cursor: pointer;
      }
      > span {
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .indentation {
    padding-left: 3px !important;
  }
  .pitchOn {
    border:1px solid #666666 !important;
    background:linear-gradient(180deg,rgba(239,245,252,1) 0%,rgba(169,208,253,1) 100%) !important;
  }
  .isBlank {
      padding-left: 3px !important;
  }
}
</style>
