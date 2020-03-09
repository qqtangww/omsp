<!-- 内容组件-树形组件-节点设置-基本信息 -->
<template>
  <div class="content-box add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message label-position="right" label-width="110px" :rules="rules" ref="ruleForm" :model="modAddData">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 模板路径
        </span>
        <el-row v-if="isNodeType === '1'">
          <el-col :span="12">
            <el-form-item label="节点层级设置" prop="i_NodeSetType">
              <el-radio-group v-model="modAddData.i_NodeSetType">
                <el-radio label="0">缺省</el-radio>
                <el-radio label="1">指定层级</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="限制至层级"
              label-width="105px"
              prop="v_NodeLevel"
              class="input-number"
              v-if="modAddData.i_NodeSetType === '1'"
            >
              <el-input-number v-model="modAddData.v_NodeLevel" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isNodeType === '2'">
          <el-col :span="12">
            <el-form-item label="节点层级设置" prop="i_NodeSetType">
              <el-radio-group v-model="modAddData.i_NodeSetType">
                <el-radio label="0">缺省</el-radio>
                <el-radio label="2">指定类型</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="固定类型"
              label-width="105px"
              prop="v_NodeLevel"
              class="flexType"
              v-if="modAddData.i_NodeSetType === '2'"
            >
              <el-input v-model="modAddData.v_NodeLevel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="modAddData.v_Description"
            placeholder="请输入表关系描述"
            type="textarea"
            class="minInput"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 设置
        </span>
        <el-row>
          <!-- <el-col :span="14">
            <el-form-item
              label="自定义图标"
              label-width="110px"
              class="iconUrlBox"
              id="icon-preview-box"
              prop="v_IconURL"
            >
              <el-select v-model="modAddData.v_IconURL">
                <el-option
                  v-for="(item,index) in iconUrl"
                  :key="index"
                  :label="item.v_EnumValue"
                  :value="item.v_EnumValue"
                >
                  <span>
                    <i :class="item.v_EnumValue" />
                  </span>
                </el-option>
              </el-select>
              <div id="icon-preview">
                <i :class="modAddData.v_IconURL" />
              </div>
            </el-form-item>
          </el-col> -->
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="自定义图标"
                label-width="110px"
                prop="v_IconURL"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select placeholder="默认" v-model="modAddData.v_IconURL">
                      <el-option
                        v-for="(item,index) in iconUrl"
                        :key="index"
                        :label="item.v_EnumValue"
                        :value="item.v_EnumValue"
                      >
                        <span>
                          <i :class="item.v_EnumValue" />
                        </span>
                      </el-option>
                    </el-select>
                    <div id="icon-preview">
                      <i :class="modAddData.v_IconURL" :style="`color:${modAddData.v_IconColor}`" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push="1">
              <el-form-item
                label="图标颜色"
                prop="v_IconColor"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select placeholder="默认" v-model="modAddData.v_IconColor">
                      <el-option
                        v-for="(item,index) in iconColorList"
                        :key="index"
                        :label="item.v_ParamValue"
                        :value="item.v_ParamValue"
                        style="padding: 5px 0 0 15px;"
                      >
                        <div id="icon-color-box" :style="`background-color:${item.v_ParamValue}`"></div>
                      </el-option>
                    </el-select>
                    <div id="icon-preview" class="icon-color">
                      <div v-if="modAddData.v_IconColor" id="icon-color-box" :style="`background-color:${modAddData.v_IconColor}`"></div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可被选中" prop="i_IsChecked">
              <el-switch
                v-model="modAddData.i_IsChecked"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="可拖拽调序" prop="i_IsDropSort" label-width="135px">
              <el-switch
                v-model="modAddData.i_IsDropSort"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="可被拖拽放置位置" prop="i_IsDropedPlace">
              <el-switch
                v-model="modAddData.i_IsDropedPlace"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
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
  name: 'nodeInfo',
  mixins: [windowRed, logMixin],
  props: {
    dialogData: Object,
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      modAddData: {
        // 节点层级设置
        i_NodeSetType: '0',
        // 限制至层级
        v_NodeLevel: 0,
        // 可被选中
        i_IsChecked: '0',
        // 懒加载子节点
        i_IsLoadNode: '0',
        // 可拖拽调序
        i_IsDropSort: '0',
        // 可被拖拽放置
        i_IsDropedPlace: '0',
        // 自定义图标
        v_IconURL: '',
        v_IconColor: '',
        // 描述
        v_Description: ''
      },
      isNodeType: '1',
      // 图标
      iconUrl: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      isDisable: false,
      rules: {
        i_NodeSetType: [
          { required: true, message: '请选择节点类型设置', trigger: 'blur' }
        ],
        v_NodeLevel: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      // 定义小红点 存储数据的对象
      oldModAddData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        this.$set(
          this.oldModAddData,
          'v_NodeLevel',
          Number(this.oldModAddData.v_NodeLevel)
        )
        this.$set(data, 'v_NodeLevel', Number(data.v_NodeLevel))

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
    let enumCode = ['nodeIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.modAddData.i_Id = formData.i_Id
      let currentTab = Object.assign({}, this.modAddData)
      this.$set(currentTab, 'regin', 'regin2')
      // 把修改的数据存入vuex中  方便返回给其他的Tab页
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    let fieRowTableData = this.$store.state.fieRowTableData
    if (fieRowTableData['CC_VW_instanceTree'].i_NodeSetType) {
      this.isNodeType = fieRowTableData['CC_VW_instanceTree'].i_NodeSetType
    }
    if (fieRowTableData['CC_VW_instanceTree'].v_TreeCode) {
      this.$set(
        this.modAddData,
        'v_TreeCode',
        fieRowTableData['CC_VW_instanceTree'].v_TreeCode
      )
    }
    // 接受旧的表单数据  用于 跟新数据 做对比
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
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
              // 老版调取数据
              // let resObj = {
              //   ...res
              // }
              // this.$set(resObj, 'v_TreeCode', res.v_TreeCode)
              // // 把 接口返回 的数据存到vuex
              // this.$store.commit('rowData', resObj)
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations['CC_VW_treeNodeConfig']
              this.$set(
                params,
                'viewid',
                this.$store.state.fieRowTableData['CC_VW_treeNodeConfig'].viewid
              )
              this.$emit('getTableData', params)
              // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取
              let currentTab = Object.assign({}, this.modAddData)
              this.$set(currentTab, 'regin', 'regin2')
              this.$store.commit('changeRepetitionRowTabData', currentTab)

              // 保存后设置小红点消失
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          // console.log(res)
          for (let key in res.data) {
            if (key === 'nodeIcons') {
              // 图标
              this.iconUrl = res.data[key]
            } else if (key === 'iconColorAll') {
              // 图标颜色
              this.iconColorAll = res.data[key]
              this.iconColorAll.forEach(item => {
                this.paramsList.push(item.v_EnumValue)
              })
              let v_ParamCode = this.paramsList
              cgiService.getParameter({ v_ParamCode }).then(res => {
                if (res.code === 0) {
                  for (let key in res.data) {
                    res.data[key].v_ParamValue = res.data[key].v_ParamValue.slice(0, 7)
                    this.iconColorList.push(res.data[key])
                  }
                }
              })
            }
          }
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
.content-box {
  height: 100%;
  box-sizing: border-box;
  .el-form {
    border: none !important;
    padding: 15px;
    overflow: auto;
    box-sizing: border-box;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      &:first-of-type {
        margin-top: 0;
        padding-right: 60px;
      }

      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .tabs-base-info
  /deep/.minInput
  .el-textarea__inner {
  height: 120px !important;
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  div.el-input-number.is-controls-right {
  line-height: 28px;
  height: 100%;
}
.content-box .border-box /deep/ .iconUrlBox .el-form-item__content {
  width: 180px;
  margin-top: 10px;
}
.content-box .border-box /deep/ .el-row .el-form-item {
  margin-top: 0px !important;
}
.content-box .border-box /deep/ .el-row .flexType .el-form-item__content {
  width: 100px;
}
/deep/ .el-switch {
  width: 32px;
}
// 兼容火狐浏览器
.content-box /deep/ .input-number .el-form-item__content {
  line-height: 31px;
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
</style>
