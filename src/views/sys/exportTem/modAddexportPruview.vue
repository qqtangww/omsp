<!-- 导入导出模板-权限授权 -->
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
        awaitApi: 'getAwaitTempPwoer',
        // 已授权接口
        alreadyApi: 'getStayTempPwoer',
        // 保存接口
        saveApi: 'saveTemplate',
        // 权限盒子文字
        roleText: '授权角色',
        // post依赖的字段名
        postFieldKey: 'v_TemplateCode',
        // post依赖的字段值
        postFieldValue: '',
        // 保存接口后面是否需要拼接参数
        commitRelyOnValue: false,
        // 依赖的数据
        relyOnData: {
          i_Id: '',
          v_TemplateName: '',
          v_InterfaceUrl: '',
          v_FileType: '',
          i_TemplateType: '',
          i_BizID: '',
          i_FileNumType: '',
          v_TemplateCode: ''
        },
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'roleData',
        // 隐藏代理使用switch
        hiddenEnableAgent: true,
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
      this.componentData.postFieldValue = data.v_TemplateCode
      this.componentData.relyOnData.i_Id = data.i_Id
      this.componentData.relyOnData.v_TemplateCode = data.v_TemplateCode
      this.componentData.relyOnData.v_TemplateName = data.v_TemplateName
      this.componentData.relyOnData.i_TemplateType = data.i_TemplateType
      this.componentData.relyOnData.v_InterfaceUrl = data.v_InterfaceUrl
      this.componentData.relyOnData.v_FileType = data.v_FileType
      this.componentData.relyOnData.i_BizID = data.i_BizID
      this.componentData.relyOnData.i_FileNumType = data.i_FileNumType
    }
  },
  components: {
    roleForm
  }
}
</script>
<style lang="scss" scoped>

</style>
