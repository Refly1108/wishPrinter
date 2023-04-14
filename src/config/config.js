const config = {
  url: {
    save: "https://zhiliaodev.htcangelfund.com/service/setWish",
    getuserinfo: "https://zhiliaodev.htcangelfund.com/getNickname?code=",
    getAddress:"http://175.178.13.221/spring/hello/getAddress?",
    getSignature: "http://175.178.13.221/spring/hello/getSignature",
    saveAddress: "http://175.178.13.221/spring/hello/saveAddress?",
  },

  url_dev: {
    save: "http://175.178.13.221/service/setWish",
    getuserinfo: "http://175.178.13.221/service/getNickname?code=",
    getAddress:"http://175.178.13.221/spring/hello/getAddress?",
    getSignature: "http://175.178.13.221/spring/hello/getSignature",
    saveAddress: "http://175.178.13.221/spring/hello/saveAddress?",
  },
  // url: {
  //   save: "http://39.108.114.45:80/service/setWish",
  //   getuserinfo: "http://39.108.114.45:80/service/getNickname?code=",
  // },


  wxurl: {
    userinfo: "/test/sns/userinfo?",
  },

  pics: {
    headers: { width: 597, height: 532 },
    boot: { width: 598, height: 578 },
  },

  pages: {
    home: "home",
    printList: "printList",
    input: "input",
    welcome: "welcome",
    success: "success",
    failed: "failed",
  },
};

export default config;
