import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const SubmitPage = ({
  onSubmit,
  questionsLeft,
}) => {
  let text;

  if (questionsLeft === 0) {
    text = 'Всички въпроси са решени, готови сте да предадете';
  } else if (questionsLeft === 1) {
    text = 'Остава 1 нерешен въпрос';
  } else {
    text = `Остават ${questionsLeft} нерешени въпроса`;
  }

  const handleButtonClick = () => {
    if (questionsLeft > 0) {
      const statement = questionsLeft === 1
        ? 'Има 1 нерешен въпрос.'
        : `Има ${questionsLeft} нерешени въпроса.`;

      const submit = confirm(`${statement}. Сигурни ли сте, че искате да предадете?`);

      if (submit) {
        onSubmit();
      }
      return;
    }

    const submit = confirm('Сигурни ли сте, че искате да предадете?');
    if (submit) onSubmit();
  };

  return (
    <Grid
      container
      direction="column"
    >
      <Typography
        align="center"
        variant="h6"
        gutterBottom
        paragraph
      >
        {text}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        предай
      </Button>
    </Grid>
  );
};

SubmitPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  questionsLeft: PropTypes.number.isRequired,
};

export default SubmitPage;
