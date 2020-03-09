<!-- 参数组自定义查询 -->
<template>
  <div class='parameter-group-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>

          <el-col :span="6">
               <el-form-item  class="w-240" label-width="80px" label="参数组名称">
                <el-input v-model="formSearch.v_GroupName" placeholder="请输入参数组名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"> <div>&nbsp;</div> </el-col> -->
          <el-col :span="4">
               <el-form-item label-width="0">
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
import watchKeyWords from '@/common/js/mixins/watchKeyWords'
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'selfParameterSearchGroup',
  mixins: [watchKeyWords, customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_GroupName: ''
      },
      ifDialog: false,
      orgtype: '0'
    }
  },
  watch: {
    shareData: {
      handler: (data) => {
        this.flagTest = data.activeName
      },
      deep: true,
      immediate: true
    },
    configData: {
      handler: function (data) {
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSubmit () {
      // 需要查询的字段
      let queryKeyObj = {
        v_GroupName: 't_sys_parameter_group.v_GroupName'
      }
      let viewCode = this.viewId
      // 传入查询的数据  到 mixins
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)

      // 查询参数组和参数组详情联动
      let row = this.$store.state.fieTableData
      if (row.v_GroupCode) {
        this.$set(row, 'enumValue', true)
        row.v_GroupCode = ''
        this.$emit('changeShareData', row)

        // 把当前行的数据存到vuex
        this.$store.commit('rowData', row)
      }
      let row1 = this.$store.state.fieRowTableData[this.viewId]
      if (row1.v_GroupCode) {
        this.$set(row, 'enumValue', true)
        row1.v_GroupCode = ''
        this.$emit('changeShareData', row1)

        // 把当前行的数据存到vuex
        this.$store.commit('nestTableRowData', row1)
      }
    },
    reset () {
      this.formSearch.v_GroupName = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>
<style lang="scss" scoped>
.parameter-group-custom-query {
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
.parameter-group-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.parameter-group-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
