<template>
  <div class="toolsBox" v-if="isshowactionbar === '1'">
    <!-- 添加密码策略 -->
    <div class="toolsCls" id="tools-button">
      <div
        v-for="(item,index) in toolsOpera"
        :key="index">
        <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
        <!-- buttype === 2 自定义按钮 -->
        <div v-if="item.buttype === '2' && (item.func !== 'importData' && item.ishidden === '0')" class="custom-button">
          <!-- operationparentid 用来判断分组 -->
          <!-- {{item.displaystyle}} -->
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            type="text"
            v-if="item.operationparentid === '0' && item.displaystyle === '1'"
            :ref="item.operationid"
            @click="btnFoo(item)"
          ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
          </el-button>
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            type="text"
            v-else-if="item.operationparentid === '0' && item.displaystyle === '2'"
            :ref="item.operationid"
            @click="btnFoo(item)"
          ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
          <el-button
            class="views-tools-btn"
            :disabled="item.isdisabled === '1'"
            type="text"
            v-else-if="item.operationparentid === '0' && item.displaystyle === '3'"
            :ref="item.operationid"
            @click="btnFoo(item)"
          >{{item.operationname}}</el-button>
          <!-- 分组下的按钮 -->
          <i class="iconfont icon-xia" v-if="parentArr.includes(item.operationid) && item.operationparentid === '0'"></i>
          <ul class="group-div" ref='group-div' v-if="item.operationid === isGroupID">
            <li v-for="(item,index) in groupList" :key='index'>
              <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
              <el-button
                v-if="item.displaystyle === '1'"
                class="views-tools-btn"
                type="text"
                :ref="item.operationid"
                @click="btnFoo(item)"
              ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
              </el-button>
              <el-tooltip class="item" effect="dark" :content="item.operationname" placement="bottom-start" v-if="item.displaystyle === '2'">
                <el-button
                  v-if="item.displaystyle === '2'"
                  class="views-tools-btn"
                  type="text"
                  :ref="item.operationid"
                  @click="btnFoo(item)"
                ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
              </el-tooltip>
              <el-button
                v-if="item.displaystyle === '3'"
                class="views-tools-btn"
                type="text"
                :ref="item.operationid"
                @click="btnFoo(item)"
              >{{item.operationname}}
              </el-button>
            </li>
          </ul>
        </div>
        <!-- buttype === 1 系统按钮 -->
        <div v-else-if="item.buttype === '1' && (item.func !== 'importData' && item.ishidden === '0')">
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" :class="'dot-' + pointData" v-if="item.operationparentid === '0' && item.displaystyle === '1'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              type="text"
              :ref="item.operationid"
              @click="btnFoo(item)"
            ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
            </el-button>
          </el-badge>
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" :class="'dot-' + pointData" v-else-if="item.operationparentid === '0' && item.displaystyle === '2'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              type="text"
              :ref="item.operationid"
              @click="btnFoo(item)"
            ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
          </el-badge>
          <el-badge :is-dot="item.func === 'commitSort' && tableRed" :class="'dot-' + pointData" v-else-if="item.operationparentid === '0' && item.displaystyle === '3'">
            <el-button
              class="views-tools-btn"
              :disabled="item.isdisabled === '1'"
              type="text"
              :ref="item.operationid"
              @click="btnFoo(item)"
            ></el-button>
          </el-badge>
        </div>
        <span class="between-line" v-else-if="item.buttype === '4'"></span>
          <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
        <el-upload
          v-if="item.func === 'importData'"
          class="upload-demo"
          ref="upload"
          :action='action'
          :on-success="handleUpload1Success"
          :on-progress="() => progress1 = true"
          :show-file-list='false'
          name="szUploadFile">
            <el-button
              :disabled="item.isdisabled === '1'"
              v-if="item.displaystyle === '1'"
              type="text"
              slot="trigger"
              @click="btnFoo(item)"
            ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{ item.operationname }}
            </el-button>
            <el-button
              :disabled="item.isdisabled === '1'"
              v-else-if="item.displaystyle === '2'"
              type="text"
              slot="trigger"
              @click="btnFoo(item)"
            ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
            <el-button
              v-else-if="item.displaystyle === '3'"
              :disabled="item.isdisabled === '1'"
              type="text"
              slot="trigger"
              @click="btnFoo(item)"
            >{{ item.operationname }}</el-button>
        </el-upload>
      </div>
    </div>
    <!-- 控制 选择栏显示隐藏按钮 -->
    <span v-if="showSelBtn === '1'" class="unfoldSea" :class="'unfoldSea-' + viewid" @click="unfoldSea"><i class="iconfont icon-sousuozhankai"></i></span>
  </div>
</template>
<script>

