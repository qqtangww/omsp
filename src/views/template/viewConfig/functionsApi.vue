<!-- 内容组件-视图组件-编程接口 -->
 <template>
  <div class="function-api add-modify-form" id="view-function">
    <!-- 操作栏 -->
    <div class="formOperateBox" v-if="configData">
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message label-position="right" ref="ruleForm" :model="modAddData">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        type="border-card"
        class="tab-function"
        id="tab-fun"
      >
        <el-tab-pane label="全局" name="first">
          <div class="funcTitle">
            请输入全局函数体，以^^拼 :
            <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
              <i class="iconfont icon-dongcanbiaoshi"></i>
            </el-tooltip>
          </div>
          <el-form-item label label-width="0px" prop="v_ScriptBody">
            <el-input
              v-model="modAddData.v_ScriptBody"
              placeholder="请输对应操作中配置的函数名 例如：
function funName(params){
  // 需要执行的函数逻辑
  params.that.$emit('funName',Obj)
}"
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
              @input="change($event)"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="加载" name="second" v-if="false">
          <div class="funcTitle">请输入自动加载函数 :</div>
          <el-form-item label label-width="0px" prop="v_AutoLoadFunc">
            <el-input
              v-model="modAddData.v_AutoLoadFunc"
              placeholder
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="接收" name="thirdly" v-if="false">
          <div class="funcTitle">请输入数据接收函数 :</div>
          <el-form-item label label-width="0px" prop="v_DataSendFunc">
            <el-input
              v-model="modAddData.v_DataSendFunc"
              placeholder
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="发送" name="fourth" v-if="false">
          <div class="funcTitle">请输入数据发送函数 :</div>
          <el-form-item label label-width="0px" prop="v_DataReceiveFunc">
            <el-input
              v-model="modAddData.v_DataReceiveFunc"
              placeholder
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'viewConfig-functionsApi',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      oldModAddData: {},
      activeName: 'first',
      flag: false,
      modAddData: {
        // 全局函数
        v_ScriptBody: '',
        // 自动加载函数
        v_AutoLoadFunc: '',
        // 数据接收函数
        v_DataSendFunc: '',
        // 数据发送函数
        v_DataReceiveFunc: ''
      },
      rowTabData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
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
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    handleClick () {},
    commit () {
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      Object.assign(this.modAddData, this.tabData['regin1'])
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.modAddData.logParams = this.getLogParams()
      }
      cgiService.saveViewData(this.modAddData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          // 拉取默认分页配置 paginations

          let pageConfig = this.$store.state.paginations
          this.$emit('getTableData', pageConfig['CC_VW_contentView'])
          this.isReminder = true
          this.oldModAddData = Object.assign({}, this.modAddData)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    change (e) {
      this.$forceUpdate()
    }
  },
  mounted () {},
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.function-api {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    border: none !important;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    padding: 0px !important;
    .tab-function {
      box-shadow: none;
      border: none;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      padding-bottom: 10px;
      display: flex;
      flex-direction: column;
      .el-tabs__content {
        height: 93%;
        #pane-first,
        #pane-second,
        #pane-thirdly,
        #pane-fourth {
          padding: 0 16px;
          height: 100%;
          .funcTitle {
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
}
.tab-function /deep/.el-tabs__header {
  height: 30px;
  line-height: 30px;
  background: #eff5fc;
  border: none;
}
.tab-function /deep/.el-tabs__content {
  height: 93%;
}
.tab-function /deep/.el-tabs__content .el-form-item {
  height: 90%;
  margin-top: 0 !important;
  .el-form-item__content {
    height: 100%;
    .minInput {
      height: 100%;
      .el-textarea__inner {
        height: 100% !important;
      }
    }
  }
}
#view-function #tab-fun /deep/.el-tabs__header .el-tabs__item.is-active {
  background: #ffffff;
  border: none !important;
  height: 30px;
  line-height: 30px;
  color: #5892f6;
  font-weight: 500;
}
#view-function /deep/ .el-tabs__header{
  border-bottom: none !important;
}
</style>
