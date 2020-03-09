<!-- 页面管理-权限授权 -->
<template>
  <role-form :configData='configData' :shareData='shareData' :componentData='componentData' v-on="$listeners"></role-form>
</template>
<script>
import roleForm from '@/views/common/roleForm'
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
        awaitApi: 'temPagesOperationGetRoleList',
        // 已授权接口
        alreadyApi: 'temPagesOperationGetRoledList',
        // 保存接口
        saveApi: 'temPagesOperationSaveData1',
        // 权限盒子文字
        roleText: '授权角色',
        // url后面拼接的字段
        getFieldKey: 'i_PageID',
        // url后面拼接的字段
        getFieldValue: '',
        // 保存接口后面是否需要拼接参数
        commitRelyOnValue: false,
        // 依赖的数据
        relyOnData: {
          i_Id: '',
          v_PageName: '',
          i_PageID: ''
        },
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'roleData',
        // 是否显示在主页面上
        inDialog: false,
        // 如果roleFormType为2，就传true，其余传false
        showRoleBox: false
      }
    }
  },
  watch: {
    shareData: {
      handler (nv) {
        this.dataEmit(nv)
      }
    }
  },
  methods: {
    dataEmit (data) {
      this.componentData.getFieldValue = data.i_PageID
      this.componentData.relyOnData.i_Id = data.i_Id
      this.componentData.relyOnData.i_PageID = data.i_PageID
      this.componentData.relyOnData.v_PageName = data.v_PageName
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>

</style>
