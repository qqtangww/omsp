<!-- 内容组件-树形组件-计算字段-基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <div class="pading-box">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 字段设置
        </span>
        <el-form inline-message class="filedForm" label-position="right" label-width="100px" :rules="rules" ref="ruleForm" :model="modAddData">
          <div class="conBox">
            <el-form-item label="树形编码" prop="v_TreeCode">
              <el-input v-model="modAddData.v_TreeCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="树形名称" prop="v_TreeName">
              <el-input v-model="modAddData.v_TreeName" disabled></el-input>
            </el-form-item>
            <el-form-item label="字段名" prop="v_ColName">
              <el-input v-model="modAddData.v_ColName"></el-input>
            </el-form-item>
            <el-form-item label="字段中文名" prop="i_ColTitle">
              <el-input v-model="modAddData.i_ColTitle"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'countColumInfo',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      // 字段数据
      modAddData: {
        // 编码
        v_TreeCode: '',
        // 树形名称
        v_TreeName: '',
        // 字段名
        v_ColName: '',
        // 字段中文名
        i_ColTitle: '',
        // 字段类型
        i_ColumnType: '2'
      },
      rules: {
        v_TableName: [
          { required: true, message: '请选择数据表', trigger: 'change' }
        ],
        v_ColName: [
          { required: true, message: '请选择字段', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        i_ColTitle: [
          { required: true, message: '请输入字段中文名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ]
      },
      // 数据表
      tableName: [],
      // 字段
      colName: [],
      // 定义小红点 存储数据的对象
      oldModAddData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    let formData = this.$store.state.fieTableData
    if (confsBtn.operationcode === 'modifyCount') {
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.modAddData.i_Id = formData.i_Id
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.modAddData)
    }
    let fieRowTableData = this.$store.state.fieRowTableData
    if (fieRowTableData['CC_VW_instanceTree'].v_TreeCode) {
      this.$set(
        this.modAddData,
        'v_TreeCode',
        fieRowTableData['CC_VW_instanceTree'].v_TreeCode
      )
    } else {
      this.$set(
        this.modAddData,
        'v_TreeCode',
        formData.v_TreeName.v_TreeCode
      )
    }
    if (fieRowTableData['CC_VW_instanceTree'].v_TreeName) {
      this.$set(
        this.modAddData,
        'v_TreeName',
        fieRowTableData['CC_VW_instanceTree'].v_TreeName
      )
    } else {
      this.$set(
        this.modAddData,
        'v_TreeName',
        formData.v_TreeName.v_TreeName
      )
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveBasicsColum(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              // 老版调取视图数据
              // let resObj = {
              //   ...res
              // }
              // this.$set(resObj, 'v_TreeCode', res.v_TreeCode)
              // 把 接口返回 的数据存到vuex
              // this.$store.commit('rowData', resObj)
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取
              this.$store.commit('changeRowTabData', this.modAddData)
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations['CC_VW_treeFiledConfig']
              this.$set(
                params,
                'viewid',
                this.$store.state.fieRowTableData['CC_VW_treeFiledConfig']
                  .viewid
              )
              this.$emit('getTableData', params)
              if (Number(res.iId) > 0) {
                this.$set(this.modAddData, 'i_Id', res.iId)
              }
              // 保存后设置小红点消失
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  mounted () {},
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  .pading-box {
    padding: 15px;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      padding: 20px 0px;
      > span {
        position: absolute;
        top: -10px;
        left: 10px;
        background: #ffffff;
        padding: 0 5px;
      }
    }
  }
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form {
  border: none;
  padding-bottom: 0;
}
</style>
