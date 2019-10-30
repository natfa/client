import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';

const pointValues = [1, 2, 3, 4, 5];

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
      <Grid
        key={themeFilter.theme.id}
        container
        item
        direction="column"
        style={{
          border: '1px solid grey',
        }}
      >
        <Grid
          container
          item
          direction="row"
          justify="space-between"
        >
          <Typography>{themeFilter.theme.name}</Typography>
          <Typography>{count}</Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Grid>

        {pointValues.map((n) => (
          <Grid
            key={n}
            item
            container
            direction="row"
          >
            <Typography>{`${n} ${n === 1 ? 'точка' : 'точки'}`}</Typography>
            <TextField value={themeFilter[n]} />
          </Grid>
        ))}
      </Grid>
    );
  });

  const totalSubjectCount = themeTotalCounts
    .reduce((acc, curr) => (acc + curr.count), 0);

  return (
    <Grid
      container
      item
      direction="column"
      spacing={2}
    >
      <Grid
        container
        item
        direciton="row"
        justify="space-between"
      >
        <Typography>{subjectFilter.subject.name}</Typography>
        <Typography>{totalSubjectCount}</Typography>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Grid>

      {renderThemeFilters()}
    </Grid>
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
