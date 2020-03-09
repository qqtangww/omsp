<template>
    <div class="access-base-info add-modify-form">
      <div class="formOperateBox">
          <!-- 操作栏 -->
          <action-bar
            :configData='configData'
            @sumitForm='commit'
            v-on="$listeners"
          ></action-bar>
        </div>
        <el-form
            inline-message
            ref="form"
            :model="modAddData"
            :rules="rules"
            label-width="150px"
            id="content-accessform-box">
            <div class="access-border-div border-box">
                <span>
                    <i class="iconfont icon-jibenxinxi"></i> 基本信息
                </span>
                <div class="accessConBox">
                    <div class="access-580">
                        <el-form-item label="访问策略名称" prop="v_APname">
                        <el-input v-model="modAddData.v_APname"/>
                        </el-form-item>
                        <el-form-item label="描述" prop="v_Description" class='description-label'>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 8}"
                            v-model="modAddData.v_Description"
                            placeholder="可填写相关描述，帮助用户记忆和了解"
                        />
                        </el-form-item>
                    </div>
                    <div class="accessLine"></div>
                    <el-row>
                        <el-col :span="8">
                        <el-form-item label="可访问" prop="i_IsAccessable">
                            <el-switch
                            v-model="modAddData.i_IsAccessable"
                            active-color="#32c5d2"
                            inactive-color="#e6e7e8"
                            active-value="1"
                            inactive-value="0"
                            />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="外网可访问" prop="i_CheckInternet">
                            <el-switch
                            v-model="modAddData.i_CheckInternet"
                            active-color="#32c5d2"
                            inactive-color="#e6e7e8"
                            active-value="1"
                            inactive-value="0"
                            />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="是否缺省策略" prop="i_IsDefault">
                            <el-switch
                            v-model="modAddData.i_IsDefault"
                            active-color="#32c5d2"
                            inactive-color="#e6e7e8"
                            active-value="1"
                            inactive-value="0"
                            />
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="访问时间" label-width="150px" id="access-time1">
                        <el-time-select
                            class="dateBox"
                            placeholder="起始时间"
                            v-model="accessTime1"
                            :picker-options="{
                                    start: '00:00',
                                    step: '00:05',
                                    end: '23:55'
                                    }"
                        ></el-time-select>至
                        <el-time-select
                            class="dateBox"
                            placeholder="结束时间"
                            v-model="accessTime2"
                            :picker-options="{
                                    start: '00:00',
                                    step: '00:05',
                                    end: '23:55',
                                    minTime: accessTime1
                                    }"
                        ></el-time-select>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'acessBaseInfo',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [windowRed, logMixin],
  data () {
    return {
      oldModAddData: {},
      // 添加修改策略弹框 绑定的访问时间
      accessTime1: '',
      accessTime2: '',
      oldAccessTime1: '',
      oldAccessTime2: '',
      modAddData: {
        v_APname: '',
        v_Description: '',
        i_IsAccessable: '0',
        i_CheckInternet: '0',
        i_IsDefault: '0'
      },
      // 效验规则
      rules: {
        v_APcode: [
          { required: true, message: '请输入访问策略编码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不可超出10个字符', trigger: 'blur' }
        ],
        v_APname: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_IncludeIP: [
          { required: true, message: '请输入允许IP地址/段', trigger: 'blur' }
        ],
        v_ExcludeIP: [
          { required: true, message: '请输入禁止IP地址/段', trigger: 'blur' }
        ],
        v_IncludeMAC: [
          { required: true, message: '请输入限制MAC地址', trigger: 'blur' }
        ]
      },
      operationcode: ''
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        this.$emit('update:infoData', data)
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    accessTime1 (nVal) {
      if (this.oldAccessTime1 !== nVal) {
        this.isReminder = false
      }
    },
    accessTime2 (nVal) {
      if (this.oldAccessTime2 !== nVal) {
        this.isReminder = false
      }
    }
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.modAddData)
      this.oldModAddData = Object.assign({}, this.modAddData)
      // 设置访问时间
      let accessTime = formData.v_TimeDefine.split('~')
      this.oldAccessTime1 = this.accessTime1 = accessTime[0]
      this.oldAccessTime2 = this.accessTime2 = accessTime[1]
    } else {
      this.$store.commit('changeRowTabData', {})
    }
  },
  methods: {
    // 添加/修改 策略表单提交
    commit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {}
          params.v_APname = this.modAddData.v_APname
          params.v_Description = this.modAddData.v_Description
          params.i_IsAccessable = this.modAddData.i_IsAccessable
          params.i_CheckInternet = this.modAddData.i_CheckInternet
          params.i_IsDefault = this.modAddData.i_IsDefault
          params.v_APcode = this.modAddData.v_APcode
          // 如果是编辑
          if (this.modAddData.i_Id > 0) {
            // params.v_APcode = this.apcodeNow
            params.i_Id = this.modAddData.i_Id
          }
          // 如果点击保存的时候 switch绑定的值不存在就默认传0
          if (!this.modAddData.i_IsAccessable) {
            params.i_IsAccessable = this.modAddData.i_IsAccessable = '0'
          }
          if (!this.modAddData.i_CheckInternet) {
            params.i_CheckInternet = this.modAddData.i_CheckInternet = '0'
          }
          if (!this.modAddData.i_IsDefault) {
            params.i_IsDefault = this.modAddData.i_IsDefault = '0'
          }
          if (!this.accessTime1) {
            this.accessTime1 = ''
          }
          if (!this.accessTime2) {
            this.accessTime2 = ''
          }
          if (this.accessTime2 && this.accessTime1) {
            params.v_TimeDefine = this.accessTime1 + '~' + this.accessTime2
            params.i_CheckUseTime = '1'
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.temAccessSaveData1(params).then(res => {
            if (!res.code) {
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取 新增这个实例的数据
                this.$store.commit('rowData', { v_APcode: res.v_APcode })
              }
              if (res.iId > 1) {
                this.modAddData.i_Id = res.iId
                this.stdFormData = Object.assign({}, this.modAddData)
                this.apcodeNow = res.v_APcode
              }
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.nextFlag = true
              this.$message.success(res.msg)
              this.isBadge = false
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_access'])
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
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
  #content-accessform-box {
    padding: 24px 48px !important;
    border: none;
    /deep/ .access-border-div {
      height: 100%;
      min-height: 361px;
      box-sizing: border-box;
      border: 1px solid #bfbfbf;
      position: relative;
      padding: 36px 24px 0 24px;
      > span {
        position: absolute;
        top: -15px;
        left: 12px;
        background: white;
        padding: 0 8px;
        line-height: 30px;
        display: inline-block;
      }
      .accessLine {
        height: 1px;
        background: #cccccc;
        margin: 20px 0;
      }
      .access-580 {
        .el-form-item__content {
          width: 580px;
        }
        .el-form-item:first-of-type {
          margin-top: 0 !important;
        }
      }
      .el-row {
        .el-form-item:first-of-type {
          margin-top: 0 !important;
        }
      }
    }
    #access-time1 /deep/ .el-input__inner {
        padding-left: 30px;
    }
    .dateBox{
        width: 250px;
        &:first-of-type{
            margin-right: 32px;
        }
        &:last-of-type{
            margin-left: 32px;
        }
    }
  }
</style>
