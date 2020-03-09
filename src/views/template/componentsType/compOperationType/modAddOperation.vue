
<template>
<!-- 组件预设下的添加修改系统操作表单 -->
  <el-dialog
    width="650px"
    :title="title"
    class="formBox"
    custom-class='bodyFieldSet'
    :close-on-click-modal='false'
    :before-close="handleClose"
    v-dialogDrag
    top="10vh"
    append-to-body
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
  >
    <div class="bodyBorderBox">
      <div class="mod-add-operation">
        <div class="formOperateBox">
          <el-button
            type="text"
            @click="handleClose"
          >
            <i class="iconfont icon-tuichu"></i> 关闭
          </el-button>
          <el-badge
            :is-dot='isReminder'
            :class="'dot-' + pointData"
          >
            <el-button
              type="text"
              @click="commit"
            >
              <i class="iconfont icon-baocun"></i>保存
            </el-button>
          </el-badge>
        </div>
        <div class="contentBox">
          <el-form
            label-position="right"
            label-width="110px"
            :rules="rules"
            inline-message
            ref="ruleForm"
            :model="modAddData"
          >
            <div class="border-box">
              <span> <i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
              <div class="info-box">
                <el-form-item
                  label="操作代码"
                  prop="v_OperationCode"
                >
                  <el-input v-model="modAddData.v_OperationCode"></el-input>
                </el-form-item>
                <el-form-item
                  label="操作名称"
                  prop="v_OperationName"
                >
                  <el-input v-model="modAddData.v_OperationName"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="13">
                    <el-form-item
                      label="图标"
                      prop="v_IconURL"
                      id="icon-preview-box"
                    >
                      <el-row>
                        <el-col :span="24">
                          <el-select placeholder="默认" v-model="modAddData.v_IconURL">
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
                            <i :class="modAddData.v_IconURL" :style="`color:${modAddData.v_IconColor}`" />
                          </div>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :push="1">
                    <el-form-item
                      label="图标颜色"
                      prop="v_IconColor"
                      id="icon-preview-box"
                      label-width="106px"
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
               <el-form-item
                  label="显示样式"
                  props='i_DisplayStyle'
                >
                  <el-radio-group v-model="modAddData.i_DisplayStyle">
                    <el-radio label="1">图标与文字</el-radio>
                    <el-radio label="2"> 仅图标</el-radio>
                    <el-radio label="3">仅文字</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="border-box">
              <span> <i class="iconfont icon-jibenxinxi"></i> 操作设置</span>
              <div class="operation-box">
                <el-row>
                  <el-col :span="14">
                    <el-form-item
                      label="记录日志"
                      class="controlLiHei"
                      prop="i_IsRecordLog"
                    >
                      <el-switch
                        v-model="modAddData.i_IsRecordLog"
                        disabled
                        active-value="1"
                        inactive-value="0"
                      ></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label="隐藏"
                      class="controlLiHei"
                      prop="i_isHidden"
                      label-width="106px"
                    >
                      <el-switch
                        v-model="modAddData.i_isHidden"
                        active-value="1"
                        inactive-value="0"
                      ></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item
                  label="执行方式"
                  prop="i_LinkFlag"
                >
                  <el-radio-group v-model="modAddData.i_LinkFlag">
                    <el-radio label="1">函数</el-radio>
                    <el-radio label="2">弹框</el-radio>
                    <el-radio label="0">页面链接</el-radio>
                  </el-radio-group>
                </el-form-item>
                <template>
                  <div v-show="modAddData.i_LinkFlag === '1'">
                    <el-form-item
                      label="函数名"
                      prop="v_Func">
                      <el-input v-model="modAddData.v_Func"></el-input>
                    </el-form-item>
                    </div>
                </template>
              <template>
                <div v-show="modAddData.i_LinkFlag === '2'">
                <el-form-item
                      label="弹框容器"
                      prop="v_DialogCode">
                      <el-select v-model="modAddData.v_DialogCode" filterable placeholder="请选择">
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
                    <el-select ref="selectTree" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree'>
                      <el-option :value="cateCodeVal1" style="height: auto">
                        <el-tree :data="componentCode" default-expand-all
                          ref="tree" highlight-current :props="defaultProps"
                          @node-click="handleClickChange1"></el-tree>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                        label="组件实例"
                        v-if="cateCodeName1 !== 'CT'"
                        prop="v_Code">
                        <el-select v-model="modAddData.v_PreCode" filterable placeholder="请选择">
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
                        label="自定内容名称"
                        prop="v_CustomName"
                        v-if="cateCodeName1 === 'CT'"
                        >
                        <el-input v-model="modAddData.v_CustomName"></el-input>
                  </el-form-item>
                  </div>
             </template>
             <template>
               <div v-show="modAddData.i_LinkFlag === '0' ">
                <el-form-item
                    label="页面链接"
                    class="controlLiHei"
                    prop="v_LinkPage"
                  >
                    <el-input v-model="modAddData.v_LinkPage"></el-input>
                  </el-form-item>
                </div>
             </template>
              <el-form-item
                      label="显示隐藏开关"
                      prop="v_SpecialDisplayFunc"
                      class='description-label'>
                      <el-input
                        class='textareaBox'
                        v-model="modAddData.v_SpecialDisplayFunc"
                        placeholder="请输入函数体控制该按钮的显示和隐藏 例如:
