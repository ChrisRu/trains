import React, { Component } from 'react';
import Router, { route } from 'preact-router';
import Match from 'preact-router/match';
import Title from './Title';
import Train from './Train';
import List from './List';

let oldTrain = { compartments: [0, 0, 0, 0, 0] };

class App extends Component {
  state = {
    trains: [],
    fetching: true
  };

  componentDidMount() {
    this.fetchData();

    setInterval(this.fetchData, 100000);
  }

  fetchData = () => {
    fetch('http://trainemulator.azurewebsites.net/')
      .then(res => res.json())
      .then(data => {
        this.setState({
          fetching: false,
          trains: data
        });
      });
  };

  render() {
    const { trains, fetching } = this.state;

    return (
      <div>
        <Title
          value="Step In"
          onClick={() => {
            route(this.props.to, true);
          }}
        />
        {fetching ? (
          <div class="spinner">
            <div class="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
            <span>Traindelays...</span>
          </div>
        ) : (
          <Router>
            <List
              path="/"
              trains={trains}
              onSelect={active => {
                this.setState(prevState => ({
                  active,
                  previousData: prevState.active
                }));
              }}
            />
            <Match path="/:id">
              {({ path }) => {
                const id = path.split('/')[1];
                const train = trains.find(train => String(train.id) === id);
                try {
                  return (
                    <Train
                      train={train}
                      previousTrain={oldTrain}
                      fetchData={this.fetchData}
                    />
                  );
                } finally {
                  oldTrain = JSON.parse(JSON.stringify(train));
                }
              }}
            </Match>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
