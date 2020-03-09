<!-- 内容组件-视图组件-视图布局 -->
<template>
  <div class="add-modify-form" id="layout-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formdata"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="modAddDatas" :rules="rules" :model="modAddData">
      <div class="layout-view">
        <div class="top-box">
          <div class="border-box">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 布局显示
            </span>
            <div class="showLay">
              <el-checkbox
                label="显示操作栏"
                name="type"
                v-model="modAddData.i_IsShowActionBar"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <el-checkbox
                label="显示列头栏"
                name="type"
                v-model="modAddData.i_IsShowColHead"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <el-checkbox
                label="显示选择栏"
                name="type"
                v-model="modAddData.i_DisplayCheckBox"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <el-checkbox
                label="显示合计栏"
                name="type"
                v-model="modAddData.i_IsShowTotalRow"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <el-checkbox
                label="显示序号栏"
                name="type"
                v-model="modAddData.i_IsShowSerialCol"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <el-checkbox
                label="操作按钮占位"
                name="type"
                v-model="modAddData.i_IsButtonSeat"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </div>
          </div>
          <div class="top-box-right">
            <div class="border-box">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 首次打开
              </span>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="缺省显示列表" label-width="100px">
                    <el-switch
                      v-model="modAddData.i_IsDisplay"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="自动刷新列表" label-width="100px">
                    <el-switch
                      v-model="modAddData.i_IsAutoRefresh"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="刷新间隔秒数" label-width="100px">
                    <el-input-number v-model="modAddData.i_RefreshRange" controls-position="right" :disabled="modAddData.i_IsAutoRefresh === '1' ? false : true"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="border-line">
              <div class="tempTitleSwi">
                <el-form-item label="显示查询栏" label-width="100px">
                  <el-switch
                    v-model="modAddData.i_IsShowEnquiryBar"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    @change="isShowSerachBar"
                  ></el-switch>
                </el-form-item>
              </div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="缺省显示查询栏" label-width="115px">
                    <el-switch
                      v-model="modAddData.i_IsEnquiryBarExpand"
                      :disabled="modAddData.i_IsShowEnquiryBar === '0' ? true : false"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="自定义查询" label-width="100px">
                    <el-switch
                      v-model="modAddData.i_IsUDEnquiryPage"
                      :disabled="modAddData.i_IsShowEnquiryBar === '0' ? true : false"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="自定义查询页面" label-width="115px">
                    <el-input
                      v-model="modAddData.v_UDEnquiryPage"
                      :disabled="modAddData.i_IsShowEnquiryBar === '0' ? true : false"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- <div class="center-box">
          <div class="border-box">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 样式
            </span>
            <div class="style-Box">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="表格" label-width="126px">
                    <el-select v-model="modAddData.v_TABLEStyle" clearable>
                      <el-option
                        v-for="(item, index) in  opetaionTable"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="表头" label-width="126px">
                    <el-select placeholder="默认" v-model="modAddData.v_TableHeader" clearable>
                      <el-option
                        v-for="(item,index) in optionsHeader"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="普通行" label-width="126px">
                    <el-select placeholder="默认" v-model="modAddData.v_TRStyle" clearable>
                      <el-option
                        v-for="(item, index) in optionsNormal"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="hover行" label-width="126px">
                    <el-select placeholder="默认" v-model="modAddData.v_TRHoverStyle" clearable>
                      <el-option
                        v-for="(item, index) in optionsHover"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="奇数行" label-width="126px">
                    <el-select placeholder="默认" v-model="modAddData.v_TROddStyle" clearable>
                      <el-option
                        v-for="(item, index) in optionsOdd"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="偶数行" label-width="126px">
                    <el-select placeholder="默认" v-model="modAddData.v_TREvenStyle" clearable>
                      <el-option
                        v-for="(item, index) in optionsEven"
                        :key="index"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="14" class="special-roow-style-box">
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="特殊行显示" label-width="84px">
                        <el-switch
                          v-model="modAddData.i_IsTRSpecial"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          active-value="1"
                          inactive-value="0"
                        ></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item label-width="90px" label="请输入函数体:"></el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label label-width="12px" id="specialText">
                    <el-input
                      class="textareaBox"
                      v-model="modAddData.v_TRSpecialRow"
                      :disabled="modAddData.i_IsTRSpecial === '0'"
                      placeholder='示例：
