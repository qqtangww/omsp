<!-- 密码策略自定义查询 -->
<template>
  <div class="pwd-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
             <el-form-item  class="w-240" label-width="80px" label="策略编码">
                <el-input v-model="formSearch.v_PPcode" placeholder="请输入策略编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="6">
                <el-form-item  class="w-240" label-width="100px" label="策略名称">
                  <el-input v-model="formSearch.v_PPname" placeholder="请输入策略名称" clearable></el-input>
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
  name: 'pwdCustomQuery',
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
        v_PPcode: '',
        v_PPname: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let queryKeyObj = {
        v_PPcode: 't_sys_police_pwd.v_PPcode',
        v_PPname: 't_sys_police_pwd.v_PPname'
      }
      let viewCode = 'CC_VW_pwd'
      // 调取mixins传入的方法  查询
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset (arr) {
      this.formSearch.v_PPcode = ''
      this.formSearch.v_PPname = ''
      this.searchQuery = ''
    }
  }

}
</script>
<style lang="scss" scoped>
.pwd-custom-query {
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
.pwd-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.pwd-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.pwd-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
