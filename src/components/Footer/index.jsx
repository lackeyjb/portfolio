import React, { PropTypes } from 'react';

const Footer = ({ content }) => (
  <footer className="footer">
    <div className="container">
      <div className="content">
        <p className="is-text-centered">
          {content}
        </p>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  content: PropTypes.string,
};

export default Footer;
