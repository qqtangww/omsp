<!-- 用户分组表单 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        :formRed="formRed"
        @sumitForm='commit'
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="tabBox">
      <div class="addGroupOperation">
        <!-- <el-cascader
          expand-trigger="click"
          popper-class='filtrate'
          :options="options"
          :props="defaultProps"
          :show-all-levels="false"
          :change-on-select="true"
          clearable
          v-model="orgSelectKey"
          placeholder="选择机构筛选成员"
          @change="selectInputChange"
          @remove-tag="removeTag"
        ></el-cascader> -->
          <el-select ref="selectTree" v-model="orgSelectKey"  placeholder="选择机构筛选成员" popper-class='select-tree' clearable style="width: 300px">
              <el-option :value="orgSelectKey" style="height: auto">
                <el-tree
                  :data="options"
                  default-expand-all
                  :expand-on-click-node='false'
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @node-click="handleClickChange1">
                </el-tree>
              </el-option>
          </el-select>
        <el-input
          class="filter-input"
          id="filter-input"
          prefix-icon="el-icon-edit-outline"
          placeholder="输入姓名、工号搜索用户"
          clearable
          @change="inputKeyChange"
          v-model="seaAddGroupDialogKey">
          <el-button
            slot="append"
            @click="searchUncheckedPeople"
            icon='iconfont icon-sousuo'>
          </el-button>
        </el-input>
      </div>
      <div class="groupContent clearfix">
        <div class="contentLeft">
          <div class="conTitle clearfix">
            <!-- 左侧表格标题 -->
            <div class="tableTitLeft">
              <i class="iconfont icon-yonghuqunzu"></i>
              <span>未选中成员</span>
              <span>[{{uncheckedTotalNum - unPeopleNums}}人]</span>
            </div>
            <el-table
              ref="multipleTable"
              :data="unPeopleNum"
              tooltip-effect="dark"
              class="contentTable"
              :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
              height="435px"
              @selection-change="noSelPeople"
            >
              <!-- 批量选中 -->
              <el-table-column
                type="selection"
                width="55px"
                :selectable='tableDisabled'
              />
              <el-table-column
                label="姓名"
                width="120px"
              >
                <template slot-scope="scope">{{ scope.row.v_UserName }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="工号"
                width="100px"
              >
                <template slot-scope="scope">{{ scope.row.v_UserID}}</template>
              </el-table-column>
              <el-table-column label="部门">
                <template slot-scope="scope">{{ scope.row.v_OrgFullName}}</template>
              </el-table-column>
            </el-table>
            <!-- <div class="dialogCommitBox"><el-button type="primary" @click="MoveAddPeople">确认选择</el-button></div> -->
            <!-- 未选中成员分页 -->
            <el-pagination
              id="unchecked-people"
              :current-page.sync="uncheckedCurrentPage"
              :page-sizes="uncheckedPageSizes"
              :page-size="uncheckedPageSize"
              :total="uncheckedTotalNum"
              background
              class="paginationBoxSmall"
              layout="sizes, prev, pager, next, jumper"
              @size-change="uncheckedSizeChange"
              @current-change="uncheckedCurrentChange"
            />
          </div>
        </div>
        <div class="dialogCommitBox">
          <el-button
            type="text"
            @click="MoveAddPeople"
          >
            <i class="iconfont icon-tianjiachengyuanjiantouyou"></i>
          </el-button>
          <el-button
            type="text"
            @click="cancelAddPeople"
          >
            <i class="iconfont icon-tianjiachengyuanjiantouzuo"></i>
          </el-button>
        </div>
        <div class="contentRight">
          <div class="conTitle clearfix">
            <!-- 左侧表格标题 -->
            <div class="tableTitLeft">
              <i class="iconfont icon-yonghuqunzu"></i>
              <span>已选中成员</span>
              <span>[{{unPeopleNums}}人]</span>
            </div>
            <el-table
              ref="multipleTable1"
              :data="newNoSelPeopleArr"
              tooltip-effect="dark"
              class="contentTable rightContentTable"
              :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
              height="480px"
              @selection-change="yesSelPeople"
            >
              <!-- 批量选中 -->
              <el-table-column
                type="selection"
                width="55"
              ></el-table-column>
              <el-table-column
                label="姓名"
                width="120"
              >
                <template slot-scope="scope">{{ scope.row.v_UserName }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="工号"
                width="100"
              >
                <template slot-scope="scope">{{ scope.row.v_UserID}}</template>
              </el-table-column>
              <el-table-column label="部门">
                <template slot-scope="scope">{{ scope.row.v_OrgFullName}}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'addModifyUserForm',
  mixins: [logMixin],
  props: {
    configData: Object
  },
  data () {
    return {
      options: [],
      // 添加分组成员弹框 下拉机构关键字（暂存）
      orgSelectKey: '',
      defaultProps: {
        children: 'children',
        label: 'v_OrgFullName',
        value: 'v_OrgCode'
      },
      // 添加分组成员弹框 未选中成员
      unPeopleNum: [],
      // 已选中人数
      unPeopleNums: 0,
      // 添加分组成员弹框 搜索关键字
      seaAddGroupDialogKey: '',
      // 共享分组数据总条数
      uncheckedTotalNum: 0,
      // 未选中成员当前页数
      uncheckedCurrentPage: 1,
      // 未选中成员当设置每页显示条数
      uncheckedPageSizes: [2, 5, 10],
      // 未选中成员默认一页显示10条
      uncheckedPageSize: 10,
      // 添加分组成员弹框 获取未选中成员 中的数据 （渲染）
      newNoSelPeopleArr: [],
      // 获取到当前分组的 成员
      groupListpeople: [],
      dialogCode: '',
      groupCode: '',
      useridArr: [],
      useridShareArr: [],
      formRed: false
    }
  },
  created () {
    this.getOrgList()
    let configBtn = this.$store.state.confsBtn
    this.dialogCode = configBtn.operationcode
    let formData = this.$store.state.fieTableData
    this.groupCode = formData.v_GrpCode
    this.getAlluserlist()
    // this.getAllshareuserlist()
  },
  watch: {
    newNoSelPeopleArr: {
      handler (nv) {
        this.formRed = nv.length > 0
      },
      deep: true
    },
    orgSelectKey (nv) {
      console.log(nv)
    }
  },
  methods: {
    // 组件类型树点击事件
    handleClickChange1 (data, node, ev) {
      // if (data.children) return
      // console.log(1)
      this.orgSelectKey = data.v_OrgFullName
      this.$refs.selectTree.blur()
      // this.cateCodeName1 = data.v_EnumValue
      this.selectInputChange(data.v_OrgCode)
    },
    // 获取到所有 已选中成员列表
    getAlluserlist () {
      let params = {
        size: 1000,
        v_GrpCode: this.groupCode
      }
      cgiService.userTemGroupList(params).then(res => {
        if (res.code === 0) {
          this.groupListpeople = res.data
          res.data.forEach(val => {
            this.useridArr.push(val.v_UserID)
          })
        }
      })
    },
    // 获取到所有 已选中成员列表
    getAllshareuserlist () {
      let params = {
        size: 1000,
        v_GrpCode: this.groupCode
      }
      cgiService.getTemUserShareList(params).then(res => {
        res.data.forEach(val => {
          this.useridShareArr.push(val.v_UserID)
        })
      })
    },
    commit () {
      let logParams = this.buttonConfig.isrecordlog === '1' ? this.getLogParams() : {}
      let idArr = []
      // 把选中的成员提交
      this.newNoSelPeopleArr.forEach(item => {
        idArr.push(item.v_UserID)
      })
      // 添加共享成员
      if (this.dialogCode === 'addShare') {
        cgiService.userTemSaveAddShareList({ v_GrpCode: this.groupCode, v_UserID: idArr, logParams }).then(res => {
        // cgiService.userTemSaveAddShareList(params).then(res => {
          if (res.code === 0) {
            this.formRed = false
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 800
            })
            let params1 = this.$store.state.paginations
            this.$emit('getTableData', params1['CC_VW_userShareGroup'])
            // 谭经理确认过的: 提示完操作成功之后再关闭弹框
            setTimeout(() => {
              this.$emit('getButtonConfig', false)
            }, 800)
            // 刷新左边自定义内容数据
            this.$emit('changeShareData', { flag: true })
          } else {
            this.$message.error(res.msg)
          }
        })
        // 点击确定 清空选中和未选中列表
        this.clearDialogList()
        // 添加用户分组成员
      } else if (this.dialogCode === 'add') {
        cgiService.userTemSaveAddGroupList({ v_GrpCode: this.groupCode, v_UserID: idArr, logParams }).then(res => {
        // cgiService.userTemSaveAddGroupList(params).then(res => {
          if (res.code === 0) {
            this.formRed = false
            this.$emit('changeShareData', { flag: true })
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 800
            })
            let params = this.$store.state.paginations
            this.$emit('getTableData', params['CC_FM_userGroup'])
            setTimeout(() => {
              this.$emit('getButtonConfig', false)
            }, 800)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      // 点击确定 清空选中和未选中列表
      this.clearDialogList()
    },
    // 当联级选择器绑定的值发生改变时触发
    selectInputChange (val) {
      if (val === '' && this.seaAddGroupDialogKey === '') {
        this.unPeopleNum = []
        this.newNoSelPeopleArr = []
      }
      // 取到最后一个orgcode
      this.orgSelectKeywords = val
      if (this.dialogCode === 'add' && val !== '') {
        // 下拉选中机构的时候 把已有的成员交给后台 做过滤
        let userids = this.useridArr
        this.getAddUserUnchecked(this.orgSelectKeywords, null, userids)
      } else if (this.dialogCode === 'addShare' && val !== '') {
        let userids = this.useridShareArr
        this.getAddUserUnchecked(this.orgSelectKeywords, null, userids)
      }
    },
    inputKeyChange (val) {
      if (val === '' && this.seaAddGroupDialogKey === '') {
        this.unPeopleNum = []
        this.newNoSelPeopleArr = []
      }
    },
    // 搜索未选中成员
    searchUncheckedPeople () {
      let idArr = []
      this.newNoSelPeopleArr.forEach(item => {
        idArr.push(item.v_UserID)
      })
      let nowGroupArr = []
      this.groupListpeople.forEach(item => {
        nowGroupArr.push(item.v_UserID)
      })
      let userids = idArr.concat(nowGroupArr)
      if (this.seaAddGroupDialogKey) {
        this.getAddUserUnchecked(null, this.seaAddGroupDialogKey, userids)
      }
    },
    // 设置左侧选中的 置灰
    tableDisabled (row, index) {
      let flag = true
      this.newNoSelPeopleArr.forEach(val => {
        // eslint-disable-next-line no-unused-vars
        for (var key in val) {
          if (val.v_UserID === row.v_UserID) {
            flag = false
          }
        }
      })
      if (!flag) {
        return false
      } else {
        return true
      }
    },
    // 未选中成员页码改变时候触发
    uncheckedSizeChange (val) {
      this.uncheckedPageSize = val
      if (this.dialogCode === 'add') {
        this.getAddUserUnchecked(null, null, this.useridArr)
      } else if (this.dialogCode === 'addShare') {
        this.getAddUserUnchecked(
          this.orgSelectKeywords,
          null,
          this.useridShareArr
        )
      }
    },
    // 未选中成员改变一页展示多少条数据时候触发
    uncheckedCurrentChange (val) {
      this.uncheckedCurrentPage = val
      if (this.dialogCode === 'add') {
        this.getAddUserUnchecked(null, null, this.useridArr)
      } else if (this.dialogCode === 'addShare') {
        this.getAddUserUnchecked(
          this.orgSelectKeywords,
          null,
          this.useridShareArr
        )
      }
    },
    // 添加分组中 未选中成员
    noSelPeople (row, ischeck, indeterminate) {
      this.groupUnchecked = row
    },
    // 点击确认选择 把未选中成员添加到已选中成员中 并且 在左边数组中删除 添加到右边的人
    MoveAddPeople () {
      // 定义一个临时变量 存放 已选中的人员
      let isCheckArr = []
      // 把左边选中的人 移到 右边

      if (!this.groupUnchecked) {
        this.$message.warning('请选中数据再进行操作')
        return
      }
      this.groupUnchecked.forEach(item => {
        isCheckArr.push(item)
      })
      // 再把右边的人员去重
      this.newNoSelPeopleArr = this.newNoSelPeopleArr.concat(
        this.arrNewSet(isCheckArr)
      )
      this.newNoSelPeopleArr = this.arrNewSet(this.newNoSelPeopleArr)
      this.unPeopleNums = this.newNoSelPeopleArr.length
    },
    cancelAddPeople () {
      let newFieldTable = []
      let newSelectedField = []
      // 右侧已选中的数据 this.groupchecked
      if (!this.groupchecked) {
        this.$message.warning('请选中数据再进行操作')
        return
      }
      this.groupchecked.forEach(val => {
        newFieldTable.push(val)
      })

      this.newNoSelPeopleArr.forEach(val => {
        let flag = false
        newFieldTable.forEach(item => {
          if (val.v_UserID === item.v_UserID) {
            flag = true
            return false
          }
        })
        if (!flag) {
          newSelectedField.push(val)
        }
        this.newNoSelPeopleArr = newSelectedField
      })
      if (newFieldTable) {
        newFieldTable.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, false)
        })
      }
      this.unPeopleNums = this.newNoSelPeopleArr.length
    },
    // 添加分组中 已选中成员
    yesSelPeople (val) {
      this.groupchecked = val
    },
    // 获取分组成员列表
    getAddUserUnchecked (orgid, keywords, ids) {
      let params = {
        v_OrgCode: this.orgSelectKey ? this.orgSelectKeywords : this.orgSelectKey,
        keywords: keywords,
        index: this.uncheckedCurrentPage,
        size: this.uncheckedPageSize,
        v_UserID: ids
      }
      cgiService.userTemAddGroupList(params).then(res => {
        this.unPeopleNum = res.data
        this.uncheckedTotalNum = res.totalCount
      })
    },
    // 获取机构人员
    getOrgList () {
      cgiService.getTemOrgList().then(res => {
        if (!res.code) {
          this.options = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 清空选中和未选中列表
    clearDialogList () {
      this.unPeopleNum = []
      this.newNoSelPeopleArr = []
      this.seaAddGroupDialogKey = ''
      this.unPeopleNums = 0
      this.uncheckedTotalNum = 0
      this.orgSelectKey = []
    },
    // 数组去重
    arrNewSet (arr) {
      var x = new Set(arr)
      return [...x]
    }
  },
  mounted () {
    // console.log(this.configData)
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .tabBox {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0px  10px;
    box-sizing: border-box;
    overflow: auto;
  .groupContent {
    display: flex;
    box-sizing: border-box;
    flex: 1;
    box-sizing: border-box;
    .contentLeft {
     width: 45%;
    }
    .dialogCommitBox {
      width: 40px;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      .el-button  {
        margin: 0;
        &:focus{
          color: #32C5D2;
        }
        &:hover{
          color: #32C5D2;
        }
        i {
          font-size: 20px;
        }
      }
    }
    .contentRight {
      flex: 1;
    }
  }
  }
  .paginationBoxSmall  /deep/ .el-pagination__editor.el-input {
    width: 90px;
  }
  .addGroupOperation /deep/ .el-cascader {
    width: 300px;
  }
  .contentTable {
    border: 1px solid #E6E6E6;
  }
}
.filter-input /deep/ #filter-input{
  padding-left: 30px;
}
#unchecked-people /deep/ .el-pagination__sizes .el-input__inner {
  padding-right: 25px;
}
#unchecked-people /deep/ .el-pagination__jump .el-input__inner {
  padding: 0;
  width: 50px;
}
</style>
