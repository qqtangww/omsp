 <!-- 个人参数自定义查询 -->
<template>
<!-- 此组件用于参数管理 中的 系统参数的自定义参数  搜索 -->

    <!-- 搜索用户账号 -->
    <!-- <el-input
      v-model="formSearch.v_ParamName"
      prefix-icon="el-icon-edit-outline"
      placeholder="输入名称搜索"
      class="serach-tool"
      clearable>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchBtn()"
      ></el-button>
    </el-input> -->
  <div class='parameter-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
               <el-form-item  class="w-240" label-width="80px" label="参数编码">
                <el-input v-model="formSearch.v_ParamCode" placeholder="请输入参数编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
               <el-form-item  class="w-240" label-width="70px" label="参数名称">
                <el-input v-model="formSearch.v_ParamName" placeholder="请输入参数名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"> <div>&nbsp;</div> </el-col> -->
          <el-col :span="4">
               <el-form-item label-width="0">
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
import watchKeyWords from '@/common/js/mixins/watchKeyWords'
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'selfParameterSearch',
  mixins: [watchKeyWords, customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_ParamName: '',
        v_ParamCode: ''
      },
      ifDialog: false,
      orgtype: '0'
    }
  },
  watch: {
    shareData: {
      handler: (data) => {
        this.flagTest = data.activeName
      },
      deep: true,
      immediate: true
    },
    configData: {
      handler: function (data) {
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSubmit () {
      // 需要查询的字段
      let queryKeyObj = {
        v_ParamCode: 't_sys_parameter_user.v_ParamCode',
        v_ParamName: 't_sys_parameter.v_ParamName'
      }
      let viewCode = this.viewId
      // 传入查询的数据  到 mixins
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset () {
      this.formSearch.v_ParamName = ''
      this.formSearch.v_ParamCode = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>
<style lang="scss" scoped>
.parameter-custom-query {
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
.parameter-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.parameter-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
