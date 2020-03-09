<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:38:45
 * @LastEditTime: 2019-08-12 16:38:45
 * @LastEditors: your name
 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        @sumitForm='commit'
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      ref='modAddData1'
      :rules="rules"
      :model="modAddData"
      label-width="100px">
      <div class="topBox">
        <div class="border-box">
          <span> <i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
          <el-form-item label="视图名称">
            <el-input
              v-model="formData.v_ViewName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="视图代码">
            <el-input
              v-model="formData.v_ViewID"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="字段"
            prop="v_ColName"
          >
            <el-select
              placeholder="请选择"
              v-model="modAddData.v_ColName"
              @focus="getTableFields(modAddData.v_TableName)"
            >
              <el-option
                v-for="(item) in fieldTable"
                :key='item.i_Id'
                :label="item.v_FieldName"
                :value="item.v_FieldName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="列标题"
            prop="i_ColTitle"
          >
            <el-input v-model="modAddData.i_ColTitle"></el-input>
          </el-form-item>

          <el-form-item label="格式化串" prop="v_FormatString">
            <el-row>
              <el-col :span="11">
                <el-select
                  placeholder="数据类型"
                  v-model="modAddData.v_FormatString">
                  <el-option
                    label="String"
                    value="String"
                  >
                  </el-option>
                  <el-option
                    label="Number"
                    value="Number"
                  >
                  </el-option>
                  <el-option
                    label="Date"
                    value="Date"
                  >
                  </el-option>
                  <el-option
                    label="Img"
                    value="Img"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col
               :span="12"
                v-if="modAddData.formatstring !== 'Img'">
                <el-input
                  class="input-format"
                  v-model="modAddData.i_DataFormat"
                  :disabled="!modAddData.v_FormatString "
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div class="border-box">
          <span> <i class="iconfont icon-yemianguanli"></i> 位置样式</span>
          <el-form-item
            label="固定列"
            label-width="90px"
            prop="v_Isfixed">
            <el-select
              placeholder="请选择"
              class="minSelect"
              v-model="modAddData.v_Isfixed"
            >
              <el-option
                label="left"
                value="left"
              >
              </el-option>
              <el-option
                label="right"
                value="right"
              >
              </el-option>
              <el-option
                label="默认"
                value=""
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="列宽" label-width="90px">
            <el-input-number
              v-model="modAddData.i_ColWidth"
              controls-position="right"
              @change="handleChange"
              :min='0'
            ></el-input-number>
            <span class="hintInfo">值为0时自适应</span>
          </el-form-item>

          <el-form-item label="对齐" label-width="90px">
            <el-radio-group v-model="modAddData.i_ColAlign">
              <el-radio label="left">左</el-radio>
              <el-radio label="center">中</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="排序"
            class="controlLiHei"
            label-width="90px"
          >
            <el-switch
              v-model="modAddData.i_IsSort"
              active-value='1'
              inactive-value='0'
            >
            </el-switch>
            <span class="hintInfo">此列显示排序按钮</span>
          </el-form-item>
          <el-form-item
            label="排序方式"
            v-if="modAddData.i_IsSort === '1'"
            class="controlLiHei"
            label-width="90px"
          >
            <el-radio-group v-model="modAddData.i_SortMode">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">升序</el-radio>
              <el-radio label="2">降序</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="centerBox">
      <div class="border-box">
        <span> <i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="导出"
              class="controlLiHei"
            >
              <el-switch
                v-model="modAddData.i_IsExpord"
                active-value='1'
                inactive-value='0'
              ></el-switch>
              <span class="hintInfo">在导出文件中显示</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合计"
              class="controlLiHei"
            >
              <el-switch
                v-model="modAddData.i_IsTotalup"
                active-value='1'
                inactive-value='0'
              >
              </el-switch>
              <span class="hintInfo">在合计行计算</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="分类"
              class="controlLiHei"
            >
              <el-switch
                v-model="modAddData.i_IsCategory"
                active-value='1'
                inactive-value='0'
              ></el-switch>
              <span class="hintInfo">按此列进行分类</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="隐藏"
              class="controlLiHei"
            >
              <el-switch
                v-model="modAddData.i_IsHidden"
                active-value='1'
                inactive-value='0'
              ></el-switch>
              <span class="hintInfo">设此列在表格内可见</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
     </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
export default {
  name: 'baseFiled_View',
  props: {
    shareData: Object,
    configData: Object
  },
  mixins: [windowRed],
  data () {
    return {
      oldModAddData: {},
      modAddData: {
        v_Isfixed: '',
        i_ColWidth: 0,
        i_ColAlign: 'left',
        i_SortMode: '0',
        v_Type: '0'
      },
      databaseTab: [],
      fieldTable: [],
      formData: {},
      rules: {
        v_TableName: [
          { required: true, message: '请选择数据库表', trigger: 'change' }
        ],
        v_ColName: [
          { required: true, message: '请选择数据库表', trigger: 'change' }
        ],
        i_ColTitle: [
          { required: true, message: '请选择数据库表', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.formData = this.$store.state.fieTableData
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.modAddData = {
        ...this.formData
      }
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
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
  methods: {
    // 获取数据库表
    getDatabaseTab () {
      cgiService.getTemDatabaseTab(this.formData.v_ViewID).then(res => {
        if (res) {
          this.databaseTab = res.data
        }
      })
    },
    // 获取table表的字段
    getTableFields (val, val1) {
      let params = {
        v_TableName: val
      }
      cgiService.getTemTablefields(params).then(res => {
        if (res) {
          this.fieldTable = res.data
        }
      })
    },
    handleChange () {},
    commit () {
      let params = {
        ...this.modAddData
      }
      this.$set(params, 'v_ViewID', this.formData.v_ViewID)
      this.$refs.modAddData1.validate(valid => {
        if (valid) {
          cgiService.addTemColumnList(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              // 把 接口返回 的数据存到vuex
              this.$store.commit('rowData', res)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
                // 把 基本信息的值  已对象的形式传值 => shareData 中
                let obj = {}
                obj.modAddData = params

                this.$emit('changeData', obj)
                this.isReminder = true
                this.oldModAddData = Object.assign({}, this.modAddData)
              }
            } else {
              this.$message.warning(res.msg)
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
.add-modify-form {
  .border-box {
     border: 1px solid #bfbfbf;
      padding: 0px 14px 14px 0px;
        box-sizing: border-box;
    position: relative;
    > span {
      position: absolute;
      top: -10px;
      left: 15px;
      background: #ffffff;
      padding: 0 4px;
    }

  }
  .el-form {
    padding: 10px;
    box-sizing: border-box;
    .topBox {
      display: flex;
      .border-box {
        width: 50%;
        .input-format {
            margin-left: 8px;
        }
      &:first-of-type{
        margin-right: 10px;
      }
      }
    }
    .centerBox {
      margin-top: 15px;
    }
    .bottomBox {
        margin-top: 15px;
      .border-box {
        box-sizing: border-box;
        height: 164px;
       }
    }
  }
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form .el-form-item div.el-input-number.is-controls-right  {
  width: 90px;
  line-height: 28px;
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form .el-form-item > div.el-form-item__content > span {
  margin-left: 0;
}
.border-box /deep/ .controlLiHei {
  margin-top: 10px !important;
}
.border-box /deep/ .controlLiHei .el-switch {
 width: 40px;
}
</style>
