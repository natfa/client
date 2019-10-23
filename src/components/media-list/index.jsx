import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const MediaList = ({
  children,
}) => (
  <div className="media-list">
    {children}
  </div>
);

MediaList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaList;
