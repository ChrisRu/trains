import React from 'react';

const width = 100;
const height = 20;

const generatePoints = data => {
  const points = width / (data.length - 1);

  return data.map((percent, index) => ({
    x: points * index,
    y: percent * height
  }));
};

const pointsToString = points => points.map(point => `${point.x}, ${point.y}`).join(" ");

const Chart = ({ data, onClick }) => {
  let points = generatePoints(data);
  points = [{ x: points[0].x, y: 0 }, ...points, { x: points[points.length - 1].x, y: 0 }];

  return (
    <div class="chart-wrapper" onClick={onClick}>
      <svg viewBox={`0 0 ${width} ${height}`} class="chart">
        <polyline
          points={pointsToString(points)}/>
      </svg>
    </div>
  );
};

export default Chart;