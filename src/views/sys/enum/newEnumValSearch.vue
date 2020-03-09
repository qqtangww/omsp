<!-- 枚举管理自定义查询【枚举值列表】 -->
<template>
  <div class="enum-value-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='4'>
              <el-form-item  label-width="80px" label="父枚举值">
                  <el-input v-model="formSearch.v_ParentValue" placeholder="请输入父枚举值" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="2"><div>&nbsp;</div></el-col>
          <el-col :span='4'>
              <el-form-item  label-width="100px" label="枚举值名称">
                  <el-input v-model="formSearch.v_EnumValueName" placeholder="请输入枚举值名称" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="3"><div>&nbsp;</div></el-col>
          <el-col :span='4'>
              <el-form-item  label-width="80px" label="枚举参数值">
                  <el-input v-model="formSearch.v_EnumValue" placeholder="请输入枚举参数值" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span='4'>
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
  name: 'newEnumValSearch',
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
        v_ParentValue: '',
        v_EnumValueName: '',
        v_EnumValue: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let params = {}
      let searchQuery = ''
      // 查询的数据存入对象中
      for (const key in this.formSearch) {
        // 判断  查询的条件 不为空 存入对象
        if (this.formSearch[key]) {
          if (key === 'v_ParentValue') {
            params[key] = ` t_sys_enum_values.v_ParentValue  LIKE '%${this.formSearch.v_ParentValue}%'`
          }
          if (key === 'v_EnumValueName') {
            params[key] = `t_sys_enum_values.v_EnumValueName  LIKE '%${this.formSearch.v_EnumValueName}%'`
          }
          if (key === 'v_EnumValue') {
            params[key] = `(t_sys_enum_values.v_EnumValue  LIKE '%${this.formSearch.v_EnumValue}%' Or t_sys_enum_values.v_EnumValue1  LIKE '%${this.formSearch.v_EnumValue}%' Or t_sys_enum_values.v_EnumValue2  LIKE '%${this.formSearch.v_EnumValue}%' Or t_sys_enum_values.v_EnumValue3  LIKE '%${this.formSearch.v_EnumValue}%' Or t_sys_enum_values.v_EnumValue4  LIKE '%${this.formSearch.v_EnumValue}%')`
          }
        }
      }
      //    (v_EnumValue LIKE '%xxx%' Or  v_EnumValue1 LIKE '%xxx%' Or  v_EnumValue2 LIKE '%xxx%'  Or  v_EnumValue3 LIKE '%xxx%'  Or  v_EnumValue4 LIKE '%xxx%' )
      // 拼接SQL  查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      // 切割  拼接好的SQL
      searchQuery = searchQuery.substring(3)
      // // 传递查询条件
      // this.$emit('getTableData', { searchQuery })
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }
      let sortInfo = this.$store.state.sortData[this.viewId]
      // 合并分页 跟 查询条件  方便操作后  带条件查询数据

      obj = Object.assign(this.$store.state.paginations[this.viewId], obj, { sortInfo })
      this.$set(obj, 'index', 1)
      this.$store.commit('getSearchData', obj)
      this.$store.commit('modifypaginations', obj)
      // 传递查询条件
      this.$emit('getTableData', obj)
    },
    reset (arr) {
      this.formSearch.v_ParentValue = ''
      this.formSearch.v_EnumValueName = ''
      this.formSearch.v_EnumValue = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.enum-value-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 820px;
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
.enum-value-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.enum-value-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.enum-value-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
.el-input--suffix /deep/ .el-input__inner {
  padding-right: 16px!important;
}
</style>
