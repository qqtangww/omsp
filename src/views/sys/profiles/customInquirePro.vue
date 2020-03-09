<template>
  <div class="custom-inquiry-pro">
    <el-row>
      <el-col :span="6">
        <el-input
          v-model="sysName"
          clearable
          placeholder="请输入系统名称搜素"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="sysCode"
          clearable
          placeholder="请输入系统简码搜素"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="clickQuery" icon="iconfont icon-sousuo">
          查询
        </el-button>
         <el-button @click="resettableData" icon="iconfont icon-gengxinjilu">
          重置
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 导入mixins
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  // 注册mixins
  mixins: [customQueryFun],
  data () {
    return {
      sysName: '',
      sysCode: ''
    }
  },
  created () {},
  methods: {
    // 查询点击事件
    clickQuery () {
      // 拼接 表名 与要查询的字段
      let queryKey = this.configData.confColumn[0].tablename + '.' + this.configData.confColumn[0].colname
      let queryKey1 = this.configData.confColumn[1].tablename + '.' + this.configData.confColumn[1].colname
      // 调用mixins的方法  this.sysName:  查询的第一个input框值   this.sysCode查询的第二个input宽的值
      this.searchtableData(queryKey, queryKey1, this.sysName, this.sysCode)
      let obj = {
        modelArr: JSON.stringify(this.modelArr),
        viewid: 'CC_VW_profile'
      }
      // 区分区域  存入 查询的内容  用作与缓存条件
      this.$store.commit('getSearchData', obj)
    },
    // 重置查询条件
    resettableData () {
      this.sysName = ''
      this.sysCode = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .custom-inquiry-pro {
    padding: 8px 10px;
    width: 50%;
    overflow: auto;
    .el-input {
      max-width: 300px;
    }
    .el-col {
      margin-right: 20px;
      min-width: 152px;
    }
    .el-button {
      padding: 6px 0px;
      min-width: 64px;
    }
    .el-button + .el-button {
      margin-left: 4px;
    }
  }
</style>
