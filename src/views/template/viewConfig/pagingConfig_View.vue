<!-- 内容组件-视图组件-分页配置 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="formdata" :rules="rules" :model="formdata">
      <div class="paging-box">
        <div class="border-box">
          <div class="paging-switch">
            <el-switch
              v-model="formdata.i_IsShowOnPage"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
              inactive-text="不分页"
            ></el-switch>
          </div>
          <el-form-item label="加载阈值" label-width="80px">
            <el-input-number
              v-model="pageconfig.maxdata"
              controls-position="right"
              @change="handleChange"
              :min="0"
              :disabled="formdata.i_IsShowOnPage === '0'"
            ></el-input-number>
            <span class="hintInfo">条</span>
          </el-form-item>
        </div>
        <div class="base-info">
          <div class="border-box">
            <div class="paging-switch">
              <el-switch
                v-model="formdata.i_IsShowOnPage"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="0"
                inactive-value="1"
                inactive-text="分页"
              ></el-switch>
            </div>
            <div class="info-content-box">
              <div class="pageContent-left">
                <span>
                  <i class="iconfont icon-jibenxinxi"></i> 基本信息
                </span>
                <el-form-item label="分页样式" label-width="74px" class="controlLiHei">
                  <el-select
                    placeholder="小型分页"
                    class="minSelect"
                    v-model="pageconfig.paginationtype"
                    :disabled="formdata.i_IsShowOnPage === '1'"
                  >
                    <el-option label="默认" value="0"></el-option>
                    <el-option label="小型分页" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label label-width="0">
                  <el-checkbox
                    v-model="pageconfig.total"
                    true-label="1"
                    false-label="0"
                    :disabled="formdata.i_IsShowOnPage === '1'"
                  >显示总条数</el-checkbox>
                </el-form-item>
                <el-form-item label label-width="0">
                  <el-checkbox
                    v-model="pageconfig.jumper"
                    true-label="1"
                    false-label="0"
                    :disabled="formdata.i_IsShowOnPage === '1'"
                  >显示直接前往输入框</el-checkbox>
                </el-form-item>
              </div>
              <div class="pageContent-right">
                <span>
                  <i class="iconfont icon-jibenxinxi"></i> 每页可选显示条数
                </span>
                <div class="page-size-box">
                  <div class="pageOption">
                    <el-button
                      type="text"
                      @click="addPageSizes(true)"
                      :disabled="formdata.i_IsShowOnPage === '1'"
                    >
                      <i class="iconfont icon-tianjia"></i> 添加
                    </el-button>
                  </div>
                  <div class="addPageOption" v-show="isAddPageSize">
                    <div>
                      <el-input v-model="sizes" class="input-class"></el-input>条
                    </div>
                    <div>
                      <el-button type="text" @click="addPageSizes(false)">取消</el-button>
                      <el-button type="text" @click="commitPagesizes(sizes)">保存</el-button>
                    </div>
                  </div>
                  <el-table
                    :data="pageconfig.pagesizes"
                    stripe
                    class="pagingSelect"
                    style="width: 100%"
                  >
                    <el-table-column prop="sizes" label="可选条数" width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.sizes}} 条</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="默认选中" width="100">
                      <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.ischoice"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          @change="changeDefaut(scope.row)"
                          active-value="1"
                          inactive-value="0"
                          :disabled="scope.row.ischoice === '1'"
                        ></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          @click="delPages(scope.row,scope.$index)"
                          :disabled="formdata.i_IsShowOnPage === '1'"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'pagingConfig_View',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      oldModAddData: {},
      oldpageconfig: {},
      formdata: {
        i_IsShowOnPage: '0'
      },
      pageconfig: {
        maxdata: 500,
        paginationtype: '0',
        total: 0,
        jumper: 1,
        pagesizes: [
          {
            sizes: 10,
            ischoice: '1'
          }
        ],
        newpagesizes: [],
        newischoice: '10'
      },
      rules: {},
      sizes: 10,
      isAddPageSize: false,
      flag: false,
      rowTabData: {}
    }
  },
  watch: {
    formdata: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    pageconfig: {
      handler: function (val) {
        if (JSON.stringify(this.oldpageconfig) !== JSON.stringify(val)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData
    })
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      util.initFormData(this.formdata, formData)
      if (formData.v_PageConfig !== '') {
        this.pageconfig = {
          ...JSON.parse(formData.v_PageConfig)
        }
      }
    }
    this.oldModAddData = Object.assign({}, this.formdata)
    this.oldpageconfig = Object.assign({}, this.pageconfig)
  },
  methods: {
    handleChange () {},
    // 保存 每页可选条数
    commitPagesizes (size) {
      let flag = this.pageconfig.pagesizes.some(item => {
        // eslint-disable-next-line eqeqeq
        if (item.sizes == size) {
          this.$message.warning('分页条数不可重复')
          return true
        }
      })
      if (!flag) {
        let params = {
          sizes: Number(this.sizes),
          ischoice: '0'
        }
        this.sizes = ''
        this.isAddPageSize = false
        this.pageconfig.pagesizes
          ? this.pageconfig.pagesizes.push(params)
          : this.$message.error('数据错误,请重试')
        // 判断默认分页大于一条时解除禁用
        if (this.pageconfig.pagesizes.length > 1) {
          this.isChoice = false
        }
      }
    },
    // 删除分页
    delPages (row, index) {
      if (this.pageconfig.pagesizes.length === 1) {
        this.pageconfig.pagesizes.forEach(val => {
          val.ischoice = '1'
          this.isChoice = true
        })
        this.$message.warning('必须存在一条默认数据!!!')
      } else {
        // 判断最后条数据是否 为默认选中   是  =>  删除后  的倒数第二条数据为默认状态  否 =>  正常删除
        if (
          this.pageconfig.pagesizes[this.pageconfig.pagesizes.length - 1]
            .ischoice === '1'
        ) {
          this.pageconfig.pagesizes.splice(index, 1)
          this.pageconfig.newpagesizes.splice(index, 1)
          this.pageconfig.pagesizes[this.pageconfig.pagesizes.length - 1].ischoice = '1'
        } else {
          this.pageconfig.pagesizes.splice(index, 1)
          this.pageconfig.newpagesizes.splice(index, 1)
        }
      }
    },
    // 分页默认选中互斥
    changeDefaut (row) {
      this.pageconfig.pagesizes.forEach(val => {
        if (val.ischoice === '1' && val.sizes !== row.sizes) {
          val.ischoice = '0'
        }
      })
      if (row.ischoice === '1') {
        this.pageconfig.newischoice = row.sizes
      }
    },
    commit () {
      this.pageconfig.pagesizes.forEach(val => {
        this.pageconfig.newpagesizes.push(Number(val.sizes))
      })
      this.pageconfig.newpagesizes = this.arrNewSet(
        this.pageconfig.newpagesizes
      )
      this.$set(this.formdata, 'v_PageConfig', JSON.stringify(this.pageconfig))

      // 保存 时  取出VUEX Tab的必填项字段
      Object.assign(this.formdata, this.tabData['regin1'])

      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.formdata.logParams = this.getLogParams()
      }
      cgiService.saveViewData(this.formdata).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          // 拉取默认分页配置 paginations
          let pageConfig = this.$store.state.paginations
          this.$emit('getTableData', pageConfig['CC_VW_contentView'])
          this.isReminder = true
          this.oldModAddData = JSON.parse(JSON.stringify(this.formdata))
          this.oldpageconfig = Object.assign({}, this.pageconfig)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加每页可选显示条数
    addPageSizes (val) {
      this.isAddPageSize = val
    },
    // 数组去重
    arrNewSet (arr) {
      var x = new Set(arr)
      return [...x]
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  .border-box {
    border: 1px solid #bfbfbf;
    position: relative;
    padding: 10px 30px;
    .paging-switch {
      position: absolute;
      top: -10px;
      left: 15px;
      background: #ffffff;
      .el-switch {
        width: 80px !important;
      }
    }
  }
  .el-form {
    padding: 20px;
    box-sizing: border-box;
    padding-bottom: 30px;
    border: none !important;
    .paging-box {
      width: 817px;
      margin: 0 auto;
      .base-info {
        padding-top: 15px;
        height: 100%;
        box-sizing: border-box;
        .border-box {
           height: 100%;
           min-height: 280px;
          .info-content-box {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 20px 40px;
            .pageContent-right {
              .pageOption {
                padding: 0 8px;
              }
              .addPageOption {
                display: flex;
                padding: 0px 10px;
                justify-content: space-between;
                border-top: 1px solid #ebeef5;
                box-sizing: border-box;
                height: 35px;
                line-height: 35px;
                > div {
                  line-height: 32px;
                }
              }
              .page-size-box {
                border: 1px solid #b8b2b2;
              }
            }
          }
        }
      }
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  div.el-input-number.is-controls-right {
  line-height: 26px;
  height: 100%;
}
.pagingSelect /deep/ th.is-leaf {
  padding: 4px 0;
  background: rgba(230, 230, 230, 0.21);
}
.pagingSelect /deep/ td {
  padding: 4px 0;
}
.pagingSelect /deep/ .el-table__header {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  background: rgba(230, 230, 230, 0.21);
}
.addPageOption /deep/ .el-input {
  width: 60px;
  height: 100%;
}
.addPageOption /deep/ .input-class .el-input__inner {
  width: 50px;
  height: 25px;
  padding-right: 10px !important;
}
// 兼容火狐浏览器
.paging-box /deep/ .el-form-item__content {
  line-height: 31px;
}
</style>
