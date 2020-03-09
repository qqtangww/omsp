export default {
  data () {
    return {
      name: 'mixin',
      newForm: {},
      isBadge: false,
      str: '',
      stdFormData: {}
    }
  },
  computed: {
    // 定义需要监听的对象
    changeData () {
      const { form, metaForm, formdata, updataList, formdataList, formdataChrlList, formdataValChildList } = this
      return {
        form,
        metaForm,
        formdata,
        updataList,
        formdataList,
        formdataChrlList,
        formdataValChildList
      }
    }
  },
  watch: {
    changeData: {
      handler: function (newVal, oldVal) {
        // 把原未修改数据的对象赋值给一个变量接受
        let that = this
        // 遍历未修改的变量 跟 修改后的对象做对比
        for (let i in this.changeData) {
          if (this.changeData[i] !== undefined && JSON.stringify(this.changeData[i]) !== '{}') {
            // 把需要监听并且有数据的对象 赋值 进行遍历
            let newFormData = Object.assign({}, this.changeData[i])
            // 删除用户管理中的密码
            delete newFormData.pwd
            delete this.newForm.pwd
            // delete newFormData.autologperiod
            for (let key in this.newForm) {
              if (this.newForm[key] != newFormData[key] && newFormData.id > 0) {
                that.isBadge = true
                break
              } else {
                that.isBadge = false
              }
            }
          }
        }
      },
      immediate: false,
      deep: true
    },
    modeAddData: {
      handler: function (newData, oldData) {
        // console.log(this.stdFormData)
        // console.log(newData)

        let isTure = 1
        for (const key in this.stdFormData) {
          if (this.stdFormData[key] != newData[key] && JSON.stringify(this.stdFormData) !== '{}') {
            isTure = 0
          }
        }
        if (isTure === 0) {
          this.isBadge = true
        } else {
          this.isBadge = false
        }
      },
      deep: true
    }
  },
  methods: {
    handlerCheck (val) {
      if (val) {
        this.isBadge = true
      }
    },
    handleClose (val) {
      if (val) {
        this.isBadge = false
        this.showRoleDialog = false
      }
    }
  },
  filters: {
    newStr: function (val) {
      // console.log(val)
      if (!val) return '0.00'
      let intNum = Number(val) | 0
      //  let  intNumFormat = intNum.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      let floatNum = '.00'
      let valArray = val.split('.')
      if (valArray.lenght === 2) {
        floatNum = valArray[1].toString()
        if (floatNum === 1) {
          return intNumFormat + '.' + floatNum + '0'
        } else {
          return intNumFormat + '.' + floatNum
        }
      } else {
        return intNumFormat + floatNum
      }
    }
  }
}
