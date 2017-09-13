// classify.js
var app = getApp();
var url = require('../../utils/url.js')
var page = 1;
var loadMore = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: "https://" + url.URl + "/api/classification",
    data: { page: page, },
    success: function (res) {
      console.log(res.data.data)
      var data = res.data.data
      var length = res.data.data.length;
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skill:false,
    inputShowed: false,
    inputVal: "",
    active:1, 
    hidden: false,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    searchList:[{id:1,name:'龙鱼'}, { id: 2, name: '虎鱼' }, { id: 3, name: '虎鱼' }, { id: 4, name: '虎鱼' }, { id: 5, name: '虎鱼' }, { id: 6, name: '虎鱼' }]
  
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      active:2
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      active:1
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://" + url.URl + "/api/classification",
      data: { page: page },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = res.data.data
        // var perpage=res.data.data
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              list: list,
              hidden:true
            });
          }
        });
   
      }
    }) 
  
  },
  onPullDownRefresh: function () {
    var that = this;
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: "https://" + url.URl + "/api/classification",
      data: { page: page },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data,
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    }) 
  },
  hotSearch:function(hot){
     this.setData({
       inputVal:hot
     })
  },
  hot:function(e){
    console.log(e.currentTarget.dataset.text);
    this.hotSearch(e.currentTarget.dataset.text);
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    loadMore(that)
    that.setData({
      skill: true
    })
  }
})