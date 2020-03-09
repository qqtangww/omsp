<!-- 通知中心 -->
<template>
    <div id='notification-center'>
        <el-card class="border-card">
            <div slot="header" class="clearfix">
                <el-badge slot="label" :value="notificationNum" class="notification-badge" v-if="notificationNum !== 0">
                    <span class="tab-title">消息</span>
                </el-badge>
                <el-badge slot="label" value="" class="notification-badge" v-else>
                    <span class="tab-title">消息</span>
                </el-badge>
                <el-button style="float: right; padding: 3px 0" type="text" @click="goMessage">前往消息中心<i class="el-icon-arrow-right"></i></el-button>
            </div>
            <notification @getNotificationNum='getNotificationNum'></notification>
        </el-card>
    </div>
</template>
<script>
import notification from '@/views/user/notification/notification'
// import message from '@/views/user/notification/message'
export default {
  name: 'notification-center',
  data () {
    return {
      notificationNum: 0,
      messageNum: 0
    }
  },
  methods: {
    goMessage () {
      let rotuer = '/sys/stdTableControl/CC_VW_notificationInfo'
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
      this.$emit('getTotalQuantity', 0)
    },
    getNotificationNum (num) {
      this.notificationNum = num
      let params = this.notificationNum + this.messageNum
      this.$emit('getTotalQuantity', params)
    }
  },
  components: {
    notification
    // message
  }
}
</script>

<style scoped lang='scss'>
#notification-center{
    .notification-badge{
        /deep/ .el-badge__content{
            width: 16px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            border: none;
            border-radius: 50%;
            right: -4px;
            top: 0px;
            padding: 0;
            font-weight: normal;
        }
    }
}
</style>
<style lang='scss'>
#notification-center{
    .el-card__header {
        padding: 12px 10px 12px 148px;
        color: #5892F6;
        font-weight: bold;
        font-size: 12px;
    }
    /deep/ .el-button--text {
        color: #999999;
    }
    .el-card__body {
        padding: 0px;
    }
}
</style>
