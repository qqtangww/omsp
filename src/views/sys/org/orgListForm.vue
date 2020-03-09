<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-27 11:48:11
 * @LastEditTime: 2019-09-24 17:55:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="content-form-wrapper">
    <el-form inline-message class="content-form-box" label-position="right" label-width="40%">
      <div class="borderDiv label12">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="全称 :" class="orgfullName">{{currentNode.v_OrgFullName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构代码 :">{{currentNode.v_OrgCode}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="简称 :">{{currentNode.v_OrgShortName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CCC代码 :">{{currentNode.v_OrgCCC}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="负责人ID :" class="showSLH">{{currentNode.v_ManagerUserID}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱 :">{{currentNode.v_Email}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述 :" class="orgfullName labelwith">{{currentNode.v_Description}}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="borderDiv label12">
        <span>
          <i class="iconfont icon-gengxinjilu"></i> 更新记录
        </span>
        <el-row>
          <el-col :span="8">
            <el-form-item label="创建者 :">{{currentNode.v_Creator}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间 :">{{currentNode.d_CreateTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="最后修改者 :">{{ currentNode.v_LastModifiedUser }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后修改时间 :">{{ currentNode.d_LastModifiedTime }}</el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import standardTitle from '@/components/stdTitle/standardTitle'
import buttonClick from '@/common/js/mixins/buttonClick'
export default {
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object,
      default () {}
    }
  },
  mixins: [buttonClick],
  data () {
    return {
      currentNode: {},
      key: { flag: false }
    }
  },
  watch: {
    shareData: {
      immediate: true,
      deep: true,
      handler (nv) {
        this.currentNode = nv
      }
    }
  },
  created () {
    this.configData.title = '机构详情'
    this.$emit('changeShareData', this.key)
  }
}
</script>
<style scoped lang="scss">
.content-form-wrapper{
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  .orgBtn-box{
    >span{
      margin-right: 10px;
    }
  }
  .content-form-box{
    height: 100%;
  }
}
</style>
