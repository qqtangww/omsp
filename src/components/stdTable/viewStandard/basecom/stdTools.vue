<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-30 16:57:58
 * @LastEditTime: 2019-09-26 11:06:18
 * @LastEditors: ly
 -->
<template>
  <div class="toolsBox" v-if="isshowactionbar === '1'">
    <!-- 添加密码策略 -->
    <div class="toolsCls" id="tools-button">
      <div
        v-for="(item,index) in toolsOpera"
        :key="index">
        <!-- buttype === 2 自定义按钮 -->
        <div v-if="item.buttype === '2' && (item.func !== 'importData' && item.ishidden === '0')" class="custom-button">
          <!-- operationparentid 用来判断分组 -->
          <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
          <!-- {{item.displaystyle}} -->
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            :icon="item.iconurl"
            type="text"
            v-if="item.operationparentid === '0' && item.displaystyle === '1'"
            :ref="item.operationid"
            @mouseover.native="btnHover(item)"
            @click="btnFoo(item)"
          >{{item.operationname}}
          </el-button>
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            :icon="item.iconurl"
            type="text"
            v-else-if="item.operationparentid === '0' && item.displaystyle === '2'"
            :ref="item.operationid"
            @mouseover.native="btnHover(item)"
            @click="btnFoo(item)"
          ></el-button>
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            type="text"
            v-else-if="item.operationparentid === '0' && item.displaystyle === '3'"
            :ref="item.operationid"
            @mouseover.native="btnHover(item)"
            @click="btnFoo(item)"
          >{{item.operationname}}</el-button>
          <!-- 分组下的按钮 -->
          <ul class="group-div" ref='group-div' v-if="item.operationparentid === '0'">
            <li v-for="(item,index) in groupList" :key='index' @click="btnFoo(item)">{{item.operationname}}</li>
          </ul>
        </div>
        <!-- buttype === 1 系统按钮 -->
        <div v-else-if="item.buttype === '1' && (item.func !== 'importData' && item.ishidden === '0')">
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" class="red-table" v-if="item.operationparentid === '0' && item.displaystyle === '1'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              :icon="item.iconurl"
              type="text"
              @mouseover.native="btnHover(item)"
              :ref="item.operationid"
              @click="btnFoo(item)"
            >{{item.operationname}}
            </el-button>
          </el-badge>
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" class="red-table" v-else-if="item.operationparentid === '0' && item.displaystyle === '2'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              :icon="item.iconurl"
              type="text"
              @mouseover.native="btnHover(item)"
              :ref="item.operationid"
              @click="btnFoo(item)"
            >{{item.operationname}}
            </el-button>
          </el-badge>
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" class="red-table" v-else-if="item.operationparentid === '0' && item.displaystyle === '3'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              type="text"
              @mouseover.native="btnHover(item)"
              :ref="item.operationid"
              @click="btnFoo(item)"
            ></el-button>
          </el-badge>
        </div>
        <span class="betweenLine" v-else-if="item.buttype === '4'"></span>
        <el-upload
          v-if="item.func === 'importData'"
          class="upload-demo"
          ref="upload"
          :action='action'
          :on-success="handleUpload1Success"
          :on-progress="() => progress1 = true"
          :show-file-list='false'
          name="szUploadFile">
          <el-button slot="trigger" :icon="item.iconurl" type="text" @click="btnFoo(item)">导入</el-button>
        </el-upload>
      </div>
    </div>
    <!-- 控制 选择栏显示隐藏按钮 -->
    <span v-if="showSelBtn === '1'" class="unfoldSea" @click="unfoldSea"><i class="iconfont icon-sousuozhankai"></i></span>
  </div>
</template>
<script>

import Bus from '@/assets/js/bus.js'
import { API } from '@/api/basic'
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'

