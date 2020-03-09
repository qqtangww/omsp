<!-- 用户代理页面 -->
<template>
  <div class="mod-add-agt">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" :formRed="formRed" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="ruleForm" :model="modeAddData" :rules="rules" label-width="110px">
      <div class="centerBox">
        <el-form-item label="代理人账号" prop="v_AgentUserID">
          <el-input v-model="modeAddData.v_AgentUserID" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="代理人用户名" prop="v_UserName">
          <el-autocomplete
            class="agent-user-input"
            v-model="modeAddData.v_UserName"
            :fetch-suggestions="searchAgent"
            placeholder="请输入代理人姓名"
            :trigger-on-focus="false"
            @select="agentNameChange"
          >
            <template slot-scope="{ item }">
              <div id="agent-name-box">
                <span class="agent-name">{{ item.v_UserName }}</span>
                <span class="agent-id">{{ item.v_UserID }}</span>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="代理权有效期" id="agent-data-pick">
            <!-- @disabledDate="disabledDate" -->
          <el-date-picker
            :clearable="false"
            v-model="startingTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions2"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="代理登录提醒" prop="i_AgentLoginRemind">
              <el-switch
                v-model="modeAddData.i_AgentLoginRemind"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="通知代理人" prop="i_InformAgent">
              <el-switch
                v-model="modeAddData.i_InformAgent"
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
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'modAddAgent',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  mixins: [mixin, logMixin],
  data () {
    return {
      // 表单绑定的数据
      modeAddData: {
        i_AgentLoginRemind: '0',
        i_InformAgent: '0',
        v_AgentUserID: ''
      },
      // 代理的起始时间
      startingTime: [],
      // 表单校验 规则
      rules: {
        v_UserName: [
          { required: true, message: '请输入正确的代理人姓名', trigger: 'blur' }
        ],
        v_AgentUserID: [
          { required: true, message: '请输入正确的代理人工号', trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '请选择代理权有效期', trigger: 'blur' }
        ]
      },
      // 选择日期
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
        // disabledDate (time) {
        //   return time.getTime() <= Date.now() - 3600 * 1000 * 24
        // }
      },
      formRed: false,
      oldModeAddData: {},
      oldStartingTime: [],
      userAgentList: [],
      aaaa: ''
    }
  },
  computed: {
    agentUserId () {
      return this.modeAddData.v_AgentUserID
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.modeAddData = {
        ...formData
      }
      this.$set(this.startingTime, 0, this.modeAddData.d_BeginTime)
      this.$set(this.startingTime, 1, this.modeAddData.d_EndTime)
    }
    this.oldModeAddData = Object.assign({}, this.modeAddData)
    this.oldStartingTime = this.startingTime
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldModeAddData)) {
          this.formRed = true
        }
      },
      deep: true
    },
    startingTime: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldStartingTime)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  methods: {
    agentNameChange (val) {
      this.modeAddData.v_AgentUserID = val.v_UserID
    },
    // 提交
    commit () {
      this.modeAddData.d_BeginTime = this.startingTime[0]
      this.modeAddData.d_EndTime = this.startingTime[1]
      let params = this.modeAddData
      if (this.modeAddData.i_Id > 0) {
        params.i_Id = this.modeAddData.i_Id
      }
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          cgiService.temAgentSaveData2(params).then(res => {
            if (!res.code) {
              if (res.iId > 1) {
                this.stdFormData = Object.assign({}, this.modeAddData)
                this.modeAddData.i_Id = res.iId
                this.$emit('title', '修改用户代理')
              }
              this.$message.success(res.msg)
              this.formRed = false
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_userAgent'])
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    searchAgent (queryString, cb) {
      cgiService.temAgentUserList({ keywords: queryString }).then(res => {
        if (res.code === 0) {
          this.userAgentList = res.data
          var restaurants = this.userAgentList
          var results = queryString
            ? restaurants.filter(this.createFilterUser(queryString))
            : restaurants
          // 调用 callback 返回建议列表的数据
          for (let i = 0; i < results.length; i++) {
            results[i].value = results[i].v_UserName
          }
          cb(results)
        }
      })
    },
    createFilterUser (queryString) {
      return restaurant => {
        return restaurant.v_UserName.indexOf(queryString) === 0
      }
    },
    // disabledDate (time) {
    //   return time.getTime() > Date.now()
    // },
    clearError () {
      this.$emit('getButtonConfig', false)
      this.startingTime = []
      this.modeAddData = {}
      this.$refs.ruleForm.resetFields()
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.mod-add-agt {
  height: 100%;
  display: flex;
  flex-direction: column;
  .centerBox {
    width: 520px;
    margin: 16px auto;
    padding: 0px 30px;
    box-sizing: border-box;
  }
}
#agent-data-pick{
  div.el-date-editor{
    padding-right: 0;
  }
}
</style>
