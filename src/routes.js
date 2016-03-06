import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './App';
import { Home, Blog } from './views';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="blog" component={Blog} />
  </Route>
);
