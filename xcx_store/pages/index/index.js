//index.js
//获取应用实例
var app = getApp()
var last_page = 5;
var url = require('../../utils/url.js')


// 请求数据

var loadMore = function (that) {
  var page = 1;
  that.setData({
    hidden: false
  });

  if (page < last_page || page == last_page){
    wx.request({
      url: "https://" +url.URl+"/api/index_goods",
      data: { page: page},
      success: function (res) {
        console.log(res.data.data.data)
        var data = res.data.data.data
        var length = res.data.data.data.length;
        last_page = res.data.data.last_page
        console.log(last_page)
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
    hidden:false,
    splash:false,
    skill:false,
    phone: '',
    active:0,
    second:5,
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    nav:[],
    index_ads: [],
    sign: '￥',
    details: [],
    nodes: [{
      name: 'hr',
      attrs: {
        class: 'hr_class',
        style: 'line-height: 60px;'
      }
    }],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://" +url.URl+"/api/index", 
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data.nav)
        that.setData({
          banner: res.data.data.banner,
          nav:res.data.data.nav,
          index_ads: res.data.data.index_ads,
          hidden:true
        })
      }
    })
    loadMore(that);    
  },

  optionClick:function(e){
      

    wx.navigateTo({
      url: "/pages/importer/importer?id=" + e.currentTarget.dataset.id,
      success: function (res) {
      }
    })
  },
  alone:function(e){
    if (e.currentTarget.dataset.id==9){
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          wx.request({
            url: "https://" +url.URl+"/api/company",
            data: {},
            method: 'get',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.data)
              var lat = parseFloat(res.data.data.location.lat)
              console.log(res.data.data.location.lat)
              console.log(lat)
              var lng = parseFloat(res.data.data.location.lng)
              var address = res.data.data.seller_address
              var name = res.data.data.seller_company
              wx.openLocation({
                latitude: lat,
                longitude: lng,
                scale: 0,
                name: name,
                address: address
              })
            }
          });
        }
      });
    }
    if (e.currentTarget.dataset.id == 8) {
      var that=this;
      wx.request({
        url: "https://" + url.URl + "/api/company",
        data: {},
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var phone = res.data.data.seller_phone
          console.log(phone)
          that.setData({
            phone: res.data.data.seller_phone
          })
        }
      })
      this.setData({
        active: 1
      })
    }
   
  },
  onPullDownRefresh: function () {
    var that = this;
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: "https://" +url.URl+"/api/index",
      data: {},
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

  deselect: function () {
    console.log(3);
    this.setData({
      active: ''

    })
  },

  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  callmeTap: function (){
     var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },

 
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {  
    var that=this;
    loadMore(that)
    this.setData({
      skill: true
    })
  }

})