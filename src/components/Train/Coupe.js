import React, { Component } from 'react';
import { Windows, Doors } from './Elements';

class Coupe extends Component {
  state = {
    openDoors: false
  };

  toggleDoors = () => {
    this.setState(({ openDoors }) => ({ openDoors: !openDoors }));
  };

  render() {
    const { openDoors } = this.state;
    return (
      <div
        class="coupe"
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={this.toggleDoors}
      >
        <div class="coupe--top" />
        <div class="coupe--main">
          <div class="coupe--main-center">
            <Windows side="left" />
            <Windows side="center" />
            <Windows side="right" />
          </div>
          <Doors side="left" open={openDoors} />
          <Doors side="right" open={openDoors} />
        </div>
        <div class="coupe--bottom" />
      </div>
    );
  }
}

export default Coupe;
