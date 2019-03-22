Component({
  relations: {
    '../table/index': {
      type: 'parent'
    }
  },
  properties:{
    prop:{
      type: String,
      value: ''
    },
    label:{
      type: String,
      value: ''
    }
  },
  ready(){
    this.windowWidth = wx.getSystemInfoSync().windowWidth
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.width(this.rpxToPx(this.data.width)).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.width(this.rpxToPx(this.data.width)).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
  },
  methods: {
    _changeRow(row){
      this.setData({
        row
      })
    },
    _setArrayData(resultData){
      console.log("resultData", resultData)
      this.setData({
        resultData
      })
    },
    _setWidth(width){
      this.setData({
        width
      })
      if (!this.animation){return;}
      this.animation.width(this.rpxToPx(width)).step()
      this.setData({
        animationData: this.animation.export()
      })
    },
    rpxToPx(data){
      return data / 750 *this.windowWidth
    }
  },
  data:{
    resultData:[],
    row:false,
    width: 200
  }
})