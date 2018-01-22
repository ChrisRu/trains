import React from 'react';

export const Door = ({ side }) => (
  <div class={`coupe--door coupe--door-${side}`}>
    <div class="coupe--window coupe--door--window" />
  </div>
);

export const Doors = ({ side, open, gray }) => (
  <div>
    {gray || <Doors side={side} gray />}
    <div
      class={`coupe--doors ${gray ? 'gray' : ''} coupe--doors-${side} ${
        open ? 'open' : ''
      }`}>
      <Door side="left" />
      <Door side="right" />
    </div>
  </div>
);

export const Windows = ({ side }) => (
  <div class={`coupe--windows coupe--windows-${side}`}>
    <div class="coupe--window" />
    <div class="coupe--window" />
  </div>
);
