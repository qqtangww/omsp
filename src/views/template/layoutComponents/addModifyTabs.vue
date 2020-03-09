<!-- 布局组件-tab布局组件-添加tab标签-基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="bodyBorderBox">
      <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar
          :configData="configData"
          :shareData="formData"
          :formRed="formRed"
          @sumitForm="commit"
          v-on="$listeners"
        ></action-bar>
      </div>
      <div class="contentBox">
        <el-form inline-message label-position="right" label-width="110px" :rules="rules" ref="ruleForm" :model="modAddData">
          <div class="border-box">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 基本信息
            </span>
            <div class="conBox">
              <el-form-item label="Tab标签编码" prop="v_TabsFlagCode" class='variate-icon'>
                <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
                  <span class="flexibleIcon">
                    <i class="iconfont icon-dongcanbiaoshi"></i>
                  </span>
                </el-tooltip>
                <el-input v-model="modAddData.v_TabsFlagCode" :disabled="isDisabled"></el-input>
              </el-form-item>
              <el-form-item label="Tab标签名称" prop="v_TabsFlagName" class='variate-icon'>
                <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
                  <span class="flexibleIcon">
                    <i class="iconfont icon-dongcanbiaoshi"></i>
                  </span>
                </el-tooltip>
                <el-input v-model="modAddData.v_TabsFlagName"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="图标"
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
                <el-col :span="12">
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
              <el-form-item label="描述" prop="v_Description">
                <el-input
                  v-model="modAddData.v_Description"
                  placeholder="请输入表关系描述"
                  type="textarea"
                  class="minInput"
                  :autosize="{ minRows: 2, maxRows: 4}"
                />
              </el-form-item>
            </div>
          </div>
          <div class="border-box">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 标签配置
            </span>
            <div class="conBox">
              <el-form-item label="组件类型" label-width="110px">
                <!-- <el-cascader
                  v-model="cateCodeVal1"
                  popper-class="filtrate"
                  placeholder="请输入搜索"
                  :options="componentCode"
                  :props="defaultProps"
                  @focus="getComponentEventmodAddData"
                  @change="changeComponentmodAddData"
                  filterable
                ></el-cascader> -->
                <el-select ref="selectTree" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree' @focus="getComponentEventmodAddData">
                    <el-option :value="cateCodeVal1" style="height: auto">
                      <el-tree :data="componentCode" default-expand-all
                        ref="tree" highlight-current :props="defaultProps"
                        @node-click="handleClickChange1"></el-tree>
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="组件实例" label-width="110px" v-if="cateCodeName1 !== 'CT'">
                <el-select
                  v-model="modAddData.v_Code "
                  :disabled="cateCodeVal1 === ''"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="(item, index) in instanceComponents"
                    :key="index"
                    :label="item.v_Name"
                    :value="item.v_Code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="内容名称" label-width="110px" v-if="cateCodeName1 === 'CT'">
                <el-input v-model="modAddData.v_CustomName"></el-input>
              </el-form-item>
              <el-form-item
                label="模板名称"
                label-width="110px"
                prop="v_TemplateCode"
                v-if="cateCodeName1 !== 'CT'"
              >
                <el-select
                  placeholder="默认"
                  v-model="modAddData.v_TemplateCode"
                  @focus="getTemplateUrl(cateCodeName1)"
                  :disabled="cateCodeVal1 === ''"
                  clearable
                >
                  <el-option
                    v-for="item in templateUrl"
                    :key="item.v_TemplateCode"
                    :label="item.v_TemplateName"
                    :value="item.v_TemplateCode"
                  >
                    <span style="float: left">{{ item.v_TemplateName }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                    >{{ item.v_TemplateCode }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="依赖首选项标签" label-width="110px" prop="v_IsDependFirst">
                <el-switch
                  v-model="modAddData.v_IsDependFirst"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
                <span class="hintInfo">开启后将根据首项标签判断是否置灰当前标签</span>
              </el-form-item>
              <el-form-item label="特殊Tab显示" label-width="110px" prop="i_IsSpecialShow">
                <el-switch
                  v-model="modAddData.i_IsSpecialShow"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
              <el-form-item label="函数体" prop="v_Func" label-width="110px" id='function-label'>
                <el-input
                  :disabled="modAddData.i_IsSpecialShow === '0'"
                  v-model="modAddData.v_Func"
                  placeholder="请输入函数体控制类名 例如:
(function(params) {
  if(判断条件) {
    return 'class'值
  }
})"
                  type="textarea"
                  class="minInput"
                  :autosize="{ minRows: 2, maxRows: 4}"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
import util from '@/common/js/util'
export default {
  name: 'addModifyTabs',
  mixins: [logMixin],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      modAddData: {
        // Tab编码
        v_TabsFlagCode: '',
        // 名称
        v_TabsFlagName: '',
        // 图标
        v_IconURL: '',
        // 图标颜色
        v_IconColor: '',
        // 描述
        v_Description: '',
        // 组件实例
        v_Code: '',
        // 特殊Tab显示
        i_IsSpecialShow: '0',
        // 依赖首选项
        v_IsDependFirst: '0',
        // 函数体
        v_Func: '',
        v_CustomName: ''
      },
      isDisabled: false,
      // 模板名称
      templateUrl: [],
      rules: {
        v_TabsFlagCode: [
          {
            required: true,
            message: '请输入Tab标签编码',
            trigger: 'blur'
          }
        ],
        v_TabsFlagName: [
          {
            required: true,
            message: '请输入Tab标签名称',
            trigger: 'blur'
          }
        ]
      },
      // 图标
      iconUrl: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      // 组件
      componentCode: [],
      enumSonList: [],
      //   组件类型的数据
      cateCodeVal1: '',
      cateCodeName1: '',
      // 组件实例
      instanceComponents: [],
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      },
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    let enumCode = ['tabIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    // 判断是否是修改数据
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      this.queryComponents()
      this.queryInstanceComponents(formData.v_CateCode)
      this.cateCodeName1 = formData.v_CateCode
      this.queryEnumName1([this.cateCodeName1])
      this.getTemplateUrl(this.cateCodeName1)
      this.oldModAddData = Object.assign({}, this.modAddData)
    }
  },
  watch: {
    // 弹框关闭 打开
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
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
      this.changeComponentmodAddData(data.v_EnumValue)
    },
    // 提交表单
    commit () {
      // 获取父组件传递过来的Tab编码
      // this.modAddData.v_RegionCode = this.configData.v_RegionCode
      let tabData = this.$store.state.fieTableData
      this.$set(this.modAddData, 'v_RegionCode', tabData.v_RegionCode)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveTabsData(this.modAddData).then(res => {
            if (res.code === 0) {
              this.formRed = false
              this.$message.success(res.msg)
              // 把提交的数据存到vx中，用于权限tab标签页 获取数据 2020/1/7 ly
              this.$store.commit('rowData', this.modAddData)
              this.$emit('changeFlag', { isDisabled: false })
              if (Number(res.iId) >= 1) {
                this.modAddData.i_Id = res.iId
              }
              this.$emit('getTableData')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 组件联级选择器change事件
    getComponentEventmodAddData () {
      this.queryComponents()
    },
    changeComponentmodAddData (val) {
      this.modAddData.v_Code = ''
      this.modAddData.v_CateCode = val
      this.queryInstanceComponents(val)
      this.getTemplateUrl(val)
    },
    // 获取组件
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
    // 获取组件实例
    queryInstanceComponents (val) {
      // 获取组件配置
      let params = {
        v_CateCode: val
      }
      cgiService.getComponentsConfig(params).then(res => {
        if (res.code === 0) {
          this.instanceComponents = res.data
        }
      })
    },
    // 获取模板路径
    getTemplateUrl (id) {
      cgiService.getTemplateUrl(id).then(res => {
        this.templateUrl = res.data
      })
    },
    // // 获取枚举内容
    // getEnumValue () {
    //   let params = {
    //     enumCode: 'tabIcons'
    //   }
    //   cgiService.getEnumValues(params).then(res => {
    //     if (res.code === 0) {
    //       this.iconUrl = res.data.tabIcons
    //     }
    //   })
    // },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          // console.log(res)
          for (let key in res.data) {
            if (key === 'tabIcons') {
              // 树形背景
              this.iconUrl = res.data[key]
              this.iconUrl.unshift({ v_EnumValue: '' })
            } else if (key === 'iconColorAll') {
              // 标题栏
              this.iconColorAll = res.data[key]
              // console.log(this.iconColorAll)
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
    // 弹框关闭回调函数
    closeDia () {
      this.isDisabled = false
      this.$emit('getButtonConfig', false)
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.contentBox {
  // height: 530px;
  height: 100%;
  padding: 0px !important;
  border: 4px solid #abd6ff;
  .el-form {
    border: none !important;
    .border-box {
      height: 100%;
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .conBox {
        margin-left: 20px;
        .el-cascader {
          width: 100%;
          margin-left: 0 !important;
        }
        .el-switch {
          width: 40px;
        }
        .hintInfo {
          margin-left: 0 !important;
        }

      }
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
  }
}
.bodyBorderBox {
  border: none !important;
}
.contentBox /deep/ .variate-icon  {
    >label {
        text-align: center;
    }
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
#function-label /deep/ .el-form-item__content  textarea {
    height: 200px !important;
}
</style>
