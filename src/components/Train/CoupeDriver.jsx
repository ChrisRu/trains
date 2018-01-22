import React, { Component } from 'react';
import { Doors } from './Elements';

const Front = () => (
  <div class="coupe--front">
    <div class="coupe--front-white" />
    <div class="coupe--front-blue" />
    <div class="coupe--front-gray" />
  </div>
);

class CoupeDriver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDoors: props.openDoors
    };
  }

  toggleDoors = () => {
    this.setState(({ openDoors }) => ({ openDoors: !openDoors }));
  };

  render({ backwards, amount, edit, onEdit, number }) {
    const { openDoors } = this.state;

    return (
      <div
        class={`coupe coupe-driver ${backwards ? 'backwards' : ''} ${
          edit ? 'coupe-edit' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={this.toggleDoors}>
        <div class="coupe--top" />
        <Front />
        <div class="coupe--main">
          <div class="coupe--main-center">
            <div class="coupe--windows coupe--windows-left coupe--windows-pull-right">
              <div class="coupe--window" />
              <div class="coupe--window" />
            </div>
            <div class="coupe--windows coupe--windows-double coupe--windows-right">
              <div class="coupe--window" />
              <div class="coupe--window" />
              <div class="coupe--window" />
              <div class="coupe--window" />
            </div>
          </div>
          <Doors side="center" open={openDoors} />
        </div>
        <div class="coupe--bottom" />
        {edit && (
          <input
            class="edit-amount"
            type="number"
            value={amount}
            onInput={event => {
              onEdit(event, number);
            }}
          />
        )}
      </div>
    );
  }
}

export default CoupeDriver;
