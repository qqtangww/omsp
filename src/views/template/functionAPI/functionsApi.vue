<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 18:25:51
 * @LastEditTime: 2019-08-29 18:25:51
 * @LastEditors: your name
 -->
 <template>
  <div class="function-api">
    <el-form inline-message label-position="right" ref="ruleForm" :model="modAddData">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        type="border-card"
        class="tab-function"
      >
        <el-tab-pane
          label="全局"
          name="first"
        >
          <div class="funcTitle">请输入全局函数体，以^^拼 :
            <el-tooltip
              class="item"
              effect="dark"
              content="输入动参"
              placement="top"
            >
              <i class="iconfont icon-dongcanbiaoshi"></i>
            </el-tooltip>
          </div>
          <el-form-item
            label=""
            label-width="0px"
            prop="v_ScriptBody"
            class='description-label'>
            <el-input
              v-model="modAddData.v_ScriptBody"
              placeholder=" 例如：function(params){XXX; return '类名'; }"
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="加载"
          name="second"
          v-if="false"
        >
          <div class="funcTitle">请输入自动加载函数 : </div>
          <el-form-item
            label=""
            label-width="0px"
            prop="v_AutoLoadFunc"
            class='description-label'>
            <el-input
              v-model="modAddData.v_AutoLoadFunc"
              placeholder=""
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="接收"
          name="thirdly"
          v-if="false"
        >

          <div class="funcTitle"> 请输入数据接收函数 : </div>
          <el-form-item
            label=""
            label-width="0px"
            prop="v_DataSendFunc"
          >
            <el-input
              v-model="modAddData.v_DataSendFunc"
              placeholder=""
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="发送"
          name="fourth"
          v-if="false"
        >
          <div class="funcTitle"> 请输入数据发送函数 : </div>
          <el-form-item
            label=""
            label-width="0px"
            prop="v_DataReceiveFunc"
            class='description-label'>
            <el-input
              v-model="modAddData.v_DataReceiveFunc"
              placeholder=""
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
import ulti from '@/common/js/util'
export default {
  name: 'functionsApi',
  props: {
    shareData: Object
  },
  data () {
    return {
      activeName: 'first',
      modAddData: {
        // 全局函数
        v_ScriptBody: '',
        // 自动加载函数
        v_AutoLoadFunc: '',
        // 数据接收函数
        v_DataSendFunc: '',
        // 数据发送函数
        v_DataReceiveFunc: ''
      }
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        this.$emit('changeFuncData', data)
      },
      // immediate: true,
      deep: true
    },
    shareData: {
      handler: function (data) {
        ulti.initFormData(this.modAddData, data)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClick () {}
  }
}
</script>
<style lang="scss" scoped>
.function-api {
  height: 100%;
  .el-form {
    border: none !important;
    height: 100%;
    .tab-function {
      box-shadow: none;
      height: 100%;
      border: none;
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
.tab-function /deep/.el-tabs__header .el-tabs__item.is-active {
  background: #ffffff;
  border: none;
  height: 30px;
  line-height: 30px;
  color: #5892f6;
  font-weight: 500;
}
</style>
