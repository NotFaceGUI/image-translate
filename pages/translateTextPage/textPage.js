// pages/translateTextPage/textPage.js
import {
  MD5
} from "../../utils/util";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        value: "cht"
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
        value: "cht"
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
    queryString: "",
    resultString: "",
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

  translate() {
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
      success: (res) => {
        console.log(res);
        this.setData({
          resultString: ""
        })
        var dst = "";
        if (res.data.trans_result != undefined) {
          for (let i = 0; i < res.data.trans_result.length; i++) {
            const element = res.data.trans_result[i];
            dst += element.dst;
            if (i != res.data.trans_result.length) {
              dst += "\n";
            }
          }
          this.setData({
            resultString: dst
          })
        }

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
})