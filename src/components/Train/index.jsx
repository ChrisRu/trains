import React, { Component } from 'react';
import Coupe from './Coupe';
import CoupeDriver from './CoupeDriver';
import Chart from '../Chart';

class Train extends Component {
  state = {
    minutes: Math.floor(Math.random() * 10),
    edit: false
  };

  onEdit = (event, compartment) => {
    const data = new FormData();
    data.append('peopleCount', event.target.value);

    const { id } = this.props.train;
    fetch(
      `http://trainemulator.azurewebsites.net/api/${id}/${compartment}/edit`,
      {
        method: 'POST',
        body: data
      }
    )
      .then(this.props.refetch)
      .then(() => {
        this.props.toggleRefetch(true);
      });
  };

  scroll = event => {
    this.train.scrollLeft += event.deltaY * 10;
  };

  render({ fetchData, train, previousTrain, toggleRefetch }) {
    const { minutes, edit } = this.state;

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
        <button
          class="edit-button"
          onClick={() => {
            this.setState(prevState => ({
              edit: !prevState.edit
            }));
            toggleRefetch(false);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 469.331 469.331"
            width="512"
            height="512">
            <path
              d="M438.931 30.403c-40.4-40.5-106.1-40.5-146.5 0l-268.6 268.5c-2.1 2.1-3.4 4.8-3.8 7.7l-19.9 147.4c-.6 4.2.9 8.4 3.8 11.3 2.5 2.5 6 4 9.5 4 .6 0 1.2 0 1.8-.1l88.8-12c7.4-1 12.6-7.8 11.6-15.2-1-7.4-7.8-12.6-15.2-11.6l-71.2 9.6 13.9-102.8 108.2 108.2c2.5 2.5 6 4 9.5 4s7-1.4 9.5-4l268.6-268.5c19.6-19.6 30.4-45.6 30.4-73.3s-10.8-53.7-30.4-73.2zm-141.3 33l45.1 45.1-245.1 245.1-45.1-45.1 245.1-245.1zm-136.7 353.4l-44.1-44.1 245.1-245.1 44.1 44.1-245.1 245.1zm263.9-264.4l-107.9-107.9c13.7-11.3 30.8-17.5 48.8-17.5 20.5 0 39.7 8 54.2 22.4s22.4 33.7 22.4 54.2c0 18.1-6.2 35.1-17.5 48.8z"
              fill="#FFF"
            />
          </svg>
          Edit
        </button>
        <span class="train--sub-title">
          in {minutes} minute{minutes === 1 ? '' : 's'}
        </span>
        <div
          class="train"
          ref={train => {
            this.train = train;
          }}
          onWheel={this.scroll}>
          <div class="train--inner">
            <CoupeDriver
              number={train.compartments[0].id}
              amount={train.compartments[0].peopleCount}
              edit={edit}
              onEdit={this.onEdit}
            />
            {Array(train.compartments.length - 2)
              .fill(0)
              .map((item, index) => (
                <Coupe
                  number={train.compartments[index + 1].id}
                  amount={train.compartments[index + 1].peopleCount}
                  edit={edit}
                  onEdit={this.onEdit}
                />
              ))}
            <CoupeDriver
              number={train.compartments[train.compartments.length - 1].id}
              amount={
                train.compartments[train.compartments.length - 1].peopleCount
              }
              edit={edit}
              onEdit={this.onEdit}
              backwards
            />
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
