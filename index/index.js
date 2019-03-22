Page({

  /**
   * 页面的初始数据
   */
  data: {
    tree: {},
    row: false
  },
  /**
   * 生命周期函数--监听页面显示
   * 
   */
  onShow: function () {
    setTimeout(() => {
      this.setData({
        tree: {
          name: '英语',
          children: [{
            grade: '一年级',
            new_record: '10',
            add_record: '20',
            old_record: '3'

          }, {
            grade: '二年级',
            new_record: '7',
            add_record: '6',
            old_record: '5'
          }]
        }
      })
    }, 1000)
    setTimeout(() => {
      this.setData({
        tree: {
          name: '数学',
          children: [{
            grade: '三年级',
            new_record: '9',
            add_record: '5',
            old_record: '3'
          }]
        }
      })
    }, 3000)

  },
  toggleClass() {
    this.setData({
      row: !this.data.row
    })
  }
})