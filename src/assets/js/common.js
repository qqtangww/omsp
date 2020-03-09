// 水平方向
let dragWays = (btn, leftBox, rightBox, dadBox, bodyBox) => {
  btn.onmousedown = (e) => {
    let widthX = e.clientX
    // 获取左边盒子的宽度
    let leftBoxWidth = leftBox.offsetWidth
    // 右边盒子的宽度
    let rightBoxWidth = rightBox.offsetWidth
    // 左右的父盒子的宽度
    let dadBoxWidth = dadBox.offsetWidth
    // 拖动时  禁止选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return false
    }
    document.onmousemove = function (e) {
      e.preventDefault()
      // 判断鼠标移动的方向 向左/向右
      if (leftBoxWidth < e.clientX) {
        // 计算鼠标移动的距离
        let leftX = widthX - e.clientX
        // 左边盒子的宽设置
        leftBox.style.width = (leftBoxWidth - leftX) / dadBoxWidth * 100 + '%'
        // 右边盒子的宽度设置
        rightBox.style.width = (rightBoxWidth + leftX) / dadBoxWidth * 100 + '%'
      } else {
        // 计算鼠标向右移动的距离
        let rightX = e.clientX - widthX
        // 设置左边盒子的宽度
        leftBox.style.width = (leftBoxWidth + rightX) / dadBoxWidth * 100 + '%'
        // 设置右边盒子的宽度
        rightBox.style.width = (rightBoxWidth - rightX) / dadBoxWidth * 100 + '%'
      }
    }
  }
  document.onmouseup = function (e) {
    document.onmousemove = null
    // 拖动结束后是的文字可以选中
    document.body.onselectstart = document.body.ondrag = function () {
      return true
    }
  }
}

let dargUpAndDown = (btnTop, topBox, bottomBox, dadBox, tableHeight) => {
  btnTop.onmousedown = (e) => {
    let topBoxHeight = topBox.offsetHeight
    let bottomBoxHeight = bottomBox.offsetHeight
    let dadBoxHeight = dadBox.offsetHeight
    let heightY = e.clientY
    // console.log(bottomBoxHeight)

    // 拖动时  禁止选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return false
    }
    document.onmousemove = (e) => {
      e.preventDefault()
      if (topBoxHeight < e.clientY) {
        let TopY = heightY - e.clientY
        topBox.style.height = (topBoxHeight - TopY) / dadBoxHeight * 100 + '%'
        bottomBox.style.height = (bottomBoxHeight + TopY) / dadBoxHeight * 100 + '%'
        // if (bottomBoxHeight > 280) {
        //   tableHeight.style.height = bottomBoxHeight + TopY - 170 + 'px'
        // } else {
        tableHeight.style.height = bottomBoxHeight + TopY - 150 + 'px'
        // }
        if (bottomBox.style.height <= '2%') {
          btnTop.style.position = 'relative'
          btnTop.style.bottom = '0'
        }
      } else if (topBoxHeight > e.clientY) {
        let bottomY = e.clientY - heightY
        topBox.style.height = (topBoxHeight + bottomY) / dadBoxHeight * 100 + '%'
        bottomBox.style.height = (bottomBoxHeight - bottomY) / dadBoxHeight * 100 + '%'
        tableHeight.style.height = bottomBoxHeight + bottomY + 360 + 'px'
        if (topBox.style.height > '100%') {
          btnTop.style.position = 'relative'
          btnTop.style.bottom = '0'
        }
      }
    }
  }
  document.onmouseup = function (e) {
    document.onmousemove = null
    // 拖动结束后是的文字可以选中
    document.body.onselectstart = document.body.ondrag = function () {
      return true
    }
  }
}

let adaptiveHeight = (topBoxHeight, historyHeight, toolsHeight, pagingHeight, tableHeight, serachHeight) => {
  let sunHeight = topBoxHeight + historyHeight + toolsHeight + pagingHeight + serachHeight + 10
  tableHeight.style.height = 'calc(100vh - ' + sunHeight + 'px)'
}

export default {
  dragWays,
  dargUpAndDown,
  adaptiveHeight
}
