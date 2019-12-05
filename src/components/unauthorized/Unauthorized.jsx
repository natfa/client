import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Unauthorized() {
  return (
    <Grid
      container
      direction="column"
    >
      <Grid item>
        <Typography align="center" variant="h2" gutterBottom>
          401
        </Typography>
      </Grid>

      <Grid item>
        <Typography align="center" variant="h5">
          Моля влезте в акаунта си, за да достъпите тази част на сайта
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Unauthorized;
