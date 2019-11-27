import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import MediaListItem from '../media-list-item';

class MediaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog(url) {
    this.setState((state) => ({ ...state, url }));
  }

  closeDialog() {
    this.setState((state) => ({ ...state, url: null }));
  }

  render() {
    const { url } = this.state;
    const { media, onItemRemove } = this.props;

    return (
      <Grid
        container
        direction="row"
        wrap="wrap"
        spacing={2}
        justify="flex-start"
      >
        {media.map((m) => {
          const props = {
            src: m.url,
            onImageClick: () => this.openDialog(m.url),
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

        {url
        && (
          <Dialog
            open={url !== null}
            onClose={this.closeDialog}
            fullWidth
            maxWidth="lg"
          >
            <img alt="enlarged" src={url} />
          </Dialog>
        )}
      </Grid>
    );
  }
}

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
