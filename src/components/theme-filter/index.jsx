import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import { pointValues } from '../../constants';

class ThemeFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { filter } = this.props;

    const {
      onDelete,
      onCountChange,
    } = this.props;

    const questionCount = pointValues
      .reduce((acc, pointValue) => acc + filter[pointValue], 0);

    return (
      <Grid
        container
        item
        direction="column"
        wrap="nowrap"
      >
        <Grid
          container
          item
          direction="row"
          justify="space-between"
          alignItems="center"
          xs={12}
        >
          <Grid item xs={2}>
            <Typography variant="h6">{filter.theme.name}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography>{`Брой въпроси: ${questionCount}`}</Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={() => onDelete(filter.theme.id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

        </Grid>

        {pointValues.map((n) => (
          <Grid
            key={n}
            item
            container
            direction="row"
            wrap="nowrap"
            xs={12}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={3} sm={2} md={1}>
              <Typography>{`${n} ${n === 1 ? 'точка' : 'точки'}`}</Typography>
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <TextField
                value={filter[n]}
                variant="outlined"
                margin="dense"
                onChange={(e) => onCountChange(filter.theme.id, n, e.target.value)}
              />
            </Grid>

          </Grid>
        ))}
      </Grid>
    );
  }
}

ThemeFilter.propTypes = {
  filter: PropTypes.shape({
    theme: PropTypes.shape({
      id: PropTypes.string,
      subjectId: PropTypes.string,
      name: PropTypes.string,
    }),
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
  }).isRequired,

  onDelete: PropTypes.func.isRequired,
  onCountChange: PropTypes.func.isRequired,
};

export default ThemeFilter;
