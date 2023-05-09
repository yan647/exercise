import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './style.scss';
import Game from './components/Game';

const targetDom = document.getElementById('root');

// 旧的写法
// ReactDOM.render(<div>hello world!!</div>,targetDom);

// 新写法的优点
// https://blog.saeloun.com/2021/07/15/react-18-adds-new-root-api
const root = ReactDOMClient.createRoot(targetDom);
root.render(
  <>
    <div>Tic-Tac-Toe</div>
    <Game></Game>
  </>
);

