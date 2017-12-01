import React, { Component } from 'react';

const width = 100;
const height = 20;

const generatePoints = data => {
  const points = width / data.length;

  return data.map((percent, index) => ({
    x: points * index,
    y: percent * height
  }));
};

const pointsToString = points =>
  points
    .map(point => `${Math.round(point.x)},${Math.round(point.y)}`)
    .join(' ');

const addStartingPoints = array => [
  { x: array[0].x - width / array.length, y: 0 },
  ...array,
  { x: width, y: 0 }
];

class Chart extends Component {
  componentDidUpdate() {
    this.animate.beginElement();
  }

  render({ data, onClick, previousData }) {
    const previousPoints = addStartingPoints(generatePoints(previousData));
    const points = addStartingPoints(generatePoints(data));

    // Point transition (SMIL) won't work in IE and Edge, but honestly who cares.
    // (The SMIL feature will be dropped soon but prolly not before the end of the project)

    return (
      <div class="chart-wrapper" onClick={onClick}>
        <svg viewBox={`0 0 ${width} ${height}`} class="chart">
          <polyline id="p" points={pointsToString(previousPoints)}>
            <animate
              ref={animate => {
                this.animate = animate;
              }}
              dur="0.5s"
              fill="freeze"
              style={{
                stroke: 'black',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 70
              }}
              attributeName="points"
              to={pointsToString(points)}
            />
          </polyline>
        </svg>
      </div>
    );
  }
}

export default Chart;
