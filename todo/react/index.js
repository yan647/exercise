/**
 * Created by lsq on 2020/12/9.
 */

'use strict';

const element = <h1>hello,world!</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);

//------------------------
function tick() {
  const element2 = (
    <div>
      <h1>hello world</h1>
      <h2>it is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  ReactDOM.render(element2, document.getElementById('root'));
}

setInterval(tick, 1000);

//---------------------------渲染组件
//写法一
function Welcome(props) {
  return <h1>hello {props.name}</h1>;
}

//写法二
class Welcome1 extends React.Component {
  render() {
    return <h1>hello {this.props.name}</h1>;
  }
}

const element3 = <Welcome name='Siri'/>;
ReactDOM.render(
  element3,
  document.getElementById('root')
);

//---------------------------组合组件

function Welcome2(props) {
  return <h1>hello {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome2 name='LiBai'/>
      <Welcome2 name='Lili'/>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
