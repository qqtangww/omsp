<!-- 邮件发送自定义查询 -->
<template>
<div class='sendMail-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="3">
            <el-form-item  class="w-240" label-width="90px" label="邮件主题">
              <el-input v-model="formSearch.v_Title" placeholder="请输入邮件主题" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="3">
              <el-form-item class="w-240" label-width="90px" label="类型">
                  <el-select v-model="formSearch.v_EmailType" clearable placeholder="请选择类型">
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
          <el-col :span="3">
              <el-form-item class="w-240" label-width="90px" label="状态">
                  <el-select v-model="formSearch.i_SendStatus" clearable placeholder="请选择类型">
                    <el-option
                      v-for="item in stateList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="6">
             <el-form-item  label-width="110px" label="创建时间">
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
          <el-col :span="3">
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
export default {
  name: 'sendMailCustomQuery',
  mixins: [customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_Title: '',
        v_EmailType: '',
        i_SendStatus: '',
        d_CreateTime: '',
        d_CreateEndTime: ''
      },
      mailList: [
        { value: '1', label: '系统' },
        { value: '2', label: '自建' }
      ],
      stateList: [
        { value: '1', label: '自动发送' },
        { value: '2', label: '待发送' },
        { value: '3', label: '已发送' }
      ],
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
            params[key] = ` t_sys_email_manage.v_Title LIKE '%${this.formSearch.v_Title}%' `
          }
          if (key === 'd_CreateTime') {
            params[key] = `(t_sys_email_manage.d_CreateTime >='${this.startingTime[0]}' AND t_sys_email_manage.d_CreateTime <= '${this.startingTime[1]}')`
          }
          if (key === 'v_EmailType') {
            params[key] = `t_sys_email_manage.v_EmailType LIKE '%${this.formSearch.v_EmailType}%'`
          }
          if (key === 'i_SendStatus') {
            params[key] = `t_sys_email_manage.i_SendStatus LIKE '%${this.formSearch.i_SendStatus}%'`
          }
        }
      }
      // 拼接查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      // 切割  查询条件
      searchQuery = searchQuery.substring(3)
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
      this.$emit('getTableData')
    },
    // 时间获取
    getStarAndEndTime (arr) {
      this.formSearch.d_CreateTime = arr[0]
      this.formSearch.d_CreateEndTime = arr[1]
    },
    reset (arr) {
      this.formSearch.v_Title = ''
      this.formSearch.v_EmailType = ''
      this.formSearch.i_SendStatus = ''
      this.formSearch.d_CreateTime = ''
      this.formSearch.d_CreateEndTime = ''
      this.startingTime = []
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>

<style scoped lang='scss'>
.sendMail-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 1010px;
    max-width: 1500px;
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
.sendMail-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.sendMail-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.sendMail-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
