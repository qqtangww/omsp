// 监听参数颜色改变
export default {
  data () {
    return {

    }
  },
  methods: {
    changeColor1 (val) {
      this.iconFlag1 = false
      this.formRed = true
      this.paramValue.v_EnumValue.color1 = val
      if (this.paramValue.v_EnumValue.color2) {
        if (!this.paramValue.v_EnumValue.deg) {
          this.paramValue.v_EnumValue.deg = 0
        }
        document.querySelector('.preview-color1').style.background = `linear-gradient(${this.paramValue.v_EnumValue.deg}deg,${val} 0%,${this.paramValue.v_EnumValue.color2} 100%)`
      } else {
        document.querySelector('.preview-color1').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue.color1) {
        document.querySelector('.preview-color1').style.background = `${this.paramValue.v_EnumValue.color2}`
      }
      if (!this.paramValue.v_EnumValue.color1 && !this.paramValue.v_EnumValue.color2) {
        document.querySelector('.preview-color1').style.background = 'none'
        this.iconFlag1 = true
      }
    },
    changeColor2 (val) {
      this.iconFlag1 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue.color1) {
        if (!this.paramValue.v_EnumValue.deg) {
          this.paramValue.v_EnumValue.deg = 0
        }
        document.querySelector('.preview-color1').style.background = `linear-gradient(${this.paramValue.v_EnumValue.deg}deg,${this.paramValue.v_EnumValue.color1} 0%,${val} 100%)`
      } else {
        document.querySelector('.preview-color1').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue.color2) {
        document.querySelector('.preview-color1').style.background = `${this.paramValue.v_EnumValue.color1}`
      }
      if (!this.paramValue.v_EnumValue.color1 && !this.paramValue.v_EnumValue.color2) {
        document.querySelector('.preview-color1').style.background = 'none'
        this.iconFlag1 = true
      }
    },
    changeColor3 (val) {
      this.formRed = true
      document.querySelector('.preview-color1').style.background = `linear-gradient(${val}deg,${this.paramValue.v_EnumValue.color1} 0%,${this.paramValue.v_EnumValue.color2} 100%)`
    },
    changeColor4 (val) {
      this.iconFlag2 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue1.color2) {
        if (!this.paramValue.v_EnumValue1.deg) {
          this.paramValue.v_EnumValue1.deg = 0
        }
        document.querySelector('.preview-color2').style.background = `linear-gradient(${this.paramValue.v_EnumValue1.deg}deg,${val} 0%,${this.paramValue.v_EnumValue1.color2} 100%)`
      } else {
        document.querySelector('.preview-color2').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue1.color1) {
        document.querySelector('.preview-color2').style.background = `${this.paramValue.v_EnumValue1.color2}`
      }
      if (!this.paramValue.v_EnumValue1.color1 && !this.paramValue.v_EnumValue1.color2) {
        document.querySelector('.preview-color2').style.background = 'none'
        this.iconFlag2 = true
      }
    },
    changeColor5 (val) {
      this.iconFlag1 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue1.color1) {
        if (!this.paramValue.v_EnumValue1.deg) {
          this.paramValue.v_EnumValue1.deg = 0
        }
        document.querySelector('.preview-color2').style.background = `linear-gradient(${this.paramValue.v_EnumValue1.deg}deg,${this.paramValue.v_EnumValue1.color1} 0%,${val} 100%)`
      } else {
        document.querySelector('.preview-color2').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue1.color2) {
        document.querySelector('.preview-color2').style.background = `${this.paramValue.v_EnumValue1.color1}`
      }
      if (!this.paramValue.v_EnumValue1.color1 && !this.paramValue.v_EnumValue1.color2) {
        document.querySelector('.preview-color2').style.background = 'none'
        this.iconFlag2 = true
      }
    },
    changeColor6 (val) {
      this.formRed = true
      document.querySelector('.preview-color2').style.background = `linear-gradient(${val}deg,${this.paramValue.v_EnumValue1.color1} 0%,${this.paramValue.v_EnumValue1.color2} 100%)`
    },
    changeColor7 (val) {
      this.iconFlag3 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue2.color2) {
        if (!this.paramValue.v_EnumValue2.deg) {
          this.paramValue.v_EnumValue2.deg = 0
        }
        document.querySelector('.preview-color3').style.background = `linear-gradient(${this.paramValue.v_EnumValue2.deg}deg,${val} 0%,${this.paramValue.v_EnumValue2.color2} 100%)`
      } else {
        document.querySelector('.preview-color3').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue2.color1) {
        document.querySelector('.preview-color3').style.background = `${this.paramValue.v_EnumValue2.color2}`
      }
      if (!this.paramValue.v_EnumValue2.color1 && !this.paramValue.v_EnumValue2.color2) {
        document.querySelector('.preview-color3').style.background = 'none'
        this.iconFlag3 = true
      }
    },
    changeColor8 (val) {
      this.iconFlag3 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue2.color1) {
        if (!this.paramValue.v_EnumValue2.deg) {
          this.paramValue.v_EnumValue2.deg = 0
        }
        document.querySelector('.preview-color3').style.background = `linear-gradient(${this.paramValue.v_EnumValue2.deg}deg,${this.paramValue.v_EnumValue2.color1} 0%,${val} 100%)`
      } else {
        document.querySelector('.preview-color3').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue2.color2) {
        document.querySelector('.preview-color3').style.background = `${this.paramValue.v_EnumValue2.color1}`
      }
      if (!this.paramValue.v_EnumValue2.color1 && !this.paramValue.v_EnumValue2.color2) {
        document.querySelector('.preview-color3').style.background = 'none'
        this.iconFlag3 = true
      }
    },
    changeColor9 (val) {
      this.formRed = true
      document.querySelector('.preview-color3').style.background = `linear-gradient(${val}deg,${this.paramValue.v_EnumValue2.color1} 0%,${this.paramValue.v_EnumValue2.color2} 100%)`
    },
    changeColor10 (val) {
      this.iconFlag4 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue3.color2) {
        if (!this.paramValue.v_EnumValue3.deg) {
          this.paramValue.v_EnumValue3.deg = 0
        }
        document.querySelector('.preview-color4').style.background = `linear-gradient(${this.paramValue.v_EnumValue3.deg}deg,${val} 0%,${this.paramValue.v_EnumValue3.color2} 100%)`
      } else {
        document.querySelector('.preview-color4').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue3.color1) {
        document.querySelector('.preview-color4').style.background = `${this.paramValue.v_EnumValue3.color2}`
      }
      if (!this.paramValue.v_EnumValue3.color1 && !this.paramValue.v_EnumValue3.color2) {
        document.querySelector('.preview-color4').style.background = 'none'
        this.iconFlag4 = true
      }
    },
    changeColor11 (val) {
      this.iconFlag4 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue3.color1) {
        if (!this.paramValue.v_EnumValue3.deg) {
          this.paramValue.v_EnumValue3.deg = 0
        }
        document.querySelector('.preview-color4').style.background = `linear-gradient(${this.paramValue.v_EnumValue3.deg}deg,${this.paramValue.v_EnumValue3.color1} 0%,${val} 100%)`
      } else {
        document.querySelector('.preview-color4').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue3.color2) {
        document.querySelector('.preview-color4').style.background = `${this.paramValue.v_EnumValue3.color1}`
      }
      if (!this.paramValue.v_EnumValue3.color1 && !this.paramValue.v_EnumValue3.color2) {
        document.querySelector('.preview-color4').style.background = 'none'
        this.iconFlag4 = true
      }
    },
    changeColor12 (val) {
      this.formRed = true
      document.querySelector('.preview-color4').style.background = `linear-gradient(${val}deg,${this.paramValue.v_EnumValue3.color1} 0%,${this.paramValue.v_EnumValue3.color2} 100%)`
    },
    changeColor13 (val) {
      this.iconFlag5 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue4.color2) {
        if (!this.paramValue.v_EnumValue4.deg) {
          this.paramValue.v_EnumValue4.deg = 0
        }
        document.querySelector('.preview-color5').style.background = `linear-gradient(${this.paramValue.v_EnumValue4.deg}deg,${val} 0%,${this.paramValue.v_EnumValue4.color2} 100%)`
      } else {
        document.querySelector('.preview-color5').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue4.color1) {
        document.querySelector('.preview-color5').style.background = `${this.paramValue.v_EnumValue4.color2}`
      }
      if (!this.paramValue.v_EnumValue4.color1 && !this.paramValue.v_EnumValue4.color2) {
        document.querySelector('.preview-color5').style.background = 'none'
        this.iconFlag5 = true
      }
    },
    changeColor14 (val) {
      this.iconFlag5 = false
      this.formRed = true
      if (this.paramValue.v_EnumValue4.color1) {
        if (!this.paramValue.v_EnumValue4.deg) {
          this.paramValue.v_EnumValue4.deg = 0
        }
        document.querySelector('.preview-color5').style.background = `linear-gradient(${this.paramValue.v_EnumValue4.deg}deg,${this.paramValue.v_EnumValue4.color1} 0%,${val} 100%)`
      } else {
        document.querySelector('.preview-color5').style.background = `${val}`
      }
      if (!this.paramValue.v_EnumValue4.color2) {
        document.querySelector('.preview-color5').style.background = `${this.paramValue.v_EnumValue4.color1}`
      }
      if (!this.paramValue.v_EnumValue4.color1 && !this.paramValue.v_EnumValue4.color2) {
        document.querySelector('.preview-color5').style.background = 'none'
        this.iconFlag5 = true
      }
    },
    changeColor15 (val) {
      this.formRed = true
      document.querySelector('.preview-color5').style.background = `linear-gradient(${val}deg,${this.paramValue.v_EnumValue4.color1} 0%,${this.paramValue.v_EnumValue4.color2} 100%)`
    }
  }
}
