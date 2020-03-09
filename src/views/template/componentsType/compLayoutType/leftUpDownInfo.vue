<!-- 组件类型-左上下布局-基本信息 -->
<template>
  <div class="content add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="ruleForm" :model="modAddData" :rules="rules">
      <div class="layoutInfoBox">
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 布局信息
          </span>
          <el-row>
            <el-col :span="14">
              <el-form-item label="组件编码" label-width="100px" prop="v_CateCode">
                <el-input v-model="modAddData.v_CateCode" disabled></el-input>
              </el-form-item>
              <el-form-item label="组件名称" label-width="100px" prop="v_CateName">
                <el-input v-model="modAddData.v_CateName" disabled></el-input>
              </el-form-item>
              <el-form-item label="组件路由" label-width="100px" prop="v_ComponentRoute">
                <el-input v-model="modAddData.v_ComponentRoute"></el-input>
              </el-form-item>
              <!-- <el-form-item
                label="图标"
                label-width="100px"
                prop="v_IconURL">
                <el-select v-model="modAddData.v_IconURL">
                  <el-option
                   v-for="item in iconUrl"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value"
                  >
                  <span style="float: left"> <i :class="item.value"></i> </span>
                  </el-option>
                </el-select>
              </el-form-item>-->
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
                <img src="@/assets/images/templateImg/left-up-down.png" alt />
              </div>
              <div class="imgeTitle">【布局示意图】</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="layoutRegionalBox">
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 区域【1】预设
          </span>
          <div class="treeDataShow">
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
                <el-form-item label="最小宽度" label-width="100px">
                  <el-input-number v-model="region1.v_MinWidth" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i>区域【2】预设
          </span>
          <div class="treeDataShow">
            <el-form-item label="数值单位" label-width="100px" prop="v_DefaultUnit">
              <el-radio-group v-model="region2.v_DefaultUnit">
                <el-radio label="1">百分比</el-radio>
                <el-radio label="2">像素值</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="默认高度" label-width="100px">
              <el-input-number v-model="region2.v_DefaultHeight" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最小高度" label-width="100px">
                  <el-input-number v-model="region2.v_MinHeight" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小宽度" label-width="100px">
                  <el-input-number v-model="region2.v_MinWidth" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="configTitle">
          <span>
            <i class="iconfont icon-jibenxinxi"></i>区域【3】预设
          </span>
          <div class="treeDataShow">
            <el-form-item label="数值单位" label-width="100px" prop="v_DefaultUnit">
              <el-radio-group v-model="region3.v_DefaultUnit">
                <el-radio label="1">百分比</el-radio>
                <el-radio label="2">像素值</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最小高度" label-width="100px">
                  <el-input-number v-model="region3.v_MinHeight" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小宽度" label-width="100px">
                  <el-input-number v-model="region3.v_MinWidth" controls-position="right" :min="0"></el-input-number>
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
import util from '@/common/js/util'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'leftUpDownInfo',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      oldModAddData: {},
      oldRegion1: {},
      oldRegion2: {},
      oldRegion3: {},
      // 表单数据
      modAddData: {
        // 组件编码
        v_CateCode: '',
        // 组件名称
        v_CateName: '',
        // 组件路由
        v_ComponentRoute: '',
        // 图标
        v_IconURL: '',
        // 描述
        v_Description: '',
        // 预设区域JSON
        v_PresetConfig: ''
      },
      // 区域1数据
      region1: {},
      // 区域2数据
      region2: {},
      // 区域3数据
      region3: {},
      regionList: [],
      // 图标
      iconUrl: [
        {
          value: 'iconfont icon-shituzujian'
        },
        {
          value: 'iconfont icon-jibenxinxi'
        },
        {
          value: 'iconfont icon-zuzhijigou'
        },
        {
          value: 'iconfont icon-buju'
        },
        {
          value: 'iconfont icon-tabsbiaoqianye'
        },
        {
          value: 'iconfont icon-zuoyou'
        },
        {
          value: 'iconfont icon-zuozhongyou'
        },
        {
          value: 'iconfont icon-shangxiayou'
        },
        {
          value: 'iconfont icon-dankuangrongqi'
        },
        {
          value: 'iconfont icon-zuoshangxia'
        },
        {
          value: 'iconfont icon-shangxia'
        }
      ],
      rules: {
        v_CateCode: [
          { required: true, message: '请输入组件编码', trigger: 'blur' }
        ],
        v_CateName: [
          { required: true, message: '请输入组件名称', trigger: 'blur' }
        ],
        v_ComponentRoute: [
          { required: true, message: '请输入组件路由', trigger: 'blur' }
        ],
        v_IconURL: [
          { required: true, message: '请选择图标', trigger: 'change' }
        ]
      },
      flag: false
    }
  },
  computed: {
    ...mapState({
      currentVerticalTab: state => state.tabData.v_TabsFlagCode
    })
  },
  created () {
    this.getCategoryList()
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (this.flag) {
          // delete data.v_PresetConfig
          // delete this.oldModAddData.v_PresetConfig
          if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
            this.isReminder = false
          }
        }
      },
      deep: true
    },
    //  监听区域1预设的数据
    region1: {
      handler: function (data) {
        this.$set(this.regionList, 0, data)
        this.$set(
          this.modAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        this.$set(
          this.oldModAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        if (JSON.stringify(this.oldRegion1) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
      deep: true
    },
    //  监听区域2预设的数据
    region2: {
      handler: function (data) {
        this.$set(this.regionList, 1, data)
        this.$set(
          this.modAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        this.$set(
          this.oldModAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        if (JSON.stringify(this.oldRegion2) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
      deep: true
    },
    //  监听区域3预设的数据
    region3: {
      handler: function (data) {
        this.$set(this.regionList, 2, data)
        this.$set(
          this.modAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        this.$set(
          this.oldModAddData,
          'v_PresetConfig',
          JSON.stringify(this.regionList)
        )
        if (JSON.stringify(this.oldRegion3) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          this.flag = false
          this.$set(
            this.modAddData,
            'v_PresetConfig',
            JSON.stringify(this.regionList)
          )
          cgiService.modifyCopmTypeForm(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
              this.flag = true
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    getCategoryList () {
      cgiService.temCategoryList({ v_TabsFlagCode: this.currentVerticalTab }).then(res => {
        if (res.data.length <= 0) return
        let categoryData = res.data[0]
        util.initFormData(this.modAddData, categoryData)
        if (categoryData.v_PresetConfig !== '') {
          let arr = JSON.parse(categoryData.v_PresetConfig)
          // 获取区域1数据
          this.region1 = {
            ...arr[0]
          }
          // 获取区域2数据
          this.region2 = {
            ...arr[1]
          }
          this.region3 = {
            ...arr[2]
          }
        }
        this.oldRegion1 = Object.assign({}, this.region1)
        this.oldRegion2 = Object.assign({}, this.region2)
        this.oldRegion3 = Object.assign({}, this.region3)
        this.$set(this.modAddData, 'i_Id', categoryData.i_Id)
        this.oldModAddData = Object.assign({}, this.modAddData)
        // 把数据存到 vuex当前行，便于其它tab页调取
        this.$store.commit('rowData', categoryData)
        this.flag = true
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
  overflow: auto;
  .el-form {
    border: none !important;
    max-width: 900px;
    margin: auto;
    width: 100%;
    padding: 0 10px !important;
    .configTitle {
      position: relative;
      width: 100%;
      border: 1px solid #bfbfbf;
      margin-top: 10px;
      padding: 0 30px 20px 20px;
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
      padding: 0 0 10px 0;
      .configTitle {
        width: 49%;
        padding: 0 30px 20px 20px;
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
  height: 100%;
}
// 兼容 火狐上的 计数器样式
.configTitle /deep/ .el-form-item__content {
  line-height: 31px;
}
</style>
