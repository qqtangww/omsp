<template>
  <div class="system-operation">
    <el-dialog
      width="420px"
      class="formBox"
      :title="optionsTitle"
      custom-class='bodyFieldSet'
      :close-on-click-modal='false'
      v-dialogDrag
      top="25vh"
      :visible.sync="innerVisibleTolsOption"
      append-to-body
    >
      <div class="bodyBorderBox footerOptions">
        <div class="systemBorder">
          <el-form
            ref='formOptios'
            :rules="optionsRules"
            :model="systemOperationData"
          >
            <el-form-item
              label=""
              label-width="34px"
            >
              <el-row>
                <el-checkbox-group
                  v-model="checkList"
                  @change="checkedChange"
                >
                  <el-col
                    :span="10"
                    v-for="item in sysOptions"
                    :key="item.i_Id"
                  >
                    <el-checkbox
                      :disabled="item.isDisable === 1 ? true : false"
                      :label="item"
                    >
                      {{item.v_OperationName}}
                    </el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-row>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer sysOperation"
          >
            <el-button @click="innerVisibleTolsOption = false">取 消</el-button>
            <el-button
              type="primary"
              @click="sysOptiosCommit"
            >确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data () {
    return {
      optionsTitle: '',
      innerVisibleTolsOption: false,
      optionsRules: {},
      systemOperationData: {},
      checkList: [],
      sysOptions: []
    }
  },
  watch: {
    checkList: {
      handler: function (newList, oldList) {
        this.checkList = newList
      },
      deep: true
    },
    innerVisibleTolsOption: {
      handler: function (val) {
        if (!val) {
          this.checkList = []
        }
      }
    },
    immediate: true
  },
  methods: {
    checkedChange () {},
    sysOptiosCommit () {
      this.$emit('sysOptiosCommit', this.checkList)
      this.innerVisibleTolsOption = false
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .dialog-footer  .el-button--primary{
     background:linear-gradient(180deg,rgba(93,162,239,1) 0%,rgba(43,142,209,1) 100%);
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox  .el-form {
  border: none
}
.system-operation {
  .systemBorder {
      .dialog-footer {
            background: #ffffff;
      }
  }
}
</style>
