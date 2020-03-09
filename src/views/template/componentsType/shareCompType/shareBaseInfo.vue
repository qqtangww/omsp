<!-- 组件类型【视图、树形、表单、tab、弹框】基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="tabs-base-info">
      <el-form
        label-position="right"
        label-width="110px"
        inline-message
        :rules="rules"
        ref="ruleForm"
        :model="modAddData"
      >
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
          <div class="conBox">
            <el-form-item label="组件编码" prop="v_CateCode">
              <el-input v-model="modAddData.v_CateCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="组件名称" prop="v_CateName">
              <el-input v-model="modAddData.v_CateName" disabled></el-input>
            </el-form-item>
            <!-- 浩哥写的 -->
            <el-form-item v-if="modAddData.v_CateCode !=='CF_DL'" label="组件路由" prop="v_ComponentRoute">
              <el-input v-model="modAddData.v_ComponentRoute"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="v_Description" class='description-label'>
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
      </el-form>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'shareBaseInfo',
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    infoData: Object
  },
  mixins: [windowRed, logMixin],
  data () {
    return {
      modAddData: {
        // tab编码
        v_CateCode: '',
        // tab名称
        v_CateName: '',
        // tab路由
        v_ComponentRoute: '',
        // 描述
        v_Description: ''
      },
      rules: {
        // 组件编码
        v_CateCode: [
          { required: true, message: '请输入组件编码', trigger: 'blur' }
        ],
        v_CateName: [
          { required: true, message: '请输入组件名称', trigger: 'blur' }
        ],
        v_ComponentRoute: [
          { required: true, message: '请输入组件路由', trigger: 'blur' }
        ]
      },
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
      oldModAddData: {},
      isDisabled: false,
      viewId: ''
    }
  },
  computed: {
    ...mapState({
      currentVerticalTab: state => state.tabData.v_TabsFlagCode
    })
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
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.modifyCopmTypeForm(this.modAddData).then(res => {
            if (res.code === 0) {
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              let params = this.$store.state.paginations

              this.$emit('getTableData', params[this.viewId])
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
    getCategoryList () {
      cgiService.temCategoryList({ v_TabsFlagCode: this.currentVerticalTab }).then(res => {
        if (res.data.length <= 0) return
        let categoryData = res.data[0]
        this.modAddData.v_CateCode = categoryData.v_CateCode
        this.modAddData.i_Id = categoryData.i_Id
        this.modAddData.v_CateName = categoryData.v_CateName
        this.modAddData.v_ComponentRoute = categoryData.v_ComponentRoute
        this.modAddData.v_Description = categoryData.v_Description
        this.oldModAddData = Object.assign({}, this.modAddData)
        // 把数据存到 vuex当前行，便于其它tab页调取
        this.$set(categoryData, 'dataReady', true)
        this.$store.commit('rowData', categoryData)
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.tabs-base-info {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  overflow: auto;
  .el-form {
    height: 100%;
    max-width: 650px;
    margin: auto;
    padding: 10px;
    border: none !important;
    .border-box {
      height: 100%;
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .conBox {
        margin-left: 20px;
      }
      &:first-of-type {
        margin-top: 0;
        height: 296px;
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
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .tabs-base-info
  .conBox
  /deep/.minInput
  .el-textarea__inner {
  height: 120px !important;
}
</style>
