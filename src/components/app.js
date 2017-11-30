import React, { Component } from 'react';
import Title from './Title';
import Train from './Train';
import Chart from './Chart';

class App extends Component {
  state = {
    data: [0.5, 0.6, 0.8, 0.3, 0.4, 0.3]
  }

  randomData = () => {
    const newData = this.state.data.map(() => Math.random());
    this.setState({ data: newData });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Title />
        <Train coupes={6} />
        <Chart data={data} onClick={this.randomData} />
      </div>
    );
  }
}

export default App;
