<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 16:14:14
 * @LastEditTime: 2019-09-26 15:21:52
 * @LastEditors: QWH
 -->
<template>
  <div class="table-wrapper"
       :class="stdGridConf.trhoverstyle">
    <el-table class="viewStandard"
              ref="stdtable"
              :data="tableVal"
              :row-class-name="tableRowClassName"
              :cell-class-name="tableCellClassName"
              :header-cell-class-name='tableheader'
              :class-name="stdGridConf.clsCol"
              :show-header="isShowHeader"
              :class="[stdGridConf.v_TABLEStyle,`table_${stdGridConf.v_ViewID}`]"
              :show-summary="isshowtotalrow"
              :summary-method="getSummaries"
              @sort-change="sortChange"
              height="100%"
              :default-sort="defaultSort"
              :highlight-current-row="configData.v_ViewID === 'CC_VW_enumCategory' ? true : false"
              @row-click='saveRowData'
              @selection-change="handleSelectionChange">
      <!-- 表格checkBox -->
      <el-table-column v-if="stdGridConf.i_DisplayCheckBox === '1'"
                       type="selection"
                       fixed
                       show-overflow-tooltip
                       width="52">
      </el-table-column>
      <!-- 序号列 -->
      <el-table-column fixed="left"
                       v-if="stdGridConf.i_IsShowSerialCol === '1'"
                       type="index"
                       :index="indexMethod"
                       show-overflow-tooltip
                       label="序号">
      </el-table-column>
       <el-table-column  width='1'>

      </el-table-column>
      <!-- 设置表头信息 -->
      <div v-for="(item,index) in stdColumnConf"
           :key="index">
        <el-table-column :align="item.i_ColAlign"
                         :show-overflow-tooltip="item.v_Type !== '1'"
                         :prop="item.v_ColName"
                         :label="item.i_ColTitle"
                         :sortable="item.i_IsSort === '1' ? 'custom' : false"
                         :width="item.i_ColWidth"
                         v-if="item.i_IsHidden === '0'"
                         :fixed="item.v_Isfixed ? item.v_Isfixed : false">
          <template slot-scope="scope">
            <!-- 如果是switch -->
            <el-switch v-if="item.v_Type === '1' "
                       v-model="scope.row[item.v_ColName]"
                       @change="switchFunc(scope.row , item )"
                       active-color="#32c5d2"
                       inactive-color="#e6e7e8"
                       active-value="1"
                       inactive-value="0"></el-switch>
            <!-- 数据 -->
            <!-- 超链接 -->
            <div v-else-if="item.v_Type === '0' && item.i_HasLink === '1' && item.i_LinkExecType === '1'">
              <span v-if="item.v_FormatString !== 'Img'"
                    class="spanData"><a class="linkpage"
                   :href="item.linkpage"
                   target="_blank">{{ getData(item, scope.row[item.v_ColName], scope.row, scope) }}</a></span>
              <img v-else
                   :src="scope.row[item.v_ColName] === '' ? '' : scope.row[item.v_ColName] "
                   :class="scope.row[item.v_ColName] === '' ? '' : 'temImg'" />
            </div>
            <!-- 路由 -->
            <div v-else-if="item.v_Type === '0' && item.i_HasLink === '1' && item.i_LinkExecType === '2'">
              <span v-if="item.v_FormatString !== 'Img'"
                    class="spanData"><a class="linkpage"
                   @click="getRouter(item.linkpage)">{{ getData(item, scope.row[item.v_ColName], scope.row, scope) }}</a></span>
              <img v-else
                   :src="scope.row[item.v_ColName] === '' ? '' : scope.row[item.v_ColName] "
                   :class="scope.row[item.v_ColName] === '' ? '' : 'temImg'" />
            </div>
            <!-- 弹框 -->
            <div v-else-if="item.v_Type === '0' && item.i_HasLink === '1' && item.i_LinkExecType === '3'">
              <span v-if="item.v_FormatString !== 'Img'"
                    class="spanData"><a class="linkpage"
                   @click="getDialog(item.v_LinkDialog)">{{ getData(item, scope.row[item.v_ColName], scope.row, scope) }}</a></span>
              <img v-else
                   :src="scope.row[item.v_ColName] === '' ? '' : scope.row[item.v_ColName] "
                   :class="scope.row[item.v_ColName] === '' ? '' : 'temImg'" />
            </div>
            <div v-else-if="item.v_Type === '0' && item.i_HasLink !== '1'">
              <span v-if="item.v_FormatString !== 'Img'"
                    class="spanData">{{ getData(item, scope.row[item.v_ColName], scope.row, scope) }}</span>
              <img v-else
                   :src="scope.row[item.v_ColName] === '' ? '' : scope.row[item.v_ColName] "
                   :class="scope.row[item.v_ColName] === '' ? '' : 'temImg'" />
            </div>
          </template>
        </el-table-column>
      </div>
      <!-- 差旅管理 -->
      <el-table-column v-if="inlineOpera && viewID=='CC_VW_travel'"
                       :width="operaWidth"
                       label="操作"
                       class-name="operation-cls"
                       fixed="right">
        <template slot-scope="scope">
          <div v-for="(val,index) in inlineOpera"
               :key="index"
               class="fl mr-8">
            <!-- 差旅管理--查看 -->
            <el-button v-if="((scope.row.i_Status === '31' || (scope.row.i_Status === '30' && scope.row.v_Operator === 'leader') || scope.row.i_Status === '21' || (scope.row.i_Status === '13' && scope.row.v_Operator === 'leader') || scope.row.i_Status === '11') && val.operationcode === 'infoBtn')"
                       ref="operationCol"
                       type="text"
                       class="opeartionBtn"
                       @click="findFunc(val, scope.row, scope.$index, tableData)">
              {{ val.v_OperationName }}
            </el-button>
            <!-- 差旅管理--编辑按钮 -->
            <el-button v-if="((((scope.row.i_Status === '30' || scope.row.i_Status === '22' || scope.row.i_Status === '20' || scope.row.i_Status === '12' || scope.row.i_Status === '10') && scope.row.v_Operator === 'pm')) && val.operationcode === 'modifyTravelApply')"
                       ref="operationCol"
                       type="text"
                       class="opeartionBtn"
                       @click="findFunc(val, scope.row, scope.$index, tableData)">
              {{ (scope.row.i_Status === '30' && scope.row.v_Operator === 'pm') && val.operationcode === 'modifyTravelApply' ? '结算' : val.v_OperationName }}
            </el-button>
            <!-- 差旅管理--删除按钮 -->
            <el-button v-if="((scope.row.i_Status === '10' && scope.row.v_Operator === 'pm') && val.operationcode === 'travelDel')"
                       ref="operationCol"
                       type="text"
                       class="opeartionBtn"
                       @click="findFunc(val, scope.row, scope.$index, tableData)">
              {{ val.v_OperationName }}
            </el-button>
          </div>
        </template>
      </el-table-column>
      <!-- 其它菜单 -->
      <el-table-column v-else-if="inlineOpera.length"
                       :width="operaWidth"
                       label="操作"
                       class-name="operation-cls"
                       fixed="right">
        <template slot-scope="scope">
          <span v-for="(val,index) in inlineOpera"
                :style="{ width: setButtonWidth(val,index) }"
                class="operation-box"
                :key="index">
            <el-button v-if="val.v_SpecialDisplayFunc ? transformStr(val,scope.row) : true"
                       ref="operationCol"
                       type="text"
                       :disabled="val.i_IsDisabled === '1'"
                       class="opeartionBtn"
                       @click="findFunc(val, scope.row, scope.$index, tableData)">
              {{ val.v_OperationName }}
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
const stdDataGrid = {
  name: 'upperCaseView-stdDataGrid',
  data () {
    return {
      // tableVal: this.tableData,
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
      // 合计的字段
      totalField: [],
      // 排序字段
      sortField: [],
      defaultSort: {}
    }
  },
  props: {
    tableData: Array,
    configData: Object,
    shareData: Object,
    tableRowHeight: String
  },
  watch: {
    tableData: {
      handler (val) {
        this.$nextTick(() => {
          this.tableVal = val
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
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 统计排序字段 和 合计字段
    sortAndSum () {
      let sortObj = {}
      this.stdColumnConf && this.stdColumnConf.forEach(item => {
        // 统计哪些字段需要合计
        if (item.istotalup === '1') {
          this.totalField.push(item.v_ColName)
        }
        // 统计哪些字段需要进行排序
        // sortmode 是显示默认排序 0是默认 1是升序 2是降序
        if (item.sortmode !== '0') {
          sortObj.prop = item.v_ColName
          sortObj.order = item.sortmode
          this.sortField.push(sortObj)
        }
      })
      if (this.stdGridConf.orderfield === '') {
        if (this.sortField.length > 0) {
          this.defaultSort.prop = this.sortField[0].prop
          this.defaultSort.order = this.sortField[0].order === '1' ? 'ascending' : this.sortField[0].order === '2' ? 'descending' : null
        }
      }
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
        }
      }
      )
    },
    saveRowData (row) {
      this.$emit('changeShareData', row)

      // 把当前行的数据存到vuex
      this.$store.commit('rowData', row)
      let nestRow = {
        ...row
      }
      this.$set(nestRow, 'viewid', this.stdGridConf.v_TREvenStyle)
      this.$store.commit('nestTableRowData', nestRow)
    },
    // 设置隐藏操作按钮盒子的宽度
    setButtonWidth (item, index) {
      return item.v_OperationName.length * 12 + 'px'
    },
    // 解析匿名函数体
    transformStr (item, nodeData) {
      return this.joinStr(item.v_SpecialDisplayFunc, nodeData)
    },
    // 控制switch开关的置灰
    disabledSwitch (strFunction, rowData) {
      return this.joinStr(strFunction, rowData)
    },
    joinStr (key, value) {
      if (key) {
        let strFun = `${key}`
        return window.eval(strFun)(value)
      } else {
        // this.$message.warning('公式有误')
      }
    },
    // 如果有排序设置
    sortChange ({ column, prop, order }) {
      // 如果有默认排序字段 这里就不调用接口了
      // 因为在父组件 standTableView 中 已经调用
      let paginationsObj = this.$store.state.paginations[this.stdGridConf.viewid]
      let sortObj = {
        sortColumn: prop,
        sortBy: order === 'ascending' ? 'asc' : 'desc'
      }
      // 把调序字段保存到vuex
      this.$store.commit('getSortData', [this.stdGridConf.viewid, sortObj])
      this.$parent.getTableData(Object.assign(paginationsObj, sortObj))
    },
    // 调取列表配置
    getTableConf (nv) {
      let res = nv
      this.stdGridConf = res.confView
      this.isShowHeader = this.stdGridConf.i_IsShowColHead === '1'
      this.isshowtotalrow = this.stdGridConf.i_IsShowTotalRow === '1'
      this.tableheader = this.stdGridConf.v_TableHeader ? this.stdGridConf.v_TableHeader : 'headerCls-white'

      this.stdColumnConf = res.confColumn
      this.inlineOpera = res.confOperation.inline
      // 设置操作列宽度
      this.operaWidth = this.getOperationCellWidth(this.inlineOpera)
      this.sortAndSum()
      // 设置表头最右侧小块样式
      if (this.tableheader) {
        this.$nextTick(() => {
          let tableFixedRightPatch = document.querySelector('.el-table__fixed-right-patch') || ''
          if (tableFixedRightPatch !== '') {
            tableFixedRightPatch.classList.add(this.tableheader)
          }
        })
      }
    },
    // 操作列宽度
    getOperationCellWidth (operaList) {
      let widthNum = 0
      if (Object.prototype.toString.call(operaList) === '[object Array]') {
        for (var i = 0; i < operaList.length; i++) {
          // 获取到按钮文字个数
          widthNum += operaList[i].v_OperationName.length * 12
        }
      }
      // 判断当前有没有操作按钮
      // 如果没有就给操作列默认50宽度
      if (widthNum) {
        return widthNum + (operaList.length) * 10 + 30
      } else {
        return '50'
      }
    },
    // 处理特殊行
    trSpecialRow () {
      if (this.stdGridConf.istrspecial === '1') {
        let funObj = this.$store.state.viewFunctions[this.stdGridConf.viewid]
        let trSpecialArr = this.stdGridConf.trspecialrow.match(/[' '](\S*)['(']/)
        let obj = {}
        obj[trSpecialArr[1]] = trSpecialArr.input.replace(trSpecialArr[1], '')
        for (var key in obj) {
          eval('obj.' + key + ' = ' + obj[key])
          funObj[key] = obj[key]
        }
        this.$store.commit('getViewFuns', [this.stdGridConf.viewid, funObj])
      }
    },
    // 数据处理
    getData (interfaceData, val, rowData, scope) {
      if (interfaceData.v_SpecialColumnFunc) {
        let cellData = this.joinStr(interfaceData.v_SpecialColumnFunc, rowData)
        if (cellData) {
          this.condition = cellData.condition
          this.className = cellData.className
        }
      }
      // row.i_ColumnType:1是基础字段，2是计算字段
      if (interfaceData.i_ColumnType === '1') {
        return interfaceData.v_FormatString && interfaceData.i_DataFormat
          ? global.formatData(interfaceData.v_FormatString, val, interfaceData.i_DataFormat)
          : val
      } else {
        // 根据数据类型不同进行不同分类处理
        // 1：匿名函数
        // 2：命名函数
        // 3：转换代码
        // 4：sql计算公式
        let data = ''
        switch (interfaceData.i_FieldType) {
          case '1':
            data = this.joinStr(interfaceData.v_Formulas, rowData)
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
        return interfaceData.v_FormatString && interfaceData.i_DataFormat ? global.formatData(interfaceData.v_FormatString, data, interfaceData.i_DataFormat) : data
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
        this.$message.warning('操作方法函数体为空')
      }
    },
    rowOperation (val) {

    },
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
      if (this.stdGridConf.i_IsTRSpecial === '1') {
        // 拿到解析完的函数体
        let funObj = this.$store.getters.getFunctions
        for (var key in funObj) {
          if (key === 'trSpecialRow') {
            trspecialrowData = funObj[key](data.row)
          }
        }
      }
      // 奇数行
      if (this.stdGridConf.v_TROddStyle && data.rowIndex % 2 === 0) {
        troddstyleData = this.stdGridConf.v_TROddStyle
      } else {
        troddstyleData = this.stdGridConf.v_TRStyle
      }
      // 偶数行
      if (this.stdGridConf.v_TREvenStyle && data.rowIndex % 2 !== 0) {
        trevenstyleData = this.stdGridConf.v_TREvenStyle
      } else {
        trevenstyleData = this.stdGridConf.v_TRStyle
      }
      return (
        trspecialrowData + ' ' + troddstyleData + ' ' + trevenstyleData
      )
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
      this.$store.commit('modifyCheckedData', val)
    },
    setHeight () {
      // table总高度
      if (document.getElementsByClassName('el-table contentTable')[0]) {
        this.sumRowHeight = document.getElementsByClassName('el-table contentTable')[0].offsetHeight
      }
      // 默认表头高度
      let defaultHeaderHeight = 0
      if (document.querySelector('.el-table.contentTable .el-table__header-wrapper')) {
        defaultHeaderHeight = document.querySelector('.el-table.contentTable .el-table__header-wrapper').offsetHeight
      }
      // 表格底部高度
      let defaultTfootHeight = 0
      if (document.querySelector('.el-table.contentTable .el-table__footer-wrapper')) {
        defaultTfootHeight = document.querySelector('.el-table.contentTable .el-table__footer-wrapper').offsetHeight
      }
      // 表格内容
      let defaultTbodyHeight = document.querySelector('.el-table.contentTable .el-table__body-wrapper')
      defaultTbodyHeight.style.height = this.sumRowHeight - defaultHeaderHeight - defaultTfootHeight + 'px'
    }
  },
  mounted () {
    let that = this
    if (this.stdGridConf.isshowordercol === '1') {
      setTimeout(() => {
        // 获取需要拖动的元素的父盒子
        // const tbody = document.querySelector('.el-table__fixed-body-wrapper tbody')
        const tbody = document.querySelector(`.table_${this.stdGridConf.v_TREvenStyle} .el-table__body-wrapper tbody`)
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
            // 把拖动的元素从原来索引中获取出来, 在插入新数组中 从新索引插入
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
