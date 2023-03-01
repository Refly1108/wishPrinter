import React, { useContext, useState } from "react";
import { PageRouterContext } from "../../App";
import "./Failed.css";
import config from "../../config/config";
export default function Failed() {
  const changeRoute = useContext(PageRouterContext);
  const retry = async () => {
    navigateTo(changeRoute, config.pages.input);
  };

  const navigateTo = (changeRoute, id) => {
    changeRoute({ id: id });
  };
  return (
    <div>
      <div className="FaildedBackground">
        <button className="wishButton" onClick={retry}>
          打印机故障，请稍后再试！
        </button>
      </div>
    </div>
  );
}
