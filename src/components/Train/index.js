import React, { Component } from 'react';
import Coupe from './Coupe';
import CoupeDriver from './CoupeDriver';

class Train extends Component {
  componentDidMount() {
    this.componentDidUpdate(this.props);
  }

  componentDidUpdate({ coupes }) {
    const coupeSize = this.train.children[1].offsetWidth;
    const scale = window.innerWidth / coupes / coupeSize / 10.5;
    this.train.style.fontSize = `${scale}vw`;
  }

  render({ coupes }) {
    if (!coupes || coupes.length < 2) {
      throw new Error('Invalid train length');
    }

    return (
      <div
        class="train"
        ref={train => {
          this.train = train;
        }}
      >
        <CoupeDriver />
        {Array(coupes - 2)
          .fill(0)
          .map(() => <Coupe />)}
        <CoupeDriver backwards />
      </div>
    );
  }
}

export default Train;