import Bus from '@/assets/js/bus.js'
import { API } from '@/api/basic'
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import { toolsFun } from '@/assets/js/toolsFun.js'
import { mapState } from 'vuex'
const stdTools = {
  name: 'stdTools',
  mixins: [mixin, toolsFun],
  data () {
    return {
      cgiService,
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
      viewid: '',
      // 传递按钮的配置项 后续根据配置项调取接口
      // btnConfigData: {
      //   i_Cate: '',
      //   operationcode: '',
      //   v_CateCode: '',
      //   v_Code: ''
      // },
      action: 'InterfaceGrid/importFile/',
      // 小红点
      formRed: false,
      tableRed: false,
      // 视图操作栏背景
      stdToolsColor: '',
      // 操作按钮的父级id【operationparentid】
      parentArr: [],
      condition1: false,
      condition2: false,
      // 按钮组的id
      isGroupID: ''
    }
  },
  computed: {
    ...mapState({
      // 小红点颜色（参数）
      pointData: state => state.parameter.windowRed.v_ParamValue
    })
  },
  props: {
    configData: Object,
    shareData: Object,
    checkSelectData: Array
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        if (Object.keys(nv).length === 0) return
        this.viewid = nv.confView.viewid
        this.viewID = JSON.parse(sessionStorage['refreshPageData'] || '{}').viewid || ''
        let res = nv
        // 如果不显示操作栏 下面就不需要执行了
        if (res.confView.isshowactionbar === '0') return
        this.isshowactionbar = res.confView.isshowactionbar
        this.toolsOpera = res.confOperation.tools
        // 点击的时候，先判断 operationparentid 是不是都为0
        // 如果不是 再判断其它的operationparentid 是否等于自身 operationid
        // 如果是 就证明它是一个分组按钮
        this.groupList = []
        let operationidArr = []
        this.toolsOpera.forEach(val => {
          // tools操作按钮的operationid数组
          operationidArr.push(val.operationid)
          this.parentArr.push(val.operationparentid)
        })
        // 如果是分组按钮 就往分组按钮列表添加数据
        this.toolsOpera.forEach(val => {
          operationidArr.forEach(items => {
            // console.log(1)
            // 如果按钮的operationparentid 在 operationid数组存在 它就是一个分组按钮
            if (val.operationparentid === items) {
              this.isGroupID = items
              this.groupList.push(val)
            }
          })
        })
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
        // 显示查询栏按钮
        // 显示查询栏 并且 是自定义查询
        this.condition1 = res.confView.isshowenquirybar === '1' && res.confView.isudenquirypage === '1'
        // 显示查询栏 并且 作为查询的字段个数 大于0
        this.condition2 = res.confView.isshowenquirybar === '1' && Object.keys(isSelectArr).length > 0
        if (this.condition1 || this.condition2) {
          this.showSelBtn = '1'
        } else {
          this.showSelBtn = '0'
        }
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
      if (document.querySelector(`.selectComponent-${this.viewid}`)) {
        if (document.querySelector(`.selectComponent-${this.viewid}`).style.display === 'none') {
          document.querySelector(`.selectComponent-${this.viewid}`).style.display = 'flex'
          document.querySelector(`.unfoldSea-${this.viewid}`).style.transform = 'rotateZ(0deg)'
        } else {
          document.querySelector(`.selectComponent-${this.viewid}`).style.display = 'none'
          document.querySelector(`.unfoldSea-${this.viewid}`).style.transform = 'rotateZ(180deg)'
        }
      } else {
        if (document.querySelector(`.customQuery-${this.viewid}`).style.display === 'none') {
          document.querySelector(`.customQuery-${this.viewid}`).style.display = 'flex'
          document.querySelector(`.unfoldSea-${this.viewid}`).style.transform = 'rotateZ(0deg)'
        } else {
          document.querySelector(`.customQuery-${this.viewid}`).style.display = 'none'
          document.querySelector(`.unfoldSea-${this.viewid}`).style.transform = 'rotateZ(180deg)'
        }
      }
    },
    handleUpload1Success (res, file, fileList) {
      this.progress1 = false
      let param = this.$store.state.paginations
      this.$parent.getTableData(param[this.viewid])
      if (!res.code) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    // 按钮点击
    btnFoo (item) {
      this.$store.commit('modifyCheckedData', this.checkSelectData)
      // 如果是导入，直接导入文件然后return
      if (item.func === 'importData') {
        this.action = 'InterfaceGrid/importFile/'
        API.post('InterfaceGrid/importFile/' + this.viewID).then()
        this.action = API.defaults.baseURL + this.action + this.viewID
        return
      }
      if (!this.parentArr.includes(item.operationid) || item.operationparentid !== '0') {
        this.toolsFunc(item)
      }
    },
    close () {
      // 判断当前关闭的弹框 是Form还是Tab页  传对应的code
      let code = ''
      if (this.configData.tabConfig) {
        code = this.configData.tabConfig.regionConf.v_RegionCode
      } else {
        code = this.configData.confView.viewid
      }
      // 获取当前的 code 传值上去做对比
      let params = {
        code: code,
        flag: false
      }
      this.$emit('close', params)
    }
  },
  mounted () {
    if (this.condition1 || this.condition2) {
      // 如果是缺省显示查询栏 显示隐藏查询栏的箭头朝上
      if (this.configData.confView.isenquirybarexpand === '1') {
        document.querySelector(`.unfoldSea-${this.viewid}`).style.transform = 'rotateZ(0deg)'
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
  // border: 1px solid #ebeef5;
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
  z-index: 10;
  .views-tools-btn /deep/ i{
      font-size: 14px;
  }
  /deep/ .icon-xia{
    position: absolute;
    top: 0;
    right: -18px;
  }
}
#tools-button button{
  color: #333333;
}
/deep/ .el-badge__content.is-fixed.is-dot {
  right: 0px!important;
}
.unfoldSea{
  transform: rotateZ(180deg);
}
</style>
