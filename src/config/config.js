const config = {
  url: {
    save: "https://zhiliaodev.htcangelfund.com/service/setWish",
    getuserinfo: "https://zhiliaodev.htcangelfund.com/service/getNickname?code=",
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
