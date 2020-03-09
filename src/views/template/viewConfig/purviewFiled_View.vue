<!-- 内容组件-视图组件-字段设置【基础、计算字段】-权限 -->
<template>
  <role-form :configData='configData' :shareData='shareData' :componentData='componentData' v-on="$listeners"></role-form>
</template>
<script>
import roleForm from '@/views/common/roleForm'
import { mapState } from 'vuex'
export default {
  name: 'purviewFiled_View',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      componentData: {
        // 1代表显示列链接、2代表不显示三个是swtich开关、3代表正常显示
        roleFormType: '1',
        // 待授权接口
        awaitApi: 'fieldAwaitTemControl',
        // 已授权接口
        alreadyApi: 'fieldEndTemControl',
        // 保存接口
        saveApi: 'addTemColumnList',
        // 权限盒子文字
        roleText: '授权角色',
        // url后面拼接的字段
        getFieldKey: 'v_ViewID',
        // url后面拼接的字段
        getFieldValue: '',
        // post依赖的字段名
        postFieldKey: 'v_ColName',
        // post依赖的字段值
        postFieldValue: '',
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'authorizeData',
        // 如果roleFormType为2，就传true，其余传false
        showRoleBox: false
      }
    }
  },
  computed: {
    ...mapState({
      infoTabData: state => state.fieTableData
    })
  },
  watch: {
    infoTabData: {
      deep: true,
      handler (nv) {
        this.dataEmit(nv)
      }
    }
  },
  created () {
    this.dataEmit(this.shareData)
  },
  methods: {
    dataEmit (data) {
      this.componentData.getFieldValue = data.v_ViewID
      this.componentData.postFieldValue = data.v_ColName
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>
</style>
