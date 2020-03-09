<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 17:22:21
 * @LastEditTime: 2019-09-24 17:56:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tree-wrap">
    <div id="template-tree-box">
      <!-- 标题栏 -->
      <tree-title v-if="treeConfig.confView.isshowtitlebar === '1'" :configData='treeConfig' @showTreeDialog="showTreeDialog" @btnConfigData="getBtnConfigData" @customShareData="customShareData" @getData='getTreeData'></tree-title>
      <el-input
        v-if="treeConfig.confView.isshowsearchbar === '1'"
        placeholder="输入关键字进行过滤"
        class="tree-input-search"
        clearable
        v-model="filterText">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="tree-layout">
        <!-- :class="classList" -->
        <el-tree
          :class="classList"
          ref="tree"
          node-key="i_Cid"
          :data="treeData"
          :props="defaultProps"
          :draggable="treeConfig.confView.isdropsort === '1'"
          :show-checkbox="treeConfig.confView.isshowselectbar === '1'"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :default-expand-all="false"
          :expand-on-click-node='false'
          :accordion='treeConfig.confView.isaccordionmode === "1"'
          :auto-expand-parent='false'
          :default-expanded-keys="expandedKeys"
          :filter-node-method="filterNode"
          @node-drag-start="handleDragStart"
          @node-drop="handleDrop"
          @node-click="handleNodeClick" >
          <div class="custom-tree-node" slot-scope="{ data }" :class="data.specialNodeClass ? data.specialNodeClass : ''">
            <div class="treeIconBox">
              <!-- <span>{{ data }}</span> -->
              <div class="treeIconBox-right" v-if="data.isVirtualNode">
                <div>
                  <!-- 虚拟跟节点前面的图标 -->
                  <i :class="data.iconurl" :style="{'color':data.iconcolor}" v-if="data.iconurl" class="node-icon"></i>
                  <span :class="[nodeObj.nodetextstyle,'tree-text-span']">{{ data[defaultProps.label] }}</span>
                </div>
              </div>
              <div class="treeIconBox-right" v-else>
                <div>
                  <!-- 节点前面的图标 -->
                  <i :class="data.iconUrlData ? data.iconUrlData : data.iconurl" :style="{'color':data.iconUrlData ? data.iconColorData : data.iconcolor}" v-if="data.iconurl" class="node-icon"></i>
                  <!-- 节点文字 判断：1、如果有传入的数据，优先使用传入的数据是否有匹配的节点 2、如果没有传入的数据，就使用默认的配置-->
                  <span :class="[nodeObj.nodetextstyle,'tree-text-span']">{{ resCidArr.includes(data.i_Cid) ? (dataWantToChange.resDataShowfield ? dataWantToChange.resDataShowfield : getNodeData(defaultProps.label, data)) : getNodeData(defaultProps.label, data) }}</span>
                  <span :class="nodeObj.nodetextstyle" v-if="resCidArr.includes(data.i_Cid) || nodeObj.isShowNodeNum && data[nodeObj.shownumfield] !== '0'">(</span>
                  <!-- 节点数字显示判断：是否显示节点数字字 并且 当前数字字段值不等于0                                                                    节点数字判断：有没有传入改变指定节点的数据 ?     (           是否改变当前节点   ?         当前节点数字      :     (     是否改变指定节点     ?       指定节点数字           :       默认显示         ) )    : 默认显示 -->
                  <span :class="[nodeObj.nodenumstyle,'treeNum']" v-if="resCidArr.includes(data.i_Cid) || nodeObj.isShowNodeNum && data[nodeObj.shownumfield] !== '0'">{{ resCidArr.includes(data.i_Cid) ? (  isChangeCurrentNode(data) ? changeCurrentNode(data) : (  isChangeTargetNode(data) ? changeTargetNode(data) : data[nodeObj.shownumfield] )  ) : data[nodeObj.shownumfield] }}</span>
                  <span :class="nodeObj.nodetextstyle" v-if="resCidArr.includes(data.i_Cid) || nodeObj.isShowNodeNum && data[nodeObj.shownumfield] !== '0'">)</span>
                </div>
                <div class="iconBox" v-if="rowID === data.i_Id">
                  <!-- 节点操作按钮 -->
                  <div
                    class="tree-node-button"
                    v-for="(item,index) in treeConfig.confOperation.inline"
                    :key="index">
                    <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
                    <div v-if="item.specialdisplayfunc ? transformStr(item,data) : true">
                      <el-tooltip
                        v-if="item.displaystyle === '2'"
                        class="item"
                        effect="dark"
                        :content="item.operationname"
                        placement="bottom">
                        <!-- 仅图标 -->
                        <el-button
                          :disabled="item.isdisabled === '1'"
                          @click.prevent.stop="getFunction(item,data)"
                          type="text"
                        ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
                      </el-tooltip>
                      <!-- 仅文字 -->
                      <el-button
                        v-else-if="item.displaystyle === '3'"
                        :disabled="item.isdisabled === '1'"
                        type="text"
                        @click.prevent.stop="getFunction(item,data)"
                      >{{ item.operationname }}</el-button>
                      <!-- 图标文字 -->
                      <el-button
                        v-else
                        :disabled="item.isdisabled === '1'"
                        type="text"
                        @click.prevent.stop="getFunction(item,data)"
                      ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <dialog-standard v-on="$listeners" v-if="ifDialog" :ifDialog='ifDialog' :configData='btnConfigData' :shareData='currentData' @getData='getTreeData' @getDialogStatus='getDialogStatus'></dialog-standard>
  </div>
