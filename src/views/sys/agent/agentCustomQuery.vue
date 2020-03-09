<!-- 用户代理自定义查询 -->
<template>
  <div class="agent-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
             <el-form-item  class="w-240" label-width="90px" label="代理人账号">
                  <el-input v-model="formSearch.v_AgentUserID" placeholder="请输入代理人账号" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="6">
              <el-form-item  class="w-240" label-width="135px" label="代理人用户名">
                  <el-input v-model="formSearch.v_UserName" placeholder="请输入代理人用户名" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
            <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="4">
               <el-form-item label-width="90px">
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
  name: 'agentCustomQuery',
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
        v_AgentUserID: '',
        v_UserName: ''
      }
    }
  },
  computed: {
    ...mapState({
      viewParams: state => state.paginations
    })
  },
  methods: {
    onSubmit () {
      let queryKeyObj = {
        v_AgentUserID: 't_sys_agent.v_AgentUserID',
        v_UserName: 't_sys_user.v_UserName'
      }
      //  查询条件  数据  传入minxins  的方法中
      this.searchtableData(this.formSearch, queryKeyObj)
      let obj = {
        searchQuery: this.searchQuery,
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
      this.formSearch.v_AgentUserID = ''
      this.formSearch.v_UserName = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }

}
</script>
<style lang="scss" scoped>
.agent-custom-query {
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
.agent-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.agent-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.agent-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
