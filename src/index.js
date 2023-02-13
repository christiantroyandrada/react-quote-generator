import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store, ConnectedQuoteComponent } from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ConnectedQuoteComponent />
    </Provider>
  </StrictMode>
);
