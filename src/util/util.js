
import wishs from "../config/wishs";

export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

  var r = window.location.search.substr(1).match(reg);
  //console.log(r);
  if (r != null) {
    return unescape(r[2]);
  }

  return null;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomWish = (min, max) => {
 // let lan = getRandomInt(0, 1);
  let wish;
  // if (lan == 1) {
  //   wish = wishs.en[getRandomInt(0, 49)];
  // } else {
  //   wish = wishs.zh[getRandomInt(0, 49)];
  // }
  wish = wishs.en[getRandomInt(0, 34)];
  return wish;
};


export const getWishArray = (str) => {
  let array = [];
  let cut = 10;
  let string = str;
  let temp = "";

  if (checkChinese(str)) {
    array = str.split("，");
   // console.log("getWishArray");
  //  console.log(array.length);
    if (array.length < 2) {
      array = splitBylength(str);
    }
  } else {
    array = str.split(",");
    if (array.length < 2) {
      array = splitByblack(str);
    }
  }

  console.log(array);
  return array;
};

export const splitBylength = (str) => {
  let array = [];
  let cut = 10;
  let string = str;
  let temp = "";
 // console.log("splitBylength in");
 // console.log(string.length);
 // console.log(string);
  if (string.length <= cut) {
    array.push(string);
  } else {
    while (string.length > cut) {
      console.log(string);
      // temp = subWish(string, cut * 2);
      temp = string.substr(0, cut);
      string = string.substr(temp.length, string.length);
      array.push(temp);
      if (string.length <= cut) {
        array.push(string);
        break;
      }
    }
  }
 // console.log(array[0]);
 // console.log("splitBylength out");
  return array;
};

export const splitByblack = (str) => {
  let array = [];
  let array2 = [];
  array = str.split(" ");
  //console.log(array);
  for (let index = 0; index < array.length; index = index + 6) {
    let temp = "";
    for (
      let index2 = 0;
      index2 < 6 && index2 + index < array.length;
      index2++
    ) {
      temp += array[index2 + index] + " ";
    }
    array2.push(temp);
    // if (index + 6 >= array.length) {
    //   for (let index2 = index + 6; index2 < array.length; index2++) {
    //     temp += array[index2] + " ";
    //   }
    //   array2.push(temp);
    //   break;
    // }
  }

  return array2;
};

export const checkChinese = (val) => {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
};

export const getparams = (url, key) => {
  let str = url;
  let param = "";
 // console.log(url);
 // console.log(key);
  param = str.substring(str.indexOf(key) + key.length + 1);
  if (param.indexOf("&") > -1) {
    param = param.substring(0, param.indexOf("&"));
  }
 // console.log(param);
  return param;
};
export const isEmpty = (str) => {
  if(str==undefined||str==null||str===""){
    return true;
  }
  return false;
};

