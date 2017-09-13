// importer.js
var app = getApp();
var url = require('../../utils/url.js')
var last_page = 5;
var loadMore = function (that) {
  var page = 1
  that.setData({
    hidden: false
  });
  if (page < last_page || page == last_page) {
    wx.request({
      url: "https://" +url.URl+ "/api/nav_goods",
      data: { page: page },
      success: function (res) {
        console.log(res.data.data.data)
        var data = res.data.data.data
        var length = res.data.data.data.length;
        last_page = res.data.data.last_page
        var list = [];
        for (var i = 0; i < length; i++) {
          list.push(data[i]);
          that.setData({
            details: list
          });
        }
        page++;
        that.setData({
          hidden: true
        });
      }
    });
  }

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skill:false,
    sign: '￥',
    hidden: false,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    nodes: [{
      name: 'hr',
      attrs: {
        class: 'hr_class',  
        style: 'line-height: 60px;border-bottom:1rpx solid #a19e9e;'
      }
    }],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options.id);
    var page = 1;
    var gcate_id = options.id
    
    var that = this;
    wx.request({
      url: "https://" + url.URl + "/api/nav_goods",
      data: { page: page, nav_id: gcate_id},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data.data,
          hidden: true
        })
        
      }
    })  


  },

  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------')
    　　wx.showNavigationBarLoading() //在标题栏中显示加载
    　　wx.request({
        url: "https://" + url.URl + "/api/nav_goods",
      data: {},
      method: 'GET',
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    loadMore(that)
    this.setData({
      skill:true
    })
  },


})