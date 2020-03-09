<!-- 系统维护页面 -->
<template>
  <div class="maintenance">
    <div class="loginHeader">
      <div class="logoBox">
        <img src="@/assets/images/logo.png" alt />
      </div>
      <div class="loginTitle">
        <p>易智捷 外包服务管理平台</p>
        <p>e-Smart Outsourcing Service Management Platform</p>
      </div>
    </div>
    <div class="content-box">
      <div class="banner">
        <img src="@/assets/images/maintenance.png" alt />
      </div>
      <div class="content-text">
        <span>系统维护升级中</span>
        <span>抱歉，系统正在维护升级，请稍候访问</span>
      </div>
    </div>
    <div class="loginFooter">
      <div>Copyright ©2018 www.osmp.com All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintenance',
  data () {
    return {}
  }
}
</script>

<style scoped lang='scss'>
.maintenance{
  display: flex;
  flex-direction: column;
  height: 100%;
  .loginHeader{
    min-height: 100px;
    height: 12%;
    display: flex;
    align-items: center;
    .logoBox{
      width: 135px;
      height: 40px;
      margin-left: 40px;
      img{
        width: 100%;
      }
    }
    .loginTitle{
      margin-left: 24px;
      >p{
        margin: 0;
        color: #333333;
        &:first-of-type{
          font-size: 27px;
        }
        &:last-of-type{
          font-size: 12px;
        }
      }
    }
  }
  .content-box{
    height: 76%;
    background:linear-gradient(90deg,rgba(47,142,245,1) 0%,rgba(89,164,244,1) 100%);
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    .banner{
      height: 75%;
      min-height: 300px;
      margin-left: 120px;
      display: flex;
      align-items: center;
      img{
        height: 100%;
      }
    }
    .content-text{
        flex-direction: column;
        display: flex;
      >span{
        color: white;
        &:first-of-type{
          font-size:44px;
          font-family:Microsoft YaHei;
          font-weight:400;
        }
        &:last-of-type{
          height:24px;
          font-size:18px;
          font-family:Microsoft YaHei;
          font-weight:400;
        }
      }
    }
  }
  .loginFooter{
    min-height: 110px;
    >div{
      width: 800px;
      text-align: center;
      margin: 30px auto 0;
      color: #999999;
    }
  }
}
</style>
