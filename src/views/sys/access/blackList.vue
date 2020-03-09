<template>
  <div class="add-modify-form" id="black-list">
   <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        @sumitForm='commit'
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="content-box">
      <div class="operation-box">
        <div class="defaultBox">
          <!-- 黑名单搜索 -->
          <el-input
            placeholder="请输入地址搜索"
            clearable
            v-model="keyBlack"
            class="input-keywords"
            @keydown.enter.native="searchDataBlack">
            <el-button slot="append" @click="searchDataBlack">
              <i class="el-icon-search"></i>
            </el-button>
          </el-input>
        </div>
        <div class="addBox" v-show="MACBox">
          <div class="addBoxMsg">
            <span>添加MAC地址</span>
            <el-input v-model="macAddr" class="input-with-250"></el-input>
          </div>
          <div class="operationDiv">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="confirmMACBox(0)">确定</el-button>
          </div>
        </div>
        <div class="addBox IPBox" v-show="IPBox">
          <div class="addBoxMsg">
            <span>添加IP地址</span>
            <el-input v-model="ipAddrOne" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipAddrTwo" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipAddrThree" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipAddrFour" :maxlength="4" class="input-with-30"></el-input>
          </div>
          <div class="operationDiv">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="confirmIPBox(0,'ip')">确定</el-button>
          </div>
        </div>
        <div class="addBox IPDBox" v-show="IPDBox">
          <div class="addBoxMsg">
            <span>添加IP段</span>
            <el-input v-model="ipdAddrOne" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrTwo" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrThree" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrFour" :maxlength="4" class="input-with-30"></el-input>
            <i>~</i>
            <el-input v-model="ipdAddrFive" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrSix" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrSeven" :maxlength="4" class="input-with-30"></el-input>
            <i>.</i>
            <el-input v-model="ipdAddrEight" :maxlength="4" class="input-with-30"></el-input>
          </div>
          <div class="operationDiv">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="confirmIPBox(0,'ipd')">确定</el-button>
          </div>
        </div>
      </div>
      <div class="black-table">
        <div>
          <div class="smallTitle">
            <i class="iconfont icon-ip"></i>IP地址/段
          </div>
          <template>
            <div class="black-ip-table">
              <el-table
                ref="multipleTable"
                :data="ipList"
                height="380px"
                tooltip-effect="dark"
                class="contentTable"
                :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                @selection-change="handleSelectionChangeIP">
                <!-- 批量选中 -->
                <!-- <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="序号" type="index" width="50"></el-table-column>-->
                <el-table-column prop="name" label="禁止IP地址/段">
                  <template slot-scope="scope">
                    <span
                      v-if="!(scope.row.i_Id === editID)"
                    >{{ scope.row.v_EndIP ? (scope.row.v_StartIP+' ~ '+scope.row.v_EndIP) : scope.row.v_StartIP}}</span>
                    <div class="editBoxInput" v-if="scope.row.i_Id === editID">
                      <el-input v-model="editBIPOne"></el-input>
                      <el-input v-model="editBIPTwo"></el-input>
                      <el-input v-model="editBIPThree"></el-input>
                      <el-input v-model="editBIPFour"></el-input>
                      <span v-if="scope.row.v_EndIP">&nbsp;~&nbsp;</span>
                      <el-input v-if="scope.row.v_EndIP" v-model="editBIPFive"></el-input>
                      <el-input v-if="scope.row.v_EndIP" v-model="editBIPSix"></el-input>
                      <el-input v-if="scope.row.v_EndIP" v-model="editBIPSeven"></el-input>
                      <el-input v-if="scope.row.v_EndIP" v-model="editBIPEight"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="90" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      class="opeartionBtn"
                      v-if="!(scope.row.i_Id === editID)"
                      @click="editIP(scope.row)"
                    >修改</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      class="opeartionBtn"
                      v-if="scope.row.i_Id === editID"
                      @click="commitIP(scope.row)"
                    >确定</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      class="opeartionBtn"
                      v-if="!(scope.row.i_Id === editID)"
                      @click="delIP(scope.row)"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      class="opeartionBtn"
                      v-if="scope.row.i_Id === editID"
                      @click="editID = '000'"
                    >取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 黑名单IP分页 -->
              <el-pagination
                :current-page.sync="blackIPCurrentPage"
                :page-sizes="blackIPPageSizes"
                :page-size="blackIPPageSize"
                :total="blackIPTotal"
                background
                class="paginationBoxSmall"
                id="black-ip-pagination"
                layout="sizes, prev, pager, next, jumper"
                @size-change="blackIPSizeChange"
                @current-change="blackIPCurrentChange"
              />
            </div>
          </template>
        </div>
        <div>
          <div class="smallTitle">
            <i class="iconfont icon-macdizhi"></i>MAC地址
          </div>
          <template>
            <div class="black-mac-table">
              <el-table
                ref="multipleTable"
                :data="macList"
                tooltip-effect="dark"
                class="contentTable"
                height="380px"
                :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                @selection-change="handleSelectionChangeMAC">
                <!-- <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="序号" type="index" width="50"></el-table-column>-->
                <el-table-column prop="name" label="禁止MAC地址/段">
                  <template slot-scope="scope">
                    <span v-if="!(scope.row.i_Id === editMacID)">{{ scope.row.v_Mac }}</span>
                    <div class="editMacBox">
                      <el-input v-model="editMACaddr" v-if="scope.row.i_Id === editMacID"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="90" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      class="opeartionBtn"
                      v-if="!(scope.row.i_Id === editMacID)"
                      @click="editMAC(scope.row)"
                    >修改</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      class="opeartionBtn"
                      v-if="scope.row.i_Id === editMacID"
                      @click="commitMAC(scope.row)"
                    >确定</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      class="opeartionBtn"
                      v-if="!(scope.row.i_Id === editMacID)"
                      @click="delMAC(scope.row)"
                    >删除</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      class="opeartionBtn"
                      v-if="scope.row.i_Id === editMacID"
                      @click="editMacID = '000'"
                    >取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="blackMACCurrentPage"
                :page-sizes="blackMACPageSizes"
                :page-size="blackMACPageSize"
                :total="blackMACTotal"
                background
                class="paginationBoxSmall"
                id="black-mac-pagination"
                layout="sizes, prev, pager, next, jumper"
                @size-change="blackMACSizeChange"
                @current-change="blackMACCurrentChange"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import { mapGetters } from 'vuex'
