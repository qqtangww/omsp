<!-- 登录日志自定义查询 -->
<template>
  <div class="conlog-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="4">
               <el-form-item  class="w-240" label-width="80px" label="用户账号">
                  <el-input v-model="formSearch.v_UserID" placeholder="请输入用户账号" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="4">
           <el-form-item  class="w-240" label-width="90px" label="用户名">
                <el-input v-model="formSearch.v_UserName" placeholder="请输入用户名" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="7">
            <el-form-item  label-width="110px" label="登录时间">
                  <el-date-picker
                  :clearable="false"
                  v-model="startingTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  align="right"
                  @change="getStarAndEndTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                ></el-date-picker>
              </el-form-item>
          </el-col>
        <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="4">
              <el-form-item label-width="60px">
                <div class="query-button">
                  <el-button @click="onSubmit" icon="iconfont icon-sousuo">
                    查询
                  </el-button>
                  <el-button @click="reset" icon="iconfont icon-gengxinjilu">
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
  name: 'conLogCustomQuery',
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
        d_LoginTime: '',
        d_LogoutTime: ''
      },
      startingTime: []
    }
  },
  //  t_sys_user.v_UserID like '%xxx%' and t_sys_user.v_UserName like '%xxx%' and t_sys_login.v_Logintime >= startDate  and t_sys_login.v_Logintime <= endDate
  methods: {
    onSubmit () {
      let searchQuery = ''
      let params = {}
      for (const key in this.formSearch) {
        if (this.formSearch[key]) {
          if (key === 'v_UserID') {
            params[key] = ` t_sys_log_login.v_UserID like '%${this.formSearch.v_UserID}%'`
          }
          if (key === 'v_UserName') {
            params[key] = `t_sys_user.v_UserName like '%${this.formSearch.v_UserName}%'`
          }
          if (key === 'd_LoginTime') {
            params[key] = ` t_sys_log_login.d_LoginTime >='${this.startingTime[0]}' AND t_sys_log_login.d_LoginTime <= '${this.startingTime[1]}'`
          }
        }
      }
      for (const key in params) {
        if (params[key]) {
          searchQuery += ' AND ' + params[key]
        }
      }
      // 去掉 拼接好的数据
      searchQuery = searchQuery.substring(5)
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }
      // 用于：点击查询回到第一页
      this.$emit('changeIndex', '1')
      let temporaryObj = Object.assign({}, this.viewParams[this.viewId], { index: 1 }, obj)
      this.$store.commit('modifypaginations', temporaryObj)
      // 调取接口
      this.$emit('getTableData')
    },
    reset (arr) {
      this.$emit('getQueryData', '')
      this.formSearch.v_UserID = ''
      this.formSearch.v_UserName = ''
      this.formSearch.d_LoginTime = ''
      this.formSearch.d_LogoutTime = ''
      this.startingTime = []
      this.resetPagnations('', this.viewId)
    },
    getStarAndEndTime (arr) {
      this.formSearch.d_LoginTime = arr[0]
      this.formSearch.d_LogoutTime = arr[1]
    }
  }

}
</script>
<style lang="scss" scoped>
.conlog-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0 0;
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
.conlog-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.conlog-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.conlog-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
