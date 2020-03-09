<!-- 组织参数自定义查询 -->
<template>
<!-- 此组件  用于参数管理 中的 组织参数中自定义搜索 -->
  <div class="parameter-org-custom-query">
    <!-- 搜索用户账号 -->
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="7">
            <el-form-item  class="w-240" label-width="20px">
                  <template>
                <el-radio
                  @change="changEvents(orgtype)"
                  v-model="orgtype"
                  label="0"
                >全部</el-radio>
                <el-radio
                  @change="changEvents(orgtype)"
                  v-model="orgtype"
                  label="2"
                >我所在的组织</el-radio>
                <el-radio
                  @change="changEvents(orgtype)"
                  v-model="orgtype"
                  label="1"
                >我管理的组织</el-radio>
              </template>
            </el-form-item>
           </el-col>
          <el-col :span="5">
               <el-form-item  class="w-240" label-width="70px" label="参数编码">
                <el-input v-model="formSearch.v_ParamCode" placeholder="请输入参数编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'selParameterSerachOrg',
  mixins: [customQueryFun],
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  data () {
    return {
      formSearch: {
        v_ParamCode: '',
        v_ParamName: ''
      },
      orgtype: '0'
    }
  },
  watch: {
    configData: {
      handler: function (data) {
      },
      immediate: true
    }
  },
  methods: {
    changEvents (orgtype) {
      this.$emit('getTableData', { orgtype: orgtype })
    },
    onSubmit () {
      // t_sys_param.v_ParamName LIKE '%xxxx%'
      // 需要查询的字段
      let queryKeyObj = {
        v_ParamCode: 't_sys_parameter.v_ParamCode',
        v_ParamName: 't_sys_parameter.v_ParamName'
      }
      let viewCode = this.viewId
      // 传入查询的数据  到 mixins
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset () {
      this.formSearch.v_ParamCode = ''
      this.formSearch.v_ParamName = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  },
  mounted () {
    this.changEvents(0)
  }
}
</script>
<style lang="scss" scoped>
.parameter-org-custom-query {
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
        width: 50px;
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
.parameter-org-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.parameter-org-custom-query /deep/.el-radio__label {
  font-size: 12px;
}
.parameter-org-custom-query /deep/.el-radio {
  margin-right: 20px;
  &:last-of-type{
    margin-right: 0;
  }
}
.parameter-org-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
