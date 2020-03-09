<!-- 页面管理操作按钮基本信息 -->
<template>
  <div class="add-modify-form" id="pagecontrol-info">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        v-on="$listeners"
        :shareData="shareData"
        @sumitForm="sumitForm"
      ></action-bar>
    </div>
    <el-form inline-message :model="operationForm" ref="operationForm" :rules="rules" label-width="150px">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item label="操作代码：" prop="v_OperationCode">
          <el-input v-model="operationForm.v_OperationCode"></el-input>
        </el-form-item>
        <el-form-item label="操作名称：" prop="v_OperationName">
          <el-input v-model="operationForm.v_OperationName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图标：" id="icon-preview-box">
          <el-select v-model="operationForm.v_IconURL" placeholder="请选择" class="select-width">
            <el-option
              v-for="item in iconList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span>
                <i :class="item.value" />
              </span>
            </el-option>
          </el-select>
          <div id="icon-preview">
            <i :class="operationForm.v_IconURL" />
          </div>
        </el-form-item> -->
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="图标："
              prop="v_IconURL"
              id="icon-preview-box"
            >
              <el-select placeholder="默认" v-model="operationForm.v_IconURL">
                <el-option
                  v-for="(item,index) in optionsIcon"
                  :key="index"
                  :label="item.v_EnumValue"
                  :value="item.v_EnumValue"
                >
                  <span>
                    <i :class="item.v_EnumValue" />
                  </span>
                </el-option>
              </el-select>
              <div id="icon-preview">
                <i :class="operationForm.v_IconURL" :style="`color:${operationForm.v_IconColor}`" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="1">
            <el-form-item
              label="图标颜色："
              prop="v_IconColor"
              id="icon-preview-box"
            >
                  <el-select placeholder="默认" v-model="operationForm.v_IconColor">
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
                    <div v-if="operationForm.v_IconColor" id="icon-color-box" :style="`background-color:${operationForm.v_IconColor}`"></div>
                  </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述：" class='description-label'>
          <el-input
            v-model="operationForm.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
