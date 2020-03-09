<!-- 布局组件-上下右布局组件-基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="bodyBorderBox">
      <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar
          :configData="configData"
          :shareData="formData"
          @sumitForm="commit"
          v-on="$listeners"
        ></action-bar>
      </div>
      <div class="content">
        <el-form inline-message ref="ruleForm" :rules="rules" :model="modAddData">
          <div class="layoutInfoBox">
            <div class="configTitle">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 布局信息
              </span>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="布局编码" label-width="100px" prop="v_RegionCode">
                    <el-input v-model="modAddData.v_RegionCode" :disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="布局名称" label-width="100px" prop="v_RegionName">
                    <el-input v-model="modAddData.v_RegionName"></el-input>
                  </el-form-item>
                  <!-- <el-form-item
                    label="模板名称"
                    label-width="100px"
                    prop="v_TemplateCode"
                  >
                    <el-select v-model="modAddData.v_TemplateCode">
                      <el-option
                        label="1"
                        value="1"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>-->
                  <!-- <el-form-item
                    label="扩展接口"
                    label-width="100px"
                    prop="v_ExtendedInterface"
                  >
                    <el-input v-model="modAddData.v_ExtendedInterface"></el-input>
                  </el-form-item>-->
                  <el-form-item label="拖拽调整区域" label-width="100px" prop="i_IsDefaultDragRegin">
                    <el-switch
                      v-model="modAddData.i_IsDefaultDragRegin"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                  <el-form-item label="描述" label-width="100px" prop="v_Description" class='description-label'>
                    <el-input
                      class="textareaBox"
                      v-model="modAddData.v_Description"
                      placeholder="可填写相关描述，帮助用户记忆和了解"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 4}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <div class="imgeLayout">
                    <img src="@/assets/images/templateImg/up-down-right.png" alt />
                  </div>
                  <div class="imgeTitle">【布局示意图】</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="layoutRegionalBox">
            <div class="configTitle">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 区域【1】
              </span>
              <div class="treeDataShow">
                <el-form-item label="缺省响应区域" label-width="100px" prop="i_DefaultResRegin">
                  <el-select v-model="region1.i_DefaultResRegin">
                    <el-option
                      v-for="item in defaultRegion"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="区域标题" label-width="100px">
                  <el-input v-model="region1.v_regionalTitle"></el-input>
                </el-form-item>
                <el-form-item label="标题样式" label-width="100px" prop="v_titleColor">
                  <el-select
                    v-model="region1.v_titleColor"
                    clearable
                    :disabled="region1.v_regionalTitle === ''"
                  >
                    <el-option
                      v-for="item in titleColor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件类型" label-width="100px">
                  <!-- <el-cascader
                    popper-class="filtrate"
                    v-model="cateCodeVal1"
                    :props="defaultProps"
                    placeholder="请输入搜索"
                    :options="componentCode"
                    @focus="getComponentEventRegion1"
                    @change="changeComponentRegion1"
                    filterable
                  ></el-cascader> -->
                  <el-select ref="selectTree1" v-model="cateCodeVal1" placeholder="请选择" popper-class='select-tree' @focus="getComponentEventRegion1">
                    <el-option :value="cateCodeVal1" style="height: auto">
                      <el-tree :data="componentCode" default-expand-all
                        ref="tree" highlight-current :props="defaultProps"
                        @node-click="handleClickChange1"></el-tree>
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件实例" label-width="100px" v-if="cateCodeName1 !== 'CT'">
                  <el-select
                    v-model="region1.v_Code "
                    :disabled="cateCodeVal1 === ''"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in instanceComponents[cateCodeName1]"
                      :key="index"
                      :label="item.v_Name"
                      :value="item.v_Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="内容名称" label-width="100px" v-if="cateCodeName1 === 'CT'">
                  <el-input v-model="region1.v_contentName" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item
                  label="模板名称"
                  label-width="100px"
                  prop="v_TemplateCode"
                  v-if="cateCodeName1 !== 'CT'"
                >
                  <el-select
                    v-model="region1.v_TemplateCode"
                    :disabled="cateCodeVal1 === ''"
                    filterable
                    clearable
                    @focus="getTemplateUrl(cateCodeName1)"
                  >
                    <el-option
                      v-for="item in templateUrl[cateCodeName1]"
                      :key="item.i_Id"
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
                <el-form-item label="数值单位" label-width="100px" prop="v_DefaultUnit">
                  <el-radio-group v-model="region1.v_DefaultUnit">
                    <el-radio label="1">百分比</el-radio>
                    <el-radio label="2">像素值</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="默认宽度" label-width="100px">
                      <el-input-number
                        v-model="region1.v_DefaultWidth"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="默认高度" label-width="100px">
                      <el-input-number
                        v-model="region1.v_DefaultHeight"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="最小宽度" label-width="100px">
                      <el-input-number
                        v-model="region1.v_MinWidth"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="最小高度" label-width="100px">
                      <el-input-number
                        v-model="region1.v_MinHeight"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="configTitle">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 区域【2】
              </span>
              <div class="treeDataShow">
                <el-form-item label="缺省响应区域" label-width="100px" prop="i_DefaultResRegin">
                  <el-select v-model="region2.i_DefaultResRegin">
                    <el-option
                      v-for="item in defaultRegion"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="区域标题" label-width="100px">
                  <el-input v-model="region2.v_regionalTitle"></el-input>
                </el-form-item>
                <el-form-item label="标题样式" label-width="100px" prop="v_titleColor">
                  <el-select
                    v-model="region2.v_titleColor"
                    clearable
                    :disabled="region2.v_regionalTitle === ''"
                  >
                    <el-option
                      v-for="item in titleColor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件类型" label-width="100px">
                  <!-- <el-cascader
                    popper-class="filtrate"
                    v-model="cateCodeVal2"
                    :props="defaultProps"
                    placeholder="请输入搜索"
                    :options="componentCode"
                    @focus="getComponentEventRegion2"
                    @change="changeComponentRegion2"
                    filterable
                  ></el-cascader> -->
                  <el-select ref="selectTree2" v-model="cateCodeVal2" placeholder="请选择" popper-class='select-tree' @focus="getComponentEventRegion2">
                    <el-option :value="cateCodeVal2" style="height: auto">
                      <el-tree :data="componentCode" default-expand-all
                        ref="tree" highlight-current :props="defaultProps"
                        @node-click="handleClickChange2"></el-tree>
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件实例" label-width="100px" v-if="cateCodeName2 !== 'CT'">
                  <el-select
                    v-model="region2.v_Code "
                    :disabled="cateCodeVal2 === ''"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in instanceComponents[cateCodeName2]"
                      :key="index"
                      :label="item.v_Name"
                      :value="item.v_Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="模板名称"
                  label-width="100px"
                  prop="v_TemplateCode"
                  v-if="cateCodeName2 !== 'CT'"
                >
                  <el-select
                    v-model="region2.v_TemplateCode"
                    :disabled="cateCodeVal2 === ''"
                    filterable
                    clearable
                    @focus="getTemplateUrl(cateCodeName2)"
                  >
                    <el-option
                      v-for="item in templateUrl[cateCodeName2]"
                      :key="item.i_Id"
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
                <el-form-item label="内容名称" label-width="100px" v-if="cateCodeName2 === 'CT'">
                  <el-input v-model="region2.v_contentName" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item label="数值单位" label-width="100px" prop="v_DefaultUnit">
                  <el-radio-group v-model="region2.v_DefaultUnit">
                    <el-radio label="1">百分比</el-radio>
                    <el-radio label="2">像素值</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="最小高度" label-width="100px">
                  <el-input-number v-model="region2.v_MinHeight" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="configTitle">
              <span>
                <i class="iconfont icon-jibenxinxi"></i>区域【3】
              </span>
              <div class="treeDataShow">
                <el-form-item label="缺省响应区域" label-width="100px" prop="i_DefaultResRegin">
                  <el-select v-model="region3.i_DefaultResRegin">
                    <el-option
                      v-for="item in defaultRegion"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="区域标题" label-width="100px">
                  <el-input v-model="region3.v_regionalTitle"></el-input>
                </el-form-item>
                <el-form-item label="标题样式" label-width="100px" prop="v_titleColor">
                  <el-select
                    v-model="region3.v_titleColor"
                    clearable
                    :disabled="region3.v_regionalTitle === ''"
                  >
                    <el-option
                      v-for="item in titleColor"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件类型" label-width="100px">
                  <!-- <el-cascader
                    popper-class="filtrate"
                    v-model="cateCodeVal3"
                    :props="defaultProps"
                    placeholder="请输入搜索"
                    :options="componentCode"
                    @focus="getComponentEventRegion3"
                    @change="changeComponentRegion3"
                    filterable
                  ></el-cascader> -->
                  <el-select ref="selectTree3" v-model="cateCodeVal3" placeholder="请选择" popper-class='select-tree' @focus="getComponentEventRegion3">
                    <el-option :value="cateCodeVal3" style="height: auto">
                      <el-tree :data="componentCode" default-expand-all
                        ref="tree" highlight-current :props="defaultProps"
                        @node-click="handleClickChange3"></el-tree>
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="组件实例" label-width="100px" v-if="cateCodeName3 !== 'CT'">
                  <el-select
                    v-model="region3.v_Code "
                    :disabled="cateCodeVal3 === ''"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in instanceComponents[cateCodeName3]"
                      :key="index"
                      :label="item.v_Name"
                      :value="item.v_Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="模板名称"
                  label-width="100px"
                  prop="v_TemplateCode"
                  v-if="cateCodeName3 !== 'CT'"
                >
                  <el-select
                    v-model="region3.v_TemplateCode"
                    :disabled="cateCodeVal3 === ''"
                    filterable
                    clearable
                    @focus="getTemplateUrl(cateCodeName3)"
                  >
                    <el-option
                      v-for="item in templateUrl[cateCodeName3]"
                      :key="item.i_Id"
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
                <el-form-item label="内容名称" label-width="100px" v-if="cateCodeName3 === 'CT'">
                  <el-input v-model="region3.v_contentName" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item label="数值单位" label-width="100px" prop="v_DefaultUnit">
                  <el-radio-group v-model="region3.v_DefaultUnit">
                    <el-radio label="1">百分比</el-radio>
                    <el-radio label="2">像素值</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="最小宽度" label-width="100px">
                  <el-input-number v-model="region3.v_MinWidth" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </div>
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
import util from '@/common/js/util.js'
import logMixin from '@/common/js/mixins/getLogParams'
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'layoutUpDownRight',
  mixins: [logMixin, windowRed],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
  data () {
    // 编码正则匹配
    var commonCode = (rule, value, callback) => {
      let codeVerify = /^\w+$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由数字,英文,下划线组合'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      // 表单数据
      oldModAddData: {
        // 编码
        v_RegionCode: '',
        // 布局名称
        v_RegionName: '',
        // 扩展接口
        v_ExtendedInterface: '',
        // 拖拽调整区域
        i_IsDefaultDragRegin: '0',
        // 描述
        v_Description: ''
      },
      // 区域1数据
      oldRegion1: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 默认宽度
        v_DefaultWidth: 0,
        // 默认高度
        v_DefaultHeight: 0,
        // 最小宽度
        v_MinWidth: 0,
        // 最小高度
        v_MinHeight: 0
      },
      // 区域2数据
      oldRegion2: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 最小高度
        v_MinHeight: 0
      },
      // 区域2数据
      oldRegion3: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 默认宽度
        v_MinWidth: 0
      },
      // 表单数据
      modAddData: {
        // 编码
        v_RegionCode: '',
        // 布局名称
        v_RegionName: '',
        // 扩展接口
        v_ExtendedInterface: '',
        // 拖拽调整区域
        i_IsDefaultDragRegin: '',
        // 描述
        v_Description: ''
      },
      // 区域1数据
      region1: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 默认宽度
        v_DefaultWidth: 0,
        // 默认高度
        v_DefaultHeight: 0,
        // 最小宽度
        v_MinWidth: 0,
        // 最小高度
        v_MinHeight: 0
      },
      // 区域2数据
      region2: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 最小高度
        v_MinHeight: 0
      },
      // 区域2数据
      region3: {
        // 组件类型
        i_Cate: '',
        // 组件类型编码
        v_CateCode: '',
        // 组件实例编码
        v_Code: '',
        // 区域标题
        v_regionalTitle: '',
        // 标题样式
        v_titleColor: '',
        // 模板路径
        v_TemplateCode: '',
        // 数值单位
        v_DefaultUnit: '1',
        // 默认宽度
        v_MinWidth: 0
      },
      // 标题栏颜色
      titleColor: [
        {
          label: '蓝色渐变',
          value: 'regionTitleCls-blue'
        },
        {
          label: '浅灰色',
          value: 'regionTitleCls-gray'
        }
      ],
      rules: {
        v_RegionCode: [
          {
            required: true,
            message: '请输入布局编码',
            trigger: 'blur'
          },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_RegionName: [
          {
            required: true,
            message: '请输入布局名称',
            trigger: 'blur'
          },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ]
      },
      // 是否禁用编码
      isDisabled: false,
      // 模板路径
      templateUrl: {},
      // 组件绑定对应的数据
      // 区域1
      cateCodeVal1: '',
      cateCodeName1: '',
      // 区域2
      cateCodeVal2: '',
      cateCodeName2: '',
      // 区域3
      cateCodeVal3: '',
      cateCodeName3: '',
      // 组件
      components: [],
      // 组件编码
      componentCode: [],
      enumSonList: [],
      // 组件实例
      instanceComponents: {},
      // 缺省响应区域
      defaultRegion: [
        {
          label: '区域1',
          value: '1'
        },
        {
          label: '区域2',
          value: '2'
        }
      ],
      // 联级选择器 指定当前节点值
      defaultProps: {
        children: 'children',
        label: 'v_EnumValueName',
        value: 'v_EnumValue'
      }
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    // 判断是否是修改数据
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = true
      // 获取vuex存的单前行数据
      let formData = this.$store.state.fieTableData
      // 布局区域数据
      let regionList = JSON.parse(formData.v_ReginData)
      // 区域1
      Object.assign(this.region1, regionList[0])
      // 区域2
      Object.assign(this.region2, regionList[1])
      // 区域3
      Object.assign(this.region3, regionList[2])

      // 获取组件
      this.queryComponents()
      // 获取组件实例 区域1
      this.queryInstanceComponents(
        regionList[0].v_CateCode
      )
      // 获取组件实例 区域2
      this.queryInstanceComponents(
        regionList[1].v_CateCode
      )
      // 获取组件实例 区域3
      this.queryInstanceComponents(
        regionList[2].v_CateCode
      )

      // 区域1下 组件的数据  判断有对应的值才需要调取接口
      if (regionList[0].v_CateCode) {
        this.cateCodeName1 = regionList[0].v_CateCode
        this.queryEnumName1([this.cateCodeName1])
      }
      // // 区域2下 组件的数据  判断有对应的值才需要调取接口
      if (regionList[1].v_CateCode) {
        this.cateCodeName2 = regionList[1].v_CateCode
        this.queryEnumName2([this.cateCodeName2])
      }
      // // 区域3下 组件的数据  判断有对应的值才需要调取接口
      if (regionList[2].v_CateCode) {
        this.cateCodeName3 = regionList[2].v_CateCode
        this.queryEnumName3([this.cateCodeName3])
      }
      // 赋值i_Id 给表单对象
      this.modAddData.i_Id = formData.i_Id
      util.initFormData(this.modAddData, formData)
      this.getTemplateUrl(this.cateCodeName1)
      this.getTemplateUrl(this.cateCodeName2)
      this.getTemplateUrl(this.cateCodeName3)
      this.oldModAddData = Object.assign({}, this.modAddData)
      this.oldRegion1 = Object.assign({}, this.region1)
      this.oldRegion2 = Object.assign({}, this.region2)
      this.oldRegion3 = Object.assign({}, this.region3)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_RegionCode }, { v_ComponentType: 'CR_UDR' })
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    } else {
      this.getPreinstall()
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = {}
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
  },
  watch: {
    configData: {
      handler: function (newData, oldData) {
        this.configData = newData
      },
      immediate: true,
      deep: true
    },
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    region1: {
      handler: function (data) {
        if (JSON.stringify(this.oldRegion1) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
      deep: true
    },
    region2: {
      handler: function (data) {
        if (JSON.stringify(this.oldRegion2) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
      deep: true
    },
    region3: {
      handler: function (data) {
        if (JSON.stringify(this.oldRegion3) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
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
    queryEnumName2 (val) {
      let params = {
        enumValue: val
      }
      cgiService.getEnumName(params).then(res => {
        if (res.code === 0) {
          this.cateCodeVal2 = res.data[0].v_EnumValueName
        }
      })
    },
    queryEnumName3 (val) {
      let params = {
        enumValue: val
      }
      cgiService.getEnumName(params).then(res => {
        if (res.code === 0) {
          this.cateCodeVal3 = res.data[0].v_EnumValueName
        }
      })
    },
    // 区域1组件类型树点击事件
    handleClickChange1 (data, node, ev) {
      if (data.children) return
      this.cateCodeVal1 = data.v_EnumValueName
      this.cateCodeName1 = data.v_EnumValue
      this.$refs.selectTree1.blur()
      this.changeComponentRegion1(data.v_EnumValue)
    },
    // 区域2组件类型树点击事件
    handleClickChange2 (data, node, ev) {
      if (data.children) return
      this.cateCodeVal2 = data.v_EnumValueName
      this.cateCodeName2 = data.v_EnumValue
      this.$refs.selectTree2.blur()
      this.changeComponentRegion2(data.v_EnumValue)
    },
    // 区域3组件类型树点击事件
    handleClickChange3 (data, node, ev) {
      if (data.children) return
      this.cateCodeVal3 = data.v_EnumValueName
      this.cateCodeName3 = data.v_EnumValue
      this.$refs.selectTree3.blur()
      this.changeComponentRegion3(data.v_EnumValue)
    },
    // 保存提交
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          // this.modAddData.v_CateCode = this.configData.v_TabsFlagCode
          let tabData = this.$store.state.tabData
          this.modAddData.v_CateCode = tabData.v_TabsFlagCode
          let reginList = []
          reginList[0] = this.region1
          reginList[1] = this.region2
          reginList[2] = this.region3
          this.modAddData.v_ReginData = JSON.stringify(reginList)
          cgiService.saveLayoutInstance(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$emit('changeFlag', { isDisabled: false })
              if (Number(res.iId) >= 1) {
                this.modAddData.i_Id = res.iId
              }
              this.isReminder = true
              this.$message.success(res.msg)
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_instanceUpDownRight'])
              // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_RegionCode }, { v_ComponentType: 'CR_UDR' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },

    // 组件联级选择器change事件
    getComponentEventRegion1 () {
      this.queryComponents()
    },
    getComponentEventRegion2 () {
      this.queryComponents()
    },
    getComponentEventRegion3 () {
      this.queryComponents()
    },
    changeComponentRegion1 (val) {
      if (val) {
        this.region1.v_Code = ''
        this.region1.v_TemplateCode = ''
        this.region1.v_CateCode = val
        this.queryInstanceComponents(val)
      }
    },
    changeComponentRegion2 (val) {
      if (val) {
        this.region2.v_Code = ''
        this.region2.v_TemplateCode = ''
        this.region2.v_CateCode = val
        this.queryInstanceComponents(val)
      }
    },
    changeComponentRegion3 (val) {
      if (val) {
        this.region3.v_Code = ''
        this.region3.v_TemplateCode = ''
        this.region3.v_CateCode = val
        this.queryInstanceComponents(val)
      }
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
          // this.instanceComponents = res.data
          this.$set(this.instanceComponents, [val], res.data)
        }
      })
    },
    // 获取模板预设值
    getPreinstall () {
      let tabData = this.$store.state.tabData
      cgiService.getTemplatePreinstall(tabData.v_TabsFlagCode).then(res => {
        let arr = JSON.parse(res.data.info)
        // 区域1  的预设值
        Object.assign(this.region1, arr[0])
        // 区域2  的预设值
        Object.assign(this.region2, arr[1])
        // 区域3  的预设值
        Object.assign(this.region3, arr[1])
        this.oldRegion1 = Object.assign({}, this.region1)
        this.oldRegion2 = Object.assign({}, this.region2)
        this.oldRegion3 = Object.assign({}, this.region3)
      })
    },
    // 获取模板路径
    getTemplateUrl (id) {
      cgiService.getTemplateUrl(id).then(res => {
        // this.templateUrl = res.data
        this.$set(this.templateUrl, [id], res.data)
      })
    },
    change () {
      this.$forceUpdate()
    },
    closeDia () {
      // 是否禁用编码
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
.content {
  padding: 0 10px !important;
  border: solid 5px #abd6ff;
  height: 600px;
  overflow: auto;
  .el-form {
    border: none !important;
    width: 840px;
    margin: auto;
    box-sizing: border-box;
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
      flex-wrap: wrap;
      .configTitle {
        width: 49%;
        &:first-of-type {
          margin-right: 16px;
        }
      }
      .treeDataShow {
        .el-cascader {
          margin-left: 0 !important;
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
  div.el-input-number.is-controls-right {
  width: 90px;
  line-height: 28px;
}
.bodyBorderBox {
  border: none !important;
  /deep/ .el-input__inner {
    height: 31px !important;
  }
}
/deep/ .el-switch {
  width: 40px;
}
</style>
