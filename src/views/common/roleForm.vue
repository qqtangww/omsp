<!-- 授权公共组件 -->
<template>
  <div class="add-modify-form" id="purview-filed-view" :class="inDialog ? 'flex-role' : ''">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <div class="role-control">
      <div class="border-box" v-if='componentData.roleFormType !== "2"'>
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 权限设置
        </span>
        <el-form inline-message ref="customOptios" :model="roleForm" :rules="rules" v-if='componentData.roleFormType === "1"'>
          <el-row>
            <el-col :span="9">
              <el-form-item label="列链接" label-width="110px" class="m-t-10">
                <el-switch
                  v-model="roleForm.i_HasLink"
                  active-value="1"
                  inactive-value="0"
                  @change="linkSwitch"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item
                label="列链接方式"
                v-if="roleForm.i_HasLink === '1'"
                class="m-t-10"
                label-width="120px">
                <el-radio-group v-model="roleForm.i_LinkExecType">
                  <el-radio label="1">超链接</el-radio>
                  <el-radio label="2">路由地址</el-radio>
                  <el-radio label="3">弹框</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            :label="roleForm.i_LinkExecType === '1' ? '超链接' : '路由地址' "
            v-if="roleForm.i_LinkExecType &&  roleForm.i_LinkExecType !== '3' && roleForm.i_HasLink !== '0'"
            label-width="110px"
            class="link-site"
            prop="v_LinkPage">
            <el-input
              v-model="roleForm.v_LinkPage"
              :disabled="roleForm.i_HasLink ==='0'"
              @input="change($event)"
            ></el-input>
          </el-form-item>
          <template v-if="roleForm.i_LinkExecType === '3' && roleForm.i_HasLink !== '0' ">
            <el-row>
              <el-col :span="11">
                <el-form-item label="弹框容器" label-width="110px" prop="v_DialogCode">
                  <el-select
                    v-model="dialogData.v_DialogCode"
                    filterable
                    clearable
                    placeholder="请选择"
                    @focus="getDialogList"
                  >
                    <el-option
                      v-for="item in dialogCode"
                      :key="item.v_DialogCode"
                      :label="item.v_DialogName"
                      :value="item.v_DialogCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="组件类型" label-width="100px">
                  <!-- <el-cascader
                    popper-class="filtrate"
                    v-model="cateCodeVal"
                    placeholder="请输入搜索"
                    :options="componentCode"
                    :props="defaultProps"
                    @focus="getCompCateList"
                    @change="changeComponentEvent"
                    filterable
                  ></el-cascader> -->
                  <el-select ref="selectTree1" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree' @focus="getCompCateList" clearable>
                    <el-option :value="cateCodeVal1" style="height: auto">
                      <el-tree :data="componentCode" default-expand-all
                        ref="tree" highlight-current :props="defaultProps"
                        @node-click="handleClickChange1"></el-tree>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="组件实例"
                  label-width="110px"
                  v-if="cateCodeName1 !== 'CT'"
                  prop="v_Code"
                >
                  <el-select
                    v-model="dialogData.v_Code"
                    :disabled="cateCodeVal1 === ''"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in componentConfigCode"
                      :key="item.v_Code"
                      :label="item.v_Name"
                      :value="item.v_Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="自定义内容"
                  label-width="110px"
                  v-if="cateCodeName1 === 'CT'"
                  prop="v_CustomName"
                >
                  <el-input v-model="dialogData.v_CustomName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="模板名称" label-width="100px" prop="v_TemplateCode">
                  <el-select
                    v-model="dialogData.v_TemplateCode"
                    :disabled="cateCodeVal1 === '' || cateCodeName1 === 'CT' "
                    filterable
                    clearable
                    @focus="getTemplateUrl(cateCodeName1)"
                  >
                    <el-option
                      v-for="item in templateUrl"
                      :key="item.i_Id"
                      :label="item.v_TemplateName"
                      :value="item.v_TemplateCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="operaInfo">
              <el-form-item
                  label="弹框标题"
                  label-width="110px"
                  prop="v_LinkOperaInfo"
                  placeholder="请输入弹框标题"
                >
                  <el-input v-model="dialogData.v_LinkOperaInfo"></el-input>
                </el-form-item>
            </el-row>
          </template>
          <el-row>
            <el-col :span="8">
              <el-form-item label="需要授权" label-width="110px" class="m-t-10">
                <el-switch
                  :disabled="roleForm.i_HasLink ==='0'"
                  v-model="roleForm.i_IsAuthorize"
                  active-value="1"
                  inactive-value="0"
                  @change="openRole"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="禁用" label-width="110px" class="m-t-10">
                <el-switch
                  :disabled="roleForm.i_HasLink ==='0'"
                  v-model="roleForm.i_LinkIsClose"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理使用" label-width="120px" class="m-t-10">
                <el-switch
                  :disabled="roleForm.i_HasLink ==='0'"
                  v-model="roleForm.i_IsProxy "
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="permissionBox clearfix" v-if='componentData.roleFormType === "3"'>
          <div v-if="showNeedAuthorized">
            <span>需要授权</span>
            <el-switch v-model="currentNode.i_NeedAuthorized" active-value="1" inactive-value="0"></el-switch>
          </div>
          <div v-if="showIsDisabled">
            <span>禁用</span>
            <el-switch v-model="currentNode.i_IsDisabled" active-value="1" inactive-value="0"></el-switch>
          </div>
          <div v-if="showEnableAgent">
            <span>代理使用</span>
            <el-switch v-model="currentNode.i_EnableAgent" active-value="1" inactive-value="0"></el-switch>
          </div>
        </div>
      </div>
      <div class="border-box" v-show="roleForm.i_IsAuthorize === '1' || currentNode.i_NeedAuthorized === '1' || showRoleBox" :class="inDialog ? 'flex-border-box' : ''">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>{{ componentData.roleText }}
        </span>
        <div class="search-box">
          <div class="search">
            <el-input
              placeholder="输入名称搜索"
              clearable
              v-model="awaitKeyWords"
              @keydown.enter.native="queryRoleSearch('await')"
              class="input-with-select w400">
              <el-button slot="append" @click="queryRoleSearch('await')">
                <i class="el-icon-search"></i>
              </el-button>
            </el-input>
          </div>
          <div class="search">
            <el-input
              placeholder="输入名称搜索"
              clearable
              v-model="alreadyKeyWords"
              class="input-with-select w400"
              @keydown.enter.native="queryRoleSearch('already')"
            >
              <el-button slot="append" @click="queryRoleSearch('already')">
                <i class="el-icon-search"></i>
              </el-button>
            </el-input>
          </div>
        </div>
        <div class="templateTabBox">
          <div class="roleLeft">
            <!-- 待授权视图 -->
            <el-table
              ref="multipleTable"
              :data="awaitTableData"
              tooltip-effect="dark"
              class="contentTable"
              :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
              :height="tableHeight + 'px'"
              @selection-change="awaitSelect">
              <el-table-column type="selection" width="30" />
              <el-table-column v-for="(item, index) in tableColumn" :key="index" :label="item.specialFlag ? '待' + item.coltitle : item.coltitle" :width="item.width" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[item.colname] }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page.sync="awaitIndex"
              :page-sizes="pageSizes"
              :page-size="awaitSize"
              :total="awaitTotal"
              :pager-count="5"
              background
              class="temPag paginationBoxSmall"
              layout="sizes, prev, pager, next"
              @size-change="awaitSizeChange"
              @current-change="awaitIndexChange"
            />
          </div>
          <div class="dialog-commit-box">
            <el-button
              type="text"
              @click="moveAddControl">
              <i class="iconfont icon-tianjiachengyuanjiantouyou"></i>
            </el-button>
            <el-button
              type="text"
              @click="cancelAddControl">
              <i class="iconfont icon-tianjiachengyuanjiantouzuo"></i>
            </el-button>
          </div>
          <div class="roleRight">
            <!-- 已授权视图 -->
            <el-table
              ref="multipleTable"
              :data="alreadyTableData"
              tooltip-effect="dark"
              class="contentTable"
              :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
              :height="tableHeight + 'px'"
              @selection-change="awaitSelect">
              <el-table-column type="selection" width="30" />
              <el-table-column v-for="(item, index) in tableColumn" :key="index" :label="item.specialFlag ? '已' + item.coltitle : item.coltitle" :width="item.width" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[item.colname] }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page.sync="alreadyIndex"
              :page-sizes="pageSizes"
              :page-size="alreadySize"
              :total="alreadyTotal"
              :pager-count="5"
              background
              class="tem-pagination paginationBoxSmall"
              layout="sizes, prev, pager, next"
              @size-change="alreadySizeChange"
              @current-change="alreadyIndexChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'purviewFiled_View',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    componentData: Object
  },
  data () {
    return {
      currentNode: {
        i_NeedAuthorized: '1',
        i_IsDisabled: '0',
        i_EnableAgent: '0'
      },
      // 待授权 搜索关键字
      alreadyKeyWords: '',
      // 权限表单数据
      roleForm: {
        i_NeedAuthorized: '1',
        i_IsDisabled: '',
        i_EnableAgent: '',
        v_LinkPage: '',
        i_LinkExecType: '1',
        v_DialogCode: '',
        v_Code: '',
        i_HasLink: '0',
        i_IsAuthorize: '0',
        i_IsProxy: '0',
        i_LinkIsClose: '0'
      },
      rules: {
        v_LinkPage: [
          { required: true, message: '请输入超链接', trigger: 'blur' }
        ]
      },
      dialogData: {},
      dialogCode: [],
      componentCode: [],
      enumSonList: [],
      componentConfigCode: [],
      cateCodeVal1: '',
      cateCodeName1: '',
      templateUrl: [],
      // 待授权 搜索关键字
      awaitKeyWords: '',
      // 代授权数据
      awaitTableData: [],
      // 已授权的数据
      alreadyTableData: [],
      // 操作按钮配置项
      awaitIndex: 1,
      awaitSize: 10,
      awaitTotal: 0,
      // 待授权和已授权的分页展示条数
      pageSizes: [10, 20, 30],
      // 待授权视图 分页数据
      uncheckedCurrentPage: 1,
      uncheckedPageSize: 10,
      uncheckedTotalNum: 0,
      // 已授权视图 分页数据
      alreadyIndex: 1,
      alreadySize: 10,
      alreadyTotal: 0,
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      },
      oldFiledFormData: {
        i_NeedAuthorized: '0',
        i_IsDisabled: '0',
        i_EnableAgent: '0'
      },
      oldEndControlRol: [],
      // 默认表格列 specialFlag代表左右两个表格做特殊出路的列【待授权 - 已授权】
      defaultColumn: [
        { coltitle: '授权用户', colname: 'v_RoleName', width: '100', specialFlag: true },
        { coltitle: '描述', colname: 'v_Description', width: 'auto' }
      ]
    }
  },
  watch: {
    rowData: {
      deep: true,
      handler (nv) {
        this.getRoleList()
      }
    },
    roleForm: {
      handler: function (data) {
        if (this.componentData.roleFormType === '1') {
          if (JSON.stringify(data) !== JSON.stringify(this.oldFiledFormData)) {
            this.customRed ? this.$emit('changeIsDotPur', true) : this.isReminder = false
          }
        }
      },
      deep: true
    },
    currentNode: {
      handler: function (data) {
        if (this.componentData.roleFormType === '1') return
        if (JSON.stringify(data) !== JSON.stringify(this.oldFiledFormData)) {
          this.customRed ? this.$emit('changeIsDotPur', true) : this.isReminder = false
        }
      },
      deep: true
    },
    alreadyTableData: {
      handler: function (data) {
        if (JSON.stringify(data.length) !== JSON.stringify(this.oldEndControlRol.length)) {
          this.customRed ? this.$emit('changeIsDotPur', true) : this.isReminder = false
        }
      },
      deep: true
    },
    getFieldValue (nv) {
      // 如果是true就不执行这里
      if (!this.inDialog && !this.postFieldKey) return
      let params = {
        index: this.awaitIndex,
        size: this.awaitSize,
        [this.postFieldKey]: this.postFieldValue
      }

      // 调取未授权角色
      this.awaitRoleList(params)
      let params1 = {
        index: this.alreadyIndex,
        size: this.alreadySize,
        [this.postFieldKey]: this.postFieldValue
      }
      // 调取已授权角色
      this.alreadyRoleList(params1)
      this.componentData.hasOwnProperty('switchData') ? util.initFormData(this.currentNode, this.componentData.switchData) : util.initFormData(this.currentNode, this.rowData)
      util.initFormData(this.oldFiledFormData, this.currentNode)
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData,
      buttonConfig: state => state.confsBtn,
      rowData: state => state.fieTableData
    }),
    // get传值的字段名
    saveApiValue () {
      return this.componentData.commitRelyOnValue
    },
    // get传值的字段名
    getFieldKey () {
      return this.componentData.getFieldKey
    },
    // get传值的字段值
    getFieldValue () {
      return this.componentData.getFieldValue
    },
    // post传值的字段名
    postFieldKey () {
      return this.componentData.postFieldKey
    },
    // post传值的字段值
    postFieldValue () {
      return this.componentData.postFieldValue
    },
    // 提交时候已授权字段名
    alreadyFieldKey () {
      return this.componentData.alreadyFieldKey
    },
    // 是否是行内操作按钮【传入的】
    isInline () {
      return this.componentData.isInline
    },
    // 是否需要用自定义小红点方法/默认false
    customRed () {
      return this.componentData.customRed
    },
    // 是否需要调用自定义刷新的方法
    isCustomUpdate () {
      return this.componentData.isCustomUpdate
    },
    // 自定义刷新的方法
    customUpdateAPI () {
      return this.componentData.customUpdateAPI
    },
    // 显示需要授权switch/默认true显示
    showNeedAuthorized () {
      return !this.componentData.hiddenNeedAuthorized
    },
    // 显示禁用switch/默认true显示
    showIsDisabled () {
      return !this.componentData.hiddenIsDisabled
    },
    // 显示代理使用switch/默认true显示
    showEnableAgent () {
      return !this.componentData.hiddenEnableAgent
    },
    // 显示授权角色盒子【这个特殊处理】/默认true显示
    showRoleBox () {
      return this.componentData.showRoleBox
    },
    // 权限提交数据形式/默认为JSON字符串
    commitDataType () {
      return this.componentData.roleCommitDataType ? this.componentData.roleCommitDataType : 'JSONStr'
    },
    // 表格列渲染/默认为defaultColumn
    tableColumn () {
      return this.componentData.specialColumn ? this.componentData.specialColumn : this.defaultColumn
    },
    // 提交的时候，已授权字段值 的 字段名【示例：alreadyFieldKey: RowData[alreadyFieldValueKey]】/默认i_RoleID
    alreadyFieldValueKey () {
      return this.componentData.alreadyFieldValueKey ? this.componentData.alreadyFieldValueKey : 'i_RoleID'
    },
    // 是否存在于弹框中，这里是因为要决定 是在created中调取数据还是在watch中调取数据/默认true
    inDialog () {
      return this.componentData.inDialog || true
    },
    tableHeight () {
      return this.componentData.tableHeight || 310
    }
  },
  created () {
    // type等于1为操作栏按钮【新增操作】，等于2为行内操作按钮【修改操作】
    if (this.isInline || this.buttonConfig.type === '2') {
      util.initFormData(this.roleForm, this.rowData)
      this.$set(this.roleForm, [this.getFieldKey], this.getFieldValue)
      this.$set(this.roleForm, [this.postFieldKey], this.postFieldValue)
      // 如果是列链接
      if (this.componentData.roleFormType === '1') {
        this.dialogData = JSON.parse(this.rowData.v_LinkDialog || '{}')
        this.getDialogList()
        this.getCompCateList()
        this.cateCodeName1 = this.dialogData.v_CateCode
        if (this.cateCodeName1) {
          this.queryEnumName1([this.cateCodeName1])
        }
        this.getTemplateUrl(this.cateCodeName1)
        this.getInstanceCompList(this.cateCodeName1)
        this.oldFiledFormData = Object.assign({}, this.roleForm)
      } else {
        if (this.inDialog) {
          this.componentData.hasOwnProperty('switchData') ? util.initFormData(this.currentNode, this.componentData.switchData) : util.initFormData(this.currentNode, this.rowData)
          // if (this.currentNode.i_NeedAuthorized !== '') {
          //   util.initFormData(this.oldFiledFormData, this.currentNode)
          // }
          // util.initFormData(this.oldFiledFormData, this.currentNode)
          // console.log(this.oldFiledFormData)

          // 赋值旧数据 作对比
          this.oldFiledFormData = Object.assign(this.currentNode)
        }
      }
      // 修改操作  调取授权角色
      if (this.inDialog && this.postFieldValue) {
        this.getRoleList()
      }
    }
  },
  methods: {
    // 获取权限
    getRoleList () {
      let params = {
        index: this.awaitIndex,
        size: this.awaitSize,
        [this.postFieldKey]: this.postFieldValue
      }
      // 调取未授权角色
      this.awaitRoleList(params)
      let params1 = {
        index: this.alreadyIndex,
        size: this.alreadySize,
        [this.postFieldKey]: this.postFieldValue
      }
      // 调取已授权角色
      this.alreadyRoleList(params1)
    },
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
      this.$refs.selectTree1.blur()
      this.changeComponentEvent(data.v_EnumValue)
    },
    // 待授权当前页索引改变
    awaitIndexChange (index) {
      let params = {
        index: index,
        size: this.awaitSize,
        [this.postFieldKey]: this.postFieldValue,
        keywords: this.awaitKeyWords
      }
      this.awaitIndex = index
      this.awaitRoleList(params)
    },
    // 待授权当前 展示数据条数改变
    awaitSizeChange (size) {
      let params = {
        index: this.awaitIndex,
        size: size,
        [this.postFieldKey]: this.postFieldValue,
        keywords: this.awaitKeyWords
      }
      this.awaitSize = size
      this.awaitRoleList(params)
    },
    // 已授权当前页索引改变
    alreadyIndexChange (index) {
      let params = {
        index: index,
        size: this.alreadySize,
        [this.postFieldKey]: this.postFieldValue,
        keywords: this.alreadyKeyWords
      }
      this.alreadyIndex = index
      this.alreadyRoleList(params)
    },
    // 已授权当前 展示数据条数改变
    alreadySizeChange (size) {
      let params = {
        index: this.alreadyIndex,
        size: size,
        [this.postFieldKey]: this.postFieldValue,
        keywords: this.alreadyKeyWords
      }
      this.alreadySize = size
      this.alreadyRoleList(params)
    },
    // 权限checkBox选中事件
    awaitSelect (val) {
      this.pitchArray = val
    },
    // 提交
    commit () {
      // 如果是列链接 需要做表单验证
      if (this.componentData.roleFormType === '1') {
        let linkParams = { ...this.roleForm }
        this.$refs.customOptios.validate(valid => {
          if (valid) {
            // 超链接 弹框信息
            this.$set(linkParams, 'v_LinkDialog', JSON.stringify(this.dialogData))
            // 保存 时 取出VUEX Tab的必填项字段 并合并
            Object.assign(linkParams, this.tabData['regin2'])
            this.takingApi(linkParams)
          }
        })
      } else {
        let normalParams = {}
        if (this.componentData.roleFormType !== '2') {
          normalParams = { ...this.currentNode }
        }
        if (this.componentData.hasOwnProperty('relyOnData')) {
          Object.assign(normalParams, this.componentData.relyOnData)
        }
        this.takingApi(normalParams)
      }
    },
    // 调取保存接口
    takingApi (params) {
      let temporaryArr = []
      // 判断：提交数据的形式
      switch (this.commitDataType) {
        case 'JSONStr':
          this.alreadyTableData.forEach(item => {
            let obj = { [this.alreadyFieldValueKey]: item[this.alreadyFieldValueKey] }
            temporaryArr.push(obj)
          })
          params[this.alreadyFieldKey] = JSON.stringify(temporaryArr)
          break
        case 'Array':
          this.alreadyTableData.forEach(item => {
            !temporaryArr.includes(item[this.alreadyFieldValueKey]) && temporaryArr.push(item[this.alreadyFieldValueKey])
          })
          params[this.alreadyFieldKey] = temporaryArr
          break

        default:
          break
      }
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      if (this.saveApiValue) {
        cgiService[this.componentData.saveApi](this.getFieldValue, params).then(res => {
          if (res.code === 0) {
            this.customRed ? this.$emit('changeIsDotPur', false) : this.isReminder = true
            this.$message.success(res.msg)
            // 重新调取接口渲染数据
            this.isCustomUpdate ? this.$emit(this.customUpdateAPI) : this.$emit('getTableData')
            if (Number(res.iId) > 0) {
              this.oldFiledFormData = Object.assign({}, params)
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        cgiService[this.componentData.saveApi](params).then(res => {
          if (res.code === 0) {
            console.log(params)
            this.customRed ? this.$emit('changeIsDotPur', false) : this.isReminder = true
            this.$message.success(res.msg)
            // 重新调取接口渲染数据
            this.isCustomUpdate ? this.$emit(this.customUpdateAPI) : this.$emit('getTableData')
            if (Number(res.iId) > 0) {
              this.oldFiledFormData = Object.assign({}, params)
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 打开授权开关
    openRole (val) {
      if (val === '1') {
        let params = {
          index: this.awaitIndex,
          size: this.awaitSize,
          [this.postFieldKey]: this.postFieldValue
        }
        this.awaitRoleList(params)
        let params1 = {
          index: this.alreadyIndex,
          size: this.alreadySize,
          [this.postFieldKey]: this.postFieldValue
        }
        this.alreadyRoleList(params1)
      }
    },
    // 搜索查询
    queryRoleSearch (val) {
      if (val === 'await') {
        let params = {
          index: this.awaitIndex,
          size: this.awaitSize,
          keywords: this.awaitKeyWords,
          [this.postFieldKey]: this.postFieldValue
        }
        this.awaitRoleList(params)
      } else if (val === 'already') {
        let params = {
          index: this.alreadyIndex,
          size: this.alreadySize,
          keywords: this.alreadyKeyWords,
          [this.postFieldKey]: this.postFieldValue
        }
        this.alreadyRoleList(params)
      }
    },
    // 查询待授权 权限
    awaitRoleList (params) {
      if (this.getFieldValue) {
        cgiService[this.componentData.awaitApi](this.getFieldValue, params).then(res => {
          if (res.code === 0) {
            this.awaitTableData = res.data
            this.awaitTotal = res.totalCount
          }
        })
      } else {
        cgiService[this.componentData.awaitApi](params).then(res => {
          if (res.code === 0) {
            this.awaitTableData = res.data
            this.awaitTotal = res.totalCount
          }
        })
      }
    },
    // http://t.test.osmp.com:81/index.php/custom_func/UserRole/getRoleSeledUser
    // 查询已授权 权限
    alreadyRoleList (params) {
      if (this.getFieldValue) {
        cgiService[this.componentData.alreadyApi](this.getFieldValue, params).then(res => {
          if (res.code === 0) {
            this.oldEndControlRol = this.alreadyTableData = res.data
            this.alreadyTotal = res.totalCount
          }
        })
      } else {
        cgiService[this.componentData.alreadyApi](params).then(res => {
          if (res.code === 0) {
            this.oldEndControlRol = this.alreadyTableData = res.data
            this.alreadyTotal = res.totalCount
          }
        })
      }
    },
    // 权限设置中的列链接swicth改变事件
    linkSwitch (val) {
      if (val === '0') {
        this.roleForm.i_IsAuthorize = '0'
      }
    },
    // 获取弹框配置
    getDialogList () {
      cgiService.getDialogVessel().then(res => {
        if (res.code === 0) {
          this.dialogCode = res.data
        }
      })
    },
    // 获取组件类型
    getCompCateList () {
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
    // 组件类型Change事件
    changeComponentEvent (arr) {
      this.$set(this.dialogData, 'v_CateCode', arr)
      this.getInstanceCompList(arr)
    },
    getInstanceCompList (val) {
      // 获取组件配置
      let params = {
        v_CateCode: val
      }
      cgiService.getComponentsConfig(params).then(res => {
        if (res.code === 0) {
          this.componentConfigCode = res.data
        }
      })
    },
    getTemplateUrl (id) {
      cgiService.getTemplateUrl(id).then(res => {
        this.templateUrl = res.data
      })
    },
    change (e) {
      this.$forceUpdate()
    },
    // 数组去重
    arrNewSet (arr) {
      let x = new Set(arr)
      return [...x]
    },
    // 操作权限移动交互往右移
    moveAddControl () {
      if (this.pitchArray.length !== 0) {
        let newstayControlRol = []
        // 暂存已待授权角色
        let tmpSelStayRoles = []
        // 遍历选中的数组
        this.pitchArray.forEach(item => {
          tmpSelStayRoles.push(item)
        })
        this.awaitTableData.forEach(val => {
          let isExist = 0
          tmpSelStayRoles.forEach(data => {
            if (val[this.alreadyFieldValueKey] === data[this.alreadyFieldValueKey]) {
              // 存贮已选中成员的 在 左边数组中的索引
              isExist = 1
              return false
            }
          })
          if (!isExist) newstayControlRol.push(val)
        })
        this.awaitTableData = newstayControlRol
        // 把选中的角色跟右边的数组合并
        this.alreadyTableData = this.alreadyTableData.concat(this.pitchArray)
        this.alreadyTableData = this.arrNewSet(this.alreadyTableData)
      }
    },
    // 操作权限移动交互往左移
    cancelAddControl () {
      // 判断  是否有选中checkbox
      if (this.pitchArray.length !== 0) {
        // 定义一个临时用来存储选中的变量
        let newPitchArray = []
        // 定义临时用来储存对比后的数据
        let newEndControlRol = []
        // 遍历选中的变量
        this.pitchArray.forEach(val => {
          newPitchArray.push(val)
        })
        this.alreadyTableData.forEach(val => {
          let isExist = 0
          newPitchArray.forEach(item => {
            if (val[this.alreadyFieldValueKey] === item[this.alreadyFieldValueKey]) {
              isExist = 1
              return false
            }
          })
          if (!isExist) {
            newEndControlRol.push(val)
          }
          this.alreadyTableData = newEndControlRol
        })
        this.awaitTableData = this.awaitTableData.concat(this.pitchArray)
        this.awaitTableData = this.arrNewSet(this.awaitTableData)
      }
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.permissionBox {
  padding: 10px;
  .el-switch {
    margin-left: 24px;
  }
  > div {
    float: left;
    &:nth-of-type(n + 2) {
      margin-left: 78px;
    }
  }
}
.role-control {
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  overflow: auto;
  .border-box {
    border: 1px solid #bfbfbf;
    position: relative;
    > .el-form {
      border: none !important;
      overflow: hidden;
    }
  }
  .border-box {
    border: 1px solid #bfbfbf;
    margin-top: 10px;
    position: relative;
    &:first-of-type{
      padding-top: 8px;
    }
    &.role-content{
      padding-top: 16px;
    }
    > span {
      position: absolute;
      top: -10px;
      left: 10px;
      background: #ffffff;
      padding: 0px 8px;
      i{
        margin-right: 4px;
      }
    }
    .search-box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .search {
        width: 43%;
        padding-left: 10px;
        padding-right: 15px;
      }
    }
    .templateTabBox {
      display: flex;
      padding: 10px 10px;
      .roleLeft {
        width: 45%;
      }
      .roleRight {
        width: 45%;
      }
      .dialog-commit-box {
        width: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button {
          margin-left: 0px;
          i {
            font-size: 28px;
            color: #2b8ed1;
          }
        }
      }
    }
  }
  .contentTable {
    border: 1px solid #e6e6e6;
  }
}
.border-box /deep/ .m-t-10 {
  margin-top: 10px !important;
}
.border-box /deep/ .link-site {
  width: 553px;
}
.contentTable /deep/ th.gutter {
  background-image: linear-gradient(
    0deg,
    rgb(45, 142, 211) 0%,
    rgb(96, 163, 241) 100%
  );
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  > div.el-form-item__content
  > span {
  margin: 0;
}
#purview-filed-view /deep/.el-input__inner {
  padding-left: 10px;
  padding-right: 22px;
}
#operaInfo /deep/ .el-form-item {
  width: 553px !important;
}
.flex-role{
  height: 100%;
  display: flex;
  flex-direction: column;
  .role-control,.flex-border-box,.roleLeft,.roleRight{
    display: flex;
    flex-direction: column;
  }
  .role-control,.flex-border-box,.templateTabBox{
    flex: 1;
  }
}
.formOperateBox{
  width: 100%;
  height: 31px;
  background-color: #e6feff;
  line-height: 28px;
  padding: 0 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: solid 3px #bfbfbf;
}
</style>
