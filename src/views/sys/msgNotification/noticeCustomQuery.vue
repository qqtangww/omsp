<!-- 通知发布自定义查询 -->
<template>
<div class='notice-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="5">
              <el-form-item   label-width="80px" label="通知标题">
                <el-input v-model="formSearch.v_Title" placeholder="请输入通知标题" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="5">
              <el-form-item  label-width="80px" label="状态">
                  <el-select v-model="formSearch.i_IsSend" clearable placeholder="请选择状态">
                    <el-option
                      v-for="item in mailList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="5">
            <el-form-item  label-width="100px" label="发送时间">
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
          <el-col :span="1"><div>&nbsp;</div> <div>&nbsp;</div></el-col>
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
import { mapState } from 'vuex'
export default {
  name: 'noticeCustomQuery',
  mixins: [customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_Title: '',
        i_IsSend: '',
        d_SendDate: '',
        d_SendEndDate: ''
      },
      mailList: [
        { value: '0', label: '待发送' },
        { value: '1', label: '已发送' }
      ],
      startingTime: []
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
          if (key === 'v_Title') {
            params[key] = ` t_sys_notice.v_Title  LIKE '%${this.formSearch.v_Title}%'`
          }
          if (key === 'i_IsSend') {
            params[key] = `t_sys_notice.i_IsSend  LIKE '%${this.formSearch.i_IsSend}%'`
          }
          if (key === 'd_SendDate') {
            params[key] = `(t_sys_notice.d_SendDate >='${this.startingTime[0]}' AND t_sys_notice.d_SendDate <= '${this.startingTime[1]}')`
          }
        }
      }
      // 拼接SQL  查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      // 切割  拼接好的SQL
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
      this.formSearch.v_Title = ''
      this.formSearch.i_IsSend = ''
      this.formSearch.d_SendDate = ''
      this.formSearch.d_SendEndDate = ''
      this.startingTime = []
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>

<style scoped lang='scss'>
.notice-custom-query {
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
.notice-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.notice-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.notice-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
