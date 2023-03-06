import React, { useContext, useState, useEffect } from "react";
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
import { getQueryString } from "../../util/util";
import { getRandomWish ,isEmpty} from "../../util/util";
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
  //Add for chatGPT
  const [displayPrintForth, setDisplayPrintForth] = useState(false);
  const [ChatGPTdata, setChatGPTData] = useState();
  const selectedData = "祝福你的人生充满爱、和平和幸福！";

  //字数统计
  // const [inputWishValue, setInputWishValue] = useState('');
  const MAX_LENGTH = 70;
  const inputWish = (event) => {
    let newText = event.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
    }
    console.log(newText);
  };
  const inputName = (event) => {
    console.log(event);
  
    setName(event.target.value);
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
    if (isEmpty(name)||isEmpty(text)) {
      result = true;
    }
    return result;
  };

  const printWish = () => {
    if (checkingInput()) {
      console.log("can not be null")
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
    setDisplayInputPop(true)
    //打印逻辑
  };

  const closeInputPop = ()=>{
    setDisplayInputPop(false);
  }

  const submit = async (copy) => {
    setProcess(true);
    let result;
    let type = getQueryString("type");
   
      result = await postToServer({
        nickname: props.username?props.username:'壹.零er',
        wish: text,
        printerId: type? type:1,
        copy:copy
      });
    

    // let result = await printerReceipt(text);
    if (result) {
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
  return (
    <div className="inputBackground">
      <div className="inputNameTitle"> </div>
      <textarea className = "nametextarea" type="text" placeholder="请输入你的名字" value={name} onChange={inputName}></textarea>
      
      <textarea className = "wishtextarea" type="text" placeholder="请输入你的心愿" value={text} onChange={inputWish}></textarea>
      {/* <div className="inputWishTitle">请输入你的愿望</div> */}
      {/* <textarea type="text" value={text} onChange={inputWish}></textarea> */}
      <div className="wordinglimit">
        {text.length}/{MAX_LENGTH}
      </div>
      <div className="flower"></div>
      {/* ChatGPT */}
      <ChatGPT
        className="ChatGPTbtn"
        label="没有头绪？问问ChatGPT吧"
        onClick={ChatGPTPrint}
      />
      <Button
        variant="contained"
        color="green"
        className="printWish"
        onClick={printWish}
      >
        <span className="btnPrintWording">打印愿望</span>
      </Button>

      <div className="back" onClick={home}>
        返回
      </div>
      <div className="signing">
        <div className="madeBy">
          <p>Made with love by</p>
        </div>
        <div class="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="logo"></div>
      </div>
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
          打印后请及时取走。
          <br />
          你也可以打印双份，在心愿墙上留下你的心愿。
        </div>
        {/* <button class="i_know" onClick={printingWish}>
          知道了,开始打印
        </button> */}
        <Button
          variant="contained"
          color="green"
          class="i_know"
          onClick={printingWish}
        >
          <div>先打印一份</div>
        </Button>
        <Button
          variant="contained"
          color="green"
          class="i_know2"
          onClick={printingWish2}
        >
          <div> 打印双份</div>
        </Button>
        <div class="later" onClick={closePrinting}>
          稍后再打印
        </div>
      </div>
      {/* 弹窗2 */}
      <div
        class="pop2"
        style={{ display: displayPrintSecond ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="loading">打印中，请稍等</div>
        <div class="printing"></div>
      </div>
      {/* 弹窗3 */}
      <div
        class="pop3"
        style={{ display: displayPrintThird ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="content">
          你已成功许下心愿
          <br />
          请及时取走
        </div>
        <button class="backToWelcome" onClick={home}>
          返回首页
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
        <div class="useItWording">使用心愿</div>
        </Button>
        <div class="anotherBtn" onClick={ChatGPTPrint}>
          <div class="anotherWording">换一个</div>
        </div>
      </div>
     {/* 弹窗5 - failed */}
      <div
        class="pop5"
        style={{ display: displayPrintFailed ? "block" : "none" }}
      >
        {/* <div class="title"></div> */}
        <div class="content">
          目前答应人数较多，
          <br />
          请稍后再试
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
        <div class="useItWording">好的</div>
        </Button>
      </div>
      <div 
        style={{ display: displayInputPop ? "block" : "none" }}
      >
       
        <span className="InputPopWording" onClick={closeInputPop}>请输入你的名字和心愿哦</span>
     
      </div>
     
    </div>
  );
}
