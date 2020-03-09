<!-- 页面管理操作权限-权限授权 -->
<template>
  <role-form :configData='configData' :shareData='shareData' :componentData='componentData' v-on="$listeners"></role-form>
</template>
<script>
import roleForm from '@/views/common/roleForm'
import { mapState } from 'vuex'
export default {
  name: 'layoutTabsPower',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      componentData: {
        // 1代表显示列链接、2代表不显示三个是swtich开关、3代表正常显示
        roleFormType: '3',
        // 待授权接口
        awaitApi: 'temPagesOperationGetRoleOpeartionList',
        // 已授权接口
        alreadyApi: 'temPagesOperationGetRoledOpeartionList',
        // 保存接口
        saveApi: 'temPagesOperationSaveData2',
        // 权限盒子文字
        roleText: '授权角色',
        // url后面拼接的字段
        getFieldKey: 'i_PageID',
        // url后面拼接的字段
        getFieldValue: '',
        // post依赖的字段名
        postFieldKey: 'v_OperationCode',
        // post依赖的字段值
        postFieldValue: '',
        // 保存接口后面是否需要拼接参数
        commitRelyOnValue: false,
        // 依赖的数据
        relyOnData: {
          i_Id: '',
          v_OperationCode: '',
          i_PageID: ''
        },
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'roleData',
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
      this.componentData.getFieldValue = data.i_PageID
      this.componentData.postFieldValue = data.v_OperationCode
      this.componentData.relyOnData.i_Id = data.i_Id
      this.componentData.relyOnData.v_OperationCode = data.v_OperationCode
      this.componentData.relyOnData.i_PageID = data.i_PageID
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>

</style>
