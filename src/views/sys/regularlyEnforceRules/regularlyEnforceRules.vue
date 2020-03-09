<!-- 用户管理-基本信息 -->
<template>
  <div class="add-org-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="modeAddData" :rules="rules" label-width="100px">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
        <div class="conBox">
          <el-form-item label="定期规则编码" prop="v_RuleCode">
            <el-input
              :disabled="isDisabled"
              v-model="modeAddData.v_RuleCode"
              placeholder="请按照对应编码规范输入"
            />
          </el-form-item>
          <el-form-item label="定期规则名称" prop="v_RuleName">
            <el-input v-model="modeAddData.v_RuleName" />
          </el-form-item>
          <el-form-item label="开始执行时间" prop="v_RangeStartTime">
            <el-time-picker
                v-model="modeAddData.v_RangeStartTime"
                value-format="HH:mm:ss"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="选择时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="定期规则描述" prop="v_Description" class='description-label'>
            <el-input
              v-model="modeAddData.v_Description"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>重复范围</span>
        </span>
        <div class="conBox">
          <el-form-item label="开始日期" prop="d_RangeStartDate">
            <el-date-picker
                class="dpicker"
                value-format="yyyy-MM-dd"
                v-model="modeAddData.d_RangeStartDate"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束条件">
              <el-form-item id="firstItem"><el-radio v-model="modeAddData.i_RangeEndMode" label="0">无结束日期</el-radio></el-form-item>
              <el-form-item><el-radio v-model="modeAddData.i_RangeEndMode" label="1">重复&nbsp;&nbsp;<el-input-number v-model="endCondition.i_RangeSend" controls-position="right" :min="1" size="small"></el-input-number>&nbsp;&nbsp;次后结束</el-radio></el-form-item>
              <el-form-item><el-radio v-model="modeAddData.i_RangeEndMode" label="2">结束日期&nbsp;&nbsp;<el-date-picker
                class="dpicker"
                value-format="yyyy-MM-dd"
                v-model="endCondition.d_RangeEndDate"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期">
               </el-date-picker></el-radio>
              </el-form-item>
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>定期模式</span>
        </span>
        <div class="conBox">
          <el-form-item label="定期模式" prop="v_RuleMode">
              <el-radio-group v-model="modeAddData.v_RuleMode" @change='changeRuleMode'>
                <el-radio label="second">按秒</el-radio>
                <el-radio label="day">按天</el-radio>
                <el-radio label="week">按周</el-radio>
                <el-radio label="month">按月</el-radio>
                <el-radio label="year">按年</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="按秒" v-if="secondFlag">
              每间隔&nbsp;&nbsp;<el-input-number v-model="secondCondition.num" controls-position="right" :min="1" :max="86399" size="small"></el-input-number>&nbsp;&nbsp;秒
          </el-form-item>
          <el-form-item label="按天" v-if="dayFlag">
              <el-form-item id="firstItem"><el-radio v-model="dayCondition.label" label="1">每&nbsp;&nbsp;<el-input-number v-model="dayCondition.dayNum" controls-position="right" :min="1" size="small"></el-input-number>&nbsp;&nbsp;天</el-radio></el-form-item>
              <el-form-item><el-radio v-model="dayCondition.label" label="2">每个工作日</el-radio></el-form-item>
          </el-form-item>
          <el-form-item label="按周" id="formItem" v-if="weekFlag">
              重复间隔为&nbsp;&nbsp;<el-input-number v-model="weekCondition.i_WeekNumAfter" controls-position="right" size="small"></el-input-number>&nbsp;&nbsp;周后的:
              <el-form-item>
                  <el-checkbox-group v-model="weekCondition.v_WeekRange">
                    <el-checkbox label="1">星期一</el-checkbox>
                    <el-checkbox label="2">星期二</el-checkbox>
                    <el-checkbox label="3">星期三</el-checkbox>
                    <el-checkbox label="4">星期四</el-checkbox>
                    <el-checkbox label="5">星期五</el-checkbox>
                    <el-checkbox label="6">星期六</el-checkbox>
                    <el-checkbox label="7">星期日</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          </el-form-item>
          <el-form-item label="按月" id="formItem" v-if="monthFlag">
              <el-form-item id="firstItem">
                  <el-radio v-model="monthCondition.label" label="1">
                      每&nbsp;&nbsp;<el-input-number v-model="monthCondition.num1" :min="1" :max='12' controls-position="right" size="small"></el-input-number>&nbsp;&nbsp;个月的第&nbsp;&nbsp;
                      <el-input-number v-model="monthCondition.num2" :min="1" :max='31' controls-position="right" size="small"></el-input-number>&nbsp;&nbsp;日
                  </el-radio>
              </el-form-item>
              <el-form-item>
                  <el-radio v-model="monthCondition.label" label="2">
                      每&nbsp;&nbsp;<el-input-number v-model="monthCondition.num3" :min="1" :max='12' controls-position="right" size="small"></el-input-number>&nbsp;&nbsp;个月的&nbsp;&nbsp;
                      <el-select v-model="monthCondition.value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="monthCondition.value1" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                  </el-radio>
              </el-form-item>
          </el-form-item>
          <el-form-item label="按年" id="formItem" v-if="yearFlag">
              重复间隔为&nbsp;&nbsp;<el-input-number v-model="yearCondition.num1" :min="1" controls-position="right" size="small"></el-input-number>&nbsp;&nbsp;年后的:
              <el-form-item>
                  <el-radio v-model="yearCondition.label" label="1">
                      时间一&nbsp;&nbsp;
                      <el-select v-model="yearCondition.value" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                      </el-select>
                      <el-input-number v-model="yearCondition.num2" :min="1" :max='31' controls-position="right" size="small"></el-input-number>
                      &nbsp;&nbsp;日
                  </el-radio>
              </el-form-item>
              <el-form-item>
                  <el-radio v-model="yearCondition.label" label="2">
                      时间二&nbsp;&nbsp;
                      <el-select v-model="yearCondition.value1" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp;的
                    <el-select v-model="yearCondition.value2" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="yearCondition.value3" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                  </el-radio>
              </el-form-item>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'regularlyEnforceRules',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [windowRed, logMixin],
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
      isDisabled: false,
      modeAddData: {
        // 编码
        v_RuleCode: '',
        // 名称
        v_RuleName: '',
        // 开始执行时间
        v_RangeStartTime: '',
        // 描述
        v_Description: '',
        // 开始日期
        d_RangeStartDate: '',
        // 结束条件
        i_RangeEndMode: '0',
        // 定期模式
        v_RuleMode: 'second'
      },
      // 结束条件
      endCondition: {
        // 重复次数
        i_RangeSend: 1,
        // 结束日期
        d_RangeEndDate: ''
      },
      oldEndCondition: {},
      // 按秒
      secondCondition: {
        num: 1
      },
      oldSecondCondition: {},
      // 按天条件
      dayCondition: {
        label: '1',
        dayNum: 1
      },
      oldDayCondition: {},
      // 按周条件
      weekCondition: {
        i_WeekNumAfter: 1,
        v_WeekRange: []
      },
      oldWeekCondition: {},
      // 按月条件
      monthCondition: {
        label: '1',
        num1: 1,
        num2: 1,
        num3: 1,
        value: '',
        value1: ''
      },
      oldMonthCondition: {},
      yearCondition: {
        label: '1',
        num1: 1,
        num2: 1,
        value: '',
        value1: '',
        value2: '',
        value3: ''
      },
      oldYearCondition: {},
      formRed: false,
      options: [{
        value: '1',
        label: '第一个'
      }, {
        value: '2',
        label: '第二个'
      }, {
        value: '3',
        label: '第三个'
      }, {
        value: '4',
        label: '第四个'
      }],
      options1: [{
        value: '1',
        label: '星期一'
      }, {
        value: '2',
        label: '星期二'
      }, {
        value: '3',
        label: '星期三'
      }, {
        value: '4',
        label: '星期四'
      }, {
        value: '5',
        label: '星期五'
      }, {
        value: '6',
        label: '星期六'
      }, {
        value: '7',
        label: '星期日'
      }],
      options2: [{
        value: '1',
        label: '1月'
      }, {
        value: '2',
        label: '2月'
      }, {
        value: '3',
        label: '3月'
      }, {
        value: '4',
        label: '4月'
      }, {
        value: '5',
        label: '5月'
      }, {
        value: '6',
        label: '6月'
      }, {
        value: '7',
        label: '7月'
      }, {
        value: '8',
        label: '8月'
      }, {
        value: '9',
        label: '9月'
      }, {
        value: '10',
        label: '10月'
      }, {
        value: '11',
        label: '11月'
      }, {
        value: '12',
        label: '12月'
      }],
      secondFlag: true,
      dayFlag: false,
      weekFlag: false,
      monthFlag: false,
      yearFlag: false,
      rules: {
        v_RuleCode: [
          { required: true, message: '请输入对应定期规则编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_RuleName: [
          { required: true, message: '请输入定期规则名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_RangeStartTime: [{ required: true, message: '请选择开始执行时间', trigger: 'blur' }],
        v_RuleMode: [{ required: true, message: '请选择执行模式', trigger: 'blur' }]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24
        }
      },
      // 小红点功能
      oldModAddData: {}
    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    endCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldEndCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    secondCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldSecondCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    dayCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldDayCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    weekCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldWeekCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    monthCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldMonthCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    },
    yearCondition: {
      handler: function (data) {
        if (JSON.stringify(this.oldYearCondition) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    this.getYearWeek(new Date())
    this.getWeek(new Date())
    this.getMonth(new Date())
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modeAddData, formData)
      this.$set(this.modeAddData, 'i_Id', formData.i_Id)
      // 判断结束条件
      if (formData.i_RangeEndMode === '1') {
        this.endCondition.i_RangeSend = Number(formData.i_RangeSend)
      } else if (formData.i_RangeEndMode === '2') {
        this.endCondition.d_RangeEndDate = formData.d_RangeEndDate
      }
      // 判断定期模式
      if (formData.v_RuleMode === 'second') { // 按秒
        this.secondFlag = true
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = false
        this.secondCondition.num = Number(formData.i_SecondRange)
      } else if (formData.v_RuleMode === 'day') { // 按天
        this.secondFlag = false
        this.dayFlag = true
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = false
        let dayObj = JSON.parse(formData.v_DaysModel)
        let label = Object.keys(dayObj)[0]
        this.dayCondition.label = label
        if (this.dayCondition.label === '1') {
          this.dayCondition.dayNum = dayObj[1].days
        }
      } else if (formData.v_RuleMode === 'week') { // 按周
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = true
        this.monthFlag = false
        this.yearFlag = false
        this.weekCondition.i_WeekNumAfter = Number(formData.i_WeekNumAfter)
        this.weekCondition.v_WeekRange = JSON.parse(formData.v_WeekRange)
      } else if (formData.v_RuleMode === 'month') { // 按月
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = true
        this.yearFlag = false
        let monthObj = JSON.parse(formData.v_MonthData)
        let label = Object.keys(monthObj)[0]
        this.monthCondition.label = label
        if (this.monthCondition.label === '1') {
          this.monthCondition.num1 = monthObj[1].month
          this.monthCondition.num2 = monthObj[1].days
        } else if (this.monthCondition.label === '2') {
          this.monthCondition.num3 = monthObj[2].month
          this.monthCondition.value = monthObj[2].order
          this.monthCondition.value1 = monthObj[2].week
        }
      } else if (formData.v_RuleMode === 'year') { // 按年
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = true
        this.yearCondition.num1 = Number(formData.i_YearNumAfter)
        let yearObj = JSON.parse(formData.v_YearData)
        let label = Object.keys(yearObj)[0]
        this.yearCondition.label = label
        if (this.yearCondition.label === '1') {
          this.yearCondition.value = yearObj[1].month
          this.yearCondition.num2 = yearObj[1].days
        } else if (this.yearCondition.label === '2') {
          this.yearCondition.value1 = yearObj[2].month
          this.yearCondition.value2 = yearObj[2].order
          this.yearCondition.value3 = yearObj[2].week
        }
      }
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
    this.oldEndCondition = Object.assign({}, this.endCondition)
    this.oldSecondCondition = Object.assign({}, this.secondCondition)
    this.oldDayCondition = Object.assign({}, this.dayCondition)
    this.oldWeekCondition = Object.assign({}, this.weekCondition)
    this.oldMonthCondition = Object.assign({}, this.monthCondition)
    this.oldYearCondition = Object.assign({}, this.yearCondition)
  },
  methods: {
    // 计算当前时间是第几周
    getYearWeek (date) {
      let currentDay = new Date(date)
      let theSaturday = currentDay.getDate() + (6 - currentDay.getDay())
      this.yearCondition.value2 = String(Math.ceil(theSaturday / 7))
      this.monthCondition.value = String(Math.ceil(theSaturday / 7))
    },
    // 计算当前时间是星期几
    getWeek (date) {
      if (date.getDay() !== 0) {
        this.yearCondition.value3 = String(date.getDay())
        this.monthCondition.value1 = String(date.getDay())
        this.weekCondition.v_WeekRange.push(String(date.getDay()))
      } else {
        this.yearCondition.value3 = '7'
        this.monthCondition.value1 = '7'
        this.weekCondition.v_WeekRange.push('7')
      }
    },
    // 计算当前时间是几月份
    getMonth (date) {
      this.yearCondition.value = String(date.getMonth() + 1)
      this.yearCondition.value1 = String(date.getMonth() + 1)
    },
    changeRuleMode (val) {
      if (val === 'second') {
        this.secondFlag = true
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = false
      } else if (val === 'day') {
        this.secondFlag = false
        this.dayFlag = true
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = false
      } else if (val === 'week') {
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = true
        this.monthFlag = false
        this.yearFlag = false
      } else if (val === 'month') {
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = true
        this.yearFlag = false
      } else if (val === 'year') {
        this.secondFlag = false
        this.dayFlag = false
        this.weekFlag = false
        this.monthFlag = false
        this.yearFlag = true
      }
    },
    commit () {
      let params = {
        ...this.modeAddData
      }
      // 判断结束条件
      if (this.modeAddData.i_RangeEndMode === '1') {
        this.$set(params, 'i_RangeSend', this.endCondition.i_RangeSend)
      } else if (this.modeAddData.i_RangeEndMode === '2') {
        this.$set(params, 'd_RangeEndDate', this.endCondition.d_RangeEndDate)
      }
      // 判断定期模式
      if (this.modeAddData.v_RuleMode === 'second') { // 按秒
        this.$set(params, 'i_SecondRange', this.secondCondition.num)
      } else if (this.modeAddData.v_RuleMode === 'day') { // 按天
        if (this.dayCondition.label === '1') {
          let dayData = {
            1: {
              days: this.dayCondition.dayNum
            }
          }
          this.$set(params, 'v_DaysModel', JSON.stringify(dayData))
        }
        if (this.dayCondition.label === '2') {
          let dayData = {
            2: {
              days: ''
            }
          }
          this.$set(params, 'v_DaysModel', JSON.stringify(dayData))
        }
      } else if (this.modeAddData.v_RuleMode === 'week') { // 按周
        this.$set(params, 'i_WeekNumAfter', this.weekCondition.i_WeekNumAfter)
        this.$set(params, 'v_WeekRange', JSON.stringify(this.weekCondition.v_WeekRange))
      } else if (this.modeAddData.v_RuleMode === 'month') { // 按月
        if (this.monthCondition.label === '1') {
          let monthData = {
            1: {
              month: this.monthCondition.num1,
              days: this.monthCondition.num2
            }
          }
          this.$set(params, 'v_MonthData', JSON.stringify(monthData))
        }
        if (this.monthCondition.label === '2') {
          let monthData = {
            2: {
              month: this.monthCondition.num3,
              order: this.monthCondition.value,
              week: this.monthCondition.value1
            }
          }
          this.$set(params, 'v_MonthData', JSON.stringify(monthData))
        }
      } else if (this.modeAddData.v_RuleMode === 'year') { // 按年
        if (this.yearCondition.label === '1') {
          let yearData = {
            1: {
              month: this.yearCondition.value,
              days: this.yearCondition.num2
            }
          }
          this.$set(params, 'i_YearNumAfter', this.yearCondition.num1)
          this.$set(params, 'v_YearData', JSON.stringify(yearData))
        }
        if (this.yearCondition.label === '2') {
          let yearData = {
            2: {
              month: this.yearCondition.value1,
              order: this.yearCondition.value2,
              week: this.yearCondition.value3
            }
          }
          this.$set(params, 'i_YearNumAfter', this.yearCondition.num1)
          this.$set(params, 'v_YearData', JSON.stringify(yearData))
        }
      }
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.saveRule(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
              }
              this.isDisabled = true
              this.oldModAddData = Object.assign({}, this.modeAddData)
              this.$message.success(res.msg)
              let params = this.$store.state.paginations['CC_VW_regularlyRules']
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
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
.add-org-form {
  .el-form {
    overflow-x: hidden;
    // border: none !important;
    padding: 16px;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin: 15px 0 12px;
      padding: 16px 0;
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .conBox {
          .el-input--prefix /deep/ .el-input__inner{
            padding-left: 30px;
          }
          #firstItem{
              margin-top: 0!important;
          }
          /deep/ .el-checkbox {
              margin: 0 20px 0 0;
          }
          #formItem {
            /deep/ .el-form-item__content {
                width: 400px;
            }
            /deep/ .el-input__inner {
                width: 100px;
            }
          }
      }
    }
    /deep/ .el-switch {
      width: 40px;
    }
  }
}
</style>
