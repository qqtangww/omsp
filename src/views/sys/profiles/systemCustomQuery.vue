<!-- 系统概要自定义查询 -->
<template>
  <div class="system-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
             <el-form-item  class="w-240" label-width="80px" label="系统编码">
                <el-input v-model="formSearch.v_SysID" placeholder="请输入系统编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="6">
               <el-form-item  class="w-240" label-width="100px" label="系统名称">
                  <el-input v-model="formSearch.v_SysName" placeholder="请输入系统名称" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="4">
             <el-form-item label-width="60px">
              <div class="query-button">
                <el-button @click="onSubmit" icon="iconfont icon-sousuo">
                  查询
                </el-button>
                <el-button  @click="reset" icon="iconfont icon-gengxinjilu">
                  重置
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'systemCustomQuery',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  mixins: [customQueryFun],
  data () {
    return {
      formSearch: {
        v_SysName: '',
        v_SysID: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let queryKeyObj = {
        v_SysID: 't_sys_system_profile.v_SysID',
        v_SysName: 't_sys_system_profile.v_SysName'
      }
      let viewCode = this.viewId
      //  查询条件  数据  传入minxins  的方法中
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
      // 把查询的条件  存入vuex  方便操作时  带条件刷新数据
    },
    reset (arr) {
      this.formSearch.v_SysName = ''
      this.formSearch.v_SysID = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.system-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 990px;
    max-width: 1280px;
    .el-form-item {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
    .query-button{
      >button{
        height: 30px;
        padding: 0;
        width: 57px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        float: left;
        align-items: center;
        margin-left: 10px;
        /deep/ i{
          font-size: 14px;
        }
      }
    }
}
.system-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.system-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.system-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
