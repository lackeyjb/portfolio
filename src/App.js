import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Navbar, Footer } from './components';
import config from './config';

export const App = ({ children }) => (
  <div>
    <Helmet titleTemplate="Bryan Lackey | %s" />
    <Navbar />
    {children}
    <Footer content={config.footer.content} />
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};
