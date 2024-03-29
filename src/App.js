import React from "react";
import CustermoInput from "./compoments/customerInput/CustermoInput";
import Welcome from "./compoments/welcome/Welcome";
import Failed from "./compoments/failed/Failed";
import { useState } from "react";
import config from "./config/config";
const pageRouter = {
  changeRoute: () => {},
};
export const PageRouterContext = React.createContext(pageRouter);

function App() {
  const [target, setTaget] = useState({ id: "", data: {} });
  const [username, setUsername] = useState("");
  const [useradd, setUseradd] = useState("");
  const changeRoute = (route) => {
    setTaget((target) => ({
      ...route,
    }));
    // setUsername(name);
  };

  let Compoment = null;
  const setPage = () => {
    console.log(target);
    switch (target.id) {
      case config.pages.home:
        Compoment = Welcome;
        break;
      case config.pages.input:
        Compoment = CustermoInput;
        break;
      case config.pages.welcome:
        Compoment = Welcome;
        break;
      case config.pages.failed:
        Compoment = Failed;
        break;
      default:
        Compoment = Welcome;
        break;
    }
  };
  setPage();
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <PageRouterContext.Provider value={changeRoute}>
            {/* <Provider store={store}> */}
            <Compoment
              username={username}
              setUsername={setUsername}
              useradd={useradd}
              setUseradd={setUseradd}
            ></Compoment>
            {/* </Provider> */}
          </PageRouterContext.Provider>
        </div>
      </header>
    </div>
  );
}
export default App;
