<template>
  <div class="jurisdiction-control">
      <div class="formOperateBox">
          <el-button
            type="text"
            @click="optiosCommit"
          ><i class="iconfont icon-baocun"></i>保 存</el-button>
    </div>
    <div class="role-control">
    <div class="border-box">
      <span><i class="iconfont icon-jibenxinxi"></i> 权限</span>
      <el-form
       ref='customOptios'
       inline-message
        :model='operationForm'
        key="jurisdiction-control-form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="需要授权"
              label-width="110px"
              prop="i_NeedAuthorized"
            >
              <el-switch
                v-model="operationForm.i_NeedAuthorized"
                active-value='1'
                inactive-value='0'
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="禁用"
              label-width="110px"
              prop="i_IsDisabled"
            >
              <el-switch
                v-model="operationForm.i_IsDisabled"
                active-value='1'
                inactive-value='0'
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="代理使用"
              label-width="110px"
              prop="i_EnableAgent"
            >
              <el-switch
                v-model="operationForm.i_EnableAgent"
                active-value='1'
                inactive-value='0'
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="roleBorder"
      v-show="operationForm.i_NeedAuthorized === '1'">
      <span><i class="iconfont icon-jibenxinxi"></i> 授权角色</span>
      <div class="searchBox">
        <el-input
          placeholder="输入名称搜索"
          clearable
          v-model="keyword"
          class="input-with-select  w400"
        >
          <el-button
            slot="append"
            @click="querySearch(keyword)"
          >
            <i class="el-icon-search"></i>
          </el-button>
        </el-input>
      </div>
      <div class="templateTabBox">

        <div class="roleLeft">
          <el-table
            ref="multipleTable"
            :data="stayControlRol"
            tooltip-effect="dark"
            class="contentTable"
            :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
            height="310px"
            @selection-change="noSelPeople"
          >
            <el-table-column
              type="selection"
              width="30"
            />
            <el-table-column
              label="待授权角色"
              width="90"
              prop="rolename"
               show-overflow-tooltip
            ><template slot-scope="scope">{{ scope.row.v_RoleName }}</template></el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="auto"
              show-overflow-tooltip
            ><template slot-scope="scope">{{ scope.row.v_Description}}</template></el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="optionsIndex"
            :page-sizes="uncheckedPageSizes"
            :page-size="optionsSize"
            :total="optionsTotal"
            :pager-count='5'
            background
            class="paginationBoxSmall"
            id="tem-pagina"
            layout="sizes, prev, pager, next"
            @size-change="optionsRoluSizeChange"
            @current-change="optionsRoluIndexChange"
          />
        </div>
        <div class="dialogCommitBox">
          <el-button
            type="text"
            @click="moveAddControl"
            :disabled="operationForm.needauthorized === '0'"
          ><i class="iconfont icon-tianjiachengyuanjiantouyou"></i></el-button>
          <el-button
            type="text"
            @click="cancelAddControl"
            :disabled="operationForm.needauthorized === '0'"
          ><i class="iconfont icon-tianjiachengyuanjiantouzuo"></i></el-button>
        </div>
        <div class="roleRight">
          <el-table
            ref="multipleTable"
            :data="endControlRol"
            tooltip-effect="dark"
            class="contentTable"
            :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
            height="357px"
            @selection-change="noSelPeople"
          >
            <el-table-column
              type="selection"
              width="30"
            />
            <el-table-column
              label="已授权角色"
              width="100"
               show-overflow-tooltip
            ><template slot-scope="scope">{{ scope.row.v_RoleName }}</template></el-table-column>
            <el-table-column
              prop="name"
              label="描述"
              width="auto"
              show-overflow-tooltip
            ><template slot-scope="scope">{{ scope.row.v_Description}}</template></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import util from '@/common/js/util.js'
