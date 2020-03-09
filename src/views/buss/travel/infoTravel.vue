<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 15:23:15
 * @LastEditTime: 2019-08-14 12:16:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="travel-info add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData='configData' v-on="$listeners" :shareData='shareData' @applyReject='applyReject' @submitApply='submitApply' @getData='getData' @getButtonConfig='closeFun'></action-bar>
    </div>
    <el-form inline-message class="form-info dialog-form" id="item-margin-top-0" label-position="right" label-width="105px">
      <!-- 基本信息 -->
      <div class="dialog-form-info">
        <span class="info-title"><i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="差旅单名称:">{{currentNode.v_TravelApplyName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="差旅流水号:">{{currentNode.v_PaymentID}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人:">
              <el-tooltip class="item" effect="dark" :disabled="true" :content="currentNode.v_WorkerName + '['+currentNode.v_UserID+']'" placement="top">
                <div>
                  {{currentNode.v_WorkerName}} <span id="span-userid">{{"["+currentNode.v_UserID+"]"}}</span>
                </div>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="V账号:">{{currentNode.v_VAccount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="交付PM:">{{currentNode.v_TravelApplyUserName}} <span id="span-userid">{{"["+currentNode.v_TravelApplyUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织架构:">{{ $moment(currentNode.d_TravelApplyDate).format('YYYY-MM-DD HH:mm') }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户部门:">{{ currentNode.v_TravelApplyUserName }}</el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人:">{{currentNode.v_TravelApplyUserName}} <span id="span-userid">{{"["+currentNode.v_TravelApplyUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:">{{ $moment(currentNode.d_TravelApplyDate).format('YYYY-MM-DD HH:mm') }}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 结算信息 form info -->
      <div class="dialog-form-info" v-if="showRecieveInfo">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 结算信息</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算人:">{{currentNode.v_RecieveUserID}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算日期:">{{currentNode.d_RecieveDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算创建人:">{{currentNode.v_RecieveCreateUserName}} <span id="span-userid">{{"["+currentNode.v_RecieveCreateUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算创建时间:">{{currentNode.d_RecieveCreateDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结算费用:" class="expectedFee">{{currentNode.v_RecieveFee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:">{{currentNode.i_RecieveStatus === '30' ? '待结算' : (currentNode.i_RecieveStatus === '31' ? '已结算' : '' ) }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注:" class="form-remark margin-top-0" id="form-heightauto">
          <div class="form-travel-remark">{{currentNode.v_RecieveRemark}}</div>
        </el-form-item>
        <div class="flagBox" :class="currentNode.i_RecieveStatus === '31' ? 'C6CEEE1' : 'CFFDD98'">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">3</span>
        </div>
      </div>
      <!-- 差旅报销 form info -->
      <div class="dialog-form-info" v-if="showPaymentInfo">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅报销</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批人:" v-if="currentNode.v_PaymentApprovalUserName || currentNode.v_PaymentApprovalUserID">{{currentNode.v_PaymentApprovalUserName}} <span id="span-userid">{{"["+currentNode.v_PaymentApprovalUserID+"]"}}</span></el-form-item>
            <el-form-item label="审批人:" v-else>暂无</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批时间:" v-if="currentNode.d_PaymentApprovalDate !== '0000-00-00 00:00:00'">{{currentNode.d_PaymentApprovalDate }}</el-form-item>
            <el-form-item label="审批时间:" v-else>暂无</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请创建人:">{{currentNode.v_PaymentUserName}} <span id="span-userid">{{"["+currentNode.v_PaymentUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报销申请时间:">{{currentNode.d_PaymentApplyDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="往返地:">{{currentNode.v_DeparturePlace +" ~ "+ currentNode.v_ReturnPlace}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="往返日期:">{{paymentDepartureDate +" ~ "+ paymentReturnDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报销费用:" class="expectedFee">{{currentNode.v_PaymentFee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:">{{currentNode.i_PaymentStatus === '23' ? '已审批' : (currentNode.i_PaymentStatus === '22' ? '已驳回' : (currentNode.i_PaymentStatus === '21' ? '待审批' : (currentNode.i_PaymentStatus === '20' ? '未送审' : '' ) ) ) }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件上传:" class="dialog-form-info-upload-item">
          <div class="dialog-form-info-upload">
            <el-upload
              :action="action"
              list-type="picture-card"
              multiple
              accept=".jpg, .PNG"
              :on-preview="handlePictureCardPreview"
              :file-list="paymentImgList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body class="img-dialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="备注:" class="form-remark" id="form-heightauto">
          <div class="form-travel-remark">{{ currentNode.v_PaymentRemark }}</div>
        </el-form-item>
        <div class="flagBox" :class="currentNode.i_PaymentStatus === '23' ? 'C6CEEE1' : 'CFFDD98'">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">2</span>
        </div>
      </div>
      <!-- 差旅申请 form info -->
      <div class="dialog-form-info" v-if="showApplyTravelInfo">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅申请</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请创建人:">{{currentNode.v_TravelApplyUserName}} <span id="span-userid">{{"["+currentNode.v_TravelApplyUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="差旅申请时间:">{{currentNode.d_TravelApplyDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预计往返地:">{{currentNode.v_ExpectedDeparturePlace +" ~ "+ currentNode.v_ExpectedReturnPlace}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计往返日期:">{{applyDepartureDate +" ~ "+ applyReturnDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="预计差旅金额:" class="expectedFee">{{currentNode.v_ExpectedFee}}</el-form-item>
        <el-form-item label="附件上传:" class="dialog-form-info-upload-item">
          <div class="dialog-form-info-upload">
            <el-upload
              :action="action"
              list-type="picture-card"
              multiple
              accept=".jpg, .PNG"
              :on-preview="handlePictureCardPreview"
              :file-list="travelApplyImgList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body class="img-dialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="备注:" class="form-remark" id="form-heightauto">
          <div class="form-travel-remark">{{currentNode.v_TravelRemark}}</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>

import { API } from '@/api/basic'
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      // 展示结算信息info
      showRecieveInfo: false,
      // 展示报销信息info
      showPaymentInfo: false,
      // 展示申请信息info
      showApplyTravelInfo: false,
      action: '',
      // currentNode: {},
      dialogVisible: false,
      dialogImageUrl: '',
      // 出发日期
      expectedDepartureDate: '',
      // 返程日期
      expectedReturnDate: '',

      // ----差旅报销 form info----
      // 附件list
      paymentImgList: [],
      // 出发日期
      paymentDepartureDate: '',
      // 返程日期
      paymentReturnDate: '',
      // 报销申请审批状态 20-未送审 21 报销申请待审批 22 -报销已驳回 23-报销申请已审批
      paymentStatus: { uncommit: '20', commit: '21', reject: '22', success: '23' },

      // ----差旅申请 form info----
      // 附件列表
      travelApplyImgList: [],
      // 出发日期
      applyDepartureDate: '',
      // 返程日期
      applyReturnDate: ''
    }
  },
  watch: {
    shareData: {
      handler (newVal) {
        let travelStatus = newVal.i_Status
        // 结算
        if (Number(travelStatus) >= 30) {
          this.showRecieveInfo = true
          this.showPaymentInfo = true
          this.showApplyTravelInfo = true
          // 预计往返日期 报销
          this.paymentDepartureDate = this.$moment(this.shareData.d_DepartureDate).format('YYYY-MM-DD')
          this.paymentReturnDate = this.$moment(this.shareData.d_ReturnDate).format('YYYY-MM-DD')
          // 预计往返日期 申请
          this.applyDepartureDate = this.$moment(this.shareData.d_ExpectedDepartureDate).format('YYYY-MM-DD')
          this.applyReturnDate = this.$moment(this.shareData.d_ExpectedReturnDate).format('YYYY-MM-DD')
          this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
          this.paymentImgList = JSON.parse(this.shareData.v_PaymentFileUrl || '[]')
        } else if (Number(travelStatus) >= 20) {
        // 报销
          this.showPaymentInfo = true
          this.showApplyTravelInfo = true
          // 预计往返日期 报销
          this.paymentDepartureDate = this.$moment(this.shareData.d_DepartureDate).format('YYYY-MM-DD')
          this.paymentReturnDate = this.$moment(this.shareData.d_ReturnDate).format('YYYY-MM-DD')
          // 预计往返日期 申请
          this.applyDepartureDate = this.$moment(this.shareData.d_ExpectedDepartureDate).format('YYYY-MM-DD')
          this.applyReturnDate = this.$moment(this.shareData.d_ExpectedReturnDate).format('YYYY-MM-DD')
          this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
          this.paymentImgList = JSON.parse(this.shareData.v_PaymentFileUrl || '[]')
        } else {
          // 申请
          this.showApplyTravelInfo = true
          // 预计往返日期 申请
          this.applyDepartureDate = this.$moment(this.shareData.d_ExpectedDepartureDate).format('YYYY-MM-DD')
          this.applyReturnDate = this.$moment(this.shareData.d_ExpectedReturnDate).format('YYYY-MM-DD')
          this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.action = API.defaults.baseURL + 'sys/Travel/uploadTravelFile'
  },
  computed: {
    currentNode () {
      return this.shareData
    },
    travelStatus () {
      return this.shareData.i_Status
    },
    // 是否是leader
    isLeader () {
      return this.shareData.v_Operator === 'leader'
    },
    // 是否展示同意驳回
    showRole () {
      return !(this.shareData.i_Status === '13' || this.shareData.i_Status === '23' || this.shareData.i_Status === '30' || this.shareData.i_Status === '31')
    }
  },
  methods: {
    getData () {},
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 传参给父组件 用来关闭弹框
    closeParentDialog () {
      this.$emit('closeDialog', false)
    },
    // 驳回审批
    applyReject (params) {
      this.$confirm('是否驳回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.showPaymentInfo) {
          // 驳回 报销
          this.saveDataAPI('temTravelPaymentReject', { i_Id: this.currentNode.i_Id }, params)
        } else if (this.showApplyTravelInfo) {
          // 驳回 差旅申请
          this.saveDataAPI('temTravelApplyReject', { i_Id: this.currentNode.i_Id }, params)
        }
      })
    },
    // 同意审批传
    submitApply (params) {
      this.$confirm('是否同意？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 同意 报销
        if (this.showPaymentInfo) {
          this.saveDataAPI('temTravelsubmitPayment', { i_Id: this.currentNode.i_Id }, params)
        } else if (this.showApplyTravelInfo) {
          // 同意 差旅申请
          this.saveDataAPI('temTravelSubmitApply', { i_Id: this.currentNode.i_Id }, params)
        }
      })
    },
    saveDataAPI (api, params, flag) {
      cgiService[api](params).then(res => {
        if (!res.code) {
          // this.modeAddData.i_Id = res.iId
          this.$message.success(res.msg)
          // 这里的分页传参考虑到之后要重新做差旅,暂时不做处理
          // let param = this.$store.state.paginations
          // this.$emit('getTableData', param)
          this.$emit('getButtonConfig', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss">
@import "@/assets/css/travelcss.scss";
.form-info{
  overflow: auto;
}
</style>
