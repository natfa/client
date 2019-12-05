import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function NotFound() {
  return (
    <Grid
      container
      direction="column"
    >
      <Grid item>
        <Typography align="center" variant="h2" gutterBottom>
          404
        </Typography>
      </Grid>

      <Grid item>
        <Typography align="center" variant="h5">
          Страницата която търсите не съществува
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;
