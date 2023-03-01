const config = {
  url: {
    save: "http://39.108.114.45:3001/saveprdata/",
    getuserinfo: "http://39.108.114.45:3001/gettoken/",
  },

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