export default {
  name: 'blackList',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      // 记录当前点击修改 IP id
      editID: '',
      // 添加mac黑名单
      MACBox: false,
      // 添加 IP 黑名单
      IPBox: false,
      // 添加 IP 段黑名单
      IPDBox: false,
      // 黑名单搜索关键字
      keyBlack: '',
      // 以下为ip和ip段数据定义
      ipAddrOne: '',
      ipAddrTwo: '',
      ipAddrThree: '',
      ipAddrFour: '',

      ipdAddrOne: '',
      ipdAddrTwo: '',
      ipdAddrThree: '',
      ipdAddrFour: '',
      ipdAddrFive: '',
      ipdAddrSix: '',
      ipdAddrSeven: '',
      ipdAddrEight: '',
      // 以下是定义修改黑名单IP
      editBIPOne: '',
      editBIPTwo: '',
      editBIPThree: '',
      editBIPFour: '',
      editBIPFive: '',
      editBIPSix: '',
      editBIPSeven: '',
      editBIPEight: '',
      // IP列表
      ipList: [],
      // MAC列表
      macList: [],
      // mac地址
      macAddr: '',
      // 记录当前点击修改 MAC id
      editMacID: '',
      // 定义修改MAC的地址
      editMACaddr: '',

      // 黑名单 MAC 分页 默认显示第一条数据
      blackMACCurrentPage: 1,
      // 黑名单 MAC 分页 设置每页展示多少条数据数组
      blackMACPageSizes: [10, 15, 30],
      // 黑名单 MAC 分页 设置默认每页展示2条数据
      blackMACPageSize: 15,
      // 黑名单 MAC 分页 设置默认总条数为2
      blackMACTotal: 0,

      // 黑名单 IP 分页 默认显示第一条数据
      blackIPCurrentPage: 1,
      // 黑名单 IP 分页 设置每页展示多少条数据数组
      blackIPPageSizes: [10, 15, 30],
      // 黑名单 IP 分页 设置默认每页展示2条数据
      blackIPPageSize: 10,
      // 黑名单 IP 分页 设置默认总条数为2
      blackIPTotal: 0,
      apCode: ''
    }
  },
  computed: {
    ...mapGetters(['getFieTableData']),
    currentOperation () {
      return this.$store.state.confsBtn.func
    }
  },
  watch: {
    currentOperation (nVal) {
      if (nVal.indexOf('addBlackIPList') !== -1) {
        this.IPDBox = true
        this.IPBox = false
        this.MACBox = false
      } else if (nVal.indexOf('addBlackIP') !== -1) {
        this.IPBox = true
        this.IPDBox = false
        this.MACBox = false
      } else if (nVal.indexOf('addBlackMAC') !== -1) {
        this.MACBox = true
        this.IPBox = false
        this.IPDBox = false
      }
    },
    getFieTableData: {
      deep: true,
      handler (nv) {
        if (nv.hasOwnProperty('v_APcode')) {
          // 新增会走这个入口
          this.apCode = this.getFieTableData.v_APcode
          this.getIPList('0')
          this.getMacList('0')
        }
      }
    }
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      this.apCode = this.shareData.v_APcode
      this.getIPList('0')
      this.getMacList('0')
    }
  },
  destroyed () {
    this.initData()
  },
  methods: {
    initData () {
      this.ipList = []
      this.blackIPTotal = 0
      this.macList = []
      this.blackMACTotal = 0
    },
    // 删除IP地址
    delIP (row) {
      var ids = []
      ids.push(row.i_Id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.temAccessDelIP({ ids: ids }).then(res => {
          if (res.code === 0) {
            this.getIPList(row.i_Type)
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 删除mac地址
    delMAC (row) {
      var ids = []
      ids.push(row.i_Id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.temAccessDelMac({ ids: ids }).then(res => {
          if (res.code === 0) {
            this.getMacList(row.i_Type)
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 提交修改的MAC
    commitMAC (data) {
      let params = {
        i_Id: data.i_Id,
        i_Type: data.i_Type,
        v_Mac: this.editMACaddr,
        v_APcode: data.v_APcode
      }
      this.apiAddMac(params)
      // this.getMacList(data.type)
      this.editMacID = '000'
    },
    editMAC (data) {
      this.editMacID = data.i_Id
      this.editMACaddr = data.v_Mac
    },
    // 表格 中提交修改的IP
    commitIP (data) {
      this.editFlag = true
      let startip =
        this.editBIPOne +
        '.' +
        this.editBIPTwo +
        '.' +
        this.editBIPThree +
        '.' +
        this.editBIPFour
      let endip = ''
      // 添加的是IP段
      if (this.editBIPFive) {
        endip =
          this.editBIPFive +
          '.' +
          this.editBIPSix +
          '.' +
          this.editBIPSeven +
          '.' +
          this.editBIPEight
        let params = {
          i_Id: data.i_Id,
          v_APcode: data.v_APcode,
          v_StartIP: startip,
          v_EndIP: endip,
          i_Type: data.i_Type
        }
        this.apiAddIP(params)
      } else {
        // 添加的是IP
        let params = {
          i_Id: data.i_Id,
          v_APcode: data.v_APcode,
          v_StartIP: startip,
          v_EndIP: endip,
          i_Type: data.i_Type
        }
        this.apiAddIP(params)
      }
      this.editID = '000'
    },
    // 弹框中的  修改
    editIP (data) {
      this.editFlag = false
      this.editID = data.i_Id
      let dataArrStart = data.v_StartIP.split('.')
      let dataArrEnd = data.v_EndIP.split('.')
      if (!data.v_EndIP) {
        this.editBIPOne = dataArrStart[0]
        this.editBIPTwo = dataArrStart[1]
        this.editBIPThree = dataArrStart[2]
        this.editBIPFour = dataArrStart[3]
      } else {
        this.editBIPOne = dataArrStart[0]
        this.editBIPTwo = dataArrStart[1]
        this.editBIPThree = dataArrStart[2]
        this.editBIPFour = dataArrStart[3]

        this.editBIPFive = dataArrEnd[0]
        this.editBIPSix = dataArrEnd[1]
        this.editBIPSeven = dataArrEnd[2]
        this.editBIPEight = dataArrEnd[3]
      }
    },
    // 添加ip / ip段地址
    confirmIPBox (type, ip) {
      // iPv4的ip正则效验
      let reg = /^((\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5]))$/
      let ips =
        this.ipAddrOne +
        '.' +
        this.ipAddrTwo +
        '.' +
        this.ipAddrThree +
        '.' +
        this.ipAddrFour
      // 如果是添加的ip 并且 ip格式正确
      if (ip === 'ip' && reg.test(ips)) {
        let params = {
          i_Id: 0,
          i_Type: type,
          v_StartIP: ips,
          v_EndIP: '',
          v_APcode: this.apCode
        }
        this.apiAddIP(params)
      } else if (ip === 'ipd') {
        // 如果添加的是ip段 并且 每段的第一个值不能为空  并且 要在0-255之间（我这里没验证0-255）
        if (this.ipdAddrOne && this.ipdAddrFive) {
          let ipdstart = this.ipdAddrOne + '.' + this.ipdAddrTwo + '.' + this.ipdAddrThree + '.' + this.ipdAddrFour
          let ipdend = this.ipdAddrFive + '.' + this.ipdAddrSix + '.' + this.ipdAddrSeven + '.' + this.ipdAddrEight
          let params = {
            i_Id: 0,
            i_Type: type,
            v_StartIP: ipdstart,
            v_EndIP: ipdend,
            v_APcode: this.apCode
          }
          if (reg.test(ipdstart) && reg.test(ipdend)) {
            this.apiAddIP(params)
          } else {
            this.$message.warning('写入数据不正确，请您重新输入')
          }
        }
      } else {
        this.$message.warning('写入数据不正确，请您重新输入')
      }
    },
    // 添加修改IP接口
    apiAddIP (params) {
      cgiService.temAccessAddIP(params).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.getIPList(params.i_Type)
          this.clearIP()
          this.clearIPD()
          this.IPBox = false
          this.IPDBox = false
          // 重新调取接口渲染数据
          let param = this.$store.state.paginations
          this.$emit('getTableData', param['CC_VW_access'])
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加mac地址的确定按钮
    confirmMACBox (type) {
      // type 0 是黑名单
      // type 1 是白名单
      let params = {
        i_Id: 0,
        i_Type: type,
        v_Mac: this.macAddr,
        v_APcode: this.apCode
      }
      if (this.macAddr !== '') {
        this.apiAddMac(params)
      } else {
        this.$message.warning('请输入MAC地址!!!')
      }
    },
    // 添加修改MAC地址
    apiAddMac (params) {
      cgiService.temAccessSaveData4(params).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.MACBox = false
          // 添加成功后清空MAc绑定的数据
          this.macAddr = ''
          this.getMacList(params.i_Type)
          // 重新调取接口渲染数据
          let param = this.$store.state.paginations
          this.$emit('getTableData', param['CC_VW_access'])
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addBlack (command) {
      if (command === 'addBIP') {
        // 添加IP黑名单
        this.IPBox = true
        this.IPDBox = false
        this.MACBox = false
      } else if (command === 'addBIPD') {
        // 添加IP段 黑名单
        this.IPDBox = true
        this.IPBox = false
        this.MACBox = false
      } else if (command === 'addBMAC') {
        // 添加mac黑名单
        this.MACBox = true
        this.IPBox = false
        this.IPDBox = false
      }
    },
    // 取消
    cancel () {
      this.IPBox = false
      this.IPDBox = false
      this.MACBox = false

      this.macAddr = ''
      this.ipAddrOne = ''
      this.ipAddrTwo = ''
      this.ipAddrThree = ''
      this.ipAddrFour = ''

      this.ipdAddrOne = ''
      this.ipdAddrTwo = ''
      this.ipdAddrThree = ''
      this.ipdAddrFour = ''
      this.ipdAddrFive = ''
      this.ipdAddrSix = ''
      this.ipdAddrSeven = ''
      this.ipdAddrEight = ''

      this.editBIPOne = ''
      this.editBIPTwo = ''
      this.editBIPThree = ''
      this.editBIPFour = ''
      this.editBIPFive = ''
      this.editBIPSix = ''
      this.editBIPSeven = ''
      this.editBIPEight = ''
    },
    // 获取mac 列表
    getMacList (type, keywords) {
      let params = {}
      // 如果是黑名单
      params = {
        index: this.blackMACCurrentPage,
        size: this.blackMACPageSize,
        keywords
      }
      cgiService.temAccessMacList(this.apCode, type, params).then(res => {
        this.macList = res.data
        this.blackMACTotal = res.totalCount
      })
    },
    // 黑名单搜索
    searchDataBlack () {
      this.getMacList('0', this.keyBlack)
      this.getIPList('0', this.keyBlack)
    },
    handleSelectionChangeMAC (val) {
      this.macChecked = val
    },
    // 黑名单 IP 分页 分页数据调用
    blackIPSizeChange (val) {
      this.blackIPPageSize = val
      this.getIPList()
    },
    // 黑名单 IP 分页 分页数据调用
    blackIPCurrentChange (val) {
      this.blackIPCurrentPage = val
      this.getIPList()
    },
    // 黑名单 MAC 分页 分页数据调用
    blackMACCurrentChange (val) {
      this.blackMACCurrentPage = val
      this.getMacList(0)
    },
    // 黑名单 MAC 分页 分页数据调用
    blackMACSizeChange (val) {
      this.blackMACPageSize = val
      this.getMacList(0)
    },
    handleSelectionChangeIP (val) {
      this.idChecked = val
    },
    // 获取ip  列表
    getIPList (type, keywords) {
      let params = {}
      // 如果是黑名单
      params = {
        index: this.blackIPCurrentPage,
        size: this.blackIPPageSize,
        keywords
      }
      cgiService.temAccessIpList(this.apCode, type, params).then(res => {
        this.ipList = res.data
        this.blackIPTotal = res.totalCount
      })
    },
    // 清空ip段
    clearIPD () {
      this.ipdAddrOne = ''
      this.ipdAddrTwo = ''
      this.ipdAddrThree = ''
      this.ipdAddrFour = ''
      this.ipdAddrFive = ''
      this.ipdAddrSix = ''
      this.ipdAddrSeven = ''
      this.ipdAddrEight = ''
    },
    // 清空ip
    clearIP () {
      this.ipAddrOne = ''
      this.ipAddrTwo = ''
      this.ipAddrThree = ''
      this.ipAddrFour = ''
    },
    commit () {}
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
#black-list{
  .input-keywords{
    width: 350px;
    height: 30px;
  }
  .content-box{
    overflow: auto;
    padding: 10px 22px 0;
  }
  .black-table{
    display: flex;
    padding-bottom: 10px;
    >div{
      width: 50%;
      &:first-of-type{
        margin-right: 16px;
      }
    }
  }
  .paginationBoxSmall{
    border: none;
  }
  .black-ip-table,.black-mac-table{
    border: 1px solid #E6E6E6;
  }
  #black-ip-pagination,#black-mac-pagination{
    /deep/ .el-pagination__jump{
      .el-input__inner{
        padding: 0;
      }
    }
    /deep/ .el-pagination__sizes{
      .el-input__inner{
        padding: 0;
      }
    }
  }
  .addBoxMsg span{
    color: #999;
    font-size: 12px;
    margin-right: 20px;
    width: 100px;
    line-height: 30px;
    height: 30px;
  }
  .addBoxMsg i{
    font-size: 20px;
    padding: 0 2px;
  }
  /deep/ .input-with-30{
    width: 30px;
    .el-input__inner{
      padding: 0;
      text-align: center;
    }
  }
  /deep/ .input-with-250{
    width: 250px;
  }
  .addBox{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .editBoxInput{
    display: flex;
    /deep/  .el-input{
      width: 40px;
      margin-right: 2px;
      .el-input__inner{
        text-align: center;
        padding: 0 10px;
      }
    }
  }
}
/deep/ .el-table__fixed::before, .el-table__fixed-right::before {
 height: 0!important;
}
</style>
