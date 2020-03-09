<!-- 枚举列表查询 -->
<template>
  <div class="enumHeadlineSearch">
    <div id='enum-list-search'>
      <el-input
        v-model="keywords"
        prefix-icon="el-icon-edit-outline"
        placeholder="输入一级枚举名称或编码搜索"
        class="serach-tool"
        clearable
      >
        <el-button
          slot="append"
          @click="searchOrgBtn()"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
export default {
  name: 'enumHeadlineSearch',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    },
    tableData: Array
  },
  data () {
    return {
      keywords: ''
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
        this.keywords = ''
      }
    }
  },
  methods: {
    searchOrgBtn () {
      let params = {
        enumcatcode: this.$store.state.fieTableData.v_EnumCatCode,
        keywords: this.keywords
      }
      this.$emit('getQueryData', params)
      this.$emit('getTableData', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.enumHeadlineSearch {
  .serach-tool {
    width: 300px!important;
    padding: 6px 8px;
  }
}
#enum-list-search /deep/ .el-input__prefix{
  i{
    margin-left: 8px;
  }
}
</style>
