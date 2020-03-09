<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:35:03
 * @LastEditTime: 2019-09-26 15:21:18
 * @LastEditors: QWH
 -->
<template>
  <div class="table-wrapper">
    <el-table ref="stdtable"
              :data="tableVal"
              :row-class-name="tableRowClassName"
              :row-style="{'height':tableRowHeight + 'px'}"
              :cell-class-name="tableCellClassName"
              :header-cell-class-name="tableheader"
              :header-cell-style="tableheaderStyle"
              :class-name="stdGridConf.clsCol"
              :show-header="isShowHeader"
              :class="[stdGridConf.tablestyle,`table_${stdGridConf.viewid}`,tableRowHeight]"
              :show-summary="isshowtotalrow"
              :summary-method="getSummaries"
              @sort-change="sortChange"
              height="100%"
              lazy
              :load="load"
              :default-sort="defaultSort"
              @selection-change="handleSelectionChange"
              @row-click="saveRowData"
              row-key="i_Id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <!-- 表格checkBox -->
      <el-table-column v-if="stdGridConf.displaycheckbox === '1'"
                       type="selection"
                       fixed
                       show-overflow-tooltip
                       width="30">
      </el-table-column>
      <!-- 序号列 -->
      <el-table-column fixed="left"
                       v-if="stdGridConf.isshowserialcol === '1'"
                       type="index"
                       :index="indexMethod"
                       show-overflow-tooltip
                       width="46"
                       label="序号">
      </el-table-column>
      <el-table-column  width='1'>

      </el-table-column>
      <div v-for="(item,index) in stdColumnConf"
           :key="index">
                         <!-- :show-overflow-tooltip="item.type !== '1'" -->
        <el-table-column :align="item.colalign"
                         :prop="item.colname"
                         :label="item.coltitle"
                         :sortable="item.issort === '1' ? 'custom' : false"
                         :width="item.colwidth"
                         v-if="item.ishidden === '0'"
                         :fixed="item.isfixed ? item.isfixed : false">

          <template slot-scope="scope">
            <!-- 超链接 -->
            <div v-if="item.haslink === '1' && item.linkexectype === '1'"
                 style="display: inline-block">
              <span v-if="item.formatstring !== 'Img'"
                    class="spanData"
                    style="display: inline"><a class="linkpage"
                   :href="item.linkpage"
                   target="_blank">{{ getData(item, scope.row[item.colname], scope.row, scope) }}</a></span>
              <img v-else
                   :src="scope.row[item.colname] === '' ? '' : scope.row[item.colname] "
                   :class="scope.row[item.colname] === '' ? '' : 'temImg'" />
            </div>
            <!-- 路由 -->
            <div v-else-if="item.haslink === '1' && item.linkexectype === '2'"
                 style="display: inline-block">
              <span v-if="item.formatstring !== 'Img'"
                    class="spanData"
                    style="display: inline"><a class="linkpage"
                   @click="getRouter(item.linkpage)">{{ getData(item, scope.row[item.colname], scope.row, scope) }}</a></span>
              <img v-else
                   :src="scope.row[item.colname] === '' ? '' : scope.row[item.colname] "
                   :class="scope.row[item.colname] === '' ? '' : 'temImg'" />
            </div>
            <!-- 弹框 -->
            <div v-else-if="item.haslink === '1' && item.linkexectype === '3'"
                 style="display: inline-block">
              <span v-if="item.formatstring !== 'Img' && item.formatstring !== 'colorBlocks'"
                    class="spanData"
                    style="display: inline"><a class="linkpage"
                   @click="getDialog(item.linkdialog)">{{ getData(item, scope.row[item.colname], scope.row, scope) }}</a></span>
              <img
                  v-else-if="item.formatstring === 'Img'"
                  :src="scope.row[item.colname] === '' ? '' : scope.row[item.colname] "
                  :class="scope.row[item.colname] === '' ? '' : 'temImg'" />
              <!-- 颜色块 -->
              <span class="color-blocks" v-else-if="item.formatstring === 'colorBlocks'" :style="{'background' : getColorBlocks(scope.row[item.colname]) }"></span>
            </div>
            <!-- 数据 -->
            <div v-else-if="item.haslink !== '1'">
              <span v-if="item.formatstring !== 'Img' && item.formatstring !== 'colorBlocks' && item.formatstring !== 'mixins' && item.formatstring !== 'switch' && item.formatstring !== 'style'" class="spanData">
                {{ getData(item, scope.row[item.colname], scope.row, scope) }}
              </span>
              <img
                v-else-if="item.formatstring === 'Img'"
                :src="scope.row[item.colname] === '' ? '' : scope.row[item.colname] "
                :class="scope.row[item.colname] === '' ? '' : 'temImg'"
              />
              <!-- 如果是switch -->
              <el-switch
                v-else-if="item.formatstring === 'switch' "
                v-model="scope.row[item.colname]"
                @change="switchFunc(scope.row , item )"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              ></el-switch>
              <!-- 颜色块类型 -->
              <span v-else-if="item.formatstring === 'colorBlocks'" class="color-blocks" :style="{'background' : getColorBlocks(scope.row[item.colname]) }"></span>
              <!-- 样式类型 -->
              <span v-else-if="item.formatstring === 'style'" :class="scope.row[item.colname]">样式</span>
              <!-- 混合类型 -->
              <span v-else-if="item.formatstring === 'mixins'" >{{ mixinsData(item, scope.row[item.colname], scope.row, scope) }}
                <!-- 混合-颜色块 -->
                <span v-if="scope.row[mixinsFields] === 'colorBlocks' && item.formatstring === 'mixins'" class="color-blocks" :style="{'background' : getColorBlocks(scope.row[item.colname]) }"></span>
                <!-- 混合-样式 -->
                <span v-else-if="scope.row[mixinsFields] === 'style' && item.formatstring === 'mixins'" :class="[scope.row[item.colname],'style-box']">样式</span>
                <!-- 混合-开关 -->
                <el-switch
                  v-else-if="scope.row[mixinsFields] === 'switch' && item.formatstring === 'mixins' "
                  v-model="scope.row[item.colname]"
                  @change="switchFunc(scope.row , item )"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
                <!-- 混合-图片 -->
                <img
                  v-else-if="scope.row[mixinsFields] === 'Img' && item.formatstring === 'mixins'"
                  :src="scope.row[item.colname] === '' ? '' : scope.row[item.colname] "
                  :class="scope.row[item.colname] === '' ? '' : 'temImg'"
                />
              </span>
            </div>
          </template>
        </el-table-column>
      </div>

      <!-- 其它菜单 -->
      <el-table-column v-if="inlineOpera.length"
                       :width="operaWidth"
                       label="操作"
                       class-name="operation-cls"
                       fixed="right">
        <template slot-scope="scope">
          <span v-for="(val,index) in inlineOpera"
                :style="{ width: setButtonWidth(val,index) }"
                class="operation-box"
                :key="index">
              <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
              <el-button v-if="(val.specialdisplayfunc ? transformStr(val,scope.row) : true) && val.displaystyle === '1'"
                        ref="operationCol"
                        :style="{'color':val.iconcolor}"
                        type="text"
                        :icon="val.iconurl"
                        :disabled="val.isdisabled === '1'"
                        class="opeartionBtn"
                        @click="findFunc(val, scope.row, scope.$index, tableData)">
                {{ val.operationname }}
              </el-button>
              <el-tooltip class="item" effect="dark" :content="val.operationname" placement="bottom-start" v-if="(val.specialdisplayfunc ? transformStr(val,scope.row) : true) && val.displaystyle === '2'">
                <el-button
                  :style="{'color':val.iconcolor}"
                  ref="operationCol"
                  type="text"
                  :icon="val.iconurl"
                  :disabled="val.isdisabled === '1'"
                  class="opeartionBtn"
                  @click="findFunc(val, scope.row, scope.$index, tableData)">
                </el-button>
              </el-tooltip>
              <el-button v-if="(val.specialdisplayfunc ? transformStr(val,scope.row) : true) && val.displaystyle === '3'"
                        ref="operationCol"
                        type="text"
                        :disabled="val.isdisabled === '1'"
                        class="opeartionBtn"
                        @click="findFunc(val, scope.row, scope.$index, tableData)">
                {{ val.operationname }}
              </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { API } from '@/api/basic'
