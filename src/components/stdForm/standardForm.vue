<template>
  <div class="bodyBorderBox">
    <!-- 内容组件 -->
    <component :is="routeName" :configData="configData"  :shareData="shareData" v-on='$listeners' @getFormDialogConfig='getFormDialogConfig'></component>
    <dialog-standard v-on="$listeners" v-if="showFormDialog" :ifDialog='showFormDialog' :configData='formDialogConfig' @getDialogStatus='getDialogStatus'></dialog-standard>
  </div>
</template>

<script>
import formMixin from '@/common/js/mixins/formMixin'
import dialogStandard from '@/components/stdDialog/stdDialogAction'
export default {
  name: 'standardForm',
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    }
  },
  mixins: [formMixin],
  data () {
    return {
      routeName: '',
      // 控制弹框操作栏的渲染
      ifActionBar: false,
      // 把配置 传到弹框
      formDialogConfig: {},
      // 表单行间距
      formRowMargin: '',
      showFormDialog: false
    }
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        this.routeName = nv.confView.customname
      }
    }
  },
  methods: {
    // 弹框关闭之后会 传一个false 过来
    getDialogStatus (params) {
      if (this.configData.confView.formcode === params.code) {
        this.showFormDialog = params.flag
      }
    },
    // 获取弹框配置
    getFormDialogConfig (data) {
      this.formDialogConfig = data
      if (data && data.hasOwnProperty('showFormDialog')) {
        this.showFormDialog = data.showFormDialog
      }
    }
  },
  // 实现弹框表单懒加载
  mounted () {
    this.$nextTick(() => {
      this.$emit('changeLoading')
    })
  },
  components: {
    dialogStandard
  }
}
</script>

<style scoped lang="scss">
.bodyBorderBox{
  height: 100%;
  .body-border-box{
    box-sizing: border-box;
    height: 100%;
    .form-box{
      height: 100%;
    }
  }
}
</style>
