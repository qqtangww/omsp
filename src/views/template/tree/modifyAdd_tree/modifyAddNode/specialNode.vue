<!-- 内容组件-树形组件-节点设置-特殊节点 -->
 <template>
  <div class="special-node add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message label-position="right" ref="ruleForm" :model="modAddData">
      <el-form-item label="特殊节点" label-width="80px" prop="i_IsSpecialNode">
        <el-switch
          v-model="modAddData.i_IsSpecialNode"
          active-color="#32c5d2"
          inactive-color="#e6e7e8"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
      <div class="specialTitle">请输入该特殊节点的函数体 :</div>
      <el-form-item label label-width="0px" prop="v_SpecialFunc" class='description-label'>
        <el-input
          v-model="modAddData.v_SpecialFunc"
          :disabled="modAddData.i_IsSpecialNode === '0'"
          placeholder='示例：
(function(nodeData){
  If(condition){
     return className
   }
})'
          type="textarea"
          class="minInput"
          :autosize="{ minRows: 2, maxRows: 4}"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'functionsApi',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      activeName: 'first',
      modAddData: {
        // 特殊节点
        i_IsSpecialNode: '0',
        // 函数体
        v_SpecialFunc: ''
      },
      // 定义小红点 存储数据的对象
      oldModAddData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData
    })
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
    }
    // 接受旧的表单数据  用于 跟新数据 做对比
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    handleClick () {},
    commit () {
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      Object.assign(this.modAddData, this.tabData['regin2'])
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.modAddData.logParams = this.getLogParams()
      }
      cgiService.saveTreeNodeConfig(this.modAddData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          if (Number(res.iId) > 0) {
            this.modAddData.i_Id = res.iId
          }
          // let resObj = {
          //   ...res
          // }
          // this.$set(resObj, 'v_TreeCode', res.v_TreeCode)
          // // 把 接口返回 的数据存到vuex
          // this.$store.commit('rowData', resObj)
          // 重新调取接口渲染数据
          let params = this.$store.state.paginations['CC_VW_treeNodeConfig']
          this.$set(
            params,
            'viewid',
            this.$store.state.fieRowTableData['CC_VW_treeNodeConfig'].viewid
          )
          this.$emit('getTableData', params)
          // 保存后设置小红点消失
          this.isReminder = true
          this.oldModAddData = Object.assign({}, this.modAddData)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.special-node {
  height: 100%;
  // padding: 0 10px;
  .el-form {
    border: none !important;
    height: 100%;
    padding: 0 10px;
    .specialTitle {
      padding-left: 5px;
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .special-node
  .el-form-item
  .el-form-item__content
  .minInput
  /deep/
  .el-textarea__inner {
  height: 242px !important;
}
.special-node /deep/ .el-form-item {
  margin-top: 6px !important;
}
</style>
