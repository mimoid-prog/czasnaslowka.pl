import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import thunk from "redux-thunk";
import "./styles/style.css";
import "./icons/css/fontello.css";
import { rootReducer } from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import App from "./App";
import setAuthorizationHeader from "./components/utils/setAuthorizationHeader";

const store = createStore(rootReducer, applyMiddleware(thunk));

if (localStorage.czasnaslowkaJWT) {
  const payload = decode(localStorage.czasnaslowkaJWT);
  const user = {
    token: localStorage.czasnaslowkaJWT,
    email: payload.email,
    confirmed: payload.confirmed,
    creationDate: payload.creationDate
  };

  setAuthorizationHeader(localStorage.czasnaslowkaJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
