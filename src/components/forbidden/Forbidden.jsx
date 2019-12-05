import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Forbidden() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography align="center" variant="h2" gutterBottom>
          403
        </Typography>
      </Grid>

      <Grid item>
        <Typography align="center" variant="h5">
          Нямате достъп до тази страница
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Forbidden;
