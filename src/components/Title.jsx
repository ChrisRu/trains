import React from 'react';
import { Link } from 'preact-router/match';

const Title = ({ value }) => (
  <Link href="/">
    <h1 class="title">{value}</h1>
  </Link>
);

export default Title;
