import React, { Component } from 'react';
import Coupe from './Coupe';
import CoupeDriver from './CoupeDriver';
import Chart from '../Chart';

class Train extends Component {
  state = {
    minutes: Math.floor(Math.random() * 10)
  };

  render({ fetchData, train, previousTrain }) {
    const { minutes } = this.state;

    return (
      <div class="train-wrapper">
        <h2 class="train--title">
          <b>{train.startingPoint}</b>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.49 31.49"
            width="512"
            height="512">
            <path
              d="M21.205 5.007a1.112 1.112 0 0 0-1.587 0 1.12 1.12 0 0 0 0 1.571l8.047 8.047H1.111A1.106 1.106 0 0 0 0 15.737c0 .619.492 1.127 1.111 1.127h26.554l-8.047 8.032c-.429.444-.429 1.159 0 1.587a1.112 1.112 0 0 0 1.587 0l9.952-9.952a1.093 1.093 0 0 0 0-1.571l-9.952-9.953z"
              fill="#FFF"
            />
          </svg>
          <b>{train.destination}</b>
        </h2>
        <span class="train--sub-title">
          in {minutes} minute{minutes === 1 ? '' : 's'}
        </span>
        <div class="train">
          <div class="train--inner">
            <CoupeDriver />
            {Array(train.compartments.length - 2)
              .fill(0)
              .map(() => <Coupe />)}
            <CoupeDriver backwards />
          </div>

          <Chart
            coupeCount={train.compartments.length}
            data={train}
            previousData={previousTrain}
            onClick={fetchData}
          />
        </div>
      </div>
    );
  }
}

export default Train;
