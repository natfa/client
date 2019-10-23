import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import './styles.css';

const MediaUploader = ({
  onUpload,
}) => (
  <div className="media-uploader">
    <label htmlFor="media-uploader-input">
      <Button component="span" variant="outlined" />
      <input
        id="media-uploader-input"
        type="file"
        multiple
        onChange={onUpload}
      />
    </label>
  </div>
);

MediaUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default MediaUploader;