import Sortable from 'sortablejs'
import global from '@/views/global/global'
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import Bus from '@/assets/js/bus.js'
import util from '@/common/js/util.js'
import { mapState } from 'vuex'
const stdDataGrid = {
  name: 'stdDataGrid',
  data () {
    return {
      // 选中的数据
      checkSelectData: [],
      loading: true,
      tableVal: [],
      operaWidth: 0,
      isShowHeader: '',
      // 表头类名
      tableheader: '',
      // 特殊列类名
      tableSpecialTd: '',
      stdGridConf: {},
      // 表格列数据
      stdColumnConf: [],
      // 是否显示合计
      isshowtotalrow: false,
      // 行内操作按钮
      inlineOpera: [],
      tableType: {},
      info: {
        myname: 'Jack',
        myage: 20
      },
      API,
      cgiService,
      Bus,
      isshowcolhead: true,
      // table的高度
      sumRowHeight: 0,
      countFlag: 0,
      condition: '',
      className: '',
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {},
      // 视图行高
      // 合计的字段
      totalField: [],
      // 排序字段
      sortField: [],
      defaultSort: {},
      sortList: [],
      // 是否允许排序标识符
      sortTableFlag: false,
      rowList: [],
      // 混合的判断字段
      mixinsFields: ''
    }
  },
  computed: {
    ...mapState({
      viewParams: state => state.paginations
    })
  },
  props: {
    tableData: Array,
    selectTableRow: Array,
    configData: Object,
    shareData: Object,
    sortFlag: Boolean,
    tableRowHeight: String
  },
  watch: {
    tableData: {
      handler (val) {
        // this.$nextTick(() => {
        //   this.tableVal = val;
        // });
        this.tableVal = []
        this.showTable = false
        this.$nextTick(_ => {
          this.tableVal = val
          this.showTable = true
          this.getTableConf(this.configData)
        })
      },
      immediate: true
    },
    sortFlag: {
      handler (val) {
        this.$nextTick(() => {
          this.sortTableFlag = val
        })
      },
      immediate: true
    },
    btnConfigData: {
      deep: true,
      immediate: true,
      handler (nv) {
        this.$emit('buttonConfig', nv)
      }
    },
    configData: {
      handler (nv) {
        if (Object.keys(nv).length === 0) return
        this.getTableConf(nv)
        this.trSpecialRow()
        this.selectCheckBox()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    selectCheckBox () {
      if (this.selectTableRow.length > 0) {
        this.selectTableRow.forEach(item => {
          this.viewDataRecursion(this.tableVal, item.v_OrgFullName)
        })
      }
    },
    viewDataRecursion (viewData, name) {
      viewData.forEach(item => {
        if (item.v_OrgFullName === name) {
          this.$refs.stdtable.toggleRowSelection(item, true)
        }
        if (item.children && item.children.length > 0) {
          this.viewDataRecursion(item.children, name)
        }
      })
    },
    // 混合数据类型
    mixinsData (interfaceData, val, rowData, scope) {
      // 如果混合类型 条件有值
      if (interfaceData.dataformat) {
        // 获取判定字段
        let temporaryArr = interfaceData.dataformat.split(';')
        this.mixinsFields = temporaryArr[0]
        if (!rowData.hasOwnProperty(this.mixinsFields)) {
          this.$message({
            type: 'warning',
            duration: 1000,
            message: '混合字段设置错误'
          })
          return
        }
        // 当前行的显示类型
        let currentShowType = rowData[this.mixinsFields]
        if (currentShowType === 'date' || currentShowType === 'time' || currentShowType === 'datetime') {
          // 日期类型、时间类型、日期时间都是一种处理方式
          if (temporaryArr.length > 1 && temporaryArr[1] !== '') {
            let str = ''
            temporaryArr.shift()
            temporaryArr.forEach(item => {
              if (item.includes('date')) {
                str = this.formatTransform('date', val, item)
              }
            })
            return str
          } else {
            return val
          }
        } else if (currentShowType === 'Number') {
          // 数值类型
          // 判断：如果输入的混合条件有关于Number的 就进行格式化串
          if (temporaryArr.length > 1 && temporaryArr[1] !== '') {
            let str = ''
            temporaryArr.shift()
            temporaryArr.forEach(item => {
              if (item.includes('Number')) {
                str = this.formatTransform('date', val, item)
              }
            })
            return str
          } else {
            return val
          }
        } else if (currentShowType === 'String') {
          // 字符串类型
          if (temporaryArr.length > 1 && temporaryArr[1] !== '') {
            let str = ''
            temporaryArr.shift()
            temporaryArr.forEach(item => {
              if (item.includes('String')) {
                str = this.formatTransform('String', val, item)
              }
            })
            return str
          } else {
            return val
          }
        } else if (currentShowType === 'default') {
          // 默认类型
          return val
        }
      }
    },
    formatTransform (type, val, item) {
      // 截取英文括号'()' 之间的数据
      let reg = /\((.*?)\)/
      let regObj = util.regExpressionCut({ data: item, reg })
      // 如果填写的是Number类型并且有格式化串
      if (regObj) {
        return global.formatData('Number', val, regObj.field)
      } else {
        return val
      }
    },
    // 颜色块类型
    getColorBlocks (data) {
      if (!String(data).includes(' ')) return
      let colorStr = ''
      let arr = data.split(' ')
      switch (arr.length) {
        case 1:
          colorStr = arr[0]
          break
        case 2:
          colorStr = arr[0]
          break
        case 3:
          let temporaryArr = []
          arr.forEach(item => {
            if (item) {
              // 把值添加到临时数组中
              temporaryArr.push(item)
            }
          })
          if (temporaryArr[1] === '0') {
            // 如果第二项等于0 那就是一个背景色
            colorStr = arr[0]
          } else if (temporaryArr.length === 3) {
            // 如果长度等于3 就是一个渐变色
            colorStr = `linear-gradient(${temporaryArr[2]}deg,${temporaryArr[0]} 0%,${temporaryArr[1]} 100%) !important`
          }
          break

        default:
          break
      }
      return colorStr
    },
    // 统计排序字段 和 合计字段
    sortAndSum () {
      // orderfield 调序字段名
      // 如果设置了调序 则调序优先  且排序不起作用 2019/11/29-David确认
      if (this.stdGridConf.isshowordercol === '1') return
      let sortObj = {}
      this.stdColumnConf && this.stdColumnConf.forEach(item => {
        // 统计哪些字段需要合计
        if (item.istotalup === '1') {
          this.totalField.push(item.colname)
        }
        // 统计哪些字段需要进行排序
        // sortmode 是显示默认排序 0是默认 1是升序 2是降序
        if (item.sortmode !== '0') {
          sortObj.prop = item.colname
          sortObj.order = item.sortmode
          this.sortField.push(sortObj)
        }
      })
      if (this.sortField.length > 0) {
        this.defaultSort.prop = this.sortField[0].prop
        this.defaultSort.order = this.sortField[0].order === '1' ? 'ascending' : this.sortField[0].order === '2' ? 'descending' : null
        let sortInfo = this.viewParams[this.stdGridConf.viewid].sortInfo
        if (sortInfo) {
          setTimeout(() => {
            sortInfo.forEach(item => {
              this.rowList.forEach(item1 => {
                if (item.column === item1.property) {
                  setTimeout(() => {
                    if (document.querySelector(`.el-table__fixed .${item1.id}`)) {
                      document.querySelector(`.el-table__fixed .${item1.id}`).classList.add(`${item.order}ending`)
                    }
                    if (document.querySelector(`.${item1.id}`)) {
                      document.querySelector(`.${item1.id}`).classList.add(`${item.order}ending`)
                    }
                  }, 100)
                }
              })
            })
          }, 100)
        }
      }
    },
    // 处理排序字段
    formatObj (obj) {
      this.sortList = this.viewParams[this.stdGridConf.viewid].sortInfo
      let filterObj = this.sortList.filter(item => item.column === obj.column)[0]
      if (filterObj) {
        filterObj.order = obj.order
      } else {
        this.sortList.push(JSON.parse(JSON.stringify(obj)))
      }
    },
    tableheaderStyle (row, column, rowIndex, columnIndex) {
      this.rowList = row.row
    },
    // 如果有排序设置
    sortChange ({ column, prop, order }) {
      if (!this.sortTableFlag) {
        this.sortTableFlag = true
      } else {
        // orderfield 调序字段名
        // 如果设置了调序 则调序优先  且排序不起作用 2019/11/29-David确认
        if (this.stdGridConf.isshowordercol === '1') return
        // 如果有默认排序字段 这里就不调用接口了
        // 因为在父组件 standTableView 中 已经调用
        let paginationsObj = this.$store.state.paginations[this.stdGridConf.viewid]
        let sortObj = { column: prop, order: order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : null }
        // let sortInfo = [{ column: prop, order: order === 'ascending' ? 'asc' : 'desc' }]

        this.formatObj(sortObj)
        let sortInfo = this.sortList

        sortInfo.forEach(item => {
          this.rowList.forEach(item1 => {
            if (item.column === item1.property) {
              setTimeout(() => {
                if (document.querySelector(`.el-table__fixed .${item1.id}`)) {
                  document.querySelector(`.el-table__fixed .${item1.id}`).classList.add(`${item.order}ending`)
                }
                if (document.querySelector(`.${item1.id}`)) {
                  document.querySelector(`.${item1.id}`).classList.add(`${item.order}ending`)
                }
              }, 100)
            }
          })
        })
        // 把调序字段保存到vuex
        let temporaryObj = {}
        Object.assign(temporaryObj, this.viewParams[this.stdGridConf.viewid], { sortInfo: sortInfo }, { currentViewId: this.stdGridConf.viewid })
        // console.log(this.sortInfo)

        this.$store.commit('modifypaginations', temporaryObj)
        this.$parent.getTableData(Object.assign(paginationsObj, { sortInfo }))
      }
    },
    // 获取懒加载数据
    load (tree, treeNode, resolve) {
      let params = {
        v_EnumCatCode: tree.v_EnumCatCode,
        i_EnumValueID: tree.i_EnumValueID,
        level: tree.level
      }
      let url = ''
      // 如果有扩展接口
      if (this.configData.confView.selectqueryinterface) {
        url = this.configData.confView.selectqueryinterface
      } else {
        let viewId = ''
        if (this.configData.viewId) {
          viewId = this.configData.viewId
        } else if (this.configData.v_Code) {
          viewId = this.configData.v_Code
        } else {
          // 快捷菜单登录
          viewId = this.configData.viewid
        }
        url = 'InterfaceGrid/getCategoryViewData/' + viewId
      }
      API.post(url, params).then(res => {
        if (res.code === 0) {
          let data = res.data
          resolve(data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 列链接跳转路由
    getRouter (rotuer) {
      let data = this.$store.state.navList[rotuer]
      this.$store.commit('addTabMenu', {
        cate: data.cate,
        catecode: data.catecode,
        code: data.code,
        name: data.pagename,
        path: data.pageurl,
        parentpageid: data.parentpageid,
        pageid: data.pageid,
        viewid: data.viewid
      })
      sessionStorage.setItem('refreshPageData', JSON.stringify(data))
      this.$router.push({ path: rotuer })
    },
    // 列链接调取弹框
    getDialog (dialog) {
      let val = JSON.parse(dialog)
      // 创建explain属性,用于和弹框动参做映射
      this.$set(val, 'explain', val.v_LinkOperaInfo)
      this.$store.commit('confBtn', val)
      // 获取配置项
      this.btnConfigData.v_Code = val.v_Code
      this.btnConfigData.v_CateCode = val.v_CateCode
      this.btnConfigData.i_Cate = val.i_Cate
      this.btnConfigData.operationcode = val.v_TemplateCode
      let params = {
        v_DialogCode: val.v_DialogCode
      }
      cgiService.dialogConfig(params).then(res => {
        if (res.code === 0) {
          this.$emit('getButtonConfig', true)
          // 字段改为小写
          let dialogObj = res.data
          let newObj = {}
          for (let key in dialogObj) {
            let a = dialogObj[key]
            key = key.toLowerCase().slice(2, key.length)
            newObj[key] = a
          }
          dialogObj.dialogData = newObj
          dialogObj = Object.assign(dialogObj, this.btnConfigData)
          this.$emit('buttonConfig', dialogObj)
          // 处理列链接弹框视图点击问题
          this.$store.commit('getRowDataFlag', true)
        }
      }
      )
    },
    saveRowData (row) {
      // 处理列链接弹框视图点击问题
      // let rowDataFlag = this.$store.state.rowDataFlag
      // this.$emit('changeShareData', row)
      // if (!rowDataFlag) {
      //   // 把当前行的数据存到vuex
      //   this.$store.commit('rowData', row)
      // }
      // let nestRow = { ...row }
      // this.$set(nestRow, 'viewid', this.stdGridConf.viewid)
      // this.$store.commit('nestTableRowData', nestRow)
    },
    // 设置 操作按钮盒子的宽度
    setButtonWidth (item, index) {
      let widthNum = 0
      // displaystyle：1-图标文字,2-仅图标,3-仅文字
      switch (item.displaystyle) {
        case '1':
          // 文字宽度【文字个数 * 12】 + 图标宽度
          widthNum += (item.operationname.length * 12) + 18 + 4
          break
        case '2':
          widthNum += 18
          break
        case '3':
          widthNum += item.operationname.length * 12
          break

        default:
          break
      }
      return widthNum + 'px'
    },
    // 解析匿名函数体
    transformStr (item, nodeData) {
      return this.joinStr(item.specialdisplayfunc, nodeData)
    },
    joinStr (key, value) {
      if (key) {
        let strFun = `${key}`
        return window.eval(strFun)(value)
      } else {
        // this.$message.warning('公式有误')
      }
    },
    // 调取列表配置
    getTableConf (nv) {
      // let res = this.$store.state.temConf
      let res = nv
      this.stdGridConf = res.confView
      this.isShowHeader = this.stdGridConf.isshowcolhead === '1'
      this.isshowtotalrow = this.stdGridConf.isshowtotalrow === '1'
      this.tableheader = this.stdGridConf.tableheader
        ? this.stdGridConf.tableheader
        : 'headerCls-white'

      this.stdColumnConf = res.confColumn
      this.inlineOpera = res.confOperation.inline
      // 设置操作列宽度
      this.operaWidth = this.getOperationCellWidth(this.inlineOpera)
      this.sortAndSum()
      // 设置表头最右侧小块样式
      if (this.tableheader) {
        this.$nextTick(() => {
          let tableFixedRightPatch =
            document.querySelector(`.table_${this.stdGridConf.viewid} .el-table__fixed-right-patch`) || ''
          if (tableFixedRightPatch !== '') {
            tableFixedRightPatch.classList.add(this.tableheader)
          }
        })
      }
    },
    // 操作列宽度
    getOperationCellWidth (operaList) {
      if (Object.prototype.toString.call(operaList) === '[object Array]') {
        let widthNum = 0
        operaList.forEach(item => {
          // displaystyle：1-图标文字,2-仅图标,3-仅文字
          switch (item.displaystyle) {
            case '1':
              // 文字宽度【文字个数 * 12】 + 图标宽度
              widthNum += (item.operationname.length * 12) + 18 + 4
              break
            case '2':
              widthNum += 18
              break
            case '3':
              widthNum += item.operationname.length * 12
              break

            default:
              break
          }
        })
        if (widthNum) {
          return widthNum + (operaList.length) * 10 + 30
        } else {
          return '50'
        }
      }
    },
    // 处理特殊行
    trSpecialRow () {
      if (this.stdGridConf.istrspecial === '1') {
        let funObj = this.$store.state.viewFunctions[this.stdDataGrid.viewid]
        let trSpecialArr = this.stdGridConf.trspecialrow.match(/[' '](\S*)['(']/)
        let obj = {}
        obj[trSpecialArr[1]] = trSpecialArr.input.replace(trSpecialArr[1], '')
        for (var key in obj) {
          eval('obj.' + key + ' = ' + obj[key])
          funObj[key] = obj[key]
        }
        // console.log(this.$store.state.viewFunctions)

        this.$store.commit('getViewFuns', [this.stdGridConf.viewid, funObj])
      }
    },
    // 数据处理
    getData (interfaceData, val, rowData, scope) {
      if (interfaceData.isspecialcolumn === '1') {
        let cellData = this.joinStr(interfaceData.specialcolumnfunc, rowData)
        if (cellData) {
          this.condition = cellData.condition
          this.className = cellData.className
        }
      }
      // row.columntype:1是基础字段，2是计算字段
      if (interfaceData.columntype === '1') {
        return interfaceData.formatstring && interfaceData.dataformat
          ? global.formatData(
            interfaceData.formatstring,
            val,
            interfaceData.dataformat
          )
          : val
      } else {
        // 根据数据类型不同进行不同分类处理
        // 1：匿名函数
        // 2：命名函数
        // 3：转换代码
        // 4：sql计算公式
        let data = ''
        switch (interfaceData.fieldtype) {
          case '1':
            data = this.joinStr(interfaceData.formulas, rowData)
            break
          case '2':
            data = this.methodSplit('function(test,da)')
            break
          case '3':
            data = val
            break
          case '4':
            data = val
            break
          default:
            break
        }
        return interfaceData.formatstring && interfaceData.dataformat
          ? global.formatData(
            interfaceData.formatstring,
            data,
            interfaceData.dataformat
          )
          : data
      }
    },
    // 处理switch函数
    switchFunc (rowData, interfaceData) {
      // 拿到解析完的函数体
      let funObj = this.$store.getters.getFunctions
      if (funObj.switchFunc) {
        this.$store.commit('nowConf', 'switchFunc')
        // 函数自调用
        funObj.switchFunc(rowData, interfaceData, cgiService, this)
      } else {
        // this.$message.warning('操作方法函数体为空')
      }
    },
    rowOperation (val) { },
    // 合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      let values = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        // 判断totalField不为空
        if (this.totalField.length > 0) {
          this.totalField.forEach(val => {
            // 如果是需要合计的字段进行合计处理
            if (column.property === val) {
              values = data.map(item => Number(item[val]))
              // 判断 values 值是不是 非数字
              if (!values.every(val => isNaN(val))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return prev + curr
                  } else {
                    return prev
                  }
                }, 0)
                sums[index] += ''
              } else {
                sums[index] = ''
              }
            }
          })
        }
        if (!sums[index]) {
          sums[index] = ''
        }
      })
      return sums
    },
    // 行类名
    tableRowClassName (data) {
      let trspecialrowData = ''
      let troddstyleData = ''
      let trevenstyleData = ''
      // 特殊行
      if (this.stdGridConf.istrspecial === '1' && this.stdGridConf.sstrspecial !== '') {
        // 拿到解析完的函数体
        let funObj = this.$store.state.viewFunctions[this.stdDataGrid.viewid]
        for (var key in funObj) {
          if (key === 'trSpecialRow') {
            trspecialrowData = funObj[key](data.row)
          }
        }
      }
      // 奇数行
      if (this.stdGridConf.troddstyle && data.rowIndex % 2 === 0) {
        troddstyleData = this.stdGridConf.troddstyle
      } else {
        troddstyleData = this.stdGridConf.trstyle
      }
      // 偶数行
      if (this.stdGridConf.trevenstyle && data.rowIndex % 2 !== 0) {
        trevenstyleData = this.stdGridConf.trevenstyle
      } else {
        trevenstyleData = this.stdGridConf.trstyle
      }
      return trspecialrowData + ' ' + troddstyleData + ' ' + trevenstyleData
    },
    // 特殊列（特殊单元格）
    tableCellClassName (params) {
      let condition = this.condition
      if (eval(condition)) {
        return this.className
      }
    },
    // 表格checked
    handleSelectionChange (val) {
      // 把选中数据加到组件data
      this.checkSelectData = val
      // 把值传递到父组件,让后到stdTools
      this.$emit('getCheckSelectData', this.checkSelectData)

      // this.$store.commit('modifyCheckedData', val)
    },
    setHeight () {
      // table总高度
      if (document.getElementsByClassName('el-table contentTable')[0]) {
        this.sumRowHeight = document.getElementsByClassName(
          'el-table contentTable'
        )[0].offsetHeight
      }
      // 默认表头高度
      let defaultHeaderHeight = 0
      if (
        document.querySelector(
          '.el-table.contentTable .el-table__header-wrapper'
        )
      ) {
        defaultHeaderHeight = document.querySelector(
          '.el-table.contentTable .el-table__header-wrapper'
        ).offsetHeight
      }
      // 表格底部高度
      let defaultTfootHeight = 0
      if (
        document.querySelector(
          '.el-table.contentTable .el-table__footer-wrapper'
        )
      ) {
        defaultTfootHeight = document.querySelector(
          '.el-table.contentTable .el-table__footer-wrapper'
        ).offsetHeight
      }
      // 表格内容
      let defaultTbodyHeight = document.querySelector(
        '.el-table.contentTable .el-table__body-wrapper'
      )
      defaultTbodyHeight.style.height =
        this.sumRowHeight - defaultHeaderHeight - defaultTfootHeight + 'px'
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.selectCheckBox()
      })
    })
    let that = this
    if (this.stdGridConf.isshowordercol === '1') {
      setTimeout(() => {
        // 获取需要拖动的元素的父盒子
        // const tbody = document.querySelector('.el-table__fixed-body-wrapper tbody')
        const tbody = document.querySelector(
          `.table_${this.stdGridConf.viewid} .el-table__body-wrapper tbody`
        )
        // let data = that.tableData
        Sortable.create(tbody, {
          // 是否排序
          sort: true,
          // 拖动的延迟
          animation: 300,
          // 拖动结束事件
          onEnd: function (val) {
            // 在中添加一个小红点判断
            that.$set(that.shareData, 'formRed', true)
            // 把拖动的元素从原来序号中获取出来, 在插入新数组中 从新序号插入
            let newArry1 = []
            newArry1 = that.tableVal.splice(val.oldIndex, 1)
            that.tableVal.splice(val.newIndex, 0, newArry1[0])
            let newArry3 = that.tableVal
            // 赋值前 先清空数组
            that.tableVal = []
            // 进行赋值
            that.$nextTick(function () {
              that.tableVal = newArry3
              Bus.$emit('sortDataOld', that.tableVal)
            })
          }
        })
      }, 1000)
    }
    // setTimeout(() => {
    //   let selectComponent = 0
    //   if (document.querySelector('.selectComponent')) {
    //     selectComponent = document.querySelector('.selectComponent')
    //       .offsetHeight
    //   }
    //   // 获取工具栏元素
    //   let toolsBox = 0
    //   if (document.querySelector('.toolsBox')) {
    //     toolsBox = document.querySelector('.toolsBox').offsetHeight
    //   }
    //   // 获取表格元素
    //   let contentTable = document.querySelector('.contentTable')
    //   let sumHeight = 0
    //   sumHeight =
    //     selectComponent +
    //     toolsBox +
    //     paginationBox +
    //     headerWrapper +
    //     tabMenuBtnBox +
    //     8
    //   if (contentTable) {
    //     contentTable.style.height = 'calc(100vh - ' + sumHeight + 'px)'
    //   }
    // })
  },
  destroyed () {
    // 销毁监听事件
    window.removeEventListener('resize', this.setHeight)
  },
  mixins: [mixin],
  created () {
    this.$set(this.shareData, 'formRed', false)
  }
}
export default stdDataGrid
</script>
<style lang="scss">
@import "@/assets/css/configTabelcss.scss";
@import "@/assets/css/sysStyleType.scss";
@import "@/assets/css/configTreecss.scss";
.table-wrapper {
  height: 0;
  flex: 1;
  .temImg {
    height: 20px;
    vertical-align: middle;
  }
  .spanData {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .operation-box {
    display: inline-block;
    margin-left: 10px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>

<style lang="scss" scope>
.table-wrapper {
  /deep/ .el-button{
    padding: 0 !important;
  }
  tr {
    td {
      .cell {
        height: 100% !important;
        line-height: 100%;
        >div {
          line-height: normal;
          >span{
            height: 100% !important;
            &.color-blocks{
              // 颜色块样式
              height: 16px !important;
              display: block;
            }
          }
        }
        div {
          display: inline-block;
        }
      }
    }
  }
  /deep/ .operation-cls .el-button--text{
    // 行内按钮的hover样式
    &:hover{
      color: #32C5D2;
    }
    &:focus{
      color: #32C5D2;
    }
    &:active{
      color: #32C5D2;
    }
  }
  // 排序小箭头样式
  /deep/ .descending .sort-caret.descending{
    border-top-color: #00FFF6 !important
  }
  /deep/ .descending .sort-caret.ascending{
    border-bottom-color: #bfbfbf !important
  }
  /deep/ .ascending .sort-caret.ascending{
    border-bottom-color: #00FFF6 !important
  }
  /deep/ .ascending .sort-caret.descending{
    border-top-color:  #bfbfbf !important
  }
  /deep/ .sort-caret.ascending{
    border-bottom-color:  #bfbfbf !important
  }
  /deep/ .sort-caret.descending{
    border-top-color:  #bfbfbf !important
  }
}
.table-wrapper /deep/ .cell .el-table__expand-icon {
  vertical-align: text-bottom;
}
</style>
