<!-- 待删除 -->
<template>
  <div class="enumValHeadlineSearch">
    <el-form inline-message ref="form" class="form-enum-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-form-item label="枚举名称：" class="w-155" label-width="100px">
            <el-input v-model="formSearch.v_enumName" placeholder="请输入一级枚举名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="枚举值名称：" class="w-155" label-width="100px">
            <el-input v-model="formSearch.v_enumValName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="枚举参数值：" class="w-155" label-width="100px">
            <el-input v-model="formSearch.v_enumParamVal" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <div class="query-button">
            <el-button @click="onSubmit" icon="iconfont icon-sousuo">
              查询
            </el-button>
            <el-button  @click="reset" icon="iconfont icon-gengxinjilu">
              重置
            </el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'enumValHeadlineSearch',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  data () {
    return {
      keywords: '',
      formSearch: {
        v_enumName: '',
        v_enumValName: '',
        v_enumParamVal: ''
      }
    }
  },
  watch: {
    configData: {
      handler: function (data) {
        // console.log(data)
      },
      immediate: true
    },
    shareData: {
      immediate: true,
      handler (nv) {
        this.formSearch.v_enumName = ''
        this.formSearch.v_enumValName = ''
        this.formSearch.v_enumParamVal = ''
      }
    }
  },
  methods: {
    onSubmit () {
      let params = {
        v_EnumName: this.formSearch.v_enumName,
        enumParamValue: this.formSearch.v_enumParamVal,
        enumValue: this.formSearch.v_enumValName
      }
      this.$emit('getQueryData', params)
      this.$emit('getTableData', params)
    },
    reset (arr) {
      this.$emit('getQueryData', '')
      this.formSearch.v_enumName = ''
      this.formSearch.v_enumValName = ''
      this.formSearch.v_enumParamVal = ''
    }
  }

}
</script>
<style lang="scss" scoped>
.enumValHeadlineSearch {
  .form-enum-search {
    padding: 16px 0 0;
  }
  .w-155{
        .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
            width: 155px;
            height:30px;
            border-radius:4px;
        }
        /deep/ .el-input__inner{
            width: 155px;
            height:30px;
            border-radius:4px;

        }
    }
    .input-container{
        >div{
            float: left;
            margin: 0 34px 16px 0;
            font-size: 12px;
            &:last-of-type{
                margin-right: 0;
            }
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
          margin-right: 6px;
        }
      }
    }
}
</style>
