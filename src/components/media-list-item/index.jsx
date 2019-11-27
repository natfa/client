import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import './styles.css';

const MediaListItem = ({
  src,
  onImageClick,
  onRemove,
}) => (
  <div className="media-list-item">
    {/* eslint-disable-next-line */}
    <img alt="media list item" src={src} onClick={onImageClick} />
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
  onImageClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

MediaListItem.defaultProps = {
  onRemove: undefined,
};

export default MediaListItem;
