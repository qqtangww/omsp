<template>
  <div class="bodyBorderBox">
    <div class="formOperateBox">
      <el-button
        type="text"
        @click="closeDia"
      > <i class="iconfont icon-tuichu"></i> 关 闭</el-button>
      <el-button
        type="text"
        @click="Commit('formdatas')"
      ><i class="iconfont icon-baocun"></i>保 存</el-button>
    </div>
    <div class="contentBox">
      <el-form inline-message label-position="right" label-width="100px" :rules="rules" ref="ruleForm" :model="modAddData">
        <div class="border-box">
          <span> <i class="iconfont icon-jibenxinxi"></i> 基本信息</span>
          <div class="conBox">
            <el-form-item
              label="Tab标签编码"
              prop="v_TabsFlagCode"
            >
              <el-input v-model="modAddData.v_TabsFlagCode" disabled></el-input>
            </el-form-item>
            <el-form-item
              label="Tab标签名称"
              prop="v_TabsFlagName"
            >
              <el-input v-model="modAddData.v_TabsFlagName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="border-box">
          <span> <i class="iconfont icon-jibenxinxi"></i> 标签配置</span>
          <div class="conBox">
           <el-form-item
              label="组件种类"
              label-width="100px">
              <el-select
                v-model="modAddData.i_ComponentNature ">
                <el-option
                  v-for="item in componentsNature"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="组件类型"
              label-width="100px">
              <el-cascader
                popper-class='filtrate'
                v-model="cateCodeVal1"
                placeholder="请输入搜索"
                :options="componentCode"
                @focus='getComponentEventmodAddData'
                @change="changeComponentmodAddData"></el-cascader>
            </el-form-item>
            <el-form-item
              label="组件实例"
              label-width="100px"
              v-if="cateCodeVal1[0] !== '3'">
              <el-select
                v-model="modAddData.v_InstanceCode "
                filterable
                clearable
                @focus="getComponentInstanceData1">
                <el-option
                  v-for="(item, index) in instanceComponents"
                  :key="index"
                  :label="item.v_Name"
                  :value="item.v_Code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="内容名称"
              label-width="100px"
              v-if="cateCodeVal1[0] === '3'">
              <el-input v-model="modAddData.v_contentName"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
export default {
  name: 'tabsInstanceConfig',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      modAddData: {
        // Tab编码
        v_TabsFlagCode: '',
        // 名称
        v_TabsFlagName: '',
        // 组件实例
        v_InstanceCode: '',
        // Tab标签编码
        v_RegionCode: '',
        // 组件种类
        i_ComponentNature: '',
        // id
        i_Id: ''
      },
      rules: {},
      // 图标
      tabsIcons: [
        {
          value: 'iconfont icon-shituzujian'
        },
        {
          value: 'iconfont icon-jibenxinxi'
        },
        {
          value: 'iconfont icon-zuzhijigou'
        },
        {
          value: 'iconfont icon-buju'
        },
        {
          value: 'iconfont icon-tabsbiaoqianye'
        },
        {
          value: 'iconfont icon-zuoyou'
        },
        {
          value: 'iconfont icon-zuozhongyou'
        },
        {
          value: 'iconfont icon-shangxiayou'
        },
        {
          value: 'iconfont icon-dankuangrongqi'
        },
        {
          value: 'iconfont icon-zuoshangxia'
        },
        {
          value: 'iconfont icon-shangxia'
        }
      ],
      // 组件
      componentCode: [],
      //   组件类型的数据
      cateCodeVal1: [],
      // 组件实例
      instanceComponents: [],
      // 组件种类
      componentsNature: [
        {
          label: '无',
          value: '0'
        },
        {
          label: '内容组件',
          value: '1'
        },
        {
          label: '布局组件',
          value: '2'
        },
        {
          label: '容器组件',
          value: '3'
        }
      ]
    }
  },
  watch: {
    // 弹框关闭 打开
    ifDialog: {
      handler: function (val) {
        let confsBtn = this.$store.state.confsBtn
        // 判断是否是修改数据
        if (confsBtn.operationcode === 'instanceConfig') {
          let formData = this.$store.state.fieTableData
          this.$set(this.modAddData, 'v_TabsFlagCode', formData.v_TabsFlagCode)
          this.$set(this.modAddData, 'v_TabsFlagName', formData.v_TabsFlagName)
          this.$set(this.modAddData, 'i_ComponentNature', formData.i_ComponentNature)
          this.$set(this.modAddData, 'v_RegionCode', formData.v_RegionCode)
          this.$set(this.modAddData, 'v_InstanceCateCode', formData.v_InstanceCateCode)
          this.$set(this.modAddData, 'i_InstanceCate', formData.i_InstanceCate)
          this.$set(this.modAddData, 'v_CateCode', this.cateCodeVal1[1])

          // 设置组件类型
          this.cateCodeVal1[0] = formData.i_InstanceCate
          this.cateCodeVal1[1] = formData.v_InstanceCateCode
          // 获取组件
          this.queryComponents()
          // 获取组件实例
          this.queryInstanceComponents(this.cateCodeVal1[0], this.cateCodeVal1[1])
          this.$set(this.modAddData, 'v_InstanceCode', formData.v_InstanceCode)
          this.$set(this.modAddData, 'i_Id', formData.i_Id)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 提交表单
    Commit () {
      cgiService.saveInstanceConfig(this.modAddData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          let params = this.$store.state.paginations
          this.$emit('getTableData', params['CC_VW_TabIstant'])
          this.$emit('getButtonConfig', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 组件联级选择器change事件
    getComponentEventmodAddData () {
      this.queryComponents()
    },
    changeComponentmodAddData (val) {
      if (val) {
        this.modAddData.v_InstanceCode = ''
        this.modAddData.i_InstanceCate = val[0]
        this.modAddData.v_InstanceCateCode = val[1]
        this.queryInstanceComponents(val[0], val[1])
      }
    },
    // 获取组件实例 区域1
    getComponentInstanceData1 () {
      // 获取组件实例
      this.queryInstanceComponents(this.cateCodeVal1[0], this.cateCodeVal1[1])
    },
    // 获取组件
    queryComponents () {
      cgiService.getEnumValues().then(res => {
        if (res.code === 0) {
          this.componentCode = res.data
        }
      })
    },
    // 获取组件实例
    queryInstanceComponents (val1, val2) {
      // 获取组件配置
      let params = {
        i_Cate: val1,
        v_CateCode: val2
      }
      cgiService.getComponentsConfig(params).then(res => {
        if (res.code === 0) {
          this.instanceComponents = res.data
        }
      })
    },
    // 弹框关闭回调函数
    closeDia () {
      this.$emit('getButtonConfig', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.contentBox {
  padding: 0px !important;
  border: 4px solid #abd6ff;
  .el-form {
    border: none !important;
    .border-box {
      height: 100%;
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .conBox {
        margin-left: 20px;
        .el-cascader {
          width: 100%;
          margin-left: 0 !important;
        }
      }
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
  }
}
</style>
