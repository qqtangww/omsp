<!-- 用户管理自定义查询 -->
<template>
  <div class="user-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="5">
              <el-form-item  class="w-240" label-width="80px" label="用户账号">
                  <el-input v-model="formSearch.v_UserID" placeholder="请输入用户账号" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="5">
              <el-form-item  class="w-240" label-width="90px" label="用户名">
                  <el-input v-model="formSearch.v_UserName" placeholder="请输入用户名" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
               <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="5">
             <el-form-item class="w-240" label-width="110px" label="组织机构">
                <el-select v-model="formSearch.v_OrgCode" placeholder="请选择所属组织机构" filterable clearable>
                  <el-option
                    v-for="item in orgList"
                    :key="item.id"
                    :label="item.orgfullname"
                    :value="item.orgcode">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="4">
             <el-form-item label-width="70px">
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
import { mapState } from 'vuex'
export default {
  name: 'userCustomQuery',
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
        v_UserID: '',
        v_UserName: '',
        v_OrgCode: ''
      },
      orgList: []
    }
  },
  created () {
    this.getOrgList()
  },
  methods: {
    // 获取我管理的组织
    getOrgList () {
      cgiService.OrgList().then(res => {
        if (res.code === 0) {
          this.orgList = res.data
        }
      })
    },
    onSubmit () {
      // eslint-disable-next-line no-irregular-whitespace
      // db.v_UserID like '%post%' AND　db.v_UserName like '%post%' and db.v_OrgCode = 'aaa'
      let params = {}
      let searchQuery = ''
      for (const key in this.formSearch) {
        if (this.formSearch[key]) {
          if (key === 'v_UserID') {
            params[key] = `t_sys_user.v_UserID LIKE '%${this.formSearch.v_UserID}%' `
          }
          if (key === 'v_UserName') {
            params[key] = `t_sys_user.v_UserName LIKE '%${this.formSearch.v_UserName}%' `
          }
          if (key === 'v_OrgCode') {
            params[key] = ` t_sys_org.v_OrgCode = '${this.formSearch.v_OrgCode}' `
          }
        }
      }
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      searchQuery = searchQuery.substring(3)
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }
      // 用于：点击查询回到第一页
      this.$emit('changeIndex', '1')
      let temporaryObj = Object.assign({}, this.viewParams[this.viewId], { index: 1 }, obj)
      this.$store.commit('modifypaginations', temporaryObj)
      // 传递查询条件
      this.$emit('getTableData')
    },
    reset (arr) {
      this.formSearch.v_UserID = ''
      this.formSearch.v_UserName = ''
      this.formSearch.v_OrgCode = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.user-custom-query {
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
.user-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.user-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.user-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
