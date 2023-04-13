import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";

import { Provider } from "react-redux";
import { store } from "./redux/index";


function App() {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <Router />
          <ScrollToTop />
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  );
}

export default App;
