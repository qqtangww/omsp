<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 17:27:38
 * @LastEditTime: 2019-08-14 11:39:01
 * @LastEditors: Please set LastEditors
 -->
<template>
<div class='travel-modify add-modify-form'>
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData='configData' v-on="$listeners" :shareData='shareData' @sumitForm='formCommit' @getButtonConfig='closeFun'></action-bar>
    </div>
    <!-- 添加编辑差旅申请 -->
    <el-form inline-message v-if="showTravelForm" ref="form" :model="modeAddData" :rules="rules" label-width="130px" class="dialog-form dialog-form-apply">
      <div class="dialog-form-info">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 基本信息</span>
        <el-form-item label="差旅流水号" class="w-380" v-if="isModify">
          <el-input v-model="modeAddData.v_PaymentID" :disabled="isModify"/>
        </el-form-item>
        <el-form-item label="申请单名称" prop="v_TravelApplyName" class="w-380">
          <el-input v-model="modeAddData.v_TravelApplyName"/>
        </el-form-item>
        <el-form-item label="申请人" prop="v_WorkerName" class="w-380">
          <el-autocomplete
            class="inline-input"
            v-model="modeAddData.v_WorkerName"
            :fetch-suggestions="searchStaff"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="workerNameChange">
            <template slot-scope="{ item }">
              <div id="travel-apply">
                <span class="selWorkerOption">{{ item.v_WorkerName }}</span>
                <span class="selWorkerOption">{{ item.v_UserID }}</span>
                <span class="selWorkerOption">{{ item.v_OrgFullName }}</span>
                <span class="selWorkerOption">{{ item.v_VAccount }}</span>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-row class="w-138">
          <el-col :span="11">
            <el-form-item label="工号" prop="v_UserID">
              <el-input v-model="modeAddData.v_UserID" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="V账号" prop="v_VAccount">
              <el-input v-model="modeAddData.v_VAccount" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="w-138">
          <el-col :span="11">
            <el-form-item label="交付PM" prop="v_UserID">
              <el-input v-model="modeAddData.v_UserID" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="组织架构" prop="v_VAccount">
              <el-input v-model="modeAddData.v_VAccount" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户部门" prop="v_VAccount" class="w-380">
          <el-input v-model="modeAddData.v_VAccount" disabled/>
        </el-form-item>
      </div>
      <div class="dialog-form-info">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅申请</span>
        <el-row class="w-138">
          <el-col :span="11">
            <el-form-item label="预计出发地" prop="v_ExpectedDeparturePlace">
              <el-autocomplete
                class="inline-input"
                @select="handleSelect"
                v-model="modeAddData.v_ExpectedDeparturePlace"
                :fetch-suggestions="querySearch"
                placeholder="城市"
                :trigger-on-focus="false"
                @focus="getCity"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="预计目的地" prop="v_ExpectedReturnPlace">
              <el-autocomplete
                v-model="modeAddData.v_ExpectedReturnPlace"
                :fetch-suggestions="querySearch"
                placeholder="城市"
                :trigger-on-focus="false"
                @focus="getCity"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="预计往返日期" prop="applyTravelDate"  class="w-380">
          <el-date-picker
            v-model="applyTravelDate"
            type="daterange"
            range-separator="至"
            start-placeholder="出发日期"
            end-placeholder="返程日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预估金额" class="w-138 font-bold" prop="v_ExpectedFee">
          <el-input-number v-model="modeAddData.v_ExpectedFee" :precision="2" :min="0.01" class="number-arrows"></el-input-number>
        </el-form-item>
        <el-form-item label="附件上传" class="form-upload w-380" prop="dialogImageUrl" id="form-heightauto">
          <el-upload
            :action="action"
            list-type="picture-card"
            :limit="3"
            name="travelPic"
            :before-upload="beforeAvatarUpload"
            accept=".jpg, .PNG"
            :file-list="travelApplyImgList"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">至多上传3张，仅支持jpg、png格式，单个附件不可大于2M </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body class="img-dialog">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="备注" id="form-heightauto" class="w-380 description-label">
          <el-input
            v-model="modeAddData.v_TravelRemark"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 7, maxRows: 8}"/>
        </el-form-item>
        <div class="flagBox CFFDD98">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">1</span>
        </div>
      </div>
    </el-form>
    <!-- 差旅报销和差旅结算表单 -->
    <el-form inline-message class="form-info dialog-form dialog-form-payment" id="item-margin-top-0" label-position="right" label-width="105px" v-else>
      <!-- 基本信息 form info -->
      <div class="dialog-form-info">
        <span class="info-title"><i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
        <el-row>
          <el-col :span="14">
            <el-form-item label="差旅单名称:">{{currentNode.v_TravelApplyName}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="差旅流水号:">{{currentNode.v_PaymentID}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="申请人:">{{currentNode.v_WorkerName}} <span id="span-userid">{{"["+currentNode.v_UserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="V账号:">{{currentNode.v_VAccount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="交付PM:">{{currentNode.v_WorkerName}} <span id="span-userid">{{"["+currentNode.v_UserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="组织架构:">{{currentNode.v_VAccount}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户部门:">{{currentNode.v_VAccount}}</el-form-item>
        <el-row>
          <el-col :span="14">
            <el-form-item label="创建人:">{{currentNode.v_TravelApplyUserName}} <span id="span-userid">{{"["+currentNode.v_TravelApplyUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间:">{{ $moment(currentNode.d_TravelApplyDate).format('YYYY-MM-DD HH:mm') }}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 差旅结算 form 可编辑 -->
      <div class="dialog-form-info form-payment-box" v-if="showRecieveModify">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 结算信息</span>
        <el-form inline-message ref="formRecieve" :model="formRecieve" :rules="formRecieveRules" label-width="130px" id="form-payment">
          <el-row class="w-138">
            <el-col :span="11">
              <el-form-item label="结算金额" class="w-138 font-bold" prop="v_RecieveFee">
                <el-input-number v-model="formRecieve.v_RecieveFee" :precision="2" :min="0.01" class="number-arrows"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="结算日期" prop="d_RecieveDate" id="recieve-date">
                <el-date-picker
                  v-model="formRecieve.d_RecieveDate"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" id="form-heightauto" class="w-380 description-label">
            <el-input
              v-model="formRecieve.v_RecieveRemark"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 8}"/>
          </el-form-item>
        </el-form>
        <div class="flagBox CFFDD98">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">3</span>
        </div>
      </div>
      <!-- 差旅报销 form 可编辑 -->
      <div class="dialog-form-info form-payment-box" v-if="showPaymentModify">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅报销</span>
        <el-form inline-message ref="formPayment" :model="formPayment" :rules="formPaymentRules" label-width="130px" id="form-payment">
          <el-row class="w-138">
            <el-col :span="11">
              <el-form-item label="实际出发地" prop="v_DeparturePlace">
                <el-autocomplete
                  class="inline-input"
                  @select="handleSelect"
                  v-model="formPayment.v_DeparturePlace"
                  :fetch-suggestions="querySearch"
                  placeholder="城市"
                  :trigger-on-focus="false"
                  @focus="getCity"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实际目的地" prop="v_ReturnPlace">
                <el-autocomplete
                  v-model="formPayment.v_ReturnPlace"
                  :fetch-suggestions="querySearch"
                  placeholder="城市"
                  :trigger-on-focus="false"
                  @focus="getCity"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="实际往返日期" class="w-380">
            <el-date-picker
              v-model="paymentDate"
              type="daterange"
              range-separator="至"
              start-placeholder="出发日期"
              end-placeholder="返程日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报销金额" class="w-138 font-bold" prop="v_PaymentFee" placeholder="请输出报销金额">
            <el-input-number v-model="formPayment.v_PaymentFee" :precision="2" :min="0.01" class="number-arrows"></el-input-number>
          </el-form-item>
          <el-form-item label="附件上传" class="form-upload w-380" prop="dialogImageUrl" id="form-heightauto">
            <el-upload
              :action="action"
              list-type="picture-card"
              :limit="3"
              name="travelPic"
              :before-upload="beforeAvatarUpload"
              accept=".jpg, .PNG"
              :file-list="uploadImgPayment"
              :on-preview="handlePictureCardPreview"
              :on-success="paymentSuccess"
              :on-remove="paymentRemove">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">至多上传3张，仅支持jpg、png格式，单个附件不可大于2M </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body class="img-dialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="备注" id="form-heightauto" class="w-380 description-label">
            <el-input
              v-model="formPayment.v_PaymentRemark"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 8}"
            />
          </el-form-item>
        </el-form>
        <div class="flagBox CFFDD98">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">2</span>
        </div>
      </div>
      <!-- 差旅报销 form info -->
      <div class="dialog-form-info" v-if="showPaymentInfo">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅报销</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批人:">{{currentNode.v_PaymentApprovalUserName}} <span id="span-userid">{{"["+currentNode.v_PaymentApprovalUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批时间:">{{currentNode.d_PaymentApprovalDate}}</el-form-item>
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
      <div class="dialog-form-info">
        <span class="info-title"><i class="iconfont icon-gengxinjilu"></i> 差旅申请</span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请创建人:">{{currentNode.v_ApplyApprovalUserName}} <span id="span-userid">{{"["+currentNode.v_ApplyApprovalUserID+"]"}}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="差旅申请时间:">{{currentNode.d_TravelApprovalDate}}</el-form-item>
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
        <div class="flagBox" :class="currentNode.i_ApplyStatus === '13' ? 'C6CEEE1' : 'CFFDD98'">
          <i class="iconfont icon-shuqian"></i>
          <span class="flagNum">1</span>
        </div>
      </div>
    </el-form>
</div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import { API } from '@/api/basic'
export default {
  name: 'addTravelApply',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      // 上传文件路径
      action: '',
      // 差旅申请 上传的图片数组
      travelApplyImgList: [],
      modeAddData: {},
      // 申请差旅报销 和 差旅报销结算 绑定的字段
      currentNode: {},
      // 效验规则
      rules: {
        v_TravelApplyName: [
          { required: true, message: '请输入申请单名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_WorkerName: [
          { required: true, message: '请输入申请人', trigger: 'change' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_UserID: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_VAccount: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_ExpectedDeparturePlace: [
          { required: true, message: '请输入出发地', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_ExpectedReturnPlace: [
          { required: true, message: '请输入目的地', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_ExpectedFee: [
          { required: true, message: '请输入预估费用', trigger: 'blur' }
        ]
      },

      // 控制新增 编辑差旅弹框展示
      showTravelForm: false,
      // 控制流水号 显示隐藏
      isModify: false,
      // 控制结算可编辑 显示隐藏
      showRecieveModify: false,
      // 控制报销可编辑 显示隐藏
      showPaymentModify: false,
      // 控制报销info 显示隐藏
      showPaymentInfo: false,

      // 上传文件
      dialogImageUrl: '',
      dialogVisible: false,
      cityList: [],
      staffList: [],
      applyTravelDate: [],
      // 差旅申请审批状态 10-未送审 11 提交申请 12 -已驳回 13-出差申请已审批
      applyStatus: { uncommit: '10', commit: '11', reject: '12', success: '13' },
      // 图片列表
      fileList: [],

      // ----结算信息 form 可编辑----
      formRecieve: {
        d_RecieveDate: ''
      },
      formRecieveRules: {
        v_RecieveFee: [
          { required: true, message: '请输入结算费用', trigger: 'blur' }
        ],
        d_RecieveDate: [
          { required: true, message: '请输入结算日期', trigger: 'blur' }
        ] },

      // ----差旅报销 form 可编辑----
      formPayment: {},
      // 往返日期
      paymentDate: [],
      // 上传图片 数组
      uploadImgPayment: [],
      formPaymentRules: {
        v_DeparturePlace: [
          { required: true, message: '请输入出发地', trigger: 'blur' }
        ],
        v_ReturnPlace: [
          { required: true, message: '请输入目的地', trigger: 'blur' }
        ],
        v_PaymentFee: [
          { required: true, message: '请输入报销费用', trigger: 'blur' }
        ] },

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
      // travelApplyImgList: [],
      // 出发日期
      applyDepartureDate: '',
      // 返程日期
      applyReturnDate: ''
    }
  },
  computed: {
  },
  created () {
    this.action = API.defaults.baseURL + 'sys/Travel/uploadTravelFile'
    this.operationCode = this.$store.state.confsBtn.operationcode
    switch (this.operationCode) {
      // 新增差旅
      case 'addTravelApply':
        this.showTravelForm = true
        this.modeAddData = {}
        break
      // 编辑差旅-申请
      case 'modifyApply':
        this.showTravelForm = true
        this.modeAddData = JSON.parse(JSON.stringify(this.shareData))
        this.applyTravelDate[0] = this.shareData.d_ExpectedDepartureDate
        this.applyTravelDate[1] = this.shareData.d_ExpectedReturnDate
        this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
        break
      // 编辑差旅-报销
      case 'modifyPayment':
        this.showPaymentModify = true
        this.formPayment = JSON.parse(JSON.stringify(this.shareData))
        this.currentNode = JSON.parse(JSON.stringify(this.shareData))
        // 报销申请 编辑 附件
        if (this.shareData.v_PaymentFileUrl) {
          this.uploadImgPayment = JSON.parse(this.shareData.v_PaymentFileUrl || '[]')
          if (this.uploadImgPayment.length >= 3) {
            setTimeout(() => {
              document.querySelector('.dialog-form-apply .el-upload--picture-card').style.display = 'none'
            })
          }
        }
        // 预计往返日期 报销编辑表单
        this.paymentDate[0] = this.shareData.d_DepartureDate
        this.paymentDate[1] = this.shareData.d_DepartureDate
        // 预计往返日期 申请info表单
        this.applyDepartureDate = this.$moment(this.shareData.d_ExpectedDepartureDate).format('YYYY-MM-DD')
        this.applyReturnDate = this.$moment(this.shareData.d_ExpectedReturnDate).format('YYYY-MM-DD')
        this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
        break
      // 编辑差旅-结算
      case 'modifyRecieve':
        this.showRecieveModify = true
        this.showPaymentInfo = true
        this.currentNode = JSON.parse(JSON.stringify(this.shareData))
        // 预计往返日期 报销
        this.paymentDepartureDate = this.$moment(this.shareData.d_DepartureDate).format('YYYY-MM-DD')
        this.paymentReturnDate = this.$moment(this.shareData.d_ReturnDate).format('YYYY-MM-DD')
        // 预计往返日期 申请
        this.applyDepartureDate = this.$moment(this.shareData.d_ExpectedDepartureDate).format('YYYY-MM-DD')
        this.applyReturnDate = this.$moment(this.shareData.d_ExpectedReturnDate).format('YYYY-MM-DD')
        this.travelApplyImgList = JSON.parse(this.shareData.v_TravelApplyFileUrl || '[]')
        this.paymentImgList = JSON.parse(this.shareData.v_PaymentFileUrl || '[]')
        break

      default:
        break
    }
  },
  methods: {
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
    },
    // 差旅申请 上传图片成功回调
    handleAvatarSuccess (res, file) {
      if (!res.code) {
        let params = {}
        params.name = file.name
        params.url = file.response.picurl
        this.travelApplyImgList.push(params)
        if (this.travelApplyImgList.length >= 3) {
          document.querySelector('.dialog-form-apply .el-upload--picture-card').style.display = 'none'
        }
      }
    },
    // 差旅报销 上传图片成功回调
    paymentSuccess (res, file) {
      if (!res.code) {
        let params = {}
        params.name = file.name
        params.url = file.response.picurl
        this.uploadImgPayment.push(params)
        if (this.uploadImgPayment.length >= 3) {
          document.querySelector('.form-payment-box .el-upload--picture-card').style.display = 'none'
        }
      }
    },
    // 差旅申请 文件列表移除文件时的回调
    handleRemove (file, fileList) {
      this.travelApplyImgList.forEach((val, index) => {
        if (file.name === val.name) {
          this.travelApplyImgList.splice(index, 1)
        }
      })
      if (this.travelApplyImgList.length <= 3) {
        document.querySelector('.dialog-form-apply .el-upload--picture-card').style.display = 'inline-block'
      }
    },
    // 差旅报销 文件列表移除文件时的回调
    paymentRemove (file, fileList) {
      this.uploadImgPayment.forEach((val, index) => {
        if (file.name === val.name) {
          this.uploadImgPayment.splice(index, 1)
        }
      })
      if (this.uploadImgPayment.length <= 3) {
        document.querySelector('.form-payment-box .el-upload--picture-card').style.display = 'inline-block'
      }
    },
    // 出差申请人列表

    searchStaff (queryString, cb) {
      cgiService.temTravelGetStaffList({ keywords: queryString }).then(res => {
        if (!res.code) {
          this.staffList = res.data
          var restaurants = this.staffList
          var results = queryString ? restaurants.filter(this.createFilterStaff(queryString)) : restaurants
          // 调用 callback 返回建议列表的数据
          for (let i = 0; i < results.length; i++) {
            results[i].value = results[i].v_WorkerName
          }
          cb(results)
        }
      })
    },
    createFilterStaff (queryString) {
      return (restaurant) => {
        return (restaurant.v_WorkerName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 申请人下拉
    workerNameChange (val) {
      this.modeAddData.v_UserID = val.v_UserID
      this.modeAddData.v_VAccount = val.v_VAccount
    },
    handleSelect (item) {
    },
    // 出差申请人列表
    getCity () {
      if (!this.cityList.length > 0) {
        cgiService.temTravelGetCity().then(res => {
          if (!res.code) {
            this.cityList = res.data
          }
        })
      }
    },
    querySearch (queryString, cb) {
      var cityLists = this.cityList
      var results = queryString ? cityLists.filter(this.createFilter(queryString)) : cityLists
      // 调用 callback 返回建议列表的数据
      // 遍历数组把筛选字段换成value
      for (let i = 0; i < results.length; i++) {
        results[i].value = results[i].enumvaluename
      }
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.enumvaluename.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片格式不正确!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    formCommit (flag) {
      // ---差旅申请保存
      if (this.showTravelForm) {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 把附件照片传后台
            this.modeAddData.v_TravelApplyFileUrl = this.travelApplyImgList.length
              ? JSON.stringify(this.travelApplyImgList)
              : '[]'
            // 出发日期
            this.modeAddData.d_ExpectedDepartureDate = this.$moment(this.applyTravelDate[0]).format('YYYY-MM-DD ss-mm-ss')
            // 返程日期
            this.modeAddData.d_ExpectedReturnDate = this.$moment(this.applyTravelDate[1]).format('YYYY-MM-DD ss-mm-ss')
            let params = {}
            params.i_Id = this.modeAddData.i_Id
            params.v_UserID = this.modeAddData.v_UserID
            params.v_VAccount = this.modeAddData.v_VAccount
            params.v_TravelApplyName = this.modeAddData.v_TravelApplyName
            params.d_ExpectedDepartureDate = this.modeAddData.d_ExpectedDepartureDate
            params.d_ExpectedReturnDate = this.modeAddData.d_ExpectedReturnDate
            params.v_ExpectedDeparturePlace = this.modeAddData.v_ExpectedDeparturePlace
            params.v_ExpectedReturnPlace = this.modeAddData.v_ExpectedReturnPlace
            if (flag.saveData) {
              // 如果是保存 为草稿操作 applyStatus传10
              params.i_ApplyStatus = this.applyStatus.uncommit
            } else if (flag.commitData) {
              // 如果是提交审批 操作 applyStatus传11
              params.i_ApplyStatus = this.applyStatus.commit
              params.v_PaymentID = this.modeAddData.v_PaymentID
            }
            params.v_ExpectedFee = this.modeAddData.v_ExpectedFee
            params.v_TravelApplyFileUrl = this.modeAddData.v_TravelApplyFileUrl
            params.v_TravelRemark = this.modeAddData.v_TravelRemark
            // 判断日期和附件 是否为空
            if (this.applyTravelDate.length === 0 || (this.travelApplyImgList.length === 0 && this.fileList.length === 0)) {
              this.$message.warning('您的往返日期或者附件文件为空')
              return
            }
            if (flag.commitData) {
              this.$confirm('确认将此条申请提交审批', '提示', {
                confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
              }).then(() => {
                this.saveDataAPI('temTravelSaveData', params, flag)
              })
            } else if (flag.saveData) {
              this.saveDataAPI('temTravelSaveData', params, flag)
            }
          }
        })
      } else if (this.showPaymentModify) {
        this.$refs.formPayment.validate(valid => {
          if (valid) {
            // ---报销 提交审批
            if (this.paymentDate[0] === '0000-00-00' || this.paymentDate[1] === '0000-00-00') {
              this.$message.warning('您提交日期不能为空')
              return
            } else {
              // 出发日期
              this.formPayment.d_DepartureDate = this.$moment(this.paymentDate[0]).format('YYYY-MM-DD ss-mm-ss')
              // 返程日期
              this.formPayment.d_ReturnDate = this.$moment(this.paymentDate[1]).format('YYYY-MM-DD ss-mm-ss')
            }
            // 把附件照片传后台
            this.formPayment.v_PaymentFileUrl = this.uploadImgPayment.length
              ? JSON.stringify(this.uploadImgPayment)
              : '[]'
            if (this.uploadImgPayment.length === 0) {
              this.$message.warning('您提交附件不能为空')
              return
            }
            let params = {}
            params.i_Id = this.formPayment.i_Id
            params.v_PaymentID = this.formPayment.v_PaymentID
            params.d_DepartureDate = this.formPayment.d_DepartureDate
            params.d_ReturnDate = this.formPayment.d_ReturnDate
            params.v_DeparturePlace = this.formPayment.v_DeparturePlace
            params.v_ReturnPlace = this.formPayment.v_ReturnPlace
            params.v_PaymentFee = this.formPayment.v_PaymentFee
            params.v_PaymentFileUrl = this.formPayment.v_PaymentFileUrl
            params.v_PaymentRemark = this.formPayment.v_PaymentRemark
            if (flag.saveData) {
              // 如果是保存 为草稿操作 applyStatus传20
              params.i_PaymentStatus = this.paymentStatus.uncommit
              this.saveDataAPI('temTravelSaveData2', params, flag)
            } else if (flag.commitData) {
              // 如果是提交审批 操作 applyStatus传21
              params.i_PaymentStatus = this.paymentStatus.commit
              this.$confirm('确认将此条申请提交审批', '提示', {
                confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
              }).then(() => {
                this.saveDataAPI('temTravelSaveData2', params, flag)
              })
            }
          }
        })
      } else if (this.showRecieveModify) {
        this.$refs.formRecieve.validate(valid => {
          if (valid) {
            // ---提交结算
            let formRecieveDate = this.$moment(this.formRecieve.d_RecieveDate).format('YYYY-MM-DD')
            this.$confirm('确认将此条申请提交结算', '提示', {
              confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
              this.saveDataAPI('temTravelRecievePass', { i_Id: this.shareData.i_Id, v_RecieveFee: this.formRecieve.v_RecieveFee, v_RecieveRemark: this.formRecieve.v_RecieveRemark, d_RecieveDate: formRecieveDate }, flag)
            })
          }
        })
      }
    },
    saveDataAPI (api, params, flag) {
      params.v_OrgCode = this.shareData.v_OrgCode
      cgiService[api](params).then(res => {
        if (!res.code) {
          this.modeAddData.i_Id = res.iId
          this.$message.success(res.msg)
          this.$emit('getTableData')
          if (flag.commitData) {
            this.$emit('getButtonConfig', false)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 传参给父组件 用来关闭弹框
    closeParentDialog () {
      this.$emit('closeDialog', false)
    },
    // 清除弹框验证
    clearError () {
      this.applyTravelDate = []
      this.fileList = []
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss">
@import "@/assets/css/travelcss.scss";
.travel-modify .dialog-form{
  overflow: auto;
}
.travel-modify #recieve-date /deep/ .el-input__inner{
  padding-left: 30px;
}
</style>
