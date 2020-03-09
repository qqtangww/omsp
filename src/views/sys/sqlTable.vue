<template>
    <!-- 系统概要管理 -->
    <div class="profileBox">
        <!-- <div class="operationBox"> -->
         <!-- 添加 -->
        <!-- <el-button class="views-tools-btn" type="primary" @click="add()" :disabled = '!addObj.operationname'><i class="iconfont icon-tianjia"></i>{{ addObj.operationname}}</el-button>
        </div> -->
     <div class="operateBox">
        <el-button type="text"> <i class="iconfont icon-tianjia"></i> 添加</el-button>
        <el-button type="text">  <i class="iconfont icon-shanchu-lajitong"></i> 删除</el-button>
        <el-button type="text"> <i class="iconfont icon-daoru"></i>导入</el-button>
        <el-button type="text"> <i class="iconfont icon-daochu"></i>导出</el-button>
      </div>
        <el-table :data="outlineList" height="calc(100vh - 183px)" style="width: 100%" class="contentTable" :row-class-name="'ws-row'" :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }">
            <!-- <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <el-form inline-message label-position="left" inline class="demo-table-expand my-info-box">
                      <el-row>
                        <el-col :span="12">
                        <el-form-item label="创建人:" label-width="120px">
                            <span>{{ props.row.creator }}</span>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                           <el-form-item label="创建时间:" label-width="120px">
                            <span>{{ props.row.createtime }}</span>
                        </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                          <el-form-item label="最后修改者:" label-width="120px">
                            <span>{{ props.row.lastmodifieduser }}</span>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="修改时间:" label-width="120px">
                            <span>{{ props.row.lastmodifiedtime }}</span>
                        </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                           <el-form-item label="跳转的URL:" label-width="120px">
                            <span>{{ props.row.jumpurl }}</span>
                        </el-form-item>
                        </el-row>
                    </el-form>
                </template>
            </el-table-column> -->
           <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column label="系统简码" prop="sysid" width="100" fixed>
            </el-table-column>
            <el-table-column label="系统名称" prop="sysname" width="100" fixed >
            </el-table-column>
            <el-table-column label="显示Logo" prop="syslogo" width="150">
                  <template slot-scope="scope">
                   <img :src="scope.row.syslogo" class="head_pic"/>
                  </template>
            </el-table-column>
            <el-table-column label="描述" prop="description" width="auto">
            </el-table-column>
            <el-table-column label="日志清除天数" prop="autologperiod" width="120">
                 <template slot-scope="scope">
                  <span>{{scope.row.autologperiod}} 天</span>
                  </template>
            </el-table-column>
              <el-table-column label="系统开启" prop="isopen" width="100">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isopen" @change="SwichIsopen(scope.row)"  active-color="#32c5d2" inactive-color="#e6e7e8" active-value="1" inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
              <el-table-column label="自动清除日志" prop="autologclear" width="120">
                 <template slot-scope="scope">
                    <el-switch v-model="scope.row.autologclear" @change="SwichAutologclear(scope.row)" active-color="#32c5d2" inactive-color="#e6e7e8" active-value="1" inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
          <el-button
            type="text"
            class="opeartionBtn"
            @click="edit(scope.row)" v-if="modifyObj.operationname">{{modifyObj.operationname}}</el-button>
          <el-button
            type="text"
            class="opeartionBtn"
            @click="del(scope.row)" v-if="delObj.operationname">{{delObj.operationname}}</el-button>
        </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
      <el-pagination
        class="paginationBox"
        :current-page.sync="index"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="total"
        background
        layout="sizes, prev, pager, next, jumper, total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextPage"
        @prev-click='upPage'/>
      <!-- 弹出框 -->
      <el-dialog   v-dialogDrag :title="title" :visible.sync="dialogFormVisible" @close="handleClose" top='4vh' class="formBox" :close-on-click-modal='false'>
      <!-- <el-dialog  :title="title" :visible.sync="dialogFormVisible" @close="handleClose" top='4vh' custom-class='userFormBox'> -->
        <div class="bodyBorderBox">
        <div class="formOperateBox">
            <el-button type="text" @click="dialogFormVisible = false"> <i class="el-icon-close"></i> 关闭</el-button>
             <el-badge :is-dot="isBadge" class="item">
            <el-button type="text" @click="commit('formdata')"> <i class="el-icon-document"></i> 保存</el-button>
            </el-badge>
          </div>
          <el-form inline-message ref='formdata' :model="formdata">
              <div class="titleMsg">
              <i class="iconfont icon-jibenxinxi"></i>
              <span>基本信息</span>
              </div>
              <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="formdata.sysname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="系统简码" :label-width="formLabelWidth">
                  <el-input v-model="formdata.sysid" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="系统显示Logo" :label-width="formLabelWidth">
                  <el-input v-model="formdata.syslogo" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth" class='description-label'>
                  <el-input v-model="formdata.description" placeholder="可填写相关描述，帮助用户记忆和了解" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"/>
              </el-form-item>
              <div class="formLineBox"></div>
              <div class="titleMsg">
              <i class="iconfont icon-shezhi"></i>
              <span>设置</span>
              </div>
              <el-form-item label="跳转的URL" :label-width="formLabelWidth">
                  <el-input v-model="formdata.jumpurl" autocomplete="off"></el-input>
              </el-form-item>
              <div class="switchBox">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="项目是否开启" :label-width="formLabelWidth">
                      <el-switch v-model="formdata.isopen" active-color="#32c5d2" inactive-color="#e6e7e8" active-value="1"   inactive-value="0"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="自动清除日志" :label-width="formLabelWidth">
                      <el-switch v-model="formdata.autologclear" active-color="#32c5d2" inactive-color="#e6e7e8" active-value="1"   inactive-value="0"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
                <el-form-item label="日记清除间隔天数" :label-width="formLabelWidth">
                <el-input-number v-model="formdata.autologperiod" controls-position="right" @change="handleChange" :min="1"></el-input-number>
              </el-form-item>
              </div>
          </el-form>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit('formdata')">确 定</el-button>
          </div> -->
           </div>
      </el-dialog>
    </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import global from '@/views/global/global'
