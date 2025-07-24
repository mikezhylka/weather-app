import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { appStore } from "./store/app";

createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
