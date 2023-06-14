/**
 * Created by lsq on 2020/12/12.
 * state & 生命周期
 */

'use strict';

function Clock(props) {
  return (
    <div>
      <h1>hello world</h1>
      <h2>it is {props.date.toLocaleTimeString()}</h2>
    </div>
  )
}

class Clock2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>hello world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock2/>,
  document.getElementById('root')
);
