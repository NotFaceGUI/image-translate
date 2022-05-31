import {
  MD5
} from "../../utils/util";
const app = getApp();

// pages/translatePage/translatePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "",
    currentImage: "",
    setSourceIndex: 0,
    setTargetIndex: 0,
    sourceArr: [{
        id: 1,
        label: '简体中文',
        value: "zh"
      },
      {
        id: 2,
        label: '繁体中文',
        value: "zh"
      },
      {
        id: 3,
        label: '英文',
        value: "en"
      },
      {
        id: 4,
        label: '日语',
        value: "jp"
      }
    ],
    targetArr: [{
        id: 1,
        label: '简体中文',
        value: "zh"
      },
      {
        id: 2,
        label: '繁体中文',
        value: "zh"
      },
      {
        id: 3,
        label: '英文',
        value: "en"
      },
      {
        id: 4,
        label: '日语',
        value: "jp"
      }
    ],
    queryString: '需要翻译的',
    access_token: ''
  },

  bindPickerChange(e) {
    console.log("e", e);
    this.setData({
      setSourceIndex: parseInt(e.detail.value)
    })
  },

  bindPickerChange2(e) {
    console.log("e", e);
    this.setData({
      setTargetIndex: parseInt(e.detail.value)
    })
  },

  imageTranslate(file) {
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/sdk/picture',
      method: "POST",
      data: {
        from: this.data.sourceArr[this.data.setSourceIndex].value, //需要翻译的
        to: this.data.targetArr[this.data.setTargetIndex].value, //翻译为
        appid,
        salt,
        cuid,
        mac,
        sign,
        files: {
          image: file
        },
      },
      header: {
        contentType: 'multipart/form-data',
      },
      success: function (data) {
        console.log(data);
      }
    })
  },

  readImage() {
    var str = ""
    // 读取相册，将其转换成base64
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var that = this;
        var filePath = res.tempFilePaths[0]
        this.setData({
          currentImage: filePath
        })
        var file = wx.getFileSystemManager().readFileSync(filePath, "base64");
        var ocrURL = "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=" + this.data.access_token;
        wx.request({
          url: ocrURL,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "post",
          data: "image=" + encodeURIComponent(file),
          success: (res) => {
            console.log(res);
            for (let i = 1; i <= res.data.words_result_num; i++) {
              if (i != res.words_result_num) {
                str += res.data.words_result[i - 1].words + "\n"
              } else {
                str += res.data.words_result[i - 1].words;
              }
            }
            console.log(str)
            this.setData({
              imageUrl: str
            })
          }
        })
      },
      fail: (res) => {
        this.setData({
          imageUrl: "error"
        })
        console.log(res);
      }
    })


  },

  textTranslate() {
    var salt = (new Date).getTime();
    var appid = app.globalData.transateAppid;
    var key = app.globalData.transatepassword;
    var sign = MD5(appid + this.data.queryString + salt + key)

    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q: this.data.queryString, //输入文本
        from: this.data.sourceArr[this.data.setSourceIndex].value, //需要翻译的
        to: this.data.targetArr[this.data.setTargetIndex].value, //翻译为
        appid: appid,
        salt: salt,
        sign: sign //拼接 MD5进行加密
      },
      success(res) {
        console.log(res);
      },
      fail() {
        reject({
          status: 'error',
          msg: '翻译失败'
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  setting() {
    wx.navigateTo({
      "url": "/pages/settingPage/settingPage"
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {



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

  }
})