(function(params) {
  if(判断条件) {
    return Boolean值
  }
})"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                      />
              </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
import { mapState } from 'vuex'
export default {
  props: {
    ifDialog: Boolean,
    dialogTitle: String,
    sysData: Object
  },
  data () {
    return {
      modAddData: {
        // 操作代码
        v_OperationCode: '',
        // 操作名称
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
        // 隐藏
        i_isHidden: '0',
        // 记录日志
        i_IsRecordLog: '0',
        // 类型
        i_Type: '',
        // 特殊显示
        v_SpecialDisplayFunc: '',
        v_DialogCode: '',
        v_PreCateCode: '',
        v_PreCode: '',
        i_PreCate: '',
        v_CustomName: '',
        v_LinkPage: ''
      },
      dialogVisible: false,
      // 标题
      title: '',
      // 效应提示信息
      rules: {
        v_OperationCode: [
          {
            required: true,
            message: '请输入操作代码',
            trigger: 'blur'
          }
        ],
        v_OperationName: [
          {
            required: true,
            message: '请输入操作名称',
            trigger: 'blur'
          }
        ]
      },
      //  添加操作图标
      optionsIcon: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      dialogCode: [],
      componentCode: [],
      cateCodeVal1: '',
      cateCodeName1: '',
      componentConfigCode: [],
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      },
      isReminder: false
    }
  },
  watch: {
    // 弹框的显示/隐藏
    ifDialog: {
      handler: function (val) {
        this.dialogVisible = val
        this.oldModAddData = Object.assign({}, this.modAddData)
      },
      immediate: true
    },
    // 弹框标题
    dialogTitle: {
      handler: function (str) {
        this.title = str
      },
      immediate: true
    },
    // 系统按钮数据
    sysData: {
      handler: function (data) {
        this.$nextTick(() => {
          // 判断操作时 修改 或 添加操作  添加 不需要进行赋值
          if (JSON.stringify(data) !== '{}') {
            util.initFormData(this.modAddData, data)
            this.modAddData.i_Id = data.i_Id

            this.cateCodeName1 = data.v_PreCateCode
            if (this.cateCodeName1) {
              this.queryEnumName1([this.cateCodeName1])
            }
            this.queryDialogVessel()
            this.queryInstanseComponents({ v_CateCode: this.cateCodeName1 })
            this.oldModAddData = Object.assign({}, this.modAddData)
          }
        })
      },
      deep: true,
      immediate: true
    },
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = true
        }
      },
      deep: true
    }
  },
  created () {
    let enumCode = ['operationIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    this.queryDialogVessel()
    this.queryComponents()
  },
  computed: {
    ...mapState({
      // 小红点颜色（参数）
      pointData: state => state.parameter.windowRed.v_ParamValue
    })
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
      this.cateCodeVal1 = data.v_EnumValueName
      this.cateCodeName1 = data.v_EnumValue
      this.$refs.selectTree.blur()
      this.getComponentEvent(data.v_EnumValue)
    },
    // 保存
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('dialogData', this.modAddData)
          this.isReminder = false
          this.oldModAddData = Object.assign({}, this.modAddData)
        }
      })
    },
    // 弹框关闭回调函数
    handleClose (done) {
      if (this.isReminder === true) {
        this.$confirm('数据已修改，确定返回保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          showClose: false,
          closeOnClickModal: false
        }).catch(() => {
          // 如果 关闭弹框 则手动清空操作的id
          this.modAddData.i_Id = ''
          this.modAddData.i_Type = ''
          this.modAddData.v_OperationId = ''
          this.$refs.ruleForm.resetFields()
          this.$emit('changDialog', false)
          this.isReminder = false
        })
      } else {
        this.modAddData.i_Id = ''
        this.modAddData.i_Type = ''
        this.modAddData.v_OperationId = ''
        this.$refs.ruleForm.resetFields()
        this.$emit('changDialog', false)
        this.isReminder = false
      }
    },
    // 组件联级选择器change事件
    getComponentEvent (val) {
      this.modAddData.v_PreCode = ''
      this.modAddData.v_PreCateCode = val
      this.isDisabled = false
      let params = {
        v_CateCode: val
      }
      // 获取组件实例
      this.queryInstanseComponents(params)
    },
    queryInstanseComponents (params) {
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
          // console.log(res)
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
    }
  }

}
</script>
<style lang="scss" scoped>
.mod-add-operation {
  .contentBox {
    padding: 0;
  }
  .el-form {
    padding: 16px;
    box-sizing: border-box;
    height: 500px;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 80px 16px 0;
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
    // .conBox {
    //   box-sizing: border-box;
    //   padding: 16px 0;
    // }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .mod-add-operation
  /deep/
  .textareaBox
  .el-textarea__inner {
  height: 200px !important;
}

.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}

.mod-add-operation /deep/ .el-radio {
  width: 95px
}
</style>
