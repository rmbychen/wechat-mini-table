const defaultWidth= 200
const animationTime = 300
Component({
  relations:{
    '../table-item/index':{
      type: 'child'
    }
  },
  properties: {
    propData: {
      type: Array,
      value: []
    },
    propRow:{
      type:Boolean,
      value:false
    }
  },
  observers: {
    propRow() {
      this.setChildData('_changeRow', this.data.propRow)
      this.changeWidth()
      const animation = this.animation
      if (animation){
        this.animationScale(animation)
      }
    },
    propData(value) {
      this._getAllLi();
      this.changeWidth()
    }
  },
  data:{
    animationData: {}
  },
  ready(){
    const animation = wx.createAnimation({
      duration: animationTime,
      timingFunction: 'ease-out',
    })
    this.animation = animation
    this.animationScale(animation)
    this._getAllLi()
    this.windowWidth = wx.getSystemInfoSync().windowWidth
  },
  methods: {
    /**
     * 填充子组件数据
     */
    _getAllLi() {
      const nodes = this.getRelationNodes('../table-item/index')
      const temp = [...this.data.propData]
      nodes.forEach(item=>{
        const prop = item.data.prop
        const childData = temp.map(item2=> {
          return item2[prop]
        })
        item._setArrayData(childData)
      })
    },
    /**
     * 改变子组件数据
     */
    setChildData(fun,value){
      const nodes = this.getRelationNodes('../table-item/index')
      nodes.forEach(item => {
        item[fun](value)
      })
    },
    /**
     * 表格宽度自适应
     */
    changeWidth(){ 
      const rowFlag = this.data.propRow
      const num = this.data.propData.length;
      const width = rowFlag ? defaultWidth : (num > 2 ? defaultWidth : 750/(num+1))
      this.setChildData('_setWidth', width)
    },
    animationScale(animation){
      animation.scale(0).step()
      this.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        animation.scale(1).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), animationTime)
    }
  }
})