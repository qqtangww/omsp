<!-- 角色管理-权限授权 -->
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
        awaitApi: 'temAwaitRoleUser',
        // 已授权接口
        alreadyApi: 'temEndRoleUser',
        // 保存接口
        saveApi: 'temSetRoleUser',
        // 权限盒子文字
        roleText: '授权用户',
        // post依赖的字段名
        postFieldKey: 'i_RoleID',
        // post依赖的字段值
        postFieldValue: '',
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'v_UserID',
        // 提交的时候，已授权字段值 的 字段名【示例：alreadyFieldKey: RowData[alreadyFieldValueKey]】
        alreadyFieldValueKey: 'v_UserID',
        // 权限提交数据形式
        roleCommitDataType: 'Array',
        // 依赖的数据
        relyOnData: {
          i_RoleID: ''
        },
        // 表格列的渲染
        specialColumn: [
          { coltitle: '授权用户', colname: 'v_UserName', width: 'auto', specialFlag: true },
          { coltitle: '用户ID', colname: 'v_UserID', width: '100' }
        ],
        // 如果roleFormType为2，就传true，其余传false
        showRoleBox: true,
        // 视图的高度
        tableHeight: '385'
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
      this.componentData.postFieldValue = data.i_RoleID
      this.componentData.relyOnData.i_RoleID = data.i_RoleID
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>

</style>
