<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 16:36:32
 * @LastEditTime: 2019-09-24 17:56:48
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="current-page-form">
      <!-- <standard-title :configData='configData' :shareData='shareData' v-on='$listeners'></standard-title> -->
      <el-form class="content-form-box" label-position="right" label-width="45%">
          <div class="borderDiv label15">
              <span>
              <i class="iconfont icon-jibenxinxi"></i> 基本
              </span>
              <el-row>
              <el-col :span="8">
                  <el-form-item label="名称 :" class="orgfullName">{{currentNode.v_PageName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="图标 :">
                  <i :class="currentNode.v_IconURL"></i>
                  </el-form-item>
              </el-col>
              </el-row>
              <el-row v-if="currentNode.level === 3">
              <el-col :span="8">
                  <el-form-item
                  label="页面类型 :"
                  >{{ compontentType }}</el-form-item>
              </el-col>
              <el-col :span="12" v-if="currentNode.i_PageTypeVal === '1'">
                  <!-- <el-form-item label="视图模板名称 :" >{{currentNode.level === 3 ? currentNode.viewname : '无'}}</el-form-item> -->
                  <el-form-item label="视图模板名称 :" >{{ componentName }}</el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                  <el-form-item label="URl :">{{currentNode.level === 3 ? currentNode.v_PageURL : '无'}}</el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="8" v-if="currentNode.level === 3">
                  <el-form-item label="隐藏导航窗格 :">
                  <el-switch
                      v-model="currentNode.i_IsHideNavigator"
                      @change="switchPageCommit('i_IsHideNavigator',currentNode)"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                  />
                  </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="24">
                  <el-form-item
                  label="描述 :"
                  class="orgfullName labelwith"
                  >{{currentNode.v_Description}}</el-form-item>
              </el-col>
              </el-row>
          </div>
          <div class="borderDiv">
              <span>
              <i class="iconfont icon-shezhi"></i> 权限
              </span>
              <el-row>
                  <el-col :span="8">
                      <el-form-item label="需要授权 :">
                      <el-switch
                          v-model="currentNode.i_NeedAuthorized"
                          @change="switchPageCommit('i_NeedAuthorized',currentNode)"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          active-value="1"
                          inactive-value="0"
                      />
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="代理使用 :">
                      <el-switch
                          v-model="currentNode.i_EnableAgent"
                          @change="switchPageCommit('i_EnableAgent',currentNode)"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          active-value="1"
                          inactive-value="0"
                      />
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="8">
                      <el-form-item label="禁用 :">
                      <el-switch
                          v-model="currentNode.i_IsDisabled"
                          @change="switchPageCommit('i_IsDisabled',currentNode)"
                          active-color="#32c5d2"
                          inactive-color="#e6e7e8"
                          active-value="1"
                          inactive-value="0"
                      />
                      </el-form-item>
                  </el-col>
              </el-row>
          </div>
          <div class="borderDiv">
              <span>
              <i class="iconfont icon-gengxinjilu"></i> 更新记录
              </span>
              <el-row>
              <el-col :span="8">
                  <el-form-item label="创建者 :">{{ currentNode.v_Creator}}</el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="创建时间 :">{{currentNode.d_CreateTime }}</el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="8">
                  <el-form-item label="最后修改者 :">{{currentNode.v_LastModifiedUser }}</el-form-item>
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
import cgiService from '@/api/cgiService'
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
  data () {
    return {
      componentName: '',
      compontentType: ''
    }
  },
  watch: {
    shareData: {
      handler (nv) {
        switch (nv.i_Cate) {
          // cate ：1内容组件 2布局组件 3自定义内容'
          case '1':
            switch (nv.v_CateCode) {
              case 'CC_VW':
                // return configData.v_TemplateCode
                // 如果弹框中是  视图组件
                this.compontentType = '内容组件'
                this.componentName = '视图组件'
                break
              case 'CC_FM':
                // 如果弹框中是  表单组件
                this.compontentType = '内容组件'
                this.componentName = '表单组件'
                break
              case 'CC_TR':
                // 如果弹框中是  树 组件
                this.compontentType = '内容组件'
                this.componentName = '树组件'
                break
              default:
                break
            }
            break
          case '2':
            switch (nv.v_CateCode) {
              // tabs标签页
              case 'CR_TAB':
                this.compontentType = '布局组件'
                this.componentName = 'tabs标签页'
                break
                // 左右
              case 'CR_LF':
                this.compontentType = '布局组件'
                this.componentName = '左右布局'
                break
                // 上下
              case 'CR_UD':
                this.compontentType = '布局组件'
                this.componentName = '上下布局'
                break
                // 左中右
              case 'CR_LMR':
                this.compontentType = '布局组件'
                this.componentName = '左中右布局'
                break
                // 左上下
              case 'CR_LUD':
                this.compontentType = '布局组件'
                this.componentName = '左上下布局'
                break
                // 上下右
              case 'CR_UDR':
                this.compontentType = '布局组件'
                this.componentName = '上下右布局'
                break
            }
            break
          case '3':
            // 自定义内容组件名称
            this.compontentType = '自定义组件'
            this.componentName = '自定义组件'
            break
          default:
            break
        }
      },
      deep: true,
      immediate: true
    },
    configData: {
      handler (nv) {
        nv.title = '选中页面详情'
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.$emit('changeShareData', { flag: false })
  },
  computed: {
    currentNode () {
      return this.shareData || {}
    }
  },
  methods: {
    switchPageCommit (fields, data) {
      let obj = {}
      obj.i_Id = data.i_Id
      obj.v_PageName = data.v_PageName
      obj[fields] = data[fields]
      cgiService.temPagesOperationSaveData1(obj).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    standardTitle
  }
}
</script>

<style lang="scss">
.current-page-form{
    height: 100%;
    // overflow: auto;
    box-sizing: border-box;
    .el-form, .el-tabs--border-card {
        // flex: auto;
        height: 100%;
    }
}
</style>