function trSpecialRow(rowData){
  if (rowData.YourField === Result) {
    return "CFF8282"
  }
}'
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 4}"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div> -->
        <div class="bottom-box">
          <div class="border-box">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 高级设置
            </span>
            <div class="sort-class">
              <div class="border-line">
                <div class="tempTitleSwi">
                  <el-form-item label="拖动调序" label-width="90px">
                    <el-switch
                      v-model="modAddData.i_IsShowOrderCol"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                      @change="orderColChange"
                    ></el-switch>
                  </el-form-item>
                </div>
                <el-form-item label="数据库表" label-width="100px">
                  <el-select
                    placeholder="请选择"
                    v-model="modAddData.v_OrderTableName"
                    @focus="getDatabaseTab"
                    :disabled="modAddData.i_IsShowOrderCol === '0'"
                  >
                    <el-option
                      v-for="item in databaseTab"
                      :key="item.id"
                      :value="item.v_TableName"
                      :label="item.v_TableName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="调序字段名" label-width="100px">
                  <el-input
                    v-model="modAddData.v_OrderField"
                    :disabled="modAddData.i_IsShowOrderCol === '0'"
                  ></el-input>
                </el-form-item>
                <el-form-item label="跨分类调序" label-width="100px">
                  <!-- 功能未实现，先置灰 -->
                  <el-switch
                    v-model="modAddData.i_IsCrossCategory"
                    disabled
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-form-item>
              </div>
              <div class="border-line top-52">
                <div class="tempTitleSwi">
                  <el-form-item label="树形视图懒加载" label-width="98px">
                    <el-switch
                      v-model="modAddData.i_IsLoadNode"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </div>
                <el-form-item label="懒加载接口" label-width="105px">
                  <el-input
                    v-model="modAddData.v_LoadApiUrl"
                    :disabled="modAddData.i_IsLoadNode === '0'"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="border-line special-box">
                <div class="tempTitleSwi">
                <el-form-item label="特殊行显示" label-width="90px">
                        <el-switch
                          v-model="modAddData.i_IsTRSpecial"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          active-value="1"
                          inactive-value="0"
                        ></el-switch>
                  </el-form-item>
                </div>
                <el-form-item label-width="100px" label="请输入函数体:"></el-form-item>
                <el-form-item label label-width="12px" id="specialText">
                    <el-input
                      class="textareaBox"
                      v-model="modAddData.v_TRSpecialRow"
                      :disabled="modAddData.i_IsTRSpecial === '0'"
                      placeholder='示例：