const stdTools = {
  name: 'stdTools',
  mixins: [mixin],
  data () {
    return {
      Bus,
      addDialog: false,
      confToolsBtn: {},
      confFunc: {},
      // 操作按钮配置项
      toolsOpera: [],
      // 显示操作栏
      isshowactionbar: '0',
      showSelBtn: '1',
      // 分组下的按钮
      groupList: [],
      viewID: '',
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {
        i_Cate: '',
        operationcode: '',
        v_CateCode: '',
        v_Code: ''
      },
      action: 'InterfaceGrid/importFile/',
      // 小红点
      formRed: false,
      tableRed: false
    }
  },
  props: {
    configData: Object,
    shareData: Object
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        if (Object.keys(nv).length === 0) return
        this.viewID = JSON.parse(sessionStorage['refreshPageData'] || '{}').viewid || ''
        let res = nv
        this.toolsOpera = res.confOperation.tools
        // 是否显示操作栏
        this.isshowactionbar = res.confView.isshowactionbar
        // 控制收缩 查询栏按钮 显示隐藏
        let isSelectArr = {}
        res.confColumn.map(val => {
          for (var key in val) {
            if (val.isselect === '1') {
              isSelectArr[val.colname] = val.coltitle
              return
            }
          }
        })
        if (Object.keys(isSelectArr).length < 1 || res.confView.isshowenquirybar === '0') {
          this.showSelBtn = '0'
        }
      }
    },
    btnConfigData: {
      deep: true,
      immediate: true,
      handler (nv) {
        this.$emit('buttonConfig', nv)
      }
    },
    shareData: {
      handler: function (nv) {
        this.formRed = nv.formRed
      },
      immediate: true,
      deep: true
    },
    formRed: {
      deep: true,
      handler (nv) {
        // 如果有activename属性 证明该视图在tab组件中，小红点应该出现在tab上
        if (this.shareData.hasOwnProperty('activeName') && this.configData.hasOwnProperty('tabConfig')) {
          let currentTab = this.configData.tabConfig.regionConf.v_RegionCode
          this.$emit('warningToSaveData', { currentLabel: Number(this.shareData.activeName), unRedDot: !nv, currentTab })
        } else {
          this.tableRed = nv
        }
      }
    }
  },
  methods: {
    unfoldSea () {
      // 设置合计行高度
      if (document.querySelector('.selectComponent').style.display === 'none') {
        document.querySelector('.selectComponent').style.display = 'flex'
        document.querySelector('.unfoldSea').style.transform = 'rotateZ(180deg)'
      } else {
        document.querySelector('.selectComponent').style.display = 'none'
        document.querySelector('.unfoldSea').style.transform = 'rotateZ(0deg)'
      }
      // 获取查询元素高度
      let selectComponent = document.querySelector('.selectComponent').offsetHeight

      // 获取工具栏元素
      let toolsBox = document.querySelector('.toolsBox').offsetHeight

      // 获取分页高度
      let paginationBox = document.querySelector('.viewPagination.el-pagination').offsetHeight

      let headerWrapper = document.querySelector('.header-top').offsetHeight
      let tabMenuBtnBox = document.querySelector('.tab-menu-box').offsetHeight
      // 获取表格元素
      let contentTable = document.querySelector('.contentTable')
      let sumHeight = selectComponent + toolsBox + paginationBox + headerWrapper + tabMenuBtnBox + 8

      contentTable.style.height = 'calc(100vh - ' + sumHeight + 'px)'
    },
    handleUpload1Success (res, file, fileList) {
      this.progress1 = false
      let param = this.$store.state.paginations
      this.$parent.getTableData(param[this.configData.confView.viewid])
      if (!res.code) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    // 按钮点击
    btnFoo (item) {
      // 如果是导入，直接导入文件然后return
      if (item.func === 'importData') {
        this.action = 'InterfaceGrid/importFile/'
        let operationid = this.$store.state.confsBtn.operationid
        let operationname = this.$store.state.confsBtn.operationname
        // 获取需要传的数据
        let params = this.commitData(operationid, operationname)
        API.post('InterfaceGrid/importFile/' + this.viewID, { params }).then()
        this.action = API.defaults.baseURL + this.action + this.viewID

        return
      }
      // 点击的时候，先判断 operationparentid 是不是都为0
      // 如果不是 再判断其它的operationparentid 是否等于自身 operationid
      // 如果是 就证明它是一个分组按钮
      this.groupList = []
      let parentArr = []
      this.toolsOpera.forEach(val => {
        parentArr.push(val.operationparentid)
      })
      // 如果是分组按钮 就往分组按钮列表添加数据
      if (parentArr.includes(item.operationid) && item.operationparentid === '0') {
        this.toolsOpera.forEach(val => {
          if (val.operationparentid === item.operationid) {
            this.groupList.push(val)
          }
        })
      } else {
        this.findFunc(item)
      }
    },
    btnHover (item) {
      // 点击的时候，先判断 operationparentid 是不是都为0
      // 如果不是 再判断其它的operationparentid 是否等于自身 operationid
      // 如果是 就证明它是一个分组按钮
      this.groupList = []
      let parentArr = []
      this.toolsOpera.forEach(val => {
        parentArr.push(val.operationparentid)
      })
      // 如果是分组按钮 就往分组按钮列表添加数据
      if (parentArr.includes(item.operationid) && item.operationparentid === '0') {
        this.toolsOpera.forEach(val => {
          if (val.operationparentid === item.operationid) {
            this.groupList.push(val)
          }
        })
      }
    }
  }
}
export default stdTools
</script>
<style lang="scss" scoped>
.red-table{
  /deep/ .is-dot{
    width: 6px;
    height: 6px;
    right: 0;
  }
}
.custom-button{
  position: relative;
  &:hover{
    .group-div{
      display: block;
    }
  }
}
.group-div{
  position: absolute;
  top: 28px;
  left: 0;
  width: 100px;
  list-style: none;
  display: none;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 0;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 0;
  text-align: center;
  z-index: 10;
  margin: 0;
  li{
    height: 30px;
    font-size: 12px;
    color: #333333;
    line-height: 30px;
    cursor: pointer;
    text-align: left;
    padding-left: 23px;
  }
}
.toolsBox{
  .icon-tianjia {
    vertical-align: text-bottom;
    color: #5892f6;
  }
  .icon-shanchu-lajitong {
    color: #f55e5e;
    vertical-align: text-bottom;
  }
  .icon-daoru {
    color: #23dbc2;
    vertical-align: text-bottom;
  }
  .icon-daochu {
    color: #23dbc2;
    vertical-align: text-bottom;
  }
  .icon-baocunpaixu {
    color: #5892f6;
    vertical-align: text-bottom;
  }
  .views-tools-btn /deep/ i{
      font-size: 14px;
  }
}
#tools-button button{
  color: #333333;
}
</style>
