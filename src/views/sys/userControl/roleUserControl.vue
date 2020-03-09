<!-- 用户管理-权限授权 -->
<template>
  <role-form :configData='configData' :shareData='shareData' :componentData='componentData' v-on="$listeners"></role-form>
</template>
<script>
import roleForm from '@/views/common/roleForm'
import { mapState } from 'vuex'
export default {
  name: 'roleUserControl',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      componentData: {
        // 1代表显示列链接、2代表不显示三个是swtich开关、3代表正常显示
        roleFormType: '2',
        // 待授权接口
        awaitApi: 'temUserRoleList',
        // 已授权接口
        alreadyApi: 'temEndUserRoleList',
        // 保存接口
        saveApi: 'temGrentUserRole',
        // 权限盒子文字
        roleText: '授权角色',
        // post依赖的字段名
        postFieldKey: 'v_UserID',
        // post依赖的字段值
        postFieldValue: '',
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'i_RoleID',
        // 权限提交数据形式
        roleCommitDataType: 'Array',
        // 依赖的数据
        relyOnData: {
          v_UserID: ''
        },
        // 如果roleFormType为2，就传true，其余传false
        showRoleBox: true,
        // 视图的高度
        tableHeight: '345'
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
      this.componentData.postFieldValue = data.v_UserID
      this.componentData.relyOnData.v_UserID = data.v_UserID
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>

</style>
