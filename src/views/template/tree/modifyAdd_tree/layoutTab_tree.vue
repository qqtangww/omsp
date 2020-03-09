<!-- 内容组件-树形组件-树形布局 -->
<template>
  <div class="layout-tab-tree">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="ruleForm" :model="modAddData">
      <div class="leftBox">
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 布局显示
          </span>
          <div class="showLay">
            <el-row class="p-l-10">
              <el-col :span="12">
                <el-checkbox
                  label="显示标题栏"
                  name="type"
                  v-model="modAddData.i_IsShowTitleBar"
                  true-label="1"
                  false-label="0"
                ></el-checkbox>
              </el-col>
              <el-col :span="12">
                <el-checkbox
                  label="显示搜索栏"
                  name="type"
                  v-model="modAddData.i_IsShowSearchBar"
                  true-label="1"
                  false-label="0"
                ></el-checkbox>
              </el-col>
            </el-row>
            <el-row class="p-l-10">
              <el-col :span="12">
                <el-checkbox
                  label="显示选择栏"
                  name="type"
                  v-model="modAddData.i_IsShowSelectBar"
                  true-label="1"
                  false-label="0"
                ></el-checkbox>
              </el-col>
              <el-col :span="12">
                <el-checkbox
                  label="显示虚拟根节点"
                  name="type"
                  v-model="modAddData.i_IsRootNode"
                  true-label="1"
                  false-label="0"
                ></el-checkbox>
              </el-col>
            </el-row>
            <el-row class="p-l-10">
              <el-col :span="12">
                <el-checkbox
                  label="显示节点数字"
                  name="type"
                  v-model="modAddData.i_IsShowNodeNum"
                  true-label="1"
                  false-label="0"
                ></el-checkbox>
              </el-col>
              <el-col :span="12">
                <el-checkbox
                  label="缺省选中首行"
                  name="type"
                  v-model="modAddData.i_IsExpandCheckFirstLine"
                  true-label="1"
                  false-label="0"
                 @change="querySwicth"
                ></el-checkbox>
              </el-col>
            </el-row>
            <el-form-item label="标题文字" label-width="80px">
              <el-input v-model="modAddData.v_TitleFont"></el-input>
            </el-form-item>
            <el-form-item label="根节点名称" label-width="80px">
              <el-input v-model="modAddData.v_RootNodeName"></el-input>
            </el-form-item>
            <el-form-item label="根节点图标" label-width="80px" id="icon-preview-box">
              <el-select v-model="modAddData.v_RootNodeIcon">
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
                <i :class="modAddData.v_RootNodeIcon" :style="`color:${modAddData.v_RootNodeIconColor}`"/>
              </div>
            </el-form-item>
            <el-form-item
              label="图标颜色"
              prop="v_RootNodeIconColor"
              id="icon-preview-box"
              label-width="80px"
            >
                  <el-select placeholder="默认" v-model="modAddData.v_RootNodeIconColor">
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
                    <div v-if="modAddData.v_RootNodeIconColor" id="icon-color-box" :style="`background-color:${modAddData.v_RootNodeIconColor}`"></div>
                  </div>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 打开时
          </span>
          <div class="defaultRow">
            <el-form-item label="缺省选中首行" label-width="100px">
              <el-switch
                v-model="modAddData.i_IsExpandCheckFirstLine"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
                @change="querySwicth"
              ></el-switch>
            </el-form-item>

            <el-form-item label="标题文字" label-width="100px">
              <el-input v-model="modAddData.v_TitleFont"></el-input>
            </el-form-item>
          </div>
        </div> -->
        <!-- <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 样式
          </span>
          <div class="treeStyle">
            <el-form-item label="背景" label-width="100px">
              <el-select v-model="modAddData.v_TRBGColor" clearable>
                <el-option
                  v-for="(item,index) in backgroundColor"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题栏" label-width="100px">
              <el-select v-model="modAddData.v_TitleStyle" clearable>
                <el-option
                  v-for="(item,index) in titleColor"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="hover" label-width="100px">
              <el-select v-model="modAddData.v_TRHoverStyle" clearable>
                <el-option
                  v-for="(item,index) in hoverColor"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选中行" label-width="100px">
              <el-select v-model="modAddData.v_CheckedStyle" clearable>
                <el-option
                  v-for="(item,index) in selectColor"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点文字样式" label-width="100px">
              <el-select v-model="modAddData.v_NodeTextStyle" clearable>
                <el-option
                  v-for="(item,index) in treeNodeTextStyle"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点数字样式" label-width="100px">
              <el-select v-model="modAddData.v_NodeNumStyle" clearable>
                <el-option
                  v-for="(item,index) in treeNodeCountStyle"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="未展开节点" label-width="100px">
              <el-select v-model="modAddData.v_SetNoExpandNode" disabled>
                <el-option
                  v-for="item in optionsOdd"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="已展开节点" label-width="100px">
              <el-select v-model="modAddData.v_SetExpandNode" disabled>
                <el-option
                  v-for="item in optionsEven"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div> -->
      </div>
      <div class="rightBox">
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 树形数据显示
          </span>
          <div class="treeDataShow">
            <el-form-item label="父字段" label-width="100px">
              <el-select v-model="modAddData.v_ParentField" filterable @focus="getTreeShowData">
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="子字段" label-width="100px">
              <el-select v-model="modAddData.v_SonField" filterable @focus="getTreeShowData">
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示字段" label-width="100px">
              <el-select v-model="modAddData.v_ShowField " @focus="getTreeShowData" clearable>
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数字字段" label-width="100px">
              <el-select v-model="modAddData.v_ShowNumField " @focus="getTreeShowData" clearable>
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="PathCode" label-width="100px" @focus="getTreeShowData">
              <el-select v-model="modAddData.v_PathCodeField" @focus="getTreeShowData" clearable>
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序字段" label-width="100px">
              <el-select v-model="modAddData.v_SortField" @focus="getTreeShowData" clearable>
                <el-option
                  v-for="item in treeFileds"
                  :key="item.v_ColName"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="bottomBox">
                <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 节点配置
          </span>
          <div class="nodeConfig">
            <el-row>
              <el-col :span="12">
                 <el-form-item label="节点设置依据" label-width="120px" prop="i_NodeSetType">
                  <el-radio-group v-model="modAddData.i_NodeSetType">
                    <el-radio label="2">类型</el-radio>
                    <el-radio label="1">层级</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="节点类型字段" label-width="158px">
                      <el-select
                        placeholder="默认"
                        v-model="modAddData.v_NodeTypeField"
                        :disabled="modAddData.i_NodeSetType === '1'"
                        @focus="getTreeShowData"
                      >
                        <el-option
                          v-for="item in treeFileds"
                          :key="item.v_ColName"
                          :label="item.v_ColName"
                          :value="item.v_ColName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="节点显示限制" label-width="120px">
                  <el-switch
                    v-model="modAddData.i_IsNodeShowLimit"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    @change="querySwicth"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="限制至层级" label-width="158px">
                  <el-input-number
                    v-model="modAddData.v_LimitLevel"
                    controls-position="right"
                    :min="0"
                    :disabled="modAddData.i_IsNodeShowLimit === '1' ? false:true"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="懒加载子节点" label-width="120px" prop="i_IsLoadNode">
                  <el-switch
                    v-model="modAddData.i_IsLoadNode"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    @change="querySwicth"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="懒加载层级" label-width="158px" prop="i_LoadLimitNode">
                  <el-input-number
                    v-model="modAddData.i_LoadLimitNode"
                    controls-position="right"
                    :min="0"
                    :disabled="modAddData.i_IsLoadNode === '1' ? false:true"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="手风琴模式" label-width="120px">
                    <el-switch
                      v-model="modAddData.i_IsAccordionMode"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                      @change="querySwicth"
                    ></el-switch>
                    <span class="hintInfo">每次点击仅展开一项同级节点</span>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="缺省展开至层级" label-width="158px">
                      <el-input-number
                        disabled
                        v-model="modAddData.v_DefaultExpandLevel"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="拖动调序" label-width="120px">
                    <el-switch
                      v-model="modAddData.i_IsDropSort"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                      @change="querySwicth"
                    ></el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
               <el-form-item label="调序接口" label-width="158px">
                  <el-input
                    v-model="modAddData.v_SortInterface"
                    :disabled="modAddData.i_IsDropSort === '0' ? true : false"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'layoutTab_tree',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      modAddData: {
        // 是否根节点
        i_IsRootNode: '',
        // 根节点图标
        v_RootNodeIcon: '',
        // 根节点图标颜色
        v_RootNodeIconColor: '',
        // 根节点名称
        v_RootNodeName: '',
        // 显示标题栏
        i_IsShowTitleBar: '',
        // 显示搜索栏
        i_IsShowSearchBar: '',
        // 显示选择栏
        i_IsShowSelectBar: '',
        // 缺省选中首行
        i_IsExpandCheckFirstLine: '0',
        // 标题文字
        v_TitleFont: '',
        // 背景
        v_TRBGColor: '',
        // hover行
        v_TRHoverStyle: '',
        // 标题栏
        v_TitleStyle: '',
        // 选中行
        v_CheckedStyle: '',
        // 未展开节点
        v_SetNoExpandNode: '',
        // 已展开节点
        v_SetExpandNode: '',
        // 父字段
        v_ParentField: '',
        // 子字段
        v_SonField: '',
        // 显示字段
        v_ShowField: '',
        // pathcode
        v_PathCodeField: '',
        // 排序字段
        v_SortField: '',
        // 节点设置依据
        i_NodeSetType: '1',
        // 节点类型字段
        v_NodeTypeField: '',
        // 节点显示限制
        i_IsNodeShowLimit: '0',
        // 节点显示限制层级
        v_LimitLevel: 0,
        // 缺省展开至层级
        v_DefaultExpandLevel: 0,
        // 手风琴模式
        i_IsAccordionMode: '0',
        // 拖动调序
        i_IsDropSort: '0',
        // 调序接口
        v_SortInterface: '',
        // 懒加载子节点
        i_IsLoadNode: '0',
        // 懒加载层级
        i_LoadLimitNode: 0,
        // 数字字段
        v_ShowNumField: '',
        // 显示节点数字
        i_IsShowNodeNum: '',
        // 节点文字样式
        v_NodeTextStyle: '',
        // 节点数字样式
        v_NodeNumStyle: ''
      },
      optionsNormal: [],
      iconUrl: [],
      optionsOdd: [],
      optionsEven: [],
      treeFileds: [],
      // 背景颜色的数据
      backgroundColor: [],
      // 标题栏颜色
      titleColor: [],
      // hover行样式
      hoverColor: [],
      // 选中行样式
      selectColor: [],
      // 定义小红点 存储数据的对象
      oldModAddData: {},
      rowTabData: {},
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      treeNodeCountStyle: [],
      treeNodeTextStyle: []
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        this.$set(
          this.oldModAddData,
          'i_LoadLimitNode',
          Number(this.oldModAddData.i_LoadLimitNode)
        )
        this.$set(
          this.oldModAddData,
          'v_DefaultExpandLevel',
          Number(this.oldModAddData.v_DefaultExpandLevel)
        )
        this.$set(
          this.oldModAddData,
          'v_LimitLevel',
          Number(this.oldModAddData.v_LimitLevel)
        )
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
      this.isDisabled = true
      let formData = this.$store.state.fieTableData

      util.initFormData(this.modAddData, formData)
    } else {
      this.$store.commit('changeRowTabData', {})
      // 2020/02/14 组件预设功能已移除
      // this.getPreinstall()
    }
    // 获取枚举值
    let enumCode = ['backgroundStyle', 'titleStyle', 'hoverRowStyle', 'checkedRowStyle']
    this.queryEnumValue({ enumCode })
    this.oldModAddData = Object.assign({}, this.modAddData)
    // 获取枚举
    this.getEnumValue({ enumCode: ['nodeIcons', 'iconColorAll', 'treeNodeCountStyle', 'treeNodeTextStyle'] })
  },
  methods: {
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            switch (key) {
              case 'nodeIcons':
                // 根节点图标
                this.iconUrl = res.data[key]
                break
              case 'iconColorAll':
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
                break
              case 'treeNodeCountStyle':
                // 树节点数字样式
                this.treeNodeCountStyle = res.data[key]
                break
              case 'treeNodeTextStyle':
                // 树节点文字样式
                this.treeNodeTextStyle = res.data[key]
                break

              default:
                break
            }
          }
        }
      })
    },
    commit () {
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      Object.assign(this.modAddData, this.tabData['regin1'])
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveTree(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
              }
              let param = this.$store.state.paginations
              this.$emit('getTableData', param['CC_VW_instanceTree'])
              let nestObj = Object.assign({}, this.modAddData)
              this.$set(nestObj, 'viewid', 'CC_VW_instanceTree')
              this.$store.commit('nestTableRowData', nestObj)
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
    // 获取树形显示字段
    getTreeShowData () {
      cgiService.getTreeColums(this.shareData.v_TreeCode).then(res => {
        this.treeFileds = res.data
      })
    },
    getDatabaseTab () {},
    // 视图布局中的显示查询栏
    querySwicth (val) {
      if (val === '0') {
        // 设置显示查询栏  跟默认显示查询栏 / 自定义查询栏 同步
        this.modAddData.isenquirybarexpand = '0'
        this.modAddData.isudenquirypage = '0'
      }
    },
    // 获取模板预设值  2020/02/14 组件预设功能已移除
    // getPreinstall () {
    //   let id = 'CC_TR'
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
#icon-preview-box #icon-preview{
  padding-left: 10px;
}
.layout-tab-tree {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    flex: 1;
    // padding: 0px 50px;
    border: none !important;
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    overflow: auto;
    flex-flow: wrap;
    justify-content: space-between;
    .configTitle {
      position: relative;
      width: 100%;
      border: 1px solid #bfbfbf;
      margin-top: 10px;
      // 2019-12-3 LYH确认：间距大需要注释 ly
      // padding: 10px 0;
      box-sizing: border-box;
      padding: 10px 80px 16px 30px;
      > span {
        position: absolute;
        top: -9px;
        left: 10px;
        background: #ffffff;
        padding: 0 5px;
      }
    }
    .leftBox {
      .showLay {
        display: flex;
        flex-direction: column;
        // 2019-12-3 LYH确认：间距大需要改为10 ly
        .el-checkbox {
          margin: 3px 0;
        }
        .p-l-10{
          padding-left: 10px;
        }
      }
      .defaultRow {
        padding: 0 30px 10px 12px;
      }
      .treeStyle {
        // 2019-12-3 LYH确认：间距大，padding下间距需要改为10 ly
        padding: 0 30px 10px 12px;
      }
    }
    .rightBox {
      .treeDataShow {
          padding-bottom: 7px;
      }
      .nodeConfig {
        padding: 0 45px 14px 18px;
        .hintInfo {
          margin-left: -40px;
        }
      }
    }
    .bottomBox {
      width: 100%;
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
  line-height: 28px;
  width: 95px;
  height: 100%;
}
/deep/ .el-switch {
  width: 40px;
}
// 兼容火狐浏览器
.layout-tab-tree /deep/ .el-form-item__content {
  line-height: 28px;
}
.layout-tab-tree /deep/ .el-form-item__content  .el-input__inner{
  height: 30px !important;
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
