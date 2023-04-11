import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./CustomerWelcome.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import config from "../../config/config";
import { getUserinfo } from "../../fetch/wxInfo";
import { getLocation,getLocationAdds ,configWeixin} from "../../fetch/weixin";
import { PageRouterContext } from "../../App";
import { getQueryString } from "../../util/util";

export default function Welcome(props) {
  const changeRoute = useContext(PageRouterContext);
  const [name, setName] = useState("");
  // const [pop, setPop] = useState(false);
  const navigateTo = (changeRoute, id) => {
    changeRoute({ id: id });
  };

  const checkPlay = async () => {
   
    navigateTo(changeRoute, config.pages.input);
  };
 
  useEffect(() => {
    if (props.username) {
       //setName(props.username);
      // setPop(false);
    } else {
      (async () => {
        //TEST
      //  console.log();
      // await configWeixin();
     
        //TEST
        if(getQueryString("code")){
        let useinfo = await getUserinfo(getQueryString("code"));
      //  console.log('useinfo'+useinfo)
        if (useinfo.nickname) {
          props.setUsername(useinfo.nickname);
          // let add = await getLocationAdds(useinfo.nickname);
          // props.setUseradd(add);
        }else{
         // console.log('else')
        
        }
      }else{
        if(getQueryString("name")){
          props.setUsername(getQueryString("name"));
          //setName(getQueryString("name"));
        }
      }
      })();
    }
  }, []);
  return (
    <div className="welcomeBackground">
      <div className="welcomebgContent">
        {/* <div className="wechatId">
           <span id="postWechatId"></span>
        </div> */}
       {/* <div className="niceMeet">{name}很高兴遇见你</div> 
        <div className="wishRs">心愿收据</div>
        <div className="Regarding2023">2023年万事顺遂，心想事成</div> */}
        <Button
          variant="contained"
          color="green"
          className="wishButton"
          tabIndex="1"
          onClick={checkPlay}
        >
          <span className="iWish">我要许愿</span>
        </Button>
        {/* <div className="groupName">
          <span className="gnbord">零.壹团队</span>
          <br />
          Annual Dinner 2023
        </div>      */}
      </div>
   
    </div>
  );
}