import { mapState } from 'vuex'
export default {
  name: 'pageOperatInfo',
  mixins: [windowRed, logMixin],
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      operationForm: {
        v_OperationName: '',
        v_IconURL: '',
        v_IconColor: '',
        v_OperationCode: '',
        i_PageID: '',
        v_Description: ''
      },
      optionsIcon: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      // 图标
      iconList: [
        {
          // 参数管理
          value: 'iconfont icon-canshuguanli'
        },
        {
          // 角色管理
          value: 'iconfont icon-jiaoseguanli'
        },
        // {
        //   // 个人中心
        //   value: 'iconfont icon-gerenzhongxin'
        // },
        {
          // 访问策略
          value: 'iconfont icon-fangwencelve'
        },
        {
          // 密码策略
          value: 'iconfont icon-mimacelve'
        },
        {
          // 配置管理
          value: 'iconfont icon-peizhiguanli'
        },
        {
          // 枚举管理
          value: 'iconfont icon-meijuguanli'
        },
        {
          // 快捷菜单
          value: 'iconfont icon-kuaijiecaidan'
        },
        {
          // 系统概要
          value: 'iconfont icon-xitonggaiyao'
        },
        {
          // 权限管理
          value: 'iconfont icon-quanxianguanli'
        },
        {
          // 用户管理
          value: 'iconfont icon-yonghuguanli'
        },
        {
          // 系统管理
          value: 'iconfont icon-xitongguanli'
        },
        {
          // 修改密码
          value: 'iconfont icon-xiugaimima'
        },
        {
          // 用户代理
          value: 'iconfont icon-yonghudaili'
        },
        {
          // 组织机构
          value: 'iconfont icon-zuzhijigou'
        },
        {
          // 用户群组
          value: 'iconfont icon-yonghuqunzu'
        },
        {
          // 页面管理
          value: 'iconfont icon-yemianguanli'
        },
        {
          // 业务类别
          value: 'iconfont icon-yewuleibie'
        }
        // {
        //   // 数据字典
        //   value: 'iconfont icon-shujukubiao'
        // },
        // {
        //   // 模板配置
        //   value: 'iconfont icon-shitupeizhi'
        // }
      ],
      // 添加效验规则
      rules: {
        v_OperationCode: [
          { required: true, message: '请输入操作代码', trigger: 'blur' }
        ],
        v_OperationName: [
          { required: true, message: '请输入操作名称', trigger: 'blur' }
        ]
      },
      oldModAddData: {}
    }
  },
  computed: {
    ...mapState({
      operationcode: state => state.confsBtn.operationcode
    })
  },
  watch: {
    operationForm: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    let enumCode = ['operationIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    let formData = this.$store.state.fieTableData
    if (this.operationcode === 'modify') {
      util.initFormData(this.operationForm, formData)
      this.operationForm.i_Id = formData.i_Id
      this.$store.commit('changeRowTabData', this.operationForm)
    } else {
      this.operationForm.v_OperationName = ''
      this.operationForm.v_IconURL = ''
      this.operationForm.v_Description = ''
      this.operationForm.v_OperationCode = ''
      this.operationForm.i_PageID = formData.i_PageID
    }
    // 给oldModAddData赋值
    this.oldModAddData = Object.assign({}, this.operationForm)
  },
  methods: {
    sumitForm () {
      this.$refs.operationForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.operationForm.logParams = this.getLogParams()
          }
          cgiService.temPagesOperationSaveData2(this.operationForm).then(res => {
            if (!res.code) {
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              this.$emit('getTableData')
              // 把提交的数据保存到vuex，用于权限tab
              this.$store.commit('rowData', this.operationForm)
              // 给oldModAddData赋值并且给isReminder赋值true
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.operationForm)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            if (key === 'operationIcons') {
              // 图标
              this.optionsIcon = res.data[key]
              this.optionsIcon.unshift({ v_EnumValue: '' })
            } else if (key === 'iconColorAll') {
              // 图标颜色
              this.iconColorAll = res.data[key]
              this.iconColorAll.forEach(item => {
                this.paramsList.push(item.v_EnumValue)
              })
              let v_ParamCode = this.paramsList
              cgiService.getParameter({ v_ParamCode }).then(res => {
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
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
#pagecontrol-info .el-form{
  border: none;
}
.page-operation {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#pane-pageRole,
#pane-operasRole {
  padding: 5px;
  border: 4px solid #abd6ff;
  .permissionCon {
    padding: 10px 10px;
    // background: white;
    // height: 100%;
  }
  .borderDiv {
    border: 1px solid #bfbfbf;
    position: relative;
    &:last-of-type {
      margin-top: 16px;
    }
    > span {
      position: absolute;
      top: -10px;
      left: 8px;
      padding: 0 8px;
      background: #ffffff;
    }
    .permissionBox {
      padding: 24px 0 16px 13px;
      .el-switch {
        margin-left: 24px;
      }
      > div {
        float: left;
        &:nth-of-type(n + 2) {
          // margin-left: 78px;
        }
      }
    }
    .roleBox {
      padding: 10px;
      .templateTabBox {
        display: flex;
        align-items: center;
        > div {
          // float: left;
          &.roleLeft,
          &.roleRight {
            height: 100%;
            width: 46%;
            border: 1px solid #cccccc;
            .contentTable {
              border: none !important;
            }
            .paginationBoxSmall {
              border: none;
              border-top: 1px solid #cccccc;
            }
          }
          &.dialogCommitBox {
            width: 8%;
          }
        }
        .dialogCommitBox {
          border: none;
          width: 120px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 28px;
            color: #2b8ed1;
          }
          > button:last-of-type {
            margin: 0;
          }
        }
      }
      .searchBox {
        width: 100%;
        margin-bottom: 8px;
        .input-with-select {
          width: 46%;
          float: left;
          > div.el-input-group__append {
            button {
              width: 44px;
              padding: 0;
            }
          }
        }
      }
    }
  }
}
#pane-operaBasic {
  .conBox {
    .el-cascader {
      width: 100%;
      margin-left: 0;
    }
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
</style>
