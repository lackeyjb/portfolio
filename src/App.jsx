import React, { PropTypes } from 'react';
import { Navbar, Footer } from './components';
import config from './config';

export const App = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer content={config.footer.content} />
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};
