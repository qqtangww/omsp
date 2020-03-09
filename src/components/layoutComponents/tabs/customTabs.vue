<template>
    <div class='tabs-handout'>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="自定义tab" name="first">
                <!-- <handout-component
                    :configData=""
                    @changeShareData="changeShareData3"
                    :shareData="shareData1"
                /> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'standardTabs',
  props: {
    configData: Object,
    share: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
