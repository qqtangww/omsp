<!-- 通知中心-消息 -->
<template>
  <div class="message-box">
  <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-immediate='false' style="overflow:auto" v-if="messageList.length !== 0">
       <li v-for="(item,index) in messageList" :key="index" :class="item.i_IsSeen === '1' ? 'opacity': ''" class='infinite-list-item'>
         <div class="content-icon-box" @click="queryMessage(item)">
         <div class="icon-box" :style="`background:${item.v_IconBgcolor}`">
            <i class="el-icon-s-comment"></i>
         </div>
          <div class="content-box">
          <el-tooltip class="content"  popper-class='tooltipclass' effect="dark" :content="item.v_SendContent" placement="bottom" :open-delay='600' v-if='item.v_SendContent.length >= 18'>
                 <span>{{item.v_SendContent}}</span>
            </el-tooltip>
            <span v-else> {{item.v_SendContent}} </span>
           <span>{{item.d_SendDate}}</span>
          </div>
          </div>
         <div class="del-class-box" @click="delMessage(item,index)">
          <i class="el-icon-error"></i>
        </div>
         </li>
  </ul>
   <div class="not-notification" v-else> <span>暂无通知</span> </div>
 <div class="cler-notification">
   <el-button type="text" @click="allSignRead"> 全部标为已读</el-button>
 </div>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
export default {
  name: 'message',
  data () {
    return {
      messageList: [],
      count: 20,
      index: 1,
      size: 10,
      total: 0,
      // 通知中心刷新间隔时间
      notificationCenterRefreshTime: 0
    }
  },
  created () {
    this.getMessageCentreList()
    // 通知中心定时刷新
    this.InformationRefresh()
  },
  methods: {
    // 获取消息列表
    getMessageCentreList () {
      let params = {
        size: this.size,
        index: this.index
      }
      this.messageList = []
      this.total = 0
      cgiService.getMessageCentre(params).then(res => {
        if (res.code === 0) {
          if (res.data.length !== 0) {
            let arr = []
            arr = res.data
            this.messageList = this.messageList.concat(arr)
            this.total = res.notReadCount
            this.$emit('getMessageNum', this.total)
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
            setTimeout(this.getMessageCentreList(), 0)
          }, this.notificationCenterRefreshTime)
        }
      })
    },
    // 滚动加载
    load () {
      this.index += 1
      this.getMessageCentreList()
    },
    // 点击查看消息
    queryMessage (item) {
      let parans = {
        i_Id: item.i_Id,
        type: 'news'
      }
      cgiService.clickQueryMessage(parans).then(res => {
        if (res.code === 0) {
          this.messageList.filter(val => {
            if (val.i_Id === item.i_Id) {
              val.i_IsSeen = '1'
            }
          })
          this.$emit('getMessageNum', --this.total)
        }
      })
    },
    // 删除消息
    delMessage (item, index) {
      let ids = []
      ids.push(item.i_Id)
      let params = {
        ids
      }
      cgiService.delMessage(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.messageList.splice(index, 1)
          this.$emit('getMessageNum', --this.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 标记全部已读
    allSignRead () {
      cgiService.allReadMessage().then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$emit('getMessageNum', 0)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang='scss'>
.message-box {
  height: 300px;
  display: flex;
  flex-direction: column;
  .infinite-list {
    flex: 1;
    margin: 0;
    list-style: none;
    padding: 0;
    overflow-x: hidden;
    .infinite-list-item {
      &:hover {
        background: #DAE7FE;
        .del-class-box {
          display: block;
          width:20px;
          height:20px;
          z-index: 1;
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
        flex: 1;
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
      border-top: 1px solid #E6E6E6;
  }
   .not-notification {
    height: 100%;
    position: relative;
    >span {
      color: #BFBFBF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
    }
  }
}
  .opacity {
    opacity: 0.5;
  }
  .cler-notification /deep/ .el-button {
      color: #333333;
      font-size: 12px;
  }
</style>
