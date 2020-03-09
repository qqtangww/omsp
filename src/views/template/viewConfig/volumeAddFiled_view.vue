<template>
  <div class="add-modify-form">
      <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        @sumitForm='commit'
        :formRed='formRed'
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class='borderColor'>
      <div class="templateSearchBox">
        数据库表:
        <el-select
          v-model="tablename"
          @focus="getDatabaseTabName"
          @change="getBatchTabFields"
          placeholder="请选择"
        >
          <el-option
            v-for="item in databaseTab"
            :key="item.v_TableName"
            :label="item.v_TableName"
            :value="item.v_TableName"
          >
          </el-option>
        </el-select>
      </div>
      <div class="templateTabBox">
        <div class="leftBox">
          <span> <i class="iconfont icon-jibenxinxi"></i>未添加字段</span>
          <el-table
            ref="multipleTable1"
            :data="fieldTable"
            tooltip-effect="dark"
            class="contentTable"
            :header-cell-style="{background:'rgba(230,230,230,.4)', color:'#333333' }"
            height="420px"
            style="width: 100%"
            @selection-change="noSelPeople"
          >
            <el-table-column
              type="selection"
              width="30"
              :selectable='tableDisabled'
            />
            <el-table-column
              label="字段名"
              fixed
              width="140"
            ><template slot-scope="scope">
                <span>{{ scope.row.v_ColName }}</span>
              </template></el-table-column>
            <el-table-column
              prop="name"
              label="描述"
              width="auto"
            ><template slot-scope="scope">{{ scope.row.v_FieldDescription}}</template></el-table-column>
          </el-table>
        </div>
        <div class="dialogCommitBox">
          <el-button
            type="text"
            @click="MoveAddPeople"
          ><i class="iconfont icon-tianjiachengyuanjiantouyou"></i></el-button>
          <el-button
            type="text"
            @click="cancelAddPeople"
          ><i class="iconfont icon-tianjiachengyuanjiantouzuo"></i></el-button>
        </div>
        <div class="rightBox">
          <span> <i class="iconfont icon-jibenxinxi"></i> 待添加字段</span>
          <el-table
            ref="multipleTable"
            :data="selectedField"
            tooltip-effect="dark"
            class="contentTable"
            :header-cell-style="{background:'rgba(230,230,230,.4)', color:'#333333' }"
            height="420px"
            style="width: 100%"
            @selection-change="noSelPeople2"
          >
            <el-table-column
              type="selection"
              width="30"
            />
            <el-table-column
              label="数据库表"
              fixed
              width="100"
            ><template slot-scope="scope"><span>{{ scope.row.v_TableName}}</span></template></el-table-column>
            <el-table-column
              prop="name"
              label="字段名"
              width="140"
            ><template slot-scope="scope">
                <span>{{ scope.row.v_ColName }}</span>
              </template></el-table-column>
            <el-table-column
              prop="name"
              label="描述"
              width="auto"
            ><template slot-scope="scope">{{ scope.row.v_FieldDescription}}</template></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'volumAddFiled_view',
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      tablename: '',
      fieldTitle: '',
      innerVisibleVolumeAdd: false,
      fieldTable: [],
      databaseTab: [],
      selectedField: [],
      formCode: '',
      pitchArray: [],
      pitchArray2: [],
      viewId: '',
      formRed: false,
      oldSelectedField: []
    }
  },
  watch: {
    shareData: {
      handler: function (data) {
        if (data) {
          this.viewId = data.v_ViewID || data.viewid
        }
      },
      deep: true,
      immediate: true
    },
    selectedField: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldSelectedField)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    this.oldSelectedField = this.selectedField
  },
  methods: {
    commit () {
      let data = JSON.stringify(this.selectedField)
      let params = {
        data: data
      }
      cgiService.addTemBatchTablefields(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          let resObj = {
            ...res
          }
          this.$set(resObj, 'v_ViewID', res.viewid)
          // 把 接口返回 的数据存到vuex
          this.$store.commit('rowData', resObj)
          this.formRed = false
          this.tablename = ''
          this.oldSelectedField = []
          this.selectedField = []
          this.fieldTable = []
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取数据表
    getDatabaseTabName () {
      cgiService.getTemDatabaseTab(this.viewId).then(res => {
        if (res.code === 0) {
          this.databaseTab = res.data
        }
      })
    },
    // 根据表名  获取字段
    getBatchTabFields (tableName) {
      let params = {
        v_TableName: tableName
      }
      cgiService.getTemBatchTablefields(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.fieldTable = res.data
        }
      })
    },
    // table组件的checkBox选中事件
    noSelPeople (val) {
      this.pitchArray = val
    },
    // table组件的checkBox选中事件
    noSelPeople2 (val) {
      this.pitchArray2 = val
    },
    // CheckBox禁用
    tableDisabled (row, index) {
      let flag = true
      this.selectedField.forEach(val => {
        for (var key in val) {
          if (val.v_ColName === row.v_FieldName) {
            flag = false
          }
        }
      })
      if (!flag) {
        return false
      } else {
        return true
      }
    },
    // 批量字段往右的移动
    MoveAddPeople () {
      if (this.pitchArray.length !== 0) {
        let newFieldTable = []
        this.pitchArray.forEach(e => {
          newFieldTable.push(e)
        })
        this.selectedField = this.selectedField.concat(newFieldTable)
        this.selectedField = this.arrNewSet(this.selectedField)
      }
    },
    // 批量字段往左移动
    cancelAddPeople () {
      if (this.pitchArray2.length !== 0) {
        let newFieldTable = []
        let newSelectedField = []
        this.pitchArray2.forEach(val => {
          newFieldTable.push(val)
        })
        this.selectedField.forEach(val => {
          let flag = false
          newFieldTable.forEach(item => {
            if (val.v_ColName === item.v_ColName) {
              flag = true
              return false
            }
          })
          if (!flag) {
            newSelectedField.push(val)
          }
          this.selectedField = newSelectedField
          this.noSelPeople(this.pitchArray)
        })

        if (newFieldTable) {
          newFieldTable.forEach(row => {
            this.$refs.multipleTable1.toggleRowSelection(row, false)
          })
        }
      }
    },
    // 弹框关闭回调函数
    closeVolume () {
      this.tablename = ''
      this.selectedField = []
      this.fieldTable = []
    },
    // 数组去重
    arrNewSet (arr) {
      let x = new Set(arr)
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
  border: 4px solid #abd6ff;
 box-sizing: border-box;
  .borderColor {
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    .templateTabBox {
      display: flex;
      padding-top: 10px;
      .leftBox {
        width: 48%;
      }
      .rightBox {
        width: 48%;
      }
      .dialogCommitBox {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 4%;
        button {
          &:nth-of-type(2) {
            margin: 0;
          }
          > span {
            > i {
              font-size: 28px;
              color: #2b8ed1;
            }
          }
        }
      }
    }
    .templateSearchBox {
      padding-left: 5px;
      .el-select {
        width: 315px;
      }
    }
  }
  .contentTable  {
    border: 1px solid #e6e6e6;
  }
}

</style>
