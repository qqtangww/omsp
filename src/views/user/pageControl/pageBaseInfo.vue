<!-- 页面管理修改页面基本信息表单 -->
<template>
  <div class="add-modify-form" :class="dialogClass ? 'page-dialog-class' : 'page-base-info'" id="page-control">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form v-if="!dialogClass" inline-message ref="baseInfo" :model="baseInfo" :rules="rules" label-width="100px" class="modify-form">
      <div class="border-box">
        <span class="titleMsg">
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
        <div class="conBox">
          <!-- 一级菜单的新增、修改 -->
          <template v-if="showFirstLevel">
            <el-row>
              <el-col :span="24">
                <el-form-item label="页面名称" prop="v_PageName">
                  <el-input v-model="baseInfo.v_PageName" />
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <!-- 二级菜单的新增、修改 -->
          <template v-if="showOtherLevel">
            <el-row>
              <el-col :span="11">
                <el-form-item label="页面名称" prop="v_PageName">
                  <el-input v-model="baseInfo.v_PageName" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="11">
                <el-form-item label="组件类型">
                  <!-- <el-cascader
                    popper-class="filtrate"
                    class="comp-type"
                    v-model="cateCodeVal"
                    placeholder="请输入搜索"
                    :props="defaultProps"
                    :options="componentCode"
                    @change="changeComponent"
                    filterable
                  ></el-cascader> -->
                  <el-select ref="selectTree1" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree'>
                    <!-- <el-option :value="cateCodeVal1" style="height: auto"> -->
                    <el-option :label="cateCodeVal2" :value="cateCodeVal1" style="height: auto">
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
                <el-form-item :label="cateCodeName1 === 'CT' ? 'URL' : '组件实例' ">
                  <!-- 拉取 组件实例 -->
                  <el-select
                    @focus="getEnumValue"
                    v-model="customCode"
                    placeholder="请选择"
                    filterable
                    v-if="cateCodeName1 !== 'CT'"
                  >
                    <el-option
                      v-for="(item,index) in viewList"
                      :key="index"
                      :label="item.v_Name"
                      :value="item.v_Code"
                    ></el-option>
                  </el-select>
                  <!-- 拉取 自定义URL -->
                  <!-- v-model="baseInfo.v_PageURL" -->
                  <el-select
                    v-model="baseInfo.v_PageURL"
                    placeholder="请选择"
                    @change="urlChange(baseInfo.v_PageURL,baseInfo)"
                    clearable
                    filterable
                    v-else>
                    <el-option v-for="(item , val) in urlList" :key="val" :label="val" :value="val"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="11">
                <!-- <el-form-item label="URL" v-if="cateCodeVal[0] !== 'CT'"> -->
                <el-form-item :label="cateCodeName1 === 'CT' ? 'URL' : '组件路由' " v-if="cateCodeName1 !== 'CT'">
                  <!-- 拉取 模板路径 -->
                  <!-- <el-select
                    v-model="baseInfo.v_PageURL"
                    placeholder="请选择"
                    clearable
                    filterable
                    v-if="cateCodeVal[0] !== 'CT'"
                  >
                    <el-option
                      v-for="(item,index) in tempRouterList"
                      :key="index"
                      :label="item.v_EnumValue"
                      :value="item.v_EnumValue"
                    ></el-option>
                  </el-select> -->
                  <el-input v-model="baseInfo.v_PageURL"/>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图标" class="iconBox" id="icon-preview-box">
                <el-select v-model="baseInfo.v_IconURL" placeholder="请选择" class="select-width">
                  <el-option
                    v-for="(item,index) in pageIconList"
                    :key="index"
                    :label="item.v_EnumValue"
                    :value="item.v_EnumValue"
                  >
                    <span>
                      <i :class="item.v_EnumValue"/>
                    </span>
                  </el-option>
                </el-select>
                <div id="icon-preview">
                  <i :class="baseInfo.v_IconURL"  :style="`color:${baseInfo.v_IconColor}`"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div>&nbsp;</div>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="图标颜色"
                prop="v_IconColor"
                id="icon-preview-box">
                    <el-select placeholder="默认" v-model="baseInfo.v_IconColor">
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
                      <div v-if="baseInfo.v_IconColor" id="icon-color-box" :style="`background-color:${baseInfo.v_IconColor}`"></div>
                    </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="缺省展开子菜单" label-width="100px">
                <el-switch
                  v-model="baseInfo.i_IsDefaultExpand"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div>&nbsp;</div>
            </el-col>
            <el-col :span="11">
              <el-form-item label="隐藏导航窗格" label-width="100px" v-if="showOtherLevel">
                <el-switch
                  v-model="baseInfo.i_IsHideNavigator"
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
              <el-form-item label="描述" prop="v_Description" class="description-label">
                <el-input
                  v-model="baseInfo.v_Description"
                  placeholder="可填写相关描述，帮助用户记忆和了解"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 更新记录，新增不出现 -->
      <div class="border-box update-data">
        <span class="titleMsg">
          <i class="iconfont icon-gengxinjilu"></i>
          <span>更新记录</span>
        </span>
        <div class="conBox">
          <el-row>
            <el-col :span="10">
              <el-form-item label="创建者 :">{{ updateData.v_Creator }}</el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label-width="120px" label="创建时间 :">{{ updateData.d_CreateTime }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="最后修改者 :">{{ updateData.v_LastModifiedUser }}</el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item
                label="最后修改时间 :"
                label-width="120px"
              >{{ updateData.d_LastModifiedTime }}</el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <!-- 弹框中的表单 -->
    <el-form v-else inline-message ref="baseInfo" :model="baseInfo" :rules="rules" label-width="128px">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item label="页面名称" prop="v_PageName">
          <el-input v-model="baseInfo.v_PageName" />
        </el-form-item>
        <!-- （如果是二级菜单 并且 是新增操作） 或者 （如果是三级菜单 并且 是编辑操作） -->
        <el-form-item v-if="showOtherLevel" label="组件类型">
          <!-- <el-cascader
            popper-class="filtrate"
            class="comp-type"
            v-model="cateCodeVal"
            placeholder="请输入搜索"
            :props="defaultProps"
            :options="componentCode"
            @change="changeComponent"
            filterable
          ></el-cascader> -->
          <el-select ref="selectTree1" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree'>
              <el-option :label="cateCodeVal2" :value="cateCodeVal1" style="height: auto">
                <el-tree :data="componentCode" default-expand-all
                  ref="tree" highlight-current :props="defaultProps"
                  @node-click="handleClickChange1"></el-tree>
                </el-option>
            </el-select>
          </el-form-item>
        <el-form-item v-if="showOtherLevel" :label="cateCodeName1 === 'CT' ? 'URL' : '组件实例' ">
          <!-- 拉取 组件实例 -->
          <el-select
            @focus="getEnumValue"
            v-model="customCode"
            placeholder="请选择"
            class="select-width"
            filterable
            v-if="cateCodeName1 !== 'CT'"
          >
            <el-option
              v-for="(item,index) in viewList"
              :key="index"
              :label="item.v_Name"
              :value="item.v_Code"
            ></el-option>
          </el-select>
          <!-- 拉取 自定义URL -->
          <!-- v-model="baseInfo.v_PageURL" -->
          <el-select
            v-model="baseInfo.v_PageURL"
            placeholder="请选择"
            @change="urlChange(baseInfo.v_PageURL,baseInfo)"
            clearable
            filterable
            class="select-width"
            v-else>
            <el-option v-for="(item , val) in urlList" :key="val" :label="val" :value="val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showOtherLevel && cateCodeName1 !== 'CT'" :label="cateCodeName1 === 'CT' ? 'URL' : '组件路由' ">
          <!-- 拉取 模板路径 -->
          <!-- <el-select
            v-model="baseInfo.v_PageURL"
            placeholder="请选择"
            clearable
            filterable
            class="select-width"
            v-if="cateCodeVal[0] !== 'CT'"
          >
            <el-option
              v-for="(item,index) in tempRouterList"
              :key="index"
              :label="item.v_EnumValue"
              :value="item.v_EnumValue"
            ></el-option>
          </el-select> -->
          <el-input v-model="baseInfo.v_PageURL" disabled/>
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="baseInfo.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="图标" class="iconBox" id="icon-preview-box">
              <el-select v-model="baseInfo.v_IconURL" placeholder="请选择" class="select-width">
                <el-option
                  v-for="(item,index) in pageIconList"
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
                <i :class="baseInfo.v_IconURL" :style="`color:${baseInfo.v_IconColor}`"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="1">
            <el-form-item
              label="图标颜色"
              prop="v_IconColor"
              id="icon-preview-box"
            >
                  <el-select placeholder="默认" v-model="baseInfo.v_IconColor">
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
                    <div v-if="baseInfo.v_IconColor" id="icon-color-box" :style="`background-color:${baseInfo.v_IconColor}`"></div>
                  </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="showOtherLevel" class="width-auto">
          <el-col :span="12">
            <el-form-item label="缺省展开子菜单">
              <el-switch
                v-model="baseInfo.i_IsDefaultExpand"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐藏导航窗格">
              <el-switch
                v-model="baseInfo.i_IsHideNavigator"
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
import util from '@/common/js/util.js'
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'pageBaseInfo',
  mixins: [windowRed, logMixin],
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      showFirstLevel: true,
      showOtherLevel: false,
      compontentUrl: '',
      customUrl: '',
      testField: '',
      baseInfo: {
        // v_Code: '',
        i_Cate: '',
        v_CateCode: '',
        // 名称
        v_PageName: '',
        // 描述
        v_Description: '',
        // 图标文件(正常)
        v_IconURL: '',
        v_IconColor: '',
        i_IsHideNavigator: '0',
        i_IsDefaultExpand: '0',
        v_PageURL: '',
        i_ParentPageID: '',
        level: '',
        i_Cid: ''
      },
      // 图标
      pageIconList: [],
      // 添加效验规则
      rules: {
        v_PageName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_PageURL: [{ required: true, message: '请选择URL', trigger: 'blur' }],
        v_IconURL: [
          { required: true, message: '请选择图标文件（正常）', trigger: 'blur' }
        ]
      },
      // 组件数据
      cateCodeVal1: '',
      oldcateCodeVal1: '',
      cateCodeName1: '',
      currentNode: {},
      // 获取的视图数组
      viewList: [],
      // 自定义路径
      urlList: [],
      // 组件编码
      componentCode: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      tempRouterList: [],
      oldModAddData: {
        // v_Code: '',
        i_Cate: '',
        v_CateCode: '',
        // 名称
        v_PageName: '',
        // 描述
        v_Description: '',
        // 图标文件(正常)
        v_IconURL: '',
        v_IconColor: '',
        i_IsHideNavigator: '0',
        i_IsDefaultExpand: '0',
        v_PageURL: '',
        i_ParentPageID: '',
        level: '',
        i_Cid: ''
      },
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      },
      dialogClass: false,
      enumSonList: [],
      updateData: {
        d_CreateTime: '',
        d_LastModifiedTime: '',
        v_Creator: '',
        v_LastModifiedUser: ''
      },
      customCode: '',
      oldcustomCode: '',
      cateCodeVal2: ''
    }
  },
  computed: {
    ...mapState({
      operationcode: state => state.confsBtn.operationcode,
      fieTableData: state => state.fieTableData
    })
  },
  created () {
    // 获取枚举
    this.getEnumValue({ enumCode: ['menuIcons', 'router', 'iconColorAll'] })
    this.$set(this.baseInfo, 'i_Id', this.fieTableData.i_Id)
    // // 组件绑定的数据
    // this.$set(this.cateCodeVal, 0, this.fieTableData.i_Cate)
    // if (this.fieTableData.v_CateCode !== '') {
    //   this.$set(this.cateCodeVal, 1, this.fieTableData.v_CateCode)
    // }
    this.cateCodeVal1 = this.fieTableData.v_CateCode
    this.oldcateCodeVal1 = this.fieTableData.v_CateCode
    // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
    this.$store.commit('changeRowTabData', this.baseInfo)
    this.queryComponents()
    // 新增一级和二级公共处理
    if (this.operationcode === 'addFirst' || this.operationcode === 'addNode') {
      this.dialogClass = true
      // tab置灰
      this.$emit('changeFlag', { isDisabled: true })
      // 页面名称
      this.baseInfo.v_PageName = ''
      // 描述
      this.baseInfo.v_Description = ''
      // 图标列表
      this.baseInfo.v_IconURL = ''
      // parentPageID
      this.baseInfo.i_ParentPageID = this.fieTableData.i_PageID
      delete this.baseInfo.i_Id
      delete this.baseInfo.d_CreateTime
      this.oldModAddData = Object.assign({}, this.baseInfo)
      this.$store.commit('changeRowTabData', {})
      // 新增一级
      if (this.operationcode === 'addFirst') {
        this.showFirstLevel = true
        this.showOtherLevel = false
        this.baseInfo.i_ParentPageID = '0'
        // delete this.baseInfo.v_Code
        delete this.baseInfo.i_Cate
        delete this.baseInfo.i_IsHideNavigator
        delete this.baseInfo.v_PageURL
      } else if (this.operationcode === 'addNode') {
        // 新增它级
        this.showOtherLevel = true
        this.showFirstLevel = false
        // this.baseInfo.v_Code = ''
        // 隐藏导航窗格
        this.baseInfo.i_IsHideNavigator = '0'
        // 页面URL
        this.baseInfo.v_PageURL = ''
        this.cateCodeVal2 = ''
        this.cateCodeVal1 = ''
        this.oldcateCodeVal1 = ''
        this.customCode = ''
        this.oldcustomCode = ''
      }
    } else {
      this.dialogClass = false
    }
    this.oldModAddData = Object.assign({}, this.baseInfo)
  },
  watch: {
    baseInfo: {
      deep: true,
      handler (nv) {
        this.$emit('commitFormData', nv)
        // 如果v_PageURL为undefined 就赋值为空
        if (!nv.v_PageURL && !this.oldModAddData.v_PageURL) {
          nv.v_PageURL = this.oldModAddData.v_PageURL = ''
        }
        if (nv.hasOwnProperty('activeName')) {
          delete nv.activeName
        }
        if (this.oldModAddData.hasOwnProperty('activeName')) {
          delete this.oldModAddData.activeName
        }
        if (this.oldModAddData.i_IsDefaultExpand === '') {
          nv.i_IsDefaultExpand = this.oldModAddData.i_IsDefaultExpand = '0'
        }
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(nv)) {
          this.isReminder = false
        }
        if (this.operationcode && this.operationcode.includes('add')) {
        // tab置灰
          this.$emit('changeFlag', { isDisabled: true })
        } else {
          // tab取消置灰
          this.$emit('changeFlag', { isDisabled: false })
        }
      }
    },
    configData: {
      deep: true,
      immediate: true,
      handler (nv) {
        // 调取 页面URL接口
        this.changeComponent(this.cateCodeVal1)
      }
    },
    shareData: {
      immediate: true,
      handler (nv) {
        this.cateCodeVal = []
        // 离开节点之后，把小红去除
        if (nv.isReminderFlag) {
          this.isReminder = true
        }
        if (nv.level > 1) {
          this.showOtherLevel = true
          this.showFirstLevel = false
        } else if (nv.level > 0) {
          this.showFirstLevel = true
          this.showOtherLevel = false
        }
        // this.$set(this.cateCodeVal, 0, nv.i_Cate)
        // if (nv.v_CateCode !== '') {
        //   this.$set(this.cateCodeVal, 1, nv.v_CateCode)
        // }
        if (this.operationcode !== 'addNode' && nv.v_CateCode) {
          this.cateCodeVal1 = nv.v_CateCode
          this.oldcateCodeVal1 = nv.v_CateCode
          this.queryEnumName1([this.cateCodeVal1])
          this.changeComponent(this.cateCodeVal1)
        }
        util.initFormData(this.baseInfo, this.fieTableData)
        util.initFormData(this.oldModAddData, this.fieTableData)
        util.initFormData(this.updateData, this.fieTableData)
        // 防止点击树节点调取数据，不能注释 ↓
        this.$emit('changeShareData')
        if (this.dialogClass) {
        }
      }
    },
    cateCodeVal1 (val) {
      if (val === 'CT') {
        this.cateCodeName1 = 'CT'
      } else {
        this.cateCodeName1 = ''
      }
      this.$set(this.baseInfo, 'v_CateCode', val)
      this.$set(this.oldModAddData, 'v_CateCode', val)
      if (JSON.stringify(this.oldcateCodeVal1) !== JSON.stringify(val)) {
        this.isReminder = false
      }
    },
    customCode (val) {
      if (JSON.stringify(this.oldcustomCode) !== JSON.stringify(val)) {
        this.isReminder = false
      }
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
          this.cateCodeVal2 = res.data[0].v_EnumValueName
        }
      })
    },
    // 组件类型树点击事件
    handleClickChange1 (data, node, ev) {
      if (data.children) return
      this.cateCodeVal1 = data.v_EnumValue
      this.cateCodeVal2 = data.v_EnumValueName
      this.cateCodeName1 = data.v_EnumValue
      this.$refs.selectTree1.blur()
      this.changeComponent(data.v_EnumValue)
    },
    commit () {
      // 判断 必填项有没有填写
      this.$refs.baseInfo.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.baseInfo.logParams = this.getLogParams()
          }
          this.baseInfo.v_Code = this.customCode
          cgiService.temPagesOperationSaveData1(this.baseInfo).then(res => {
            if (!res.code) {
              // tab取消置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              let cId = ''
              // 把提交的数据保存到vuex，用于权限tab
              this.$store.commit('rowData', this.baseInfo)
              // 新增接口会返回cId，编辑接口返回null
              if (res.i_Cid && res.iId) {
                cId = res.i_Cid
                this.baseInfo.i_Cid = res.i_Cid
                this.configData.operationcode = 'modifyPageNode'
                this.baseInfo.i_Id = res.iId
              } else {
                cId = this.baseInfo.i_Cid
              }
              this.oldModAddData = { ...this.baseInfo }
              this.isReminder = true
              // 新增和修改调用的方法不一样
              if (this.dialogClass) {
                this.$emit('changeShareData', { flag: true })
                this.$emit('getData', { commitFormData: this.baseInfo, cId })
              } else {
                this.$emit('changeShareData', { flag: true, commitFormData: this.baseInfo, cId })
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
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
    // 选取URL的时候判断 选中的URL是否已经存在 如果存在就提示 路径已被使用
    urlChange (value, rowData) {
      let treeData = this.fieTableData.treeData
      treeData.map(item => {
        // 如果是一级菜单
        if (item.children) {
          // 这里的val是二级菜单
          item.children.map(val => {
            if (val.children) {
              val.children.map(data => {
                // data是三级菜单
                if (data.v_PageURL) {
                  if (data.v_PageURL === value) {
                    // 判断是新增入口还是编辑入口
                    if (this.configData.operationcode === 'modifyPageNode') {
                      this.baseInfo.v_PageURL = rowData.v_PageURL
                    } else {
                      this.baseInfo.v_PageURL = ''
                    }
                    this.$message.warning('该URL已被占用，请重新选择')
                  }
                }
              })
            }
          })
        }
      })
    },
    changeComponent (val) {
      // 判断是否是自定义页面
      if (val !== 'CT' && val) {
        let params = {
          v_CateCode: val
        }
        cgiService.getComponentsConfig(params).then(res => {
          this.viewList = res.data
          // 2020-1-8 修改页面管理添加组件实例自动填充 tww
          if (this.operationcode !== 'addNode') {
            this.customCode = this.fieTableData.v_Code
            this.oldcustomCode = this.fieTableData.v_Code
          }
        })
        // let params1 = {
        //   v_CateCode: val
        // }
        cgiService.getOneData(params).then(res => {
          this.baseInfo.v_PageURL = res.data.v_ComponentRoute
          this.oldModAddData = Object.assign({}, this.baseInfo)
        })
      } else {
        let params = {
          index: 1,
          size: 500
        }
        cgiService.getPlatePageUrl(params).then(res => {
          this.urlList = res
        })
      }
    },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            if (key === 'menuIcons') {
              // 菜单图标
              this.pageIconList = res.data[key]
              this.pageIconList.unshift({ v_EnumValue: '' })
            }
            if (key === 'router') {
              this.tempRouterList = res.data[key]
            }
            if (key === 'iconColorAll') {
              // 标题栏
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
  },
  destroyed () {
    // this.dialogClass = false
  }
}
</script>

<style scoped lang='scss'>
.add-modify-form{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.modify-form{
  flex: 1;
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
.page-base-info {
  height: 100%;
  .formOperateBox {
    width: 100%;
    height: 31px;
    background-color: #e6feff;
    line-height: 28px;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: solid 3px #bfbfbf;
    .el-button {
      display: inline-block;
      height: 100%;
      color: #333333;
      border-radius: 0;
      padding: 0 4px;
      margin-right: 4px;
    }
  }
  .el-form {
    padding: 16px;
    overflow: auto;
    .el-form-item {
      margin-bottom: 5px;
      font-size: 12px;
    }
    .border-box {
      border: 1px solid #bfbfbf;
      position: relative;
      padding: 16px 100px;
      &.update-data {
        margin-top: 20px;
      }
      .titleMsg {
        position: absolute;
        top: -10px;
        background: #ffffff;
        padding: 0 4px;
        left: 45px;
      }
    }
  }
}
.page-base-info /deep/ .el-form-item__content {
  // width: 100%;
  font-size: 12px;
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-textarea {
    font-size: 12px;
    .el-textarea__inner {
      height: 120px !important;
    }
  }
}
.page-base-info /deep/ .formOperateBox .el-button {
  display: inline-block;
  height: 100%;
  color: #333333;
  border-radius: 0;
  padding: 0 4px;
  margin-right: 4px;
  i {
    color: #5892f6;
    margin-right: 4px;
  }
}
@media screen and (max-width: 1680px) {
  .border-box {
    padding: 16px 40px !important;
  }
}
@media screen and (max-width: 1280px) {
  .border-box {
    padding: 16px 24px !important;
  }
}
// 弹框中的表单样式
#page-control.page-dialog-class{
  border: none;
  .width-auto{
    /deep/ .el-form-item__content{
      width: auto;
    }
  }
}
</style>
