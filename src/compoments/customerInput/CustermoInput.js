import React, { useContext, useState, useEffect, useRef } from "react";
import { PageRouterContext } from "../../App";
import ChatGPT from "../ChatGPT";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
} from "@material-ui/core";
import "./CustomerInput.css";
import Closebtn from "../../resource/CloseBtn.png";
import leaf from "../../resource/leaf.PNG";
import logo from "../../resource/logo1.0.png";
import config from "../../config/config";
import { postToServer } from "../../fetch/index";
import { saveAddress } from "../../fetch/weixin";
import { getQueryString } from "../../util/util";
import { getRandomWish, isEmpty } from "../../util/util";
import wishs from "../../config/wishs";
export default function CustermoInput(props) {
  const [text, setText] = useState("");
  const [process, setProcess] = useState(false);
  const [name, setName] = useState("");
  const changeRoute = useContext(PageRouterContext);
  // jay for ui display
  const [displayMask, setDisplayMask] = useState(false);
  const [displayPrintFirst, setDisplayPrintFirst] = useState(false);
  const [displayPrintSecond, setDisplayPrintSecond] = useState(false);
  const [displayPrintThird, setDisplayPrintThird] = useState(false);
  //Refly faild pop
  const [displayPrintFailed, setDisplayPrintFailed] = useState(false);
  const [displayInputPop, setDisplayInputPop] = useState(false);
  const [popWording, setPopWording] = useState('please input your name and thoughts');
  //Add for chatGPT
  
  const [displayPrintForth, setDisplayPrintForth] = useState(false);
  const [ChatGPTdata, setChatGPTData] = useState();
  const selectedData = "祝福你的人生充满爱、和平和幸福！";

  //提醒弹框出现后，点击页面任何位置，弹框消失
  const inputPopRef = useRef(null); // 创建一个 ref
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputPopRef.current && !inputPopRef.current.contains(event.target)) {
        closeInputPop();
      }
    }

    // 给 document 添加点击事件监听器
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 在组件卸载时移除点击事件监听器
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //字数统计
  // const [inputWishValue, setInputWishValue] = useState('');
  const MAX_LENGTH = 100;//70->100
  const MAX_NAME_LENGTH = 24;
  const inputWish = (event) => {
    let newText = event.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
    }
    console.log(newText);
  };
  function countLength(text) {
    // 计算字符长度，其中一个中文字符算两个字符
    return text.replace(/[^\x00-\xff]/g, "aa").length;
  }
  const inputName = (event) => {
    //console.log(event);
    let newName = event.target.value;
    let length = countLength(newName);
    // if (newName.length <= MAX_NAME_LENGTH) {
    //   setName(newName);
    // }
    if (length <= MAX_NAME_LENGTH) {
      setName(newName);
    }

    //setName(event.target.value);
    //setName(props.username);
    props.setUsername(event.target.value);
  };
  //ChatGPT
  const ChatGPTSelect = () => {
    let wish = getRandomWish();
    setChatGPTData(wish);
    setText(wish);
    return <ChatGPTDiv selectedData={selectedData} />;
  };

  //Cancel to use ChatGPT
  const ChatGPTCancel = () => {
    let wish = getRandomWish();
    setChatGPTData(wish);
    //setText(wish);
    setText("");
    return <ChatGPTDiv selectedData={selectedData} />;
  };
  const ChatGPTDiv = (props) => {
    return <div>{props.selectedData}</div>;
  };

  const CloseButton = (props) => {
    return (
      <button className="close-button" onClick={props.onClick}>
        <img src={Closebtn} alt="Close_button" />
      </button>
    );
  };
  const checkingInput = () => {
    let result = false;
    if (isEmpty(name) || isEmpty(text)) {
      if(isEmpty(name) && isEmpty(text)){
       setPopWording('please input your name and thoughts');
      }else if (isEmpty(name)){
        setPopWording('please input your name');

      }else{
        setPopWording('please share your thoughts');
      }
      result = true;
    }
    return result;
  };

  const printWish = () => {
    if (checkingInput()) {
      console.log("can not be null");
      inputCheckPop();
    } else {
      setDisplayMask(true);
      setDisplayPrintFirst(true);
      setDisplayPrintSecond(false);
      setDisplayPrintThird(false);
      //打印逻辑
      setDisplayPrintForth(false);
      setDisplayPrintFailed(false);
    }
  };

  const printingWish = async () => {
    setDisplayMask(true);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(true);
    setDisplayPrintThird(false);
    // 打印中，跳转暂时设置5秒
    setDisplayPrintForth(false);
    setDisplayPrintFailed(false);
    await submit(1);
  };
  const printingWish2 = async () => {
    setDisplayMask(true);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(true);
    setDisplayPrintThird(false);
    // 打印中，跳转暂时设置5秒
    setDisplayPrintForth(false);
    setDisplayPrintFailed(false);
    await submit(2);
  };

  const finishPrintingWish = () => {
    setDisplayMask(true);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(false);
    setDisplayPrintThird(true);
    setDisplayPrintForth(false);
    setDisplayPrintFailed(false);
  };

  const closePrinting = () => {
    setDisplayMask(false);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(false);
    setDisplayPrintThird(false);
    setDisplayPrintForth(false);
    setDisplayPrintFailed(false);
    //打印逻辑
  };

  const cancelPrinting = () => {
    setDisplayMask(false);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(false);
    setDisplayPrintThird(false);
    setDisplayPrintForth(false);
    setDisplayPrintFailed(false);
    ChatGPTCancel();
    //打印逻辑
  };
  const ChatGPTPrint = () => {
    setDisplayMask(true);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(false);
    setDisplayPrintThird(false);
    setDisplayPrintForth(true);
    setDisplayPrintFailed(false);
    ChatGPTSelect();
    //setChatGPTData(selectedData);
    //打印逻辑
  };

  //jay

  const failedPrinting = () => {
    setDisplayMask(true);
    setDisplayPrintFirst(false);
    setDisplayPrintSecond(false);
    setDisplayPrintThird(false);
    setDisplayPrintForth(false);
    setDisplayPrintFailed(true);
    //打印逻辑
  };

  const inputCheckPop = () => {
    setDisplayInputPop(true);
  };

  const closeInputPop = () => {
    setDisplayInputPop(false);
  };

  const submit = async (copy) => {
    setProcess(true);
    let result;
    let type = getQueryString("printerId");

    result = await postToServer({
      nickname: props.username ? props.username : "壹.零er",
      wish: text,
      printerId: type ? type : 1,
      copy: copy,
    });
    console.log(result);
    // await saveAddress(props.username?props.username:'壹.零er',props.useradd?props.useradd:"null");
    // let result = await printerReceipt(text);
    if (result.result) {
      finishPrintingWish();
    } else {
      failedPrinting();
      // navigateTo(changeRoute, config.pages.failed);
    }
  };
  const navigateTo = (changeRoute, id) => {
    changeRoute({ id: id });
  };

  const home = () => {
    navigateTo(changeRoute, config.pages.welcome);
  };
  useEffect(() => {
    if (props.username) {
      setName(props.username);
      // setPop(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDisplayInputPop(false);
    }, 2000);
  }, [displayInputPop]);
  return (
    <div className="inputBackground">
      <div className="inputNameTitle"> </div>
      <textarea
        className="nametextarea"
        type="text"
        placeholder="Tell us your name"
        value={name}
        onChange={inputName}
      ></textarea>
      <div className="wishcontainer">
        <div class="textarea-wrapper">
          <textarea
            className="wishtextarea"
            type="text"
            placeholder="What do you think?"
            value={text}
            onChange={inputWish}
          ></textarea>
          {/* <div className="inputWishTitle">请输入你的愿望</div> */}
          {/* <textarea type="text" value={text} onChange={inputWish}></textarea> */}
          <div className="wordinglimit">
            {text.length}/{MAX_LENGTH}
          </div>
        </div>
      </div>

      {/* <div className="flower"></div> */}
      {/* ChatGPT */}
      <ChatGPT
        className="ChatGPTbtn"
        label="No idea？Try ask ChatGPT"
        onClick={ChatGPTPrint}
      />
      <Button
        variant="contained"
        color="green"
        className="printWish"
        tabIndex="2"
        onClick={printWish}
      >
        <span className="btnPrintWording">Print my idea</span>
      </Button>

      <div className="back" onClick={home}>
        Back
      </div>
      {/* <div className="signing">
        <div className="madeBy">
          <p>Made with love by</p>
        </div>
        <div class="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="logo"></div>
      </div> */}
      {/* masking */}
      <div
        class="mask"
        style={{ display: displayMask ? "block" : "none" }}
      ></div>

      {/* 弹窗1 */}
      <div
        class="pop1"
        // class="pop1"
        style={{ display: displayPrintFirst ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="content">
          You may pick up your
          <br />
          receipts and share a copy
          <br />
          to our collection.
        </div>
        {/* <button class="i_know" onClick={printingWish}>
          知道了,开始打印
        </button> */}
        <Button
          variant="contained"
          color="green"
          class="printOne"
          onClick={printingWish2}
        >
          <div>Print two copies</div>
        </Button>
        <Button
          variant="contained"
          color="green"
          class="printTwo"
          onClick={printingWish}
        >
          <div>Print one only</div>
        </Button>
        <div class="later" onClick={closePrinting}>
          Later
        </div>
      </div>
      {/* 弹窗2 */}
      <div
        class="pop2"
        style={{ display: displayPrintSecond ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="loading">Printing in progress</div>
        <div class="printing"></div>
      </div>
      {/* 弹窗3 */}
      <div
        class="pop3"
        style={{ display: displayPrintThird ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="content">
          Your receipt is ready
          <br />
          for pick up
        </div>
        <button class="backToWelcome" onClick={home}>
          Done
        </button>
      </div>
      {/* 弹窗4 - ChatGPT */}
      <div
        class="pop4"
        style={{ display: displayPrintForth ? "block" : "none" }}
      >
        <div className="leaf">
          <img src={leaf} alt="leaf" />
        </div>
        <div className="closebtn">
          {/* <CloseButton onClick={closePrinting} /> */}
          <CloseButton onClick={cancelPrinting} />
        </div>
        <div class="ChatGPTArea">{ChatGPTdata}</div>
        {/* 按键特效 */}
        <Button
          variant="contained"
          color="green"
          class="useitBtn"
          // onClick={printingWish}
          onClick={closePrinting}
        >
          <div class="useItWording">Use this</div>
        </Button>
        <div class="anotherBtn" onClick={ChatGPTPrint}>
          <div class="anotherWording">Try another?</div>
        </div>
      </div>
      {/* 弹窗5 - failed */}
      <div
        class="pop5"
        style={{ display: displayPrintFailed ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="content">
        Printer’s busy. 
          <br />
          Please try again.
        </div>
        {/* <button class="backToWelcome" onClick={home}>
          好的
        </button> */}
        <Button
          variant="contained"
          color="green"
          class="useitBtn"
          // onClick={printingWish}
          onClick={closePrinting}
        >
          <div class="useItWording">Ok</div>
        </Button>
      </div>
      <div
        style={{ display: displayInputPop ? "block" : "none" }}
        ref={inputPopRef}
      >
        <span className="InputPopWording" onClick={closeInputPop}>
          <div className="InputPopReminderWording">
            {popWording}
          </div>
        </span>
      </div>
    </div>
  );
}
