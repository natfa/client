import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import './styles.css';

const MediaListItem = ({
  src,
  onRemove,
}) => (
  <div className="media-list-item">
    <img alt="media list item" src={src} />
    {onRemove
    && (
      <span>
        <IconButton onClick={onRemove} size="small" style={{ color: 'white' }}>
          <ClearIcon />
        </IconButton>
      </span>
    )}
  </div>
);

MediaListItem.propTypes = {
  src: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

MediaListItem.defaultProps = {
  onRemove: undefined,
};

export default MediaListItem;
