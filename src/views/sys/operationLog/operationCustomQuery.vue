<!-- 操作日志自定义查询 -->
<template>
<div class='operation-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='4'>
             <el-form-item  class="w-240" label-width="80px" label="用户账号">
                  <el-input v-model="formSearch.v_UserID" placeholder="请输入用户账号" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span='4'>
               <el-form-item class="w-240" label-width="90px" label="用户名">
                <el-input v-model="formSearch.v_UserName" placeholder="请输入用户名" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span='7'>
               <el-form-item  label-width="110px" label="操作时间">
                  <el-date-picker
                  :clearable="false"
                  v-model="startingTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  align="right"
                  @change="getStarAndEndTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '12:00:00']"
                ></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
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
import { mapState } from 'vuex'
export default {
  name: 'operationCustomQuery',
  mixins: [customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_UserID: '',
        v_UserName: '',
        d_ExecuteTime: '',
        d_ExecuteEndTime: ''
      },
      startingTime: []
    }
  },
  computed: {
    ...mapState({
      viewParams: state => state.paginations
    })
  },
  methods: {
    onSubmit () {
      let params = {}
      let searchQuery = ''
      //  把查询条件存入 对象
      for (const key in this.formSearch) {
        // 判断是否存在查询条件
        if (this.formSearch[key]) {
          // 判断 是否需要 拼接条件
          if (key === 'v_UserID') {
            if (this.formSearch.v_UserName) {
              params[key] = ` t_sys_log_operation.v_UserID LIKE '%${this.formSearch.v_UserID}%' OR `
            } else if (this.formSearch.d_ExecuteTime) {
              params[key] = ` t_sys_log_operation.v_UserID LIKE '%${this.formSearch.v_UserID}%' AND `
            } else {
              params[key] = ` t_sys_log_operation.v_UserID LIKE '%${this.formSearch.v_UserID}%' `
            }
          }
          if (key === 'v_UserName') {
            if (this.formSearch.d_ExecuteTime) {
              params[key] = `t_sys_user.v_UserName LIKE '%${this.formSearch.v_UserName}%' AND `
            } else {
              params[key] = `t_sys_user.v_UserName LIKE '%${this.formSearch.v_UserName}%' `
            }
          }
          if (key === 'd_ExecuteTime') {
            params[key] = `(t_sys_log_operation.d_ExecuteTime >='${this.startingTime[0]}' AND t_sys_log_operation.d_ExecuteTime <= '${this.startingTime[1]}')`
          }
        }
      }
      // 拼接查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += params[key]
        }
      }
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
    // 时间获取
    getStarAndEndTime (arr) {
      this.formSearch.d_ExecuteTime = arr[0]
      this.formSearch.d_ExecuteEndTime = arr[1]
    },
    // 清空查询条件
    reset (arr) {
      this.formSearch.v_UserID = ''
      this.formSearch.v_UserName = ''
      this.formSearch.d_ExecuteTime = ''
      this.formSearch.d_ExecuteEndTime = ''
      this.startingTime = []
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>

<style scoped lang='scss'>
.operation-custom-query {
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
.operation-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.operation-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.operation-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
