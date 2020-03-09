/*
 * @Author: ly
 * @Date: 2019-07-11 16:37:02
 * @LastEditTime: 2019-07-11 16:37:02
 * @LastEditors: ly
 * @Description:
 * @输出一段不带属性的自定义信息
 */
import cgiService from '@/api/cgiService'
export default {
  data () {
    return {
      currentItem: {} // 当前配置项所有数据
    }
  },
  mounted () {
    let refreshPageData = JSON.parse(sessionStorage.getItem('refreshPageData') || '{}')
    if (JSON.stringify(refreshPageData) !== '{}') {
      this.currentItem = refreshPageData
    } else {
      let fastMenuData = JSON.parse(sessionStorage.getItem('fastMenuData') || '{}')
      this.currentItem = fastMenuData[0]
    }
    cgiService.layout(this.currentItem.code).then(res => {
      if (res.code === 0) {
        this.regiondata = res.data.regiondata || []
        this.regiondata.forEach(item => {
          if (item.v_CateCode === 'CC_VW') {
            item.viewId = item.v_Code
          }
        })
      } else {
        this.$message.error(res.msg)
      }
    })
  }
}
