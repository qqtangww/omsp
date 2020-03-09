<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 11:11:54
 * @LastEditTime: 2019-09-05 17:38:10
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div :class="'selectComponent-' + currentConfigData.confView.viewid" class="selectComponent " v-if="isenquirybarexpand === '1'">
    <!-- 条件下拉区域 -->
    <div class="selectDiv">
      <div class="selectRow clearfix" v-for="(val,index) in modelArr" :key="index">
        <!-- 选择查询字段 -->
        <el-select placeholder="请选择字段" v-model="val.queryKey" @change="fieldSelect(val,index)">
          <el-option
            v-for="(item,index) in isSelectArr"
            :key="index"
            :label="item.searchtitle"
            :value="item.tablename + '.' + item.colname">
          </el-option>
        </el-select>
        <!-- 选择筛选条件 -->
        <el-select placeholder="逻辑条件" v-model="val.filtrateConditionVal">
          <el-option
            v-for="(item,index) in filtrateCondition"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- 输入条件 -->
        <el-date-picker
          v-if="val.showDateTime"
          v-model="val.keywords"
          type="date"
          placeholder="请选择日期">
        </el-date-picker>

        <el-input placeholder="请输入值" v-model="val.keywords" v-else></el-input>
        <!-- 选择and和or -->
        <el-select placeholder="并列条件" v-model="val.andConditionVal" @change="andConditionChange(index)" :ref="index">
          <el-option
            v-for="(item,index) in andCondition"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="makeSure">
      <el-button  @click="searchtableData" icon="iconfont icon-sousuo">
        查询
      </el-button>
      <el-button  @click="resettableData" icon="iconfont icon-gengxinjilu">
        重置
      </el-button>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/assets/js/base.js'