export default {
  data () {
    return {
      imgSrc: '',
      // 弹出框标题
      title: '',
      // 获取当前页面的pageid
      pageid: '',
      // 增加数组
      addObj: {},
      // 修改
      modifyObj: {},
      // 删除
      delObj: {},
      // 表单的显示或隐藏
      dialogFormVisible: false,
      // 系统概要列表数据
      outlineList: [],
      // 分页
      pageSizes: [15, 30, 50],
      pageSize: 15,
      // 初始页
      index: 1,
      // 总条数
      total: 0,
      // 弹出框表单
      formdata: {
        // 序号
        id: '0',
        // 系统简码
        sysid: '',
        // 系统名称
        sysname: '',
        // 系统显示logo
        syslogo: '',
        // // 系统名称
        // 创建人
        creator: '',
        // 描述
        description: '',
        // 自动清除日志
        autologclear: '',
        // 自动清除日志的间隔
        autologperiod: '',
        // 跳转的url
        jumpurl: '',
        // 系统是否开启
        isdefuatl: ''
      },
      formLabelWidth: '140px'
    }
  },
  created () {
    let _this = this
    global.getPageId(_this)
    this.queryOutlineInterface()
  },
  methods: {
    dargEagle (e) {
      let dragBox = document.querySelector('.dragBox')
      let pageOrgWrapper = document.querySelector('.page-org-wrapper')
      let orgBox = document.querySelector('.orgBox')

      // console.log(e.clientX)
      // let x = e.clientX
      dragBox.style.left = e.clientX - 208 + 'px'
      let treeWrapper = document.querySelector('.tree-wrapper')
      // let dragBoxLeft = dragBox.offsetLeft
      let treeWrapperWidth = treeWrapper.offsetWidth
      // let orgBox = document.querySelector('.orgBox')
      // let x = e.clientX
      document.onmousemove = function (e) {
        e.preventDefault()
        treeWrapper.style.width = e.clientX - 208 + 'px'
        orgBox.style.width = pageOrgWrapper.offsetLeft - e.clientX + 'px'
      }
      document.onmouseup = function (e) {
        dragBox.style.left = null
        document.onmousemove = null
      }
    },
    // 自动清除日记
    SwichAutologclear (row) {
      this.formdata = Object.assign({}, row)
      this.isSwich()
    },
    // 系统开启
    SwichIsopen (row) {
      this.formdata = Object.assign({}, row)
      this.isSwich()
    },
    // 下一页
    nextPage (val) {
      this.index = val
      this.queryOutlineInterface()
    },
    // 上一页
    upPage (val) {
      this.index = val
      this.queryOutlineInterface()
    },
    // 获取系统概要信息
    queryOutlineInterface () {
      let params = {
        index: this.index,
        size: this.pageSize
      }
      cgiService.getOutlineInterface(params).then(res => {
        this.total = res.totalCount
        this.outlineList = res.data
      })
    },
    // 添加
    add () {
      this.dialogFormVisible = true
      this.title = '添加系统概要'
      this.formdata = {}
      // 清除表单验证残留
      if (this.$refs.formdata) {
        this.$refs.formdata.clearValidate()
      }
    },
    handleChange (nub) {},

    handleClose () {
      this.form = {}
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.queryOutlineInterface()
    },
    // 点击的页码
    handleCurrentChange (val) {
      this.index = val
      this.queryOutlineInterface()
    },
    // 提交
    commit (formdata) {
      let params = this.formdata
      delete this.formdata.status
      delete this.formdata.creator
      delete this.formdata.createtime
      delete this.formdata.lastmodifieduser
      delete this.formdata.lastmodifiedtime
      this.$refs[formdata].validate(valid => {
        if (valid) {
          cgiService.addOutlineInterface(params).then(res => {
            this.dialogFormVisible = false
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.queryOutlineInterface()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改
    edit (row) {
      this.title = '修改系统概要'
      this.dialogFormVisible = true
      this.formdata = Object.assign({}, row)
      this.newForm = Object.assign({}, row)
      // 表单验证残留
      if (this.$refs.formdata) {
        this.$refs.formdata.clearValidate()
      }
    },
    // 删除
    del (row) {
      var ids = []
      ids.push(row.id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.delOutlineInterface({ ids: ids }).then(res => {
          this.dialogFormVisible = false
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.queryOutlineInterface()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    isSwich () {
      cgiService.addOutlineInterface(this.formdata).then(res => {
        this.dialogFormVisible = false
        if (res.code === 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.queryOutlineInterface()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.profileBox{
  .head_pic{
    height:24px;
  }
  .switchBox {
    .el-form-item {
        margin: 10px 0 0 0 !important;
    }
  }
  @media screen and (min-width: 1400px) {
    .contentTable{
      height: calc(100vh - 205px) !important;
    }
  }
 .userFormBox {
   .el-dialog__body {
      height: calc(95vh - 140px);
      overflow-x: hidden;
    }
  }
}
</style>
