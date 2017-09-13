// splash.js
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 5,
    splash:false

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    countdown(that)
   
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index',
      })
    }, 5000)
   
  },
})