<!-- 通知详情自定义查询 -->
<template>
  <div class="details-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="4">
            <el-form-item  class="w-240" label-width="80px" label="消息标题">
              <el-input v-model="formSearch.v_Title" placeholder="请输入消息标题" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="8">
             <el-form-item  label-width="100px" label="接收时间">
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
  name: 'detailsCustomQuery',
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
        d_SendDate: '',
        d_SendEndDate: ''
      },
      startingTime: []
    }
  },
  methods: {
    onSubmit () {
      let params = {}
      let searchQuery = ''
      //  把查询条件存入 对象
      for (const key in this.formSearch) {
        // 判断是否存在查询条件
        if (this.formSearch[key]) {
          if (key === 'v_Title') {
            params[key] = ` t_sys_message_log.v_Title LIKE '%${this.formSearch.v_Title}%' `
          }
          if (key === 'd_SendDate') {
            params[key] = `(t_sys_message_log.d_SendDate >='${this.startingTime[0]}' AND t_sys_message_log.d_SendDate <= '${this.startingTime[1]}')`
          }
        }
      }
      // 拼接查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      // 切割 查询的条件
      searchQuery = searchQuery.substring(3)

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
      this.formSearch.d_SendDate = arr[0]
      this.formSearch.d_SendEndDate = arr[1]
    },
    reset (arr) {
      this.startingTime = []
      this.formSearch.v_Title = ''
      this.formSearch.d_SendDate = ''
      this.formSearch.d_SendEndDate = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.details-custom-query {
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
        /deep/ i{
          font-size: 14px;
        }
      }
    }
}
.details-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.details-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.details-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
