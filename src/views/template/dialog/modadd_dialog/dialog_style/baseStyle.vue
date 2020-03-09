<!-- 容器组件-弹框容器-弹框样式 -->
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
    <div class="infoBox">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 弹框样式
        </span>
        <el-form inline-message ref="ruleForm" :model="modAddData" :rules="rules">
          <el-row>
            <el-col :span="23">
              <el-form-item label="弹框样式" label-width="110px" prop="v_Style">
                <el-select v-model="modAddData.v_Style" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="(item,index) in dialogStyle"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="允许最大化" label-width="110px" class="controlLiHei" prop="i_IsMax">
                <el-switch
                  v-model="modAddData.i_IsMax"
                  @change="changeIsMax"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="默认最大化"
                label-width="110px"
                class="controlLiHei"
                v-if="modAddData.i_IsMax === '1'"
              >
                <el-switch v-model="modAddData.i_IsDefaultMax" active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="弹框高度" label-width="110px" class="controlLiHei">
                <el-radio-group v-model="modAddData.i_HeightType">
                  <el-radio label="0">自适应</el-radio>
                  <el-radio label="1">固定高度</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="最小高度"
                label-width="110px"
                v-if="modAddData.i_HeightType ==='0'"
                prop="i_MinHeight"
              >
                <el-input-number
                  v-model="modAddData.i_MinHeight"
                  class="number"
                  controls-position="right"
                  @change="handleChange"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="固定高度"
                label-width="100px"
                v-if="modAddData.i_HeightType ==='1'"
                prop="i_FixedHeight"
              >
                <el-input-number
                  v-model="modAddData.i_FixedHeight"
                  controls-position="right"
                  class="number"
                  @change="handleChange"
                  :min="0"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="弹框宽度" label-width="110px" prop="i_Width">
                <el-input-number
                  v-model="modAddData.i_Width"
                  controls-position="right"
                  class="number"
                  @change="handleChange"
                  :min="0"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util.js'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'baseStyle',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      modAddData: {
        // 弹框样式
        v_Style: '',
        // 是否最大化
        i_IsMax: '0',
        // 是否默认最大化
        i_IsDefaultMax: '',
        // 弹框高度类型
        i_HeightType: '0',
        // 最小高度
        i_MinHeight: 0,
        // 固定高度
        i_FixedHeight: 200,
        // 宽度
        i_Width: 0
      },
      dialogStyle: [],
      rules: {
        // i_MinHeight: [ { required: true, message: '请输入最小高度', trigger: 'blur' } ]
      },
      oldModAddData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        this.$set(
          this.oldModAddData,
          'i_Width',
          Number(this.oldModAddData.i_Width)
        )
        this.$set(
          this.oldModAddData,
          'i_FixedHeight',
          Number(this.oldModAddData.i_FixedHeight)
        )
        this.$set(
          this.oldModAddData,
          'i_MinHeight',
          Number(this.oldModAddData.i_MinHeight)
        )
        this.$set(data, 'i_MinHeight', Number(data.i_MinHeight))
        this.$set(data, 'i_FixedHeight', Number(data.i_FixedHeight))
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      console.log(formData)

      util.initFormData(this.modAddData, formData)
      this.modAddData.i_Id = formData.i_Id
    }
    // 给oldModAddData赋值
    this.oldModAddData = Object.assign({}, this.modAddData)
    this.getEnumValue()
  },
  methods: {
    handleChange () {},
    changeIsMax (val) {
      if (val === '0') {
        this.$set(this.modAddData, 'i_IsDefaultMax', '0')
      }
    },
    commit () {
      let rowTabData = this.$store.state.rowTabData
      Object.assign(this.modAddData, rowTabData)
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.modAddData.logParams = this.getLogParams()
      }
      cgiService.saveDialog(this.modAddData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.isTitleDisabled = false
          let params = this.$store.state.paginations
          this.$emit('getTableData', params['CC_VW_instanceDialog'])
          // 给oldModAddData赋值并且给isReminder赋值true
          this.isReminder = true
          this.oldModAddData = Object.assign({}, this.modAddData)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取枚举内容
    getEnumValue () {
      let params = {
        enumCode: 'dialogTitle'
      }
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.dialogStyle = res.data.dialogTitle
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
.add-modify-form {
  .infoBox {
    height: 100%;
    padding: 16px;
    overflow: auto;
    // border: 4px solid #abd6ff;
    box-sizing: border-box;
    .border-box {
      height: 258px;
      position: relative;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .el-form {
        border: none !important;
        padding: 0 40px 0 20px;
        box-sizing: border-box;
      }
    }
  }
}
/deep/ .el-switch {
  width: 40px;
}
</style>
