import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ThemeFilter from '../theme-filter';

import { pointValues } from '../../constants';
import themeApi from '../../api/theme';

const PaddedPaper = withStyles({
  root: {
    padding: '1rem',
  },
})(Paper);

class SubjectFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: [],
      dialogOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.handleThemeInsert = this.handleThemeInsert.bind(this);
    this.handleThemeDelete = this.handleThemeDelete.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  async componentDidMount() {
    const { filter } = this.props;

    try {
      const themes = await themeApi.getAllBySubjectId(filter.subject.id);
      this.setState((state) => ({ ...state, themes }));
    } catch (err) {
      console.error(err);
    }
  }

  openDialog() {
    this.setState((state) => ({ ...state, dialogOpen: true }));
  }

  closeDialog() {
    this.setState((state) => ({ ...state, dialogOpen: false }));
  }

  handleThemeInsert(theme) {
    const { filter, onUpdate } = this.props;

    const newFilter = {
      ...filter,
      themeFilters: [
        ...filter.themeFilters,
        {
          theme,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      ],
    };

    onUpdate(newFilter);
  }

  handleThemeDelete(themeId) {
    const { filter, onUpdate } = this.props;

    const newFilter = {
      ...filter,
      themeFilters: filter.themeFilters
        .filter((themeFilter) => themeFilter.theme.id !== themeId),
    };

    onUpdate(newFilter);
  }

  handleCountChange(themeId, pointValue, count) {
    if (Number.isNaN(Number(count))) return;

    const { filter, onUpdate } = this.props;
    const numberValue = Number(count);

    const themeFilters = filter.themeFilters.map((themeFilter) => {
      if (themeFilter.theme.id === themeId) {
        return {
          ...themeFilter,
          [pointValue]: numberValue,
        };
      }

      return themeFilter;
    });

    const newFilter = {
      ...filter,
      themeFilters,
    };

    onUpdate(newFilter);
  }

  render() {
    const { themes, dialogOpen } = this.state;
    const { filter, onDelete } = this.props;

    const unusedThemes = themes.filter((theme) => {
      const found = filter.themeFilters
        .find((themeFilter) => themeFilter.theme.id === theme.id);

      return !found;
    });

    const totalQuestionCount = filter.themeFilters.reduce((acc, themeFilter) => {
      const themeQuestionCount = pointValues
        .reduce((innerAcc, pointValue) => innerAcc + themeFilter[pointValue], 0);

      return acc + themeQuestionCount;
    }, 0);

    return (
      <PaddedPaper elevation={2} square>
        <Grid container direction="column" spacing={3}>
          <Grid
            container
            item
            direciton="row"
            justify="space-between"
            alignItems="center"
            xs={12}
          >
            <Grid item xs={2}>
              <Typography variant="h5" color="primary">
                {filter.subject.name}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography>{`Брой въпроси: ${totalQuestionCount}`}</Typography>
            </Grid>

            <Grid item xs={1}>
              <IconButton onClick={() => onDelete(filter)}>
                <DeleteIcon />
              </IconButton>
            </Grid>

          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          {filter.themeFilters.map((themeFilter) => (
            <Grid key={themeFilter.theme.id} item>
              <ThemeFilter
                filter={themeFilter}
                onDelete={this.handleThemeDelete}
                onCountChange={this.handleCountChange}
              />
            </Grid>
          ))}

          <Grid item>
            <Button
              disabled={unusedThemes.length === 0}
              startIcon="+"
              color="secondary"
              variant="text"
              onClick={this.openDialog}
            >
              тема
            </Button>
          </Grid>
        </Grid>

        <Dialog open={dialogOpen} onClose={this.closeDialog}>
          <DialogTitle>Изберете тема</DialogTitle>
          <List>
            {unusedThemes.map((theme) => (
              <ListItem
                key={theme.id}
                button
                onClick={() => {
                  this.handleThemeInsert(theme);
                  this.closeDialog();
                }}
              >
                <ListItemText>{theme.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Dialog>

      </PaddedPaper>
    );
  }
}


SubjectFilter.propTypes = {
  filter: PropTypes.shape({
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

  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SubjectFilter;
