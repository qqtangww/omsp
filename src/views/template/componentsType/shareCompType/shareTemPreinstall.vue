<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar
          :configData='configData'
          :shareData='formData'
          @sumitForm='commit'
          v-on="$listeners"
        ></action-bar>
      </div>
    <div class="content">
      <el-form
        ref="ruleForm"
        :model="modAddData"
        inline-message
        :rules="rules"
        label-width="120px"
      >
        <div class="layoutRegionalBox">
          <div class="configTitle">
            <span><i class="iconfont  icon-jibenxinxi"></i>布局显示</span>
            <div class="treeDataShow">
              <ul class="chekedBox">
                <li>
                  <el-checkbox
                    v-model="modAddData.i_Isshowactionbar"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '0'"
                  >显示操作栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowActionBar"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '0'"
                  >显示列头栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowColHead"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '0'"
                  >显示合计行</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowSerialCol"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '0'"
                  >显示序号栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_DisplayCheckBox"
                    true-label="1"
                    false-label="0"
                      v-if="isTree === '0'"
                  >显示选择栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowSelectBar"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '1'"
                  >显示选择栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowSearchBar"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '1'"
                  >显示搜索栏</el-checkbox>
                </li>
                <li>
                  <el-checkbox
                    v-model="modAddData.i_IsShowTitleBar"
                    true-label="1"
                    false-label="0"
                    v-if="isTree === '1'"
                  >显示标题栏</el-checkbox>
                </li>
              </ul>
            </div>
          </div>
          <div class="configTitle">
            <span><i class="iconfont  icon-jibenxinxi"></i>样式</span>
            <div class="treeDataShow">
              <template  v-if="isTree === '1'">
              <el-form-item
                label="背景"
                prop="v_TRBGColor">
                <el-select v-model="modAddData.v_TRBGColor"  clearable>
                  <el-option
                    v-for="(item,index) in backgroundColor"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="标题栏"
                prop="v_TitleStyle">
                <el-select v-model="modAddData.v_TitleStyle"  clearable>
                  <el-option
                    v-for="(item,index) in titleColor"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="hover"
                prop="v_TRHoverStyle">
                <el-select v-model="modAddData.v_TRHoverStyle"  clearable>
                  <el-option
                    v-for="(item,index) in hoverColor"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="选中行"
                prop="v_CheckedStyle">
                <el-select v-model="modAddData.v_CheckedStyle"  clearable>
                  <el-option
                    v-for="(item,index) in selectColor"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="未展开节点样式"
                prop="v_SetNoExpandNode">
                <el-select v-model="modAddData.v_SetNoExpandNode" disabled clearable>
                  <el-option
                    v-for="item in defaultRegion"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"

                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="已展开节点样式"
                prop="v_SetExpandNode">
                <el-select v-model="modAddData.v_SetExpandNode" disabled clearable>
                  <el-option
                    v-for="item in defaultRegion"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"

                  >
                  </el-option>
                </el-select>
              </el-form-item>
              </template>
              <template v-if="isTree === '0'">
              <el-form-item
                label="表格"
                prop="v_TABLEStyle">
                <el-select v-model="modAddData.v_TABLEStyle"  clearable>
                  <el-option
                   v-for="(item,index) in opetaionTable"
                   :key="index"
                   :label='item.v_EnumValueName'
                   :value='item.v_EnumValue'
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="表头"
                prop="v_TableHeader">
                <el-select v-model="modAddData.v_TableHeader"  clearable>
                  <el-option
                    v-for="(item,index) in optionsHeader"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="hover"
                prop="v_TRHoverStyle">
                <el-select v-model="modAddData.v_TRHoverStyle"  clearable>
                  <el-option
                    v-for="(item,index) in optionsHover"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="普通行"
                prop="v_TRStyle">
                <el-select v-model="modAddData.v_TRStyle"  clearable>
                  <el-option
                    v-for="(item,index) in optionsNormal"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="奇数交替行"
                prop="v_TROddStyle">
                <el-select v-model="modAddData.v_TROddStyle"  clearable>
                  <el-option
                    v-for="(item,index) in optionsOdd"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="偶数交替行"
                prop="v_TREvenStyle">
                <el-select v-model="modAddData.v_TREvenStyle"  clearable>
                  <el-option
                    v-for="(item,index) in optionsEven"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              </template>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import actionBar from '@/components/stdDialog/actionBar'
