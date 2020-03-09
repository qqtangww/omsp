// 获取日志需要的参数
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      buttonConfig: state => state.confsBtn,
      currentTableRow: state => state.fieRowTableData[state.confsBtn.viewid],
      commitLogParams: state => state.commitLogParams
    })
  },
  methods: {
    getLogParams () {
      return this.commitLogParams
    },
    saveLogParams (btnConfig) {
      // 保存日志需要的参数 页面id、页面名称、操作id、操作代码
      let pageid = JSON.parse(sessionStorage['refreshPageData']).pageid
      let pagename = JSON.parse(sessionStorage['refreshPageData']).name || JSON.parse(sessionStorage['refreshPageData']).pagename
      let templateCode = ''
      if (btnConfig.viewid.includes('CC_VW')) {
        templateCode = 'viewcode'
      } else if (btnConfig.viewid.includes('CC_TR')) {
        templateCode = 'treecode'
      } else if (btnConfig.viewid.includes('CC_FM')) {
        templateCode = 'formcode'
      }
      this.$store.commit('getLogParams', { templateCode, templateId: btnConfig.viewid, pageid, pagename, operationname: btnConfig.operationname, operationcode: btnConfig.operationcode })
    }
  }
}
