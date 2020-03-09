<!-- 角色管理自定义查询 -->
<template>
  <div class="role-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
              <el-form-item  class="w-240" label-width="80px" label="角色编码">
                  <el-input v-model="formSearch.i_RoleID" placeholder="请输入角色编码" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span='1'> <div>&nbsp;</div></el-col>
          <el-col :span="6">
                <el-form-item  class="w-240" label-width="100px" label="角色名称">
                    <el-input v-model="formSearch.v_RoleName" placeholder="请输入角色名称" clearable @keydown.enter.native="onSubmit"></el-input>
                </el-form-item>
          </el-col>
           <el-col :span='1'> <div>&nbsp;</div></el-col>
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
  name: 'roleCustomQuery',
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
        v_RoleName: '',
        i_RoleID: ''
      }
    }
  },
  methods: {
    onSubmit () {
      //  待查询的字段
      let queryKeyObj = {
        i_RoleID: 't_sys_role.i_RoleID',
        v_RoleName: 't_sys_role.v_RoleName'
      }
      let viewCode = this.viewId
      // 传入 mixins 待查询的数据  跟待查询的字段
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset (arr) {
      this.formSearch.v_RoleName = ''
      this.formSearch.i_RoleID = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.role-custom-query {
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
.role-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.role-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.role-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
