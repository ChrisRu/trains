import React, { Component } from 'react';
import Title from './Title';
import Train from './Train';
import Chart from './Chart';

class App extends Component {
  state = {
    previousData: [0, 0, 0, 0, 0, 0],
    data: [0.5, 0.6, 0.8, 0.3, 0.4, 0.3]
  };

  getRandomData = () => this.state.data.map(() => Math.random());

  randomData = () => {
    this.setState({
      data: this.getRandomData(),
      previousData: this.state.data
    });
  };

  render() {
    const { data, previousData } = this.state;
    return (
      <div>
        <Title />
        <Train coupes={data.length} />
        <Chart
          data={data}
          previousData={previousData}
          onClick={this.randomData}
        />
      </div>
    );
  }
}

export default App;