</template>
<script>
import util from '@/common/js/util.js'
import { API } from '@/api/basic'
// 弹框
import treeMixin from '@/common/js/mixins/treeMixin'
import dialogStandard from '@/components/stdDialog/stdDialogAction'
import treeTitle from '@/components/stdTitle/treeTitle'
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
  props: {
    // 传入一个对象 作为请求树的配置项接口 参数
    configData: {
      type: Object,
      default () {
        return Object.create(null)
      }
    },
    shareData: Object
  },
  mixins: [treeMixin],
  data () {
    return {
      treeConfig: {
        confView: {},
        confOperation: {}
      },
      // 节点是否可被选择
      showCheckbox: true,
      // 是否展示查询栏
      showSearch: true,
      // 查询关键字 绑定的字段
      filterText: '',
      defaultProps: {
        children: 'children',
        label: ''
      },
      // 树的数据
      treeData: [],
      // 树编码
      treeCode: '',
      // 默认展开的树节点
      expandedKeys: [],
      classList: [],
      rowID: '',
      // 请求树配置项 传递的参数
      commitParams: {},
      // 拖拽调用接口传递的数据
      dragParams: {
        currentData: {
          i_Id: '',
          Level: ''
        },
        sortData: {
          Level: '',
          ids: []
        }
      },
      ifDialog: false,
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {},
      // 传递当前节点的数据
      currentData: {},
      // 节点高亮标识符
      currentNodeKey: '',
      // 接口请求回来的配置项数据
      instanceConfigData: {},
      // 是否懒加载节点
      lazyNode: false,
      // 保存当前节点数据
      // currentNodeData: null,
      API,
      // 树形行高
      treeRowHeight: '',
      virtualNodeData: {},
      operationCode: '',
      // 计算字段标识符
      isCount: false,
      // 计算字段的配置
      countFieldConfig: {},
      // 节点 配置对象
      nodeObj: {
        // 是否显示节点数字
        isShowNodeNum: false,
        // 数字字段
        shownumfield: '',
        // 节点文字样式
        nodetextstyle: '',
        // 节点数字样式
        nodenumstyle: ''
      },
      // 需要改变的数据（改变指定节点的数据）
      dataWantToChange: {},
      // dataWantToChange: {
      //   resDataCid: '',
      //   resDataShownumfield: '',
      //   resDataShowfield: ''
      // },
      // 传入的Cid数组，用于改变多个节点
      resCidArr: []
    }
  },
  computed: {
    ...mapState({
      treeFunctions: state => state.treeFunctions
    })
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    configData: {
      handler (nv) {
        this.commitParams.cate = nv.i_Cate
        this.commitParams.code = nv.v_Code
        this.commitParams.catecode = nv.v_CateCode
        this.operationCode = nv.operationcode
        if (nv.response) {
          this.treeConfig = nv.response.data
          // 拿到显示字段
          this.defaultProps.label = this.treeConfig.confView.showfield
          let showField = this.treeConfig.confView.showfield
          let columnList = this.treeConfig.confField
          this.isCount = false
          this.treeCode = this.treeConfig.confView.treecode
          if (this.treeConfig.confView.isshownodenum === '1') {
            // 显示节点数字：开启了显示数字字段 并且 数字字段不能为空
            this.nodeObj.isShowNodeNum = this.treeConfig.confView.isshownodenum && this.treeConfig.confView.shownumfield
            // 数字字段
            this.nodeObj.shownumfield = this.treeConfig.confView.shownumfield
          }
          // 节点文字样式
          this.nodeObj.nodetextstyle = this.treeConfig.confView.nodetextstyle
          // 节点数字节点数字样式
          this.nodeObj.nodenumstyle = this.treeConfig.confView.nodenumstyle
          // 拿到显示字段 去返回的字段中找对应字段的配置
          // 拿到显示字段columntype 判断是基础还是计算
          columnList.forEach(item => {
            // 如果返回的字段列表中，包含显示字段 并且 这个字段的类型是计算字段 countFieldConfig
            this.isCount = item.colname.includes(showField) && item.columntype === '2'
            // 如果显示字段是计算字段，把该字段的配置存储
            this.countFieldConfig = this.isCount ? item : {}
          })
          // 如果设置了虚拟根节点
          if (this.treeConfig.confView.hasOwnProperty('isrootnode') && this.treeConfig.confView.isrootnode === '1') {
            this.virtualNodeData = {
              i_Cid: this.treeConfig.confView.sonfield,
              [this.defaultProps.label]: this.treeConfig.confView.rootnodename,
              isVirtualNode: true,
              iconurl: this.treeConfig.confView.rootnodeicon,
              iconcolor: this.treeConfig.confView.rootnodeiconcolor,
              [this.treeConfig.confView.sonfield]: this.treeConfig.confView.sonfield
            }
          }
          // 存储左树右tab小红点
          // this.$store.commit('saveTreeCode', this.treeConfig.confView.treecode)
          // 调取树数据
          this.getTreeData()
          // 背景
          if (this.treeConfig.confView.trbgcolor) {
            this.classList.push(this.treeConfig.confView.trbgcolor)
          }
          // hover
          if (this.treeConfig.confView.trhoverstyle) {
            this.classList.push(this.treeConfig.confView.trhoverstyle)
          }
          // 选中行
          if (this.treeConfig.confView.checkedstyle) {
            this.classList.push(this.treeConfig.confView.checkedstyle)
          }
          // // 未展开节点
          // if (this.treeConfig.confView.setnoexpandnode) {
          //   this.classList.push(this.treeConfig.confView.setnoexpandnode)
          // }
          // // 已展开节点
          // if (this.treeConfig.confView.setexpandnode) {
          //   this.classList.push(this.treeConfig.confView.setexpandnode)
          // }
        }
      },
      immediate: true
    },
    shareData: {
      deep: true,
      handler (nv) {
        // 如果有传过来flag和commitFormData 证明需要重新调取数据并且刷新后定位到指定节点
        if (nv.hasOwnProperty('flag') && nv.hasOwnProperty('commitFormData')) {
          this.getTreeData({ commitFormData: nv.commitFormData, cId: nv.cId })
        } else if (nv.hasOwnProperty('flag')) {
          // 如果有传过来flag 证明需要重新调取数据
          this.getTreeData()
        }
        // 判断：传入的数据中有无changeSpecialNodeData属性，用来改变指定节点数据
        // console.log(nv)
        if (nv.hasOwnProperty('changeSpecialNodeData')) {
          this.resCidArr = []
          this.dataWantToChange = {}
          this.changeSpecialNodeData(nv.changeSpecialNodeData)
        }
        // 项目中好像没有用到，暂时注释，一个月后没出bug就删除【2019/12/17 ly】
        // if (this.currentNodeData) {
        //   for (let key in nv) {
        //     Vue.set(this.currentNodeData, key, nv[key])
        //   }
        //   this.$emit('changeShareData', this.currentNodeData)
        // }
      }
    }
  },
  methods: {
    // 弹框关闭之后会 传一个false 过来
    getDialogStatus (params) {
      if (this.treeConfig.confView.treecode === params.code) {
        this.ifDialog = params.flag
      }
    },
    // 此方法用于更新节点信息
    // resData中需要包括i_Cid、shownumfield(数字显示字段)、showfield(节点显示字段)
    changeSpecialNodeData (resData) {
      if (util.gettype(resData) === 'Array') {
        resData.forEach(item => {
          // resCidArr：传入cid拼接成数组
          !this.resCidArr.includes(item.i_Cid) && this.resCidArr.push(item.i_Cid)
          // dataWantToChange：把传入的数据存放到这个对象中
          // 形式：{i_Cid：{countNumber：1,i_Cid: "001",isCurrentNode: true},i_Cid：{countNumber：2,i_Cid: "002",isCurrentNode: true}}
          this.dataWantToChange[item.i_Cid] = item
        })
      }
    },
    isChangeCurrentNode (currentData) {
      // 判断：是不是改变当前节点
      return this.dataWantToChange[currentData.i_Cid].isCurrentNode
    },
    changeCurrentNode (currentData) {
      // 返回当前节点的值
      currentData[this.nodeObj.shownumfield] = this.dataWantToChange[currentData.i_Cid].countNumber
      return this.dataWantToChange[currentData.i_Cid].countNumber
    },
    isChangeTargetNode (currentData) {
      // 判断：是不是改变目标节点
      return this.dataWantToChange[currentData.i_Cid].isTargetNode
    },
    changeTargetNode (currentData) {
      // 返回目标节点的值
      currentData[this.nodeObj.shownumfield] = this.dataWantToChange[currentData.i_Cid].countNumber
      return this.dataWantToChange[currentData.i_Cid].countNumber
    },
    joinStr (key, value) {
      if (key) {
        let strFun = `${key}`
        return window.eval(strFun)(value)
      } else {
        // this.$message.warning('公式有误')
      }
    },
    getNodeData (field, nodeData) {
      // isCount是否是计算字段
      if (this.isCount) {
        // 根据数据类型不同进行不同分类处理
        // 1：匿名函数 2：命名函数 3：转换代码 4：sql计算公式
        let data = ''
        switch (this.countFieldConfig.fieldtype) {
          case '1':
            data = this.joinStr(this.countFieldConfig.func, nodeData)
            break
          case '2':
            // 如果是命名函数
            data = this.methodSplit('function(test,da)')
            break
          case '3':
            data = nodeData[field]
            break
          case '4':
            data = nodeData[field]
            break
          default:
            break
        }
        return data
      } else {
        return nodeData[field]
      }
    },
    // 解析匿名函数体
    transformStr (item, nodeData) {
      return util.transformStr(item.specialdisplayfunc, nodeData)
    },
    // 拿到系统操作按钮 的配置
    getBtnConfigData (obj) {
      this.btnConfigData = obj
    },
    customShareData (data) {
      this.currentData = data
    },
    showTreeDialog (flag) {
      this.ifDialog = flag
    },
    // 按钮点击事件
    getFunction (item, currentNode) {
      let configObj = {}
      configObj.interfaceData = item
      configObj.currentData = currentNode
      configObj.data = this.treeData
      // 往下传递当前节点数据
      this.currentData = currentNode
      // 把树 数据传递下去 方便后面组件使用
      this.$set(this.currentData, 'treeData', this.treeData)
      this.buttonClick(configObj)
    },
    // 调取树 数据
    getTreeData (nodeData) {
      var getTreeDataUrl = ''
      let getTreeDataParams = {}
      // 判断是否有扩展接口
      if (this.treeConfig.confView.extendedinterface) {
        getTreeDataUrl = this.treeConfig.confView.extendedinterface
        getTreeDataParams.v_TreeCode = this.treeConfig.confView.treecode
      } else {
        getTreeDataUrl = 'InterfaceGrid/getCategoryTreeData/' + this.treeConfig.confView.treecode
      }
      // 处理特殊的编程接口
      this.getSpecialData(getTreeDataParams)
      API.post(getTreeDataUrl, getTreeDataParams).then(res => {
        if (!res.code) {
          // 判断树 的节点设置中  有没有设置节点配置
          if (this.treeConfig.confNode.length > 0) {
            // 如果有 就往 对应的节点数据 添加配置字段
            this.nodeSetting(this.treeConfig.confNode, res.data)
            this.setVirtualNode(this.temporaryTreeData)
          } else {
            this.setVirtualNode(res.data)
          }
          if (nodeData && nodeData.hasOwnProperty('cId')) {
            this.currentNodeKey = nodeData.cId
          }
          this.setFirstChecked()
          // 如果没有传递node 下面不执行
          if (!nodeData) return
          if (nodeData.hasOwnProperty('commitFormData')) {
            this.$emit('changeShareData', nodeData.commitFormData)
          }
        }
      })
    },
    getSpecialData (data) {
      let treeFuncName = 'requestParams' + '_' + this.treeCode
      let treeFunc = this.treeFunctions[this.treeCode]
      if (treeFunc && treeFunc[treeFuncName]) {
        let funcData = treeFunc[treeFuncName]({ that: this })
        Object.assign(data, funcData)
      }
    },
    // 把虚拟节点数据 和 树数据进行拼接
    setVirtualNode (currentTreeData) {
      // 判断有无虚拟节点
      if (this.treeConfig.confView.isrootnode === '1') {
        this.expandedKeys.push(this.virtualNodeData.i_Cid)
        if (!currentTreeData[0].isVirtualNode) {
          let temporaryObj = JSON.parse(JSON.stringify(this.virtualNodeData))
          temporaryObj.children = currentTreeData
          // 每次刷新数据之后重新给tree赋值数据
          this.treeData.length = 0
          this.treeData.unshift(temporaryObj)
        }
      } else {
        // 没有虚拟根节点
        this.treeData = currentTreeData
      }
    },
    // 节点设置
    nodeSetting (nodeConfig, treeData) {
      // 缺省
      // eslint-disable-next-line no-unused-vars
      let defaultNode = '0'
      // 层级
      let levelNode = '1'
      // 类型
      let typeNode = '2'
      // 判断是否有重复的节点配置数据
      let nodeTypeArray = []
      for (let i = 0; i < nodeConfig.length; i++) {
        nodeTypeArray.push(nodeConfig[i].nodelevel)
      }
      let newArray = nodeTypeArray.sort()
      for (let j = 0; j < newArray.length; j++) {
        if (newArray[j] === newArray[j + 1]) {
          this.$message.warning('树节点设置有重复配置，请确认后重试')
          return
        }
      }
      // nodeSettingType: '节点设置依据 (1-层级  2-类型)'
      let nodeSettingType = this.treeConfig.confView.nodesettype
      // 层级
      if (nodeSettingType === levelNode) {
        this.recursionLevel({ data: treeData, nodeConfig: nodeConfig })
      } else if (nodeSettingType === typeNode) {
        // 类型
        let nodetypefield = this.treeConfig.confView.nodetypefield
        this.recursionType({ data: treeData, nodeConfig: nodeConfig, nodetypefield: nodetypefield })
      }
    },
    // 层级设置
    recursionLevel (recursionObj) {
      // recursionObj.data 树的数据
      // recursionObj.nodeConfig 节点设置配置项
      let nodeConfig = recursionObj.nodeConfig
      recursionObj.data.map((item, index) => {
        item.i_IsDefaultExpand === '1' && !this.expandedKeys.includes(item.i_Cid) && this.expandedKeys.push(item.i_Cid)
        for (let i = 0; i < nodeConfig.length; i++) {
          // 如果当前节点数据等级 等于 节点设置层级
          // 就把节点配置和节点数据进行整合
          if (Number(item.level) === Number(nodeConfig[i].nodelevel)) {
            this.mergeData({ data: item, nodeConfig: nodeConfig[i] })
            break
          } else {
            // 如果不等于 判断节点设置中有没有缺省策略，如果有则应用缺省。反之不做改动
            if (nodeConfig[i].nodesettype === '0') {
              this.mergeData({ data: item, nodeConfig: nodeConfig[i] })
            }
          }
        }
        // 继续递归
        if (item.children) {
          this.recursionLevel({ data: item.children, nodeConfig: recursionObj.nodeConfig })
        }
      })
      this.temporaryTreeData = recursionObj.data
    },
    // 类型设置
    recursionType (recursionObj) {
      let nodeConfig = recursionObj.nodeConfig
      let nodetypefield = recursionObj.nodetypefield
      recursionObj.data.map((item, index) => {
        item.i_IsDefaultExpand === '1' && !this.expandedKeys.includes(item.i_Cid) && this.expandedKeys.push(item.i_Cid)
        for (let i = 0; i < nodeConfig.length; i++) {
          // 如果当前节点数据等级 等于 节点配置项层级
          // 就把节点配置和节点数据进行整合
          if (item[nodetypefield] === nodeConfig[i].nodelevel) {
            this.mergeData({ data: item, nodeConfig: nodeConfig[i] })
            break
          } else {
            // 如果不等于 判断节点设置中有没有缺省策略，如果有则应用缺省。反之不做改动
            if (nodeConfig[i].nodesettype === '0') {
              this.mergeData({ data: item, nodeConfig: nodeConfig[i] })
            }
          }
        }
        // 继续递归
        if (item.children) {
          this.recursionType({ data: item.children, nodeConfig: recursionObj.nodeConfig, nodetypefield: nodetypefield })
        }
      })
      this.temporaryTreeData = recursionObj.data
    },
    //  是否缺省选中首行 && 判断第一个节点能不能被点击
    setFirstChecked () {
      if (this.treeConfig.confView.isexpandcheckfirstline === '1' && this.treeData[0].ischecked !== '0') {
        if (!this.currentNodeKey) {
          this.currentNodeKey = this.treeData[0].i_Cid
        }
        // 保存首行数据
        // this.currentNodeData = this.treeData[0]
      }
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.currentNodeKey)
        let currNode = this.$refs.tree.getCurrentNode()
        this.handleNodeClick(currNode)
        this.currentData = currNode
      })
    },
    // 合并数据
    mergeData (mergeObj) {
      // 判断是否可被选中，等于0代表不能被选中
      // 【2019/12/18 David确认：节点不被选中要控制节点前的checkbox不能被选中】
      if (mergeObj.nodeConfig.ischecked === '0') {
        Object.assign(mergeObj.nodeConfig, { disabled: true })
      }
      // 节点配置和节点数据进行整合
      Object.assign(mergeObj.data, mergeObj.nodeConfig)
      // 处理特殊接节点
      if (mergeObj.data.isspecialnode === '1') {
        let specialNodeClass = util.transformStr(mergeObj.data.specialfunc, mergeObj.data)
        mergeObj.data.specialNodeClass = specialNodeClass
      }
    },
    // 节点点击的回调
    handleNodeClick (data, node, ev) {
      // 判断是否有小点
      let flag
      let codeArr = this.$store.state.treeCode
      let code = this.configData.v_Code
      if (codeArr.includes(code)) {
        if (this.$store.state.treeFunctions[code].nodeClick) {
          let funcStr = this.$store.state.treeFunctions[code].nodeClick
          flag = funcStr(this.$store.state.tabFlag)
          if (flag[0]) {
            this.$confirm('数据已修改，确定返回保存？', '提示', {
              confirmButtonText: '确定', cancelButtonText: '取消', type: 'error', showClose: false, closeOnClickModal: false
            }).then(() => {
              ev.tree.setCurrentKey(this.$store.state.treeId)
            }).catch(() => {
              this.ifDialog = false

              this.$store.commit('getTreeId', data.i_Cid)
              this.handleNode(data, node, ev)
              this.$store.state.tabFlag[flag[1]].forEach((item, index) => {
                this.$store.state.tabFlag[flag[1]][index] = true
              })
              this.$store.commit('getFormFlag', false)
            })
          } else {
            this.$store.commit('getFormFlag', false)
            this.ifDialog = false
          }
          this.$store.commit('removeDialogIds')
        }
        if (flag[1]) {
          if (flag[0]) return
          if (!data) return
          this.$store.commit('getTreeId', data.i_Cid)
        }
      }
      this.handleNode(data, node, ev)
    },
    // 树节点点击
    handleNode (data, node, ev) {
      if (!data) return
      let isReminderFlag = { isReminderFlag: true }
      let shareData = Object.assign(data, isReminderFlag)
      this.$listeners.changeShareData(shareData)
      // 防止树节点数据发生改变（防止点击节点变成一样的节点：比如点击A节点之后，再点击B节点之后，B节点变成了A节点 = =、）
      let newData = JSON.parse(JSON.stringify(data))
      let newShareData = {}
      // 把传下来的数据合并一起
      // newShareData = Object.assign(this.shareData, newData)
      newShareData = Object.assign({ treeShareData: this.shareData }, newData)
      // 保存当前行数据
      // this.currentNodeData = newShareData
      // 把当前节点的数据存到vuex
      this.$store.commit('rowData', newShareData)
      this.$store.commit('treeData', [this.configData.v_Code, newShareData])
      this.rowID = data.i_Id
    },
    // 节点开始拖拽时触发的事件
    handleDragStart (node) {
      this.dragParams.currentData.i_Id = node.data.i_Id
      this.dragParams.currentData.Level = node.data.level
    },
    // 拖拽成功完成时触发的事件
    handleDrop (draggingNode, dropNode, dropType, ev) {
      let recursionNode = (nodeData, dropStartID) => nodeData.forEach((item, index) => {
        // 在数据中找到 与当前拖拽的节点id 匹配的节点数据
        // 以此来找到 上一个节点和下一个节点
        if (item.i_Id === dropStartID) {
          // 判断当前节点拖拽完之后 前面还有没有节点【是否是第一个节点】
          if (nodeData[index - 1]) {
            this.dragParams.sortData.parentId = nodeData[index - 1].i_Pid
            // 拖拽位置 上一个id
            this.dragParams.sortData.prevId = nodeData[index - 1].i_Id
            // 拖拽完  节点的级别
            this.dragParams.sortData.Level = nodeData[index - 1].level
          }
          // 判断当前节点拖拽完之后 后面还有没有节点【是否是最后一个节点】
          if (nodeData[index + 1]) {
            this.dragParams.sortData.parentId = nodeData[index + 1].i_Pid
            // 拖拽位置 下一个id
            this.dragParams.sortData.nextId = nodeData[index + 1].i_Id
            // 拖拽完  节点的级别
            this.dragParams.sortData.Level = nodeData[index + 1].level
          }
          // 如果当前放置的节点 只有被拖拽这么一个数据
          if (!nodeData[index - 1] && !nodeData[index + 1]) {
            // 放置之后  被拖拽节点  的层级
            this.dragParams.sortData.Level = dropNode.level + 1
            this.dragParams.sortData.parentId = dropNode.data.i_Cid
          }
          // 拖动后调序级的所有Id
          this.dragParams.sortData.ids = []
          nodeData.forEach(val => {
            this.dragParams.sortData.ids.push(val.i_Id)
          })
          let params = JSON.stringify(this.dragParams)
          if (this.treeConfig.confView.sortinterface) {
            this.$set(draggingNode.data, 'level', this.dragParams.sortData.Level)
            this.$set(draggingNode.data, 'i_Pid', this.dragParams.sortData.parentId)
            API.post(this.treeConfig.confView.sortinterface, { sortJson: params, v_treeCode: this.commitParams.code })
          } else {
            this.$message.warning('拖拽调序接口为空')
          }
        } else {
          if (item.children) {
            recursionNode(item.children, dropStartID)
          } else {
          }
        }
      })
      // 拖拽开始的时候 拿到被拖 的节点i_Id
      let dropStartID = this.dragParams.currentData.i_Id
      recursionNode(this.treeData, dropStartID)
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop (draggingNode, dropNode, type) {
      return dropNode.data.isdropedplace === '1'
    },
    // 判断节点能否被拖拽
    allowDrag (draggingNode) {
      return Number(draggingNode.data.isdropsort) === 1
    },
    filterNode (value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    }
  },
  components: {
    dialogStandard,
    treeTitle
  }
}
</script>

