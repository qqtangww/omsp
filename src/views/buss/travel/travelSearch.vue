<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 15:24:14
 * @LastEditTime: 2019-08-21 16:15:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="selectComponent">
    <div class="title">
      <i class="iconfont icon-biaotibiao"></i>
      差旅筛选查询
    </div>
    <el-form inline-message ref="form" class="form-travel-selfSearch" :model="formSearch">
      <!-- 日期 -->
      <div class="date-container clearfix">
        <el-form-item label="差旅申请：" class="w-236" label-width="75px">
          <el-date-picker
            v-model="ApplyDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报销申请：" class="w-236" label-width="80px">
          <el-date-picker
            v-model="PaymentDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结算日期：" class="w-236" label-width="80px">
          <el-date-picker
            v-model="RecieveDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </div>
      <!-- 查询项 -->
      <div class="input-container clearfix">
        <el-form-item label="申请人：" class="w-150" label-width="75px">
          <el-input v-model="formSearch.v_WorkerName" placeholder="请输入姓名或工号"></el-input>
        </el-form-item>
        <el-form-item label="交付PM：" class="w-160" label-width="80px">
          <el-input v-model="formSearch.v_VAccount" placeholder="请输入PM姓名或V账号"></el-input>
        </el-form-item>
        <el-form-item label="客户部门：" class="w-140" label-width="80px">
          <el-select v-model="formSearch.travelStatus" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in status"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" class="w-142" label-width="80px">
          <el-select v-model="formSearch.travelStatus" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in status"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="makeSure">
        <el-button
          v-for="(item,index) in configData.confOperation.tools"
          :key="index"
          :icon="item.iconurl"
          @click="dialogButtonClick(item)"
        >{{item.operationname}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import buttonClick from '@/common/js/mixins/buttonClick'
export default {
  mame: 'travelSearch',
  data () {
    return {
      // 快捷日期选项
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      //  查询栏绑定的数据
      formSearch: {},
      //   部门列表
      orgList: [],
      status: [
        {
          label: '差旅未送审',
          value: '10'
        },
        {
          label: '差旅待审批',
          value: '11'
        },
        {
          label: '差旅已驳回',
          value: '12'
        },
        {
          label: '差旅已审批',
          value: '13'
        },
        {
          label: '报销未送审',
          value: '20'
        },
        {
          label: '报销未审批',
          value: '21'
        },
        {
          label: '报销已驳回',
          value: '22'
        },
        {
          label: '报销已审批',
          value: '23'
        },
        {
          label: '待结算',
          value: '30'
        },
        {
          label: '已结算',
          value: '31'
        }
      ],
      ApplyDate: '',
      PaymentDate: '',
      RecieveDate: ''
    }
  },
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [buttonClick],
  watch: {
    shareData: {
      deep: true,
      handler (nv) {
        this.getSearchTime()
        let data = Object.assign(nv, this.formSearch)
        this.$emit('changeShareData', JSON.parse(JSON.stringify(data)))
      }
    }
  },
  methods: {
    // 查询
    searchtableData () {
      this.getSearchTime()
      let data = Object.assign(this.shareData, this.formSearch)
      this.$emit('changeShareData', JSON.parse(JSON.stringify(data)))
    },
    // 重置
    resetForm () {
      this.formSearch.v_WorkerName = ''
      this.formSearch.v_VAccount = ''
      this.formSearch.travelStatus = ''
      this.ApplyDate = ''
      this.PaymentDate = ''
      this.RecieveDate = ''
    },
    getSearchTime () {
      if (this.ApplyDate.length > 0) {
        this.formSearch.applyStartDate = this.ApplyDate[0]
        this.formSearch.applyEndDate = this.ApplyDate[1]
      }
      if (this.PaymentDate.length > 0) {
        this.formSearch.paymentStartDate = this.PaymentDate[0]
        this.formSearch.paymentEndDate = this.PaymentDate[1]
      }
      if (this.RecieveDate.length > 0) {
        this.formSearch.recieveStartDate = this.RecieveDate[0]
        this.formSearch.recieveEndDate = this.RecieveDate[1]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/travelcss.scss";
.form-travel-selfSearch {
  width: 1050px;
  box-sizing: border-box;
  padding: 16px 8px 16px 24px;
  .input-container {
    > div {
      float: left;
      margin-right: 34px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .date-container {
    @extend .input-container;
    > div {
      margin-right: 34px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .w-236 {
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 236px;
    }
    /deep/ .el-input__inner {
      width: 236px;
    }
  }
  .w-140 {
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 140px;
    }
    /deep/ .el-input__inner {
      width: 140px;
    }
  }
  .w-142 {
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 142px;
    }
    /deep/ .el-input__inner {
      width: 142px;
    }
  }
  .w-150 {
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 150px;
    }
    /deep/ .el-input__inner {
      width: 150px;
    }
  }
  .w-160 {
    .el-date-editor--daterange.el-input,
    .el-date-editor--daterange.el-input__inner,
    .el-date-editor--timerange.el-input,
    .el-date-editor--timerange.el-input__inner {
      width: 160px;
    }
    /deep/ .el-input__inner {
      width: 160px;
    }
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .makeSure {
    padding-left: 75px;
    box-sizing: border-box;
  }
}
</style>
