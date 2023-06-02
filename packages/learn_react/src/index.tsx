import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './../styles/global.scss';
import Styles from './style.scss';
import Game from './components/Game/Game';
import InfiniteScrollSample from './components/InfiniteScrollSample';
import EgRcSelect from './components/EgRcSelect'

const targetDom = document.getElementById('root');

// 旧的写法
// ReactDOM.render(<div>hello world!!</div>,targetDom);

// 新写法的优点
// https://blog.saeloun.com/2021/07/15/react-18-adds-new-root-api
const root = ReactDOMClient.createRoot(targetDom);
root.render(
  <>
      <div>rc-select<span className={Styles.todoLabel}>TODO</span></div>
        <EgRcSelect></EgRcSelect>
      <br/>
      <div>固定高度无限滚动列表<span className={Styles.todoLabel}>TODO</span></div>
      <InfiniteScrollSample></InfiniteScrollSample>
      <br/>
      <div>Tic-Tac-Toe</div>
      <Game></Game>
  </>
);

