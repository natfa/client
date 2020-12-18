import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SubjectFilter from '../../components/subject-filter';

import moduleApi from '../../api/module';

class ExamCreationFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      dialogOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  async componentDidMount() {
    try {
      const subjects = await moduleApi.getAll();
      this.setState((state) => ({ ...state, subjects }));
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

  render() {
    const { subjects, dialogOpen } = this.state;

    const { filters, totalQuestionCount } = this.props;
    const {
      onFilterInsert,
      onFilterUpdate,
      onFilterDelete,
      onSubmit,
    } = this.props;


    const unusedSubjects = subjects.filter((subject) => {
      const found = filters.find(filter => filter.module.id === subject.id);
      return !found;
    });

    return (
      <Grid container direction="column">
        {filters.map((filter) => (
          <Grid key={filter.module.id} item>
            <SubjectFilter
              filter={filter}
              onUpdate={onFilterUpdate}
              onDelete={onFilterDelete}
            />
          </Grid>
        ))}

        <Grid container item justify="space-between">
          <Button
            startIcon="+"
            color="secondary"
            variant="outlined"
            onClick={this.openDialog}
            disabled={unusedSubjects.length === 0}
          >
            филтър
          </Button>

          <Button
            disabled={filters.length === 0 || totalQuestionCount === 0}
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            продължи
          </Button>
        </Grid>

        <Dialog open={dialogOpen} onClose={this.closeDialog}>
          <DialogTitle>Изберете предмет</DialogTitle>
          <List>
            {unusedSubjects.map((subject) => (
              <ListItem
                key={subject.id}
                button
                onClick={() => {
                  onFilterInsert(subject);
                  this.closeDialog();
                }}
              >
                <ListItemText>{subject.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Dialog>
      </Grid>
    );
  }
}

ExamCreationFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalQuestionCount: PropTypes.number,

  onFilterInsert: PropTypes.func.isRequired,
  onFilterUpdate: PropTypes.func.isRequired,
  onFilterDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ExamCreationFilters.defaultProps = {
  totalQuestionCount: 0,
};

export default ExamCreationFilters;