export default {
  props: {
    currentConfigData: Object
  },
  watch: {
    currentConfigData: {
      immediate: true,
      handler (nv) {
        if (!nv || !nv.confView) return
        // 是否缺省显示查询栏
        this.isenquirybarexpand = nv.confView.isenquirybarexpand
        // 筛选查询字段
        nv.confColumn.map(val => {
          let obj = {}
          for (var key in val) {
            if (val.isselect === '1') {
              obj.searchtitle = val.coltitle
              obj.colname = val.colname
              obj.searchsubtype = val.searchsubtype
              obj.tablename = val.tablename
              this.isSelectArr.push(obj)
              return
            }
          }
        })
        if (this.isSelectArr.length < 1 || nv.confView.isshowenquirybar === '0') {
          this.isenquirybarexpand = '0'
        }
        this.defaultShow()
      }
    }
    // modelArr: {
    //   deep: true,
    //   handler (nv) {
    //     if (nv) {
    //       this.$emit('watchStdKey', JSON.stringify(nv))
    //     }
    //   }
    // }
  },
  data () {
    return {
      showDateTime: false,
      isenquirybarexpand: '0',
      // 是否显示下拉
      isShow: 0,
      // 查询的字段
      isSelectArr: [],
      // and和or
      andCondition: [
        {
          value: 'and',
          label: 'And'
        }, {
          value: 'or',
          label: 'Or'
        }
      ],
      // 筛选条件
      filtrateCondition: [
        {
          value: 'less',
          label: '<'
        }, {
          value: 'lessEq',
          label: '<='
        }, {
          value: 'more',
          label: '>'
        }, {
          value: 'moreEq',
          label: '>='
        }, {
          value: 'Eq',
          label: '='
        }, {
          value: 'like',
          label: 'like'
        }
      ],
      // 每一行绑定的值
      modelArr: [],
      defaultObj: { queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '', showDateTime: false },
      selectLength: 0
    }
  },
  methods: {
    fieldSelect (item, index) {
      this.isSelectArr.forEach(val => {
        if (val.colname === item.queryKey && val.searchsubtype === '2') {
          this.modelArr[index].showDateTime = true
        } else {
          this.modelArr[index].showDateTime = false
        }
      })
    },
    // 默认显示 几行查询
    defaultShow () {
      // 如果查询字段大于等于3 则默认显示三行查询
      // 否则 有几个查询字段就显示几行
      if (this.isSelectArr.length >= 3) {
        this.modelArr = [
          { queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '', showDateTime: false },
          { queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '', showDateTime: false },
          { queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '', showDateTime: false }
        ]
      } else {
        for (var i = 0; i < this.isSelectArr.length; i++) {
          this.modelArr.push(Object.assign({}, this.defaultObj))
        }
      }
      this.selectLength = this.modelArr.length
    },
    // 点击and  select添加一行
    andConditionChange (index) {
      if (this.modelArr.length >= 6) {
        this.modelArr.push({ queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '' })
        // 获取查询元素高度
        let selectComponent = document.querySelector('.selectComponent')
        selectComponent.style.height = '260px'
        selectComponent.style.overflow = 'auto'
      } else {
        // 如果是最后一个 下拉 才添加一行
        if (index === this.modelArr.length - 1) {
          this.modelArr.push({ queryKey: '', keywords: '', andConditionVal: '', filtrateConditionVal: '' })
        }
        // 获取查询元素高度
        let selectComponent = document.querySelector('.selectComponent').offsetHeight
        // 获取工具栏元素
        let toolsBox = document.querySelector('.toolsBox').offsetHeight

        // 获取分页高度
        let paginationBox = document.querySelector('.viewPagination.el-pagination').offsetHeight

        let headerWrapper = document.querySelector('.header-top').offsetHeight
        let tabMenuBtnBox = document.querySelector('.tab-menu-box').offsetHeight
        let sumHeight = 0
        if (this.selectLength < this.modelArr.length) {
          sumHeight = selectComponent + toolsBox + paginationBox + headerWrapper + tabMenuBtnBox + 48
        } else {
          sumHeight = selectComponent + toolsBox + paginationBox + headerWrapper + tabMenuBtnBox + 8
        }
        // 获取表格元素
        let contentTable = document.querySelector('.contentTable')
        contentTable.style.height = 'calc(100vh - ' + sumHeight + 'px)'
      }
    },
    // 点击查询
    searchtableData () {
      // 循环提交的数据 提交的json 如果有一个对象属性值全为空就 删除这个对象
      let arr = []
      this.modelArr.map(val => {
        let newObj = {}
        let flag = false
        // 删除showDateTime属性
        delete val.showDateTime
        for (var key in val) {
          newObj[key] = val[key]
        }
        for (var i in newObj) {
          if (newObj[i]) {
            flag = true
          }
        }
        if (flag) {
          arr.push(newObj)
        }
      })
      // 提交的对象中 每个字段不能为空 如果只有一个对象 则andConditionVal字段可以为空
      let flagNull = false
      if (arr.length <= 1) {
        for (var key in arr[0]) {
          if (!arr[0][key] && key !== 'andConditionVal') {
            flagNull = true
          }
        }
        // 如果数据为空
        if (!arr.length) {
          flagNull = false
        }
      } else {
        // 如果提交两个或两个对象 需要检测上一个对象的andConditionVal字段 不能为空
        arr.forEach((val, index) => {
          for (var i in val) {
            if (index < arr.length - 1) {
              if (!val[i]) {
                flagNull = true
              }
            } else {
              if (!val[i] && i !== 'andConditionVal') {
                flagNull = true
              }
            }
          }
        })
      }
      if (flagNull) {
        this.$message({
          message: '数据需要填写完整',
          type: 'warning'
        })
      } else {
        this.$parent.$refs.tableStandard.$refs.stdtable.clearSort()
        let params = {}
        delete params.sortBy
        delete params.sortColumn
        arr.forEach(val => {
          if (val.keywords instanceof Date) {
            val.keywords = this.$moment(val.keywords).format('YYYY-MM-DD ss-mm-ss')
          }
        })
        let modelArr = JSON.stringify(arr)
        params.modelArr = modelArr
        this.$store.commit('getSearchData', params)
        this.$parent.getTableData(params)
      }
    },
    // 点击重置
    resettableData () {
      this.modelArr.map(val => {
        for (var data in val) {
          val[data] = ''
        }
      })
    }
  },
  mixins: [mixin]
}
</script>

<style lang="scss" scoped>
  .selectComponent{
    // min-width: 930px;
    overflow: auto;
    display: flex;
    padding: 16px 8px;
    box-sizing: border-box;
    .selectDiv{
      .selectRow{
        margin-bottom: 8px;
        >div{
          float: left;
          margin-left: 6px;
        }
        >div:nth-of-type(1){
          margin-left: 0;
          width: 250px;
        }
        >div:nth-of-type(2){
          width: 105px;
        }
        >div:nth-of-type(3){
          width: 250px;
        }
        >div:nth-of-type(4){
          width: 105px;
        }
      }
    }
    .makeSure{
      margin-left: 8px;
      >button{
        height: 30px;
        padding: 0;
        width: 80px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        float: left;
        align-items: center;
        /deep/ i{
          font-size: 14px;
          margin-right: 6px;
        }
      }
    }
  }
</style>
