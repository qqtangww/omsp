<!-- 视图组件组件参数自定义查询 -->
<template>
  <div class="view-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='5'>
                  <!-- <el-input v-model="formSearch.v_ParamCode" placeholder="请输入参数编码" clearable @keydown.enter.native="onSubmit"></el-input>  -->
             <el-form-item class="w-240" label-width="80px" label="适用类型">
                 <el-select v-model="formSearch.v_ComponentType" placeholder="请选择" filterable clearable>
                 <el-option
                     v-for="(item, index) in componentType"
                     :key="index"
                     :label="item.v_EnumValue"
                     :value="item.v_EnumValueName">
                 </el-option>
                 </el-select>
             </el-form-item>
          </el-col>
            <el-col :span='5'>
              <el-form-item  class="w-240" label-width="90px" label="适用组件实例">
                  <el-input v-model="formSearch.v_Code" placeholder="请输入适用组件实例编码" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span='5'>
              <el-form-item  class="w-240" label-width="70px" label="参数编码">
                  <el-input v-model="formSearch.v_ParamCode" placeholder="请输入参数编码" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span='5'>
              <el-form-item  class="w-240" label-width="70px" label="参数名称">
                  <el-input v-model="formSearch.v_ParamName" placeholder="请输入参数名称" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span='4'>
              <el-form-item label-width="0px">
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
import cgiService from '@/api/cgiService'
export default {
  name: 'viewParameterCustomQuery',
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
        v_ComponentType: '',
        v_Code: '',
        v_ParamCode: '',
        v_ParamName: ''
      },
      componentType: []
    }
  },
  created () {
    let enumCode = ['dataCategoryList', 'componentType']
    this.getEnumValue({ enumCode })
  },
  methods: {
    onSubmit () {
      let queryKeyObj = {
        v_ComponentType: 't_sys_parameter.v_ComponentType',
        v_Code: 't_sys_use_parameter_instance.v_Code',
        v_ParamCode: 't_sys_parameter.v_ParamCode',
        v_ParamName: 't_sys_parameter.v_ParamName'
      }
      let viewCode = this.viewId
      //  查询条件  数据  传入minxins  的方法中
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset (arr) {
      this.formSearch.v_ParamCode = ''
      this.formSearch.v_ParamName = ''
      this.formSearch.v_Code = ''
      this.formSearch.v_ComponentType = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    },
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.componentType = res.data.componentType
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.view-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 840px;
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
.view-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}

.view-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
