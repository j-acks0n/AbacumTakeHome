import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import { GameState } from './components/GameState';
import reportWebVitals from "./reportWebVitals";
// const testGameState:GameState = {
//   history: [[null,null],[null,null],[null,null],[null,null],[null,null]],
//   lastTurnWinner: null,
//   playerOne: {
//     name: "TestOne",
//     score: 0,
//     avatarURL: "",
//   },
//   playerTwo: {
//     name: "",
//     score: 0,
//     avatarURL: "",
//   },
//   gameStarted: true,
//   nowButtonClicked: true,
//   announcement: "",
// }
ReactDOM.render(
  <React.StrictMode>
    {/* <App initialisedTestGameState={testGameState} /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
