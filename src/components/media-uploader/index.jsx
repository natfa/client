import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import './styles.css';

const MediaUploader = ({
  handleChange,
}) => (
  <div className="media-uploader">
    <label htmlFor="media-uploader-input">
      <Button component="span" variant="outlined" />
      <input
        id="media-uploader-input"
        type="file"
        multiple
        onChange={handleChange}
      />
    </label>
  </div>
);

MediaUploader.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default MediaUploader;
