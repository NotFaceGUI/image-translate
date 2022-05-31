// pages/settingPage/settingPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transateAppid: "",
    transatepassword: "",
    imageAppid: "",
    imagePassword: "",
    imageVisible: false,
    textVisible: false,
    dialogVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      transateAppid: app.globalData.transateAppid,
      transatepassword: app.globalData.transatepassword,
      imageAppid: app.globalData.imageAppid,
      imagePassword: app.globalData.imagePassword
    })

    console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  inputBlur(e) {
    var name = e.target.id;
    var value = e.detail.value;


    
    switch (name) {
      case "transateAppid":
        app.globalData.transateAppid = value;
        this.setData({
          transateAppid: value
        });
        break;
      case "transatepassword":
        app.globalData.transatepassword = value;
        this.setData({
          transatepassword: value
        });
        break;
      case "imageAppid":
        app.globalData.imageAppid = value;
        this.setData({
          imageAppid: value
        });
        break;
      case "imagePassword":
        app.globalData.imagePassword = value;
        this.setData({
          imagePassword: value
        });
        break;
    }
  },

  save() {
    this.setData({
      dialogVisible: true
    })
  },

  close() {
    this.setData({
      imageVisible: false
    })
    this.setData({
      textVisible: false
    })
  },

  translatePlatform() {
    this.setData({
      textVisible: true
    })
  },

  imagePlatform() {
    this.setData({
      imageVisible: true
    })
  },

  confirmHandle() {
    this.setData({
      dialogVisible: false
    })
  }
})