<style>
/* .is-current > .el-tree-node__content {
  background-color: #ebfffc;
} */
.el-tree-node:focus > .el-tree-node__content{
  background-color: white !important;
}
</style>
<style lang="scss" scoped>
@import "@/assets/css/configTreecss.scss";
.node-icon{
  font-size: 14px;
}
.tree-wrap{
  height: 100%;
  margin-bottom: 3px;
  box-sizing: border-box;
}
#template-tree-box{
  display: flex;
  flex-direction: column;
  height: 100%;
  .tree-layout{
    overflow: auto;
    flex: 1;
  }
  .custom-tree-node{
    width: 100%;
  }
  .iconBox > div{
    float: left;
    font-size: 12px;
    margin-right: 8px;
    i,span{
      color: #333333;
      font-family: 'Microsoft YaHei';
      color: #5892f6;
      font-style: normal;
    }
    i{
      font-size: 14px;
    }
    span{
      font-size: 12px;
    }
  }
  .is-current > .el-tree-node__content {
    background: linear-gradient(180deg, #eff5fc 0%, #a9d0fd 100%);
  }
  .tree-input-search{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
}
.tree-node-button button{
  padding: 0;
  color: #5892F6;
  font-size: 12px;
  border: none;
  &:hover{
    border: none;
    color: #5892F6;
  }
}
 </style>
