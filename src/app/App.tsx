import React, { useEffect } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Header } from "../components/header/header";
import { Main } from "../components/main/main";

function App() {
  

  return (
    <div className="App">
      <Provider store={store}>
      <HashRouter>
        <Header/>
        <Main/>
      </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