export default {
  name: 'jurisdictionControl',
  props: {
    postTable: String,
    stayRole: Array,
    endRole: Array,
    toltal: Number,
    ifDialog: Boolean,
    operationData: Object
  },
  data () {
    return {
      // 权限表单数据
      operationForm: {
        i_NeedAuthorized: '0',
        i_IsDisabled: '0',
        i_EnableAgent: '0'
      },
      // 搜索数据
      keyword: '',
      // 代授权数据
      stayControlRol: [],
      // 已授权的数据
      endControlRol: [],
      // 操作按钮配置项
      optionsIndex: 1,
      optionsSize: 10,
      optionsTotal: 0,

      uncheckedCurrentPage: 1,
      uncheckedPageSize: 10,
      uncheckedPageSizes: [10, 20, 30],
      uncheckedTotalNum: 0,
      oldOperationForm: {},
      // 小红点
      isDot: false,
      oldEndControlRol: []
    }
  },
  watch: {
    ifDialog: {
      handler: function (val) {
        this.keyword = ''
        this.oldOperationForm = Object.assign({}, this.operationForm)
      },
      deep: true
    },
    operationForm: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldOperationForm)) {
          this.isDot = true
          this.$emit('changeIsDotPur', this.isDot)
        }
      },
      deep: true
    },
    stayRole: {
      handler: function (val) {
        this.stayControlRol = val
      },
      deep: true
    },
    endRole: {
      handler: function (arr) {
        this.endControlRol = arr
        this.oldEndControlRol = this.endControlRol
      },
      deep: true
    },
    toltal: {
      handler: function (num) {
        this.optionsTotal = num
      },
      deep: true
    },
    endControlRol: {
      handler: function (newList, oldList) {
        this.$emit('roleList', newList)
        if (JSON.stringify(this.oldEndControlRol) !== JSON.stringify(newList)) {
          this.isDot = true
          this.$emit('changeIsDotPur', this.isDot)
        }
      },
      deep: true
    },
    operationData: {
      handler: function (data) {
        if (JSON.stringify(data) !== '{}') {
        // 修改 父 => 子  赋值表单操作
          util.initFormData(this.operationForm, data)
          this.operationForm.i_Id = data.i_Id
          this.$set(this.operationForm, 'v_OperationCode', data.v_OperationCode)
          this.$set(this.operationForm, 'v_OperationName', data.v_OperationName)
          this.oldOperationForm = Object.assign({}, this.operationForm)
        }
      },
      immediate: true,
      deep: true
    }

  },
  created () {
    this.oldOperationForm = Object.assign({}, this.operationForm)
  },
  methods: {
    optiosCommit () {
      this.isDot = false
      this.$emit('changeIsDotPur', this.isDot)
      this.oldOperationForm = Object.assign({}, this.operationForm)
    },
    querySearch (val) {
      this.$emit('querySearch', val)
    },
    // 权限checkBox选中事件
    noSelPeople (val) {
      this.pitchArray = val
    },
    // 操作权限移动交互往右移
    moveAddControl () {
      if (this.pitchArray.length !== 0) {
        let newstayControlRol = []
        let tmpSelStayRoles = [] // 暂存已待授权角色
        // 遍历选中的数组
        this.pitchArray.forEach(item => {
          tmpSelStayRoles.push(item)
        })

        this.stayControlRol.forEach(val => {
          let isExist = 0
          tmpSelStayRoles.forEach(data => {
            if (val.i_RoleID === data.i_RoleID) {
              // 存贮已选中成员的 在 左边数组中的索引
              isExist = 1
              return false
            }
          })
          if (!isExist) {
            newstayControlRol.push(val)
          }
        })

        this.stayControlRol = newstayControlRol

        // 把选中的角色跟右边的数组合并
        this.endControlRol = this.endControlRol.concat(this.pitchArray)
        this.endControlRol = this.arrNewSet(this.endControlRol)
        // console.log(this.endControlRol)
      }
    },
    // 操作权限移动交互往左移
    cancelAddControl () {
      // 判断  是否有选中checkbox
      if (this.pitchArray.length !== 0) {
        // 定义一个临时用来存储选中的变量
        let newPitchArray = []
        // 定义临时用来储存对比后的数据
        let newEndControlRol = []
        // 遍历选中的变量
        this.pitchArray.forEach(val => {
          newPitchArray.push(val)
        })

        this.endControlRol.forEach(val => {
          let isExist = 0
          newPitchArray.forEach(item => {
            if (val.i_RoleID === item.i_RoleID) {
              isExist = 1
              return false
            }
          })
          if (!isExist) {
            newEndControlRol.push(val)
          }
          this.endControlRol = newEndControlRol
        })
        this.stayControlRol = this.stayControlRol.concat(this.pitchArray)
        this.stayControlRol = this.arrNewSet(this.stayControlRol)
      }
    },
    // 页面数据条数选择事件
    optionsRoluSizeChange (size) {
      if (size) {
        let params = {
          index: this.optionsIndex,
          size: size,
          keywords: this.keyword
        }
        this.$emit('changeSize', params)
      }
    },
    optionsRoluIndexChange (index) {
      if (index) {
        let params = {
          index: index,
          size: this.optionsSize,
          keywords: this.keyword
        }
        this.$emit('changeIndex', params)
      }
    },
    // 数组去重
    arrNewSet (arr) {
      let x = new Set(arr)
      return [...x]
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.jurisdiction-control {
    height: 540px;
    border:5px solid  #abd6ff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .role-control{
      flex: 1;
      padding: 16px;
      overflow: auto;
      box-sizing: border-box;
    .border-box {
      border: 1px solid #BFBFBF;
      position: relative;
      > span {
          position: absolute;
          top: -10px;
          left: 10px;
          background: #ffffff;
      }
      >.el-form{
          border: none !important;
      }
    }
    .roleBorder {
        border: 1px solid  #BFBFBF;
        margin-top: 10px;
        padding-top: 20px;
        position: relative;
        > span {
          position: absolute;
          top: -10px;
          left: 10px;
          background: #ffffff;
        }
        .searchBox {
            width: 248px;
            padding-left: 10px;
        }
        .templateTabBox {
          display: flex;
          padding: 10px 10px;
          .roleLeft {
              width: 45%;
              border: 1px solid #e6e6e6;
          }
          .roleRight {
             width: 45%;
             border: 1px solid #e6e6e6;
          }
          .dialogCommitBox {
              width: 10%;
              display: flex;
              flex-direction:column;
              justify-content: center;
              align-items: center;
              > button {
                  margin-left: 0px;
                  i {
                     font-size: 28px;
                     color:#2B8ED1;
                  }

              }
          }
        }
    }
    }
}
#tem-pagina {
  border: none;
  /deep/ .el-input__inner{
    padding-right: 20px !important;
  }
}
</style>
