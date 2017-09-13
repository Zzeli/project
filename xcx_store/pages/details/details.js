// details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      "../../images/details-bg.png",
      "../../images/details-bg.png",
      "../../images/details-bg.png"
    ],
    goods: [{ id: 1, details: '短身金头蓝底过背金龙 24-25公分 翡翠蓝底', price: '54420.00', stock: '2', carriage: '包邮', market:'64000.00'}

    ],
    cartTatol:0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    nodes: [{
      name: 'hr',
      attrs: {
        class: 'hr_class',
        style: 'line-height: 60px;border-bottom:1rpx solid #c1c3c6;'
      }
    }],
    describe: [{ title: '商品介绍', matter:'品名：武吉美拉 短身蓝底金头过背  鱼只详细：短身鱼，翡翠蓝底色细框，头金85%以上，第六排全过，满珠鳞，24-25公分左右，不兜不掉右边掉了一块鳞片，可以重长，产地武吉美拉，芯片证书齐全。'}],
    display: [{ id: 1, img: '../../images/details3.png' }, { id: 2, img: '../../images/details3.png' }, { id: 3, img: '../../images/details3.png' }, { id: 4, img: '../../images/details3.png' }]
  
  },

  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  addCar:function(){
    var cartTatol=this.data.cartTatol+=1;
    console.log(cartTatol);
    this.setData({
      cartTatol: cartTatol
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
    var that=this
    var gcate_id = options.id
    wx.request({
      url: 'https://xcx.ihuanyan.cn/api/goods_details',
      data: {gcate_id: gcate_id },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          // imgUrls: res.data.data
        })
      }
    }) 
  
  },

 
})