function trSpecialRow(rowData){
  if (rowData.YourField === Result) {
    return "CFF8282"
  }
}'
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 4}"
                    />
                  </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'layout_View',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      modAddData: {
        i_IsShowActionBar: '',
        i_IsShowColHead: '',
        i_DisplayCheckBox: '',
        i_IsShowTotalRow: '',
        i_IsShowSerialCol: '',
        i_IsDisplay: '0',
        i_IsAutoRefresh: '0',
        i_RefreshRange: 0,
        i_IsShowEnquiryBar: '0',
        i_IsUDEnquiryPage: '0',
        i_IsEnquiryBarExpand: '0',
        v_UDEnquiryPage: '',
        v_TABLEStyle: '',
        v_TableHeader: '',
        v_TRStyle: '',
        v_TRHoverStyle: '',
        v_TROddStyle: '',
        v_TREvenStyle: '',
        i_IsTRSpecial: '0',
        v_TRSpecialRow: '',
        v_OrderTableName: '',
        i_IsShowOrderCol: '0',
        v_OrderField: '',
        i_IsCrossCategory: '0',
        i_IsLoadNode: '0',
        v_LoadApiUrl: '',
        i_IsButtonSeat: '0'
      },
      formdata: {},
      flag: false,
      // 表头
      opetaionTable: [],
      // 表头类名
      optionsHeader: [],
      // 普通行类名
      optionsNormal: [],
      // 奇数行类名
      optionsOdd: [],
      // 偶数行类名
      optionsEven: [],
      // 特殊行类名
      optionsSpecial: [],
      // hover行类名
      optionsHover: [],
      // 表格数据
      databaseTab: [],
      // 正则校验
      rules: {},
      oldModAddData: {
        i_IsDisplay: '0',
        i_IsShowEnquiryBar: '0',
        i_IsEnquiryBarExpand: '0',
        i_IsUDEnquiryPage: '0',
        i_IsTRSpecial: '0',
        i_IsShowOrderCol: '0',
        i_IsCrossCategory: '0',
        i_IsLoadNode: '0',
        i_IsAutoRefresh: '0',
        i_RefreshRange: 0
      }
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        this.$set(this.oldModAddData, 'i_RefreshRange', Number(this.oldModAddData.i_RefreshRange))
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData,
      rowData: state => state.fieTableData,
      viewData: state => state.viewData
    })
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      let viewId = this.configData.tabConfig.regiondata[1].v_Code
      let isSort = formData.v_OrderField
      let obj = {
        viewId,
        isSort
      }
      this.$store.commit('moveSort', obj)
    } else {
      this.$store.commit('changeRowTabData', {})
      //  2020/02/14 组件预设功能已移除
      // this.getPreinstall()
    }
    let enumCode = ['viewTable', 'viewHeader', 'commonRow', 'oddRow', 'evenRow', 'hoverRow']
    this.queryEnumValue({ enumCode })
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    orderColChange (val) {
      let viewId = this.configData.tabConfig.regiondata[1].v_Code
      if (val === '1') {
        // 获取 设置排序字段的视图ID
        // 获取 设置排序字段 视图列表
        let tableData = this.viewData[viewId].tableData
        // 遍历数据  是否存在开启排序字段
        let flag = tableData.some(item => {
          if (item.i_IsSort === '1') return true
        })
        // 提示 开启排序字段
        if (flag) {
          this.$message.warning('当前已有排序字段  开启调序后排序将失效')
        }
      }
      let isSort = val
      let obj = {
        viewId,
        isSort
      }
      this.$store.commit('moveSort', obj)
    },
    commit () {
      // 合并必填项字段 取出VUEX Tab的必填项字段
      Object.assign(this.modAddData, this.tabData['regin1'])
      this.$refs.modAddDatas.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }

          cgiService.saveViewData(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              let resObj = {
                ...res
              }
              this.$set(resObj, 'v_ViewID', res.viewid)
              this.$set(resObj, 'viewName', this.modAddData.v_ViewName)
              this.$store.commit('rowData', resObj)
              // 拉取默认分页配置 paginations
              let pageConfig = this.$store.state.paginations
              this.$emit('getTableData', pageConfig['CC_VW_contentView'])
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    isShowSerachBar () {},
    // 拉取数据库表
    getDatabaseTab () {
      cgiService.getTemDatabaseTab(this.shareData.v_ViewID).then(res => {
        if (res) {
          this.databaseTab = res.data
        }
      })
    },
    // 获取模板预设值   2020/02/14 组件预设功能已移除
    // getPreinstall () {
    //   let id = 'CC_VW'
    //   cgiService.getTemplatePreinstall(id).then(res => {
    //     if (res.data.info !== '') {
    //       Object.assign(this.modAddData, JSON.parse(res.data.info))
    //       this.oldModAddData = Object.assign({}, this.modAddData)
    //     }
    //   })
    // },
    // 获取枚举值
    queryEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            if (key === 'viewHeader') {
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
  mounted () {},
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form  {
  .border-box {
    border: 1px solid #bfbfbf;
    position: relative;
    padding: 10px  0;
    > span {
      position: absolute;
      top: -10px;
      left: 15px;
      background: #ffffff;
      padding: 0 4px;
    }
  }
  .border-line {
    border: 1px solid #bfbfbf;
    position: relative;
    .tempTitleSwi {
      width: 134px;
      position: absolute;
      top: -17px;
      left: 15px;
      background: #ffffff;
      z-index: 1;
      .el-form-item {
        margin: 0 !important;
      }
    }
  }
  .el-form {
    box-sizing: border-box;
    padding: 24px 34px;
    width: 100%;
    margin: auto;
    border: none !important;
    .layout-view {
      width: 790px;
      margin: auto;
      .top-box {
        display: flex;
        .showLay {
          display: flex;
          flex-direction: column;
          padding: 20px 84px 0px 84px;
          box-sizing: border-box;
          .el-checkbox {
            margin: 0;
            padding: 4px 0;
          }
        }
        .top-box-right {
          flex: 1;
          margin-left: 16px;
          display: flex;
          flex-direction: column;
          .border-box {
            padding: 20px 20px 20px 14px;
          }
          .border-line {
            margin-top: 20px;
            padding: 22px 50px 22px 0px;
            // height: 80px;
          }
        }
      }
      .center-box {
        margin-top: 15px;
        .special-roow-style-box {
          padding: 0px 20px 0px 37px;
        }
      }
      .bottom-box {
        margin-top: 15px;
        .sort-class {
          display: flex;
          padding: 20px 16px 10px 16px;
          flex-wrap: wrap;
          justify-content: space-between;
          .border-line {
            padding: 20px 59px 10px 5px;
          }
          .top-52 {
            padding-top: 52px;
          }
          .special-box {
            width: 100%;
            margin-top: 15px;
            padding: 10px 20px;
          }
        }
      }
    }
  }
}
.formBox
  .el-dialog
  .add-modify-form
  .el-form
  /deep/
  .el-form-item
  .textareaBox
  .el-textarea__inner {
  height: 140px !important;
}
.tempTitleSwi /deep/.el-switch {
  width: 85% !important;
}
/deep/ .el-switch {
  width: 40px;
}
#layout-form .tempTitleSwi /deep/ .el-form-item{
  margin: 0 !important;
}
#specialText /deep/ .el-textarea__inner{
  height: 200px!important;
}
// #lazy-box {
//   position: relative;
//   #lazy-item {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//   }
// }
.bottom-box .sort-class /deep/ .el-input__inner {
  height: 30px !important;
}
</style>
