import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

const pointValues = [1, 2, 3, 4, 5];

const PaddedPaper = withStyles({
  root: {
    padding: '1rem',
  },
})(Paper);

const SubjectFilter = ({ subjectFilter }) => {
  const { themeFilters } = subjectFilter;

  const themeTotalCounts = themeFilters.map((themeFilter) => {
    const count = pointValues
      .reduce((total, current) => (total + themeFilter[current]), 0);

    return {
      themeId: themeFilter.theme.id,
      count,
    };
  });

  const renderThemeFilters = () => themeFilters.map((themeFilter) => {
    const { count } = themeTotalCounts
      .find((ttc) => ttc.themeId === themeFilter.theme.id);

    return (
      <React.Fragment key={themeFilter.theme.id}>
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
              <Typography variant="h6">{themeFilter.theme.name}</Typography>
            </Grid>

            <Grid item xs={1}>
              <Typography>{count}</Typography>
            </Grid>

            <Grid item xs={1}>
              <IconButton>
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
                  value={themeFilter[n]}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>

            </Grid>
          ))}
        </Grid>

        <Grid item>
          <Divider />
        </Grid>
      </React.Fragment>
    );
  });

  const totalSubjectCount = themeTotalCounts
    .reduce((acc, curr) => (acc + curr.count), 0);

  return (
    <PaddedPaper
      elevation={2}
      square
    >
      <Grid
        container
        direction="column"
        spacing={3}
      >
        <Grid
          container
          item
          direciton="row"
          justify="space-between"
          alignItems="center"
          xs={12}
        >
          <Grid item xs={2}>
            <Typography
              variant="h5"
              color="primary"
            >
              {subjectFilter.subject.name}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Typography>{totalSubjectCount}</Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>

        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        {renderThemeFilters()}

        <Grid item>
          <Button
            startIcon="+"
            color="secondary"
            variant="text"
          >
            тема
          </Button>
        </Grid>
      </Grid>
    </PaddedPaper>
  );
};

SubjectFilter.propTypes = {
  subjectFilter: PropTypes.shape({
    subject: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    themeFilters: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  }).isRequired,
};

export default SubjectFilter;
