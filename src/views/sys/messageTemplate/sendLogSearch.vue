<!-- 新增、修改消息模板 -- 发送日志 -- 自定义查询 -->
<template>
  <div class="sendlog-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="4">
            <el-form-item  class="w-240" label-width="80px" label="消息标题">
              <el-input v-model="formSearch.v_Title" placeholder="请输入消息标题" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="10">
            <el-form-item  label-width="110px" label="发送时间">
              <el-date-picker
                class="sendlog-date"
                clearable
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
        v_Title: '',
        startTime: '',
        endTime: ''
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
          if (key === 'v_Title') {
            params[key] = ` t_sys_message_log.v_Title like '%${this.formSearch.v_Title}%'`
          }
          if (key === 'startTime') {
            params[key] = ` t_sys_message_log.d_SendDate >='${this.startingTime[0]}' AND t_sys_message_log.d_SendDate <= '${this.startingTime[1]}'`
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
      this.formSearch.v_Title = ''
      this.formSearch.d_SendDate = ''
      this.startingTime = []
      this.formSearch.endTime = ''
      this.formSearch.startTime = ''
      this.resetPagnations('', this.viewId)
    },
    getStarAndEndTime (arr) {
      this.formSearch.startTime = arr[0]
      this.formSearch.endTime = arr[1]
    }
  }
}
</script>
<style lang="scss" scoped>
.sendlog-custom-query {
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
      margin-left: 10px;
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
.sendlog-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.sendlog-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.sendlog-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
.sendlog-date{
  padding-right: 12px !important;
}
.sendlog-date /deep/ .el-range-separator{
  line-height: 20px;
}
.sendlog-date /deep/ .el-range__close-icon{
  line-height: 24px;
}
</style>
