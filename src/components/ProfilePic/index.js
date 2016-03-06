import React, { PropTypes } from 'react';

const ProfilePic = ({ className, src }) => (
  <img className={className} src={src} width="150" style={{ borderRadius: 150 }} />
);

ProfilePic.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default ProfilePic;
