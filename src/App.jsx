import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { ToastProvider } from "react-toast-notifications";

import { Provider } from "react-redux";
import { store } from "./redux/index";

function App() {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000} 
          placement="top-center"
        >
          <BrowserRouter>
            <Router />
            <ScrollToTop />
          </BrowserRouter>
        </ToastProvider>
      </RecoilRoot>
    </Provider>
  );
}

export default App;
