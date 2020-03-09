<!-- 内容组件-视图组件-添加修改操作按钮 -->
<template>
  <div class="operation-info">
    <div class="formOperateBox">
      <el-button type="text" @click="optiosCommit">
        <i class="iconfont icon-baocun"></i>保 存
      </el-button>
    </div>
    <el-form inline-message ref="customOptios" key="operation-info-form" :rules="optionsRules" :model="operationForm">
      <div class="contentBox">
        <div class="border-Box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
          <el-form-item label="操作代码" :label-width="formLabelWidth" prop="v_OperationCode">
            <el-input v-model="operationForm.v_OperationCode" :disabled="isCodeDisabled"></el-input>
          </el-form-item>
          <el-form-item label="操作名称" :label-width="formLabelWidth" prop="v_OperationName">
            <el-input v-model="operationForm.v_OperationName"></el-input>
          </el-form-item>
          <el-form-item label="操作说明" :label-width="formLabelWidth" prop="v_Explain">
            <el-input v-model="operationForm.v_Explain"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="操作按钮图标"
                :label-width="formLabelWidth"
                prop="v_IconURL"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select placeholder="默认" v-model="operationForm.v_IconURL">
                      <el-option
                        v-for="(item,index) in optionsIcon"
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
                      <i :class="operationForm.v_IconURL" :style="`color:${operationForm.v_IconColor}`" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12" :push="1">
              <el-form-item
                label="操作按钮图标颜色"
                label-width="115px"
                prop="v_IconColor"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select placeholder="默认" v-model="operationForm.v_IconColor">
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
                      <div v-if="operationForm.v_IconColor" id="icon-color-box" :style="`background-color:${operationForm.v_IconColor}`"></div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="显示样式"
            class="controlLiHei"
            :label-width="formLabelWidth"
            props="i_DisplayStyle"
          >
            <el-radio-group v-model="operationForm.i_DisplayStyle">
              <el-radio label="1">图标与文字</el-radio>
              <el-radio label="2">仅图标</el-radio>
              <el-radio label="3">仅文字</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="border-Box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 操作设置
          </span>
          <el-row>
            <el-col :span="14">
              <el-form-item label="记录日志" :label-width="formLabelWidth" prop="i_IsRecordLog">
                <!-- 功能未实现，先置灰 -->
                <!-- disabled -->
                <el-switch
                  v-model="operationForm.i_IsRecordLog"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="隐藏" label-width="95px" prop="i_isHidden">
                <el-switch v-model="operationForm.i_isHidden" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="执行方式"
            :label-width="formLabelWidth"
            class="controlLiHei"
            prop="i_LinkFlag"
          >
            <el-radio-group v-model="operationForm.i_LinkFlag" @change="getDiloag">
              <el-radio label="1">函数</el-radio>
              <el-radio label="2">弹框</el-radio>
              <el-radio label="0">页面链接</el-radio>
            </el-radio-group>
          </el-form-item>
          <template   v-if="operationForm.i_LinkFlag === '0'">
              <el-form-item
                label="页面链接"
                :label-width="formLabelWidth"
                class="controlLiHei"
                prop="v_LinkPage"
              >
                <el-input v-model="operationForm.v_LinkPage"></el-input>
              </el-form-item>
          </template>
          <template   v-if="operationForm.i_LinkFlag === '1' ">
              <el-form-item
                label="函数名"
                :label-width="formLabelWidth"
                prop="v_Func"
              >
                <el-input
                  v-model="operationForm.v_Func"
                  placeholder="请输入函数名"
                />
              </el-form-item>
          </template>
          <template v-if="operationForm.i_LinkFlag === '2'">
              <el-form-item
                      label="弹框容器"
                      :label-width="formLabelWidth"
                      prop="v_DialogCode">
                      <el-select v-model="operationForm.v_DialogCode" filterable placeholder="请选择">
                        <el-option
                          v-for="(item, index) in dialogCode"
                          :key="index"
                          :label="item.v_DialogName"
                          :value="item.v_DialogCode"
                        >
                          <span style="float: left">{{ item.v_DialogName }}</span>
                          <span style="float: right; color: #000000; font-size: 12px">{{ item.v_DialogCode }}</span>
                        </el-option>
                      </el-select>
                </el-form-item>
              <el-form-item label="组件类型" label-width="110px">
                <!-- <el-cascader
                  popper-class="filtrate"
                  v-model="cateCodeVal"
                  placeholder="请输入搜索"
                  :options="componentCode"
                  :props="defaultProps"
                  @change="getComponentEvent"
                  filterable
                ></el-cascader> -->
                <el-select ref="selectTree1" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree'>
                  <el-option :value="cateCodeVal1" style="height: auto">
                    <el-tree :data="componentCode" default-expand-all
                      ref="tree" highlight-current :props="defaultProps"
                      @node-click="handleClickChange1"></el-tree>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="组件实例"
                :label-width="formLabelWidth"
                v-if="cateCodeName1 !== 'CT'"
                prop="v_Code">
                <el-select v-model="operationForm.v_Code" filterable placeholder="请选择">
                  <el-option
                    v-for="(item,idenx) in componentConfigCode"
                    :key="idenx"
                    :label="item.v_Name"
                    :value="item.v_Code"
                  >
                    <span style="float: left">{{ item.v_Name }}</span>
                    <span style="float: right; color: #000000; font-size: 12px">{{ item.v_Code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="模板文件"
                :label-width="formLabelWidth"
                v-if="cateCodeName1 !== 'CT'"
                prop="v_ExportTemplateCode">
                <el-select v-model="operationForm.v_ExportTemplateCode" filterable placeholder="请选择" @focus="getTemplateCode">
                  <el-option
                    v-for="(item,idenx) in templateCode"
                    :key="idenx"
                    :label="item.v_TemplateName"
                    :value="item.v_TemplateCode"
                  >
                    <span style="float: left">{{ item.v_TemplateName }}</span>
                    <span style="float: right; color: #000000; font-size: 12px">{{ item.v_TemplateCode }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
                <el-form-item
                  label="自定内容名称"
                  :label-width="formLabelWidth"
                  v-if="cateCodeName1 === 'CT'"
                  prop="v_CustomName">
                  <el-input v-model="operationForm.v_CustomName"></el-input>
                </el-form-item>
          </template>
          <el-form-item label="显示隐藏开关" :label-width="formLabelWidth" prop="v_SpecialDisplayFunc">
            <el-input
              class="textareaBox"
              v-model="operationForm.v_SpecialDisplayFunc"
              placeholder="请输入函数体控制该按钮的显示和隐藏 例如:
        (function(params) {
            if(判断条件) {
              return Boolean值
            }
        })
        "
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
export default {
  name: 'operationInfo',
  props: {
    operationData: Object,
    ifDialog: Boolean,
    dialogVisible: Boolean
  },
  data () {
    return {
      isDisabled: true,
      isCodeDisabled: false,
      cateCodeVal1: '',
      cateCodeName1: '',
      // label标签宽度
      formLabelWidth: '110px',
      // 表单数据
      operationForm: {
        i_ButType: '',
        // 编码
        v_OperationCode: '',
        // 名称
        v_OperationName: '',
        // 图标
        v_IconURL: '',
        // 图标颜色
        v_IconColor: '',
        // 显示样式
        i_DisplayStyle: '1',
        // 执行方式
        i_LinkFlag: '1',
        // 函数体
        v_Func: '',
        // 特殊显示
        v_SpecialDisplayFunc: '',
        // 弹框容器
        v_DialogCode: '',
        // 组件类型
        i_Cate: '',
        // 组件分类code
        v_CateCode: '',
        // 组件配置
        v_Code: '',
        // 自定义内容
        v_CustomName: '',
        // 隐藏
        i_isHidden: '0',
        // 记录日志
        i_IsRecordLog: '0',
        // 操作说明
        v_Explain: '',
        // 模板文件
        v_ExportTemplateCode: '',
        v_LinkPage: ''
      },
      oldOperationForm: {},
      // 表单校验
      optionsRules: {
        v_OperationCode: [
          { required: true, message: '请输入操作代码', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_OperationName: [
          { required: true, message: '请输入编操作名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ]
        // v_DialogCode: [
        //   { required: true, message: '请选择弹框容器', trigger: 'change' }
        // ]
      },
      // iccon图标
      //  添加操作图标
      optionsIcon: [],
      // 弹框容器数据
      dialogCode: [],
      // 组件类型数据
      componentCode: [],
      enumSonList: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      // 模板文件
      templateCode: [],
      //   组件配置
      componentConfigCode: [],
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      },
      // 小红点功能
      isDot: false
    }
  },
  watch: {
    operationData: {
      handler: function (data) {
        // 获取组件类型
        this.queryComponents()
        this.cateCodeName1 = data.v_CateCode
        if (this.cateCodeName1) {
          this.queryEnumName1([this.cateCodeName1])
        }
        this.queryDialogVessel()
        this.queryInstanseComponents(this.cateCodeName1)
        // 修改时  赋值数据给表单
        if (data.i_Id) {
          this.$nextTick(() => {
            util.initFormData(this.operationForm, data)
            this.operationForm.i_Id = data.i_Id
            this.isCodeDisabled = true
          })
        } else {
          this.cateCodeVal = ''
          this.$set(this.operationForm, 'i_ButType', '')
          this.$set(this.operationForm, 'v_CustomName', '')
          this.$set(this.operationForm, 'v_DialogCode', '')
          this.$set(this.operationForm, 'v_Func', '')
          this.$set(this.operationForm, 'v_Code', '')
          this.$set(this.operationForm, 'i_DisplayStyle', '1')
          this.$set(this.operationForm, 'i_LinkFlag', '1')
        }
        this.$nextTick(() => {
          this.oldOperationForm = Object.assign({}, this.operationForm)
        })
      },
      immediate: true,
      deep: true
    },
    ifDialog: {
      handler: function (val) {
        if (!val) {
          this.isCodeDisabled = false
          this.getEnumValue()
        }
        this.oldOperationForm = Object.assign({}, this.operationForm)
      },
      deep: true,
      immediate: true
    },
    operationForm: {
      handler: function (data) {
        if (JSON.stringify(this.oldOperationForm) !== JSON.stringify(data)) {
          this.isDot = true
          this.$emit('changeIsDotInfo', this.isDot)
        }
      },
      deep: true
    }
  },
  created () {
    let enumCode = ['operationIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    this.getTemplateCode()
  },
  methods: {
    // 获取枚举名称
    queryEnumName1 (val) {
      let params = {
        enumValue: val
      }
      cgiService.getEnumName(params).then(res => {
        if (res.code === 0) {
          this.cateCodeVal1 = res.data[0].v_EnumValueName
        }
      })
    },
    // 组件类型树点击事件
    handleClickChange1 (data, node, ev) {
      if (data.children) return
      this.operationForm.i_Cate = data.v_EnumValue
      this.cateCodeVal1 = data.v_EnumValueName
      this.cateCodeName1 = data.v_EnumValue
      this.$refs.selectTree1.blur()
      this.getComponentEvent(data.v_EnumValue)
    },
    optiosCommit () {
      this.$emit('changeData', this.operationForm)
      // 小红点功能
      this.isDot = false
      this.$emit('changeIsDotInfo', this.isDot)
    },
    // 单选按钮change事件
    getDiloag (val) {
      if (val === '2') {
        this.queryComponents()
        this.queryDialogVessel()
      }
      this.$refs.customOptios.clearValidate()
    },
    // 组件联级选择器change事件
    getComponentEvent (val) {
      this.operationForm.v_Code = ''
      if (val) {
        this.operationForm.v_CateCode = val
        this.isDisabled = false
        let params = {
          v_CateCode: val
        }
        // 获取组件配置
        cgiService.getComponentsConfig(params).then(res => {
          if (res.code === 0) {
            this.componentConfigCode = res.data
          }
        })
      }
    },
    // 获取弹框容器
    queryDialogVessel () {
      cgiService.getDialogVessel().then(res => {
        if (res.code === 0) {
          this.dialogCode = res.data
        }
      })
    },
    // 获取组件类型
    queryComponents () {
      let params = {
        enumCode: 'componentCategoryTag'
      }
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.componentCode = res.data.componentCategoryTag
          let params = {
            enumCode: 'componentCategorySon'
          }
          cgiService.getEnumValues(params).then(res => {
            if (res.code === 0) {
              this.enumSonList = res.data.componentCategorySon
              this.componentCode.forEach(item => {
                this.$set(item, 'children', [])
                this.enumSonList.some(item1 => {
                  if (item.v_EnumValueName === item1.v_ParentValue) {
                    item.children.push(item1)
                  }
                })
              })
              this.componentCode.forEach(item => {
                if (item.children.length === 0) {
                  delete item.children
                }
              })
            }
          })
        }
      })
    },
    queryInstanseComponents (val) {
      let params = {
        v_CateCode: val
      }
      // 获取组件配置
      cgiService.getComponentsConfig(params).then(res => {
        if (res.code === 0) {
          this.componentConfigCode = res.data
        }
      })
    },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            if (key === 'operationIcons') {
              // 图标
              this.optionsIcon = res.data[key]
              this.optionsIcon.unshift({ v_EnumValue: '' })
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
    },
    getTemplateCode () {
      cgiService.getTempCode().then(res => {
        if (!res.code) {
          this.templateCode = res.data
        }
      })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.operation-info {
  border: 4px solid #abd6ff;
  height: 100%;
  // padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .el-form {
    border: none !important;
    box-sizing: border-box;
    padding: 15px 15px 0px 15px !important;
    overflow: auto;
    flex: 1;
    .contentBox {
      box-sizing: border-box;
      .border-Box {
        border: 1px solid #bfbfbf;
        padding: 0 80px 16px 30px;
        position: relative;
        box-sizing: border-box;

        &:last-of-type {
          margin-top: 15px;
          margin-bottom: 10px;
        }
        > span {
          position: absolute;
          top: -10px;
          left: 10px;
          background: #ffffff;
          padding: 0 16px;
        }
        .controlLiHei {
          margin-top: 10px !important;
        }
        .el-radio {
          width: 100px;
        }
        .el-cascader {
          width: 100%;
        }
      }
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  > div.el-form-item__content
  > span {
  width: 356px;
  margin-left: 0;
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form /deep/ .el-form-item .textareaBox  .el-textarea__inner {
  height: 200px !important;
}
</style>