import { mapState } from 'vuex'
export default {
  name: 'shareTemPreinstall',
  props: {
    configData: Object,
    shareData: Object,
    formData: Object
  },
  mixins: [windowRed],
  data () {
    return {
      // 表单数据
      modAddData: {
        // 显示标题栏
        i_IsShowSelectBar: '',
        // 显示搜索栏
        i_IsShowSearchBar: '',
        // 显示标题栏操作
        i_IsShowTitleBar: '',
        // 背景
        v_TRBGColor: '',
        // 显示标题
        v_TitleStyle: '',
        // hover行
        v_TRHoverStyle: '',
        // 选中行
        v_CheckedStyle: '',
        // 未展开节点
        v_SetNoExpandNode: '',
        // 已展开节点
        v_SetExpandNode: ''
      },
      isTree: '',
      // 背景颜色的数据
      backgroundColor: [],
      // 标题栏颜色
      titleColor: [],
      // hover行样式
      hoverColor: [],
      // 选中行样式
      selectColor: [],
      // 表头类名
      optionsHeader: [],
      // hover行类名
      optionsHover: [],
      // 普通行类名
      optionsNormal: [],
      // 奇数行类名
      optionsOdd: [],
      // 偶数行类名
      optionsEven: [],
      // 表格
      opetaionTable: [],
      defaultRegion: [],
      rules: {},
      oldModAddData: {},
      viewId: ''
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
    },
    rowData: {
      immediate: true,
      handler (nv) {
        if (nv.hasOwnProperty('v_CateCode')) {
          if (nv.v_CateCode === 'CC_VW') {
            this.isTree = '0'
            let enumCode = ['viewTable', 'viewHeader', 'commonRow', 'oddRow', 'evenRow', 'hoverRow']
            this.queryEnumValue({ enumCode })
          } else if (nv.v_CateCode === 'CC_TR') {
            this.isTree = '1'
            let enumCode = ['backgroundStyle', 'titleStyle', 'hoverRowStyle', 'checkedRowStyle']
            this.queryEnumValue({ enumCode })
          }
        }
        if (nv.hasOwnProperty('dataReady') && nv.dataReady) {
          this.viewId = nv.viewid
          if (nv.v_PresetConfig !== '') {
            // 组件预设 数据
            this.modAddData = {
              ...JSON.parse(nv.v_PresetConfig)
            }
            this.modAddData.i_Id = nv.i_Id
          }
          // 给oldModAddData赋值
          this.oldModAddData = Object.assign({}, this.modAddData)
        }
      }
    }
  },
  computed: {
    ...mapState({
      rowData: state => state.fieTableData
    })
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            v_CateCode: this.rowData.v_CateCode,
            v_CateName: this.rowData.v_CateName,
            v_ComponentRoute: this.rowData.v_ComponentRoute,
            i_Id: this.rowData.i_Id
          }
          params.v_PresetConfig = JSON.stringify(this.modAddData)
          cgiService.modifyCopmTypeForm(params).then(res => {
            if (res.code === 0) {
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              this.$message.success(res.msg)
              // 给oldModAddData赋值并且给isReminder赋值true
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取枚举值
    queryEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            if (key === 'backgroundStyle') {
              // 树形背景
              this.backgroundColor = res.data[key]
            } else if (key === 'titleStyle') {
              // 标题栏
              this.titleColor = res.data[key]
            } else if (key === 'hoverRowStyle') {
              // Hover行
              this.hoverColor = res.data[key]
            } else if (key === 'checkedRowStyle') {
              // 选择行
              this.selectColor = res.data[key]
            } else if (key === 'viewHeader') {
              // 表头
              this.optionsHeader = res.data[key]
            } else if (key === 'viewTable') {
              // 表格
              this.opetaionTable = res.data[key]
            } else if (key === 'commonRow') {
              // 普通行
              this.optionsNormal = res.data[key]
            } else if (key === 'oddRow') {
              // 奇数行
              this.optionsOdd = res.data[key]
            } else if (key === 'evenRow') {
              // 偶数行
              this.optionsEven = res.data[key]
            } else if (key === 'hoverRow') {
              // 视图Hover行
              this.optionsHover = res.data[key]
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
.content {
  height: 320px;
  // border: solid 5px #abd6ff;
  overflow: auto;
  .el-form {
    border: none !important;
     padding: 0 15px !important;
     width: 620px;
     margin: auto;
    .configTitle {
      position: relative;
      width: 100%;
      border: 1px solid #bfbfbf;
      margin-top: 10px;
      padding: 0 30px 20px 10px;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: -9px;
        left: 10px;
        background: #ffffff;
        padding: 0 5px;
      }
    }
    .layoutInfoBox {
      width: 100%;
      .imgeLayout {
        padding: 16px 98px;
      }
      .imgeTitle {
        padding: 0 0 0 156px;
      }
    }
    .layoutRegionalBox {
      display: flex;
      .configTitle {
        width: 69%;
        &:first-of-type {
          margin-right: 16px;
          width: 30%;
        }
      }
      .treeDataShow {
        .chekedBox {
          list-style: none;
          padding: 0 30px;
          > li {
            margin: 0;
            line-height: 30px;
          }
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
  div.el-input-number.is-controls-right {
  width: 85px;
  line-height: 30px;
}
</style>
