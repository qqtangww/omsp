
<template>
  <div class="add-org-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        v-on="$listeners"
        @sumitForm="commit"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="metaForm" :rules="rules" label-width="120px" class="modify-form">
      <div class="title-border">
        <span class="title-style">
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
        <div class="conBox">
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构代码" prop="v_OrgCode">
                <el-input v-model="metaForm.v_OrgCode" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构全称" prop="v_OrgFullName">
                <el-input v-model="metaForm.v_OrgFullName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构简称" prop="v_OrgShortName">
                <el-input v-model="metaForm.v_OrgShortName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CCC代码" prop="v_OrgCCC">
                <el-input v-model="metaForm.v_OrgCCC" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="负责人账号" prop="v_ManagerUserID">
                <el-input v-model="metaForm.v_ManagerUserID" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="v_Email">
                <el-input v-model="metaForm.v_Email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图标" class="iconBox" id="icon-preview-box">
                <el-select v-model="metaForm.v_IconURL" placeholder="请选择" class="select-width">
                  <el-option
                    v-for="(item,index) in iconUrl"
                    :key="index"
                    :label="item.v_EnumValue"
                    :value="item.v_EnumValue"
                  >
                    <span>
                      <i :class="item.v_EnumValue"/>
                    </span>
                  </el-option>
                </el-select>
                <div id="icon-preview">
                  <i :class="metaForm.v_IconURL"  :style="`color:${metaForm.v_IconColor}`"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="图标颜色"
                prop="v_IconColor"
                id="icon-preview-box">
                    <el-select placeholder="默认" v-model="metaForm.v_IconColor">
                      <el-option
                        v-for="(item,index) in iconColorList"
                        :key="index"
                        :label="item.v_ParamValue"
                        :value="item.v_ParamValue"
                        style="padding: 5px 0 0 15px;"
                      >
                        <div id="icon-color-box" :style="`background-color:${item.v_ParamValue}`"></div>
                      </el-option>
                    </el-select>
                    <div id="icon-preview" class="icon-color">
                      <div v-if="metaForm.v_IconColor" id="icon-color-box" :style="`background-color:${metaForm.v_IconColor}`"></div>
                    </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="缺省展开子机构">
            <el-switch
              v-model="metaForm.i_IsDefaultExpand"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="描述" prop="v_Description" class="description-label m-b-16">
            <el-input
              v-model="metaForm.v_Description"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="title-border">
        <span class="title-style">
          <i class="iconfont icon-gengxinjilu"></i>
          <span>更新记录</span>
        </span>
        <div class="conBox">
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建者：" >{{ updateData.v_Creator }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">{{ updateData.d_CreateTime }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="最后修改者：">{{ updateData.v_LastModifiedUser }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">{{ updateData.d_LastModifiedTime }}</el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util.js'
import { mapState } from 'vuex'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'orgAddForm',
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    }
  },
  mixins: [windowRed, logMixin],
  data () {
    let validateEmail = (rule, value, callback) => {
      let rulesEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!value) {
        callback()
      }
      if (!rulesEmail.test(value)) {
        callback(new Error('请输入正确的电子邮箱'))
      } else {
        callback()
      }
    }
    // 账户正则匹配
    let changeUserID = (rule, value, callback) => {
      let mobileVerify = /^[a-zA-Z][a-zA-Z0-9_]*$/
      // let mobileVerify =/^\w+$/
      setTimeout(() => {
        if (!value) {
          callback()
        }
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的用户账号'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      rules: {
        v_OrgCode: [
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_OrgFullName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_OrgShortName: [
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_Email: [{ validator: validateEmail, trigger: 'blur' }],
        v_OrgCCC: [
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_ManagerUserID: [{ required: true, message: '请输入负责人ID', trigger: 'blur' },
          { validator: changeUserID, trigger: 'blur' }
        ]
      },
      metaForm: {
        // 机构代码
        v_OrgCode: '',
        // 机构全称
        v_OrgFullName: '',
        // 机构简称
        v_OrgShortName: '',
        // CCC代码
        v_OrgCCC: '',
        // 负责人账号
        v_ManagerUserID: '',
        // 邮箱
        v_Email: '',
        // 描述
        v_Description: '',
        i_ParentOrgID: 0,
        i_Id: 0,
        i_Cid: 0,
        i_IsDefaultExpand: '0',
        v_IconURL: '',
        v_IconColor: ''
      },
      // 小红点功能
      oldModAddData: {
        // 机构代码
        v_OrgCode: '',
        // 机构全称
        v_OrgFullName: '',
        // 机构简称
        v_OrgShortName: '',
        // CCC代码
        v_OrgCCC: '',
        // 负责人账号
        v_ManagerUserID: '',
        // 邮箱
        v_Email: '',
        // 描述
        v_Description: '',
        i_ParentOrgID: 0,
        i_Id: 0,
        i_Cid: 0,
        i_IsDefaultExpand: '0',
        v_IconURL: '',
        v_IconColor: ''
      },
      updateData: {
        d_CreateTime: '',
        d_LastModifiedTime: '',
        v_Creator: '',
        v_LastModifiedUser: ''
      },
      iconUrl: [],
      paramsList: [],
      iconColorList: []
    }
  },
  created () {
    let enumCode = ['nodeIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
  },
  computed: {
    ...mapState({
      operationcode: state => state.confsBtn.operationcode,
      fieTableData: state => state.fieTableData
    })
  },
  watch: {
    metaForm: {
      handler (data) {
        if (this.oldModAddData.i_IsDefaultExpand === '') {
          data.i_IsDefaultExpand = this.oldModAddData.i_IsDefaultExpand = '0'
        }
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    shareData: {
      immediate: true,
      handler (nv) {
        // 离开节点之后，把小红去除
        if (nv.isReminderFlag) {
          this.isReminder = true
        }
        util.initFormData(this.metaForm, nv)
        util.initFormData(this.oldModAddData, nv)
        util.initFormData(this.updateData, nv)
        // 防止点击树节点调取数据，不能注释 ↓
        this.$emit('changeShareData')
      }
    }
  },
  methods: {
    commit () {
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.metaForm.logParams = this.getLogParams()
          }
          cgiService.temOrgGroupSaveData1(this.metaForm).then(res => {
            if (res.code === 0) {
              this.isReminder = true
              let cId = ''
              this.$message.success(res.msg)
              if (res.i_Cid && res.iId) {
                // 新增
                cId = res.i_Cid
                this.metaForm.i_Id = res.iId
                this.cId = res.i_Cid
              } else {
                // 修改
                cId = this.metaForm.i_Cid
              }
              this.oldModAddData = { ...this.metaForm }
              this.$emit('changeShareData', { flag: true, commitFormData: JSON.parse(JSON.stringify(this.metaForm)), cId })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          // console.log(res)
          for (let key in res.data) {
            if (key === 'nodeIcons') {
              // 图标
              this.iconUrl = res.data[key]
              this.iconUrl.unshift({ v_EnumValue: '' })
            } else if (key === 'iconColorAll') {
              // 图标颜色
              this.iconColorAll = res.data[key]
              this.iconColorAll.forEach(item => {
                this.paramsList.push(item.v_EnumValue)
              })
              cgiService.getParameter({ v_ParamCode: this.paramsList }).then(res => {
                if (res.code === 0) {
                  for (let key in res.data) {
                    res.data[key].v_ParamValue = res.data[key].v_ParamValue.slice(0, 7)
                    this.iconColorList.push(res.data[key])
                  }
                }
              })
            }
          }
        }
      })
    },
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
      this.$emit('closeDialog', false)
    }
  },
  components: {
    actionBar
  },
  mounted () {
    if (this.configData.operationcode === 'add') {
      this.$refs.metaForm.resetFields()
    }
  }
}
</script>
<style lang="scss">
.tabs{
  height: 80%;
}
</style>
<style scoped lang='scss'>
.add-org-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    flex: 1;
  }
}
.modify-form{
  padding: 16px;
  overflow: auto;
  /deep/ .el-form-item{
    margin-bottom: 8px;
    &.m-b-16{
      margin-bottom: 16px;
    }
    .el-form-item__content {
      font-size: 12px;
    }
  }
}
.title-border{
  border: 1px solid #bfbfbf;
  position: relative;
  padding: 16px 40px 0 40px;
  .title-style{
    position: absolute;
    top: -10px;
    background: #ffffff;
    padding: 0 4px;
    left: 45px;
  }
  &:last-of-type{
    margin-top: 20px;
  }
  &:first-of-type{
    padding-bottom: 10px;
  }
}

.formOperateBox {
  width: 100%;
  height: 31px;
  background-color: #e6feff;
  line-height: 28px;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: solid 3px #bfbfbf;
  .el-button {
    display: inline-block;
    height: 100%;
    color: #333333;
    border-radius: 0;
    padding: 0 4px;
    margin-right: 4px;
  }
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
.description-label /deep/ .el-textarea .el-textarea__inner{
    font-size: 12px;
}
</style>
