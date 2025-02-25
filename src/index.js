import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import đúng cho React 18
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import catsReducer from "./redux/slices/catSlice";
import catSaga from "./redux/sagas/catSaga";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import "./assets/css/styles.css";
import "./assets/scss/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga), // sử dụng function
});

saga.run(catSaga);

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Tạo root container

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
