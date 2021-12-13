export default {
  pages: [
    'pages/inviting/inviting',
    'pages/navigation/navigation',
    'pages/messages/messages',
    'pages/usercenter/usercenter',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },


  tabBar: {
    color: "#7F8389",
    selectedColor: "#ff4c91",
    borderStyle: "black" ,
    backgroundColor: '#ffffff',
    list: [{
      selectedIconPath: "./assets/tab/inviting_selected.png",
      iconPath: "./assets/tab/inviting.png",
      pagePath: "pages/inviting/inviting",
      text: "邀请函"
    }, {
      selectedIconPath: "./assets/tab/navigation_selected.png",
      iconPath: "./assets/tab/navigation.png",
      pagePath: "pages/navigation/navigation",
      text: "导航"
    },{
      selectedIconPath: "./assets/tab/messages_selected.png",
      iconPath: "./assets/tab/messages.png",
      pagePath: "pages/messages/messages",
      text: "祝福"
    },{
      selectedIconPath: "./assets/tab/usercenter_selected.png",
      iconPath: "./assets/tab/usercenter.png",
      pagePath: "pages/usercenter/usercenter",
      text: "我的"
    }
    ],
  }
}
