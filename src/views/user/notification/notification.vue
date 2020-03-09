<!-- 消息中心-消息 -->
<template>
  <div class="notification">
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      infinite-scroll-immediate='false'
      style="overflow:auto"
      v-if="informationList.length !== 0"
    >
      <li
        v-for="(item,index) in informationList"
        :key="index"
        class="infinite-list-item"
        :class="item.i_IsSeen === '1' ? 'opacity': ''"
      >
        <div class="content-icon-box" @click="jumpInformDetails(item)">
          <div
            class="icon-box"
            :style="`background: ${item.v_IconBgcolor}`"
          >
            <i :class="item.v_Icon"></i>
          </div>
          <div class="content-box">
          <el-tooltip class="content" popper-class='tooltipclass'  effect="dark"  :content='item.v_Title' placement="bottom" :open-delay='600' v-if='item.v_Title.length >= 18'>
                 <div>{{item.v_Title}} </div>
            </el-tooltip>
            <span v-else>{{item.v_Title}}</span>
            <span>{{item.d_SendDate}}</span>
          </div>
        </div>
        <div class="del-class-box" @click="delNotification(item,index)">
          <i class="el-icon-error"></i>
        </div>
      </li>
    </ul>
    <div
      class="not-notification"
      v-else
    > <span>暂无消息</span> </div>
    <div class="cler-notification">
      <el-button type="text" @click="allSignRead"> 全部标为已读</el-button>
    </div>
    <dialog-standard
      v-if="ifDialog"
      :ifDialog='ifDialog'
      v-on="$listeners"
      @getDialogStatus='getDialogStatus'
      :configData='buttonConfig'>
    </dialog-standard>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
// 弹框
import dialogStandard from '@/components/stdDialog/stdDialogAction'
export default {
  name: 'notification',
  data () {
    return {
      informationList: [],
      count: 20,
      index: 1,
      size: 10,
      total: 0,
      flag: '1',
      // 通知中心刷新间隔时间
      notificationCenterRefreshTime: 0,
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {},
      ifDialog: false
    }
  },
  created () {
    this.getInformationList()
    // 通知中心定时刷新
    this.InformationRefresh()
  },
  methods: {
    // 弹框关闭之后会 传一个对象 过来
    getDialogStatus (params) {
      this.ifDialog = params.flag
    },
    getButtonConfig (data, viewFlag) {
      this.ifDialog = data
    },
    jumpInformDetails (item) {
      this.$store.commit('rowData', item)
      let val = {
        explain: '查看消息详情',
        v_CateCode: 'CC_FM',
        v_Code: 'CC_FM_details_I',
        v_DialogCode: 'CF_DL_1100_600',
        v_LinkOperaInfo: '查看消息详情',
        v_TemplateCode: 'standardForm'
      }
      this.$set(val, 'explain', val.v_LinkOperaInfo)
      this.$store.commit('confBtn', val)
      this.btnConfigData.v_Code = val.v_Code
      this.btnConfigData.v_CateCode = val.v_CateCode
      this.btnConfigData.operationcode = val.v_TemplateCode
      let params = {
        v_DialogCode: val.v_DialogCode
      }
      cgiService.dialogConfig(params).then(res => {
        if (res.code === 0) {
          this.getButtonConfig(true)
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
          this.buttonConfig = dialogObj
          let id = {
            id: item.i_Id
          }
          cgiService.seeInformation(id).then(res => {
            if (res.code === 0) {
              if (item.i_IsSeen === '0') {
                item.i_IsSeen = '1'
              }
              this.index = 1
              this.informationList = []
              this.getInformationList()
            }
          })
          this.ifDialog = true
        }
      })
    },
    // 获取通知列表
    getInformationList () {
      let params = {
        size: this.size,
        index: this.index
      }
      this.total = 0
      cgiService.getInformation(params).then(res => {
        if (res.code === 0) {
          if (res.data.length !== 0) {
            let arr = []
            arr = res.data
            this.informationList = this.informationList.concat(arr)
            this.total = res.notReadCount
            this.$emit('getNotificationNum', this.total)
            this.flag = '1'
          } else {
            this.flag = '0'
          }
        }
      })
    },
    // 通知中心定时刷新
    InformationRefresh () {
      let v_ParamCode = ['notificationCenterRefreshTime']
      cgiService.getParameter({ v_ParamCode }).then(res => {
        if (res.code === 0) {
          this.notificationCenterRefreshTime = Number(res.data.notificationCenterRefreshTime.v_ParamValue) * 1000
          setInterval(() => {
            this.index = 1
            this.informationList = []
            setTimeout(this.getInformationList(), 0)
          }, this.notificationCenterRefreshTime)
        }
      })
    },
    // 滚动加载数据
    load () {
      if (this.flag !== '0') {
        this.index += 1
        this.getInformationList()
      }
    },
    // 删除通知
    delNotification (item, index) {
      let ids = []
      ids.push(item.i_Id)
      let params = {
        ids
      }
      cgiService.delInformation(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.index = 1
          this.informationList = []
          this.getInformationList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 全部标记已读
    allSignRead () {
      cgiService.allReadInformation().then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.informationList.forEach(item => {
            if (item.i_IsSeen === '0') {
              item.i_IsSeen = '1'
            }
          })
          this.$emit('getNotificationNum', 0)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {},
  components: {
    dialogStandard
  }
}
</script>

<style scoped lang='scss'>
.notification {
  height: 300px;
  display: flex;
  flex-direction: column;
  .infinite-list {
    flex: 1;
    margin: 0;
    list-style: none;
    padding: 0;
    border-bottom: 1px solid #e6e6e6;
    .infinite-list-item {
      &:hover {
        background: #DAE7FE;
        .del-class-box {
          display: block;
          > i {
              color: #999999;
          }
        }
      }
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 20px;
      cursor:pointer;
      .content-icon-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .content-box {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          font-size: 12px;
          width: 210px;
          .content {
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
          }
        }
        .icon-box {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #5892f6;
          text-align: center;
          line-height: 28px;
          > i {
            color: #ffffff;
          }
        }
      }
      .del-class-box {
        display: none;
      }
    }
  }
  .cler-notification {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .not-notification {
    height: 100%;
    position: relative;
    > span {
      color: #bfbfbf;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
    }
  }
}
.cler-notification /deep/ .el-button {
  color: #333333;
  font-size: 12px;
}
.opacity {
  opacity: 0.5;
}
</style>
