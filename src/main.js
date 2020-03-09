import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './plugins/element.js'
import 'element-ui'
import '../theme/index.css'
import '@/assets/fonts/iconfont.css'
import '@/assets/js/directives.js'
// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入编辑器
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.js'

// 引入可视化图标
import echarts from 'echarts'
// ie兼容
// 引入moment日期插件
import moment from 'moment'
// 引入中文包
import 'moment/locale/zh-cn'
import VueDND from 'awe-dnd'
// 全局注册弹框内容组件
import handoutComponent from './components/handoutComponent/handoutComponent'
import vdr from 'vue-draggable-resizable-gorkys'

// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)

Vue.use(VueDND)
Vue.prototype.$echarts = echarts
Vue.component('handout-component', handoutComponent)
Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
