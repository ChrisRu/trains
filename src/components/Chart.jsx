import React, { Component } from 'react';
import { select } from 'd3-selection';
import { area, curveBasis } from 'd3-shape';
import { transition } from 'd3-transition';

const width = 100;
const height = 20;

const getCount = ({ compartments }) =>
  compartments.map(compartment => compartment.peopleCount / 20);

const generatePoints = data => {
  const points = width / data.length;

  return data.map((percent, index) => ({
    x: points * (index + 0.5),
    y: percent * height
  }));
};

const addStartingPoints = array => [
  { x: 0, y: 0 },
  ...array,
  { x: width, y: 0 }
];

class Chart extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { data, previousData } = this.props;
    const points = addStartingPoints(generatePoints(getCount(data)));

    let previousPoints;
    if (previousData) {
      previousPoints = addStartingPoints(
        generatePoints(getCount(previousData))
      );
    } else {
      previousPoints = addStartingPoints(
        generatePoints(getCount(data).map(() => 0))
      );
    }
    select(this.getDOMNode())
      .select('path')
      .attr('d', this.createArea(previousPoints))
      .transition()
      .duration(1000)
      .attr('d', this.createArea(points));
  }

  createArea = area()
    .curve(curveBasis)
    .x(d => d.x)
    .y1(d => (d.y > 0 ? d.y : 0));

  render({ onClick, coupeCount }) {
    return (
      <div class="chart-wrapper" onClick={onClick}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          class="chart"
          style={{ fontSize: `${coupeCount}vh` }}>
          <path />
        </svg>
      </div>
    );
  }
}

export default Chart;
