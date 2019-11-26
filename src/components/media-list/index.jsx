import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import MediaListItem from '../media-list-item';

const MediaList = ({
  media,

  onItemRemove,
}) => (
  <Grid container>
    {media.map((m) => {
      const props = {
        src: m.url,
      };

      if (onItemRemove) {
        props.onRemove = () => onItemRemove(m.url);
      }

      return (
        <Grid key={m.url} item>
          <MediaListItem {...props} />
        </Grid>
      );
    })}
  </Grid>
);

MediaList.propTypes = {
  media: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    file: PropTypes.instanceOf(Blob),
  })).isRequired,

  onItemRemove: PropTypes.func,
};

MediaList.defaultProps = {
  onItemRemove: undefined,
};

export default MediaList;
