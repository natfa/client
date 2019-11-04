import React from 'react';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SubjectFilter from '../subject-filter';
import ListDialog from '../../components/list-dialog';

import subjectAPI from '../../api/subject';

import './styles.css';

class TestCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      dialogOpen: false,
      filters: [],
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.handleSubjectFilterInsert = this.handleSubjectFilterInsert.bind(this);
    this.handleSubjectFilterUpdate = this.handleSubjectFilterUpdate.bind(this);
    this.handleSubjectFilterDelete = this.handleSubjectFilterDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const subjects = await subjectAPI.getAll();
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

  handleSubjectFilterInsert(subject) {
    this.setState((state) => ({
      ...state,
      filters: [
        ...state.filters,
        {
          subject,
          themeFilters: [],
        },
      ],
    }));
  }

  handleSubjectFilterUpdate(filter) {
    this.setState((state) => {
      const filters = state.filters
        .map((f) => {
          if (f.subject.id === filter.subject.id) {
            return filter;
          }
          return f;
        });

      return {
        ...state,
        filters,
      };
    });
  }

  handleSubjectFilterDelete(filter) {
    this.setState((state) => {
      const filters = state.filters
        .filter((f) => f.subject.id !== filter.subject.id);

      return {
        ...state,
        filters,
      };
    });
  }

  render() {
    const { filters, subjects, dialogOpen } = this.state;
    const unusedSubjects = subjects.filter((subject) => {
      const found = filters.find((filter) => filter.subject.id === subject.id);
      return !found;
    });

    return (
      <div className="test-creator">
        {filters.map((filter) => (
          <SubjectFilter
            key={filter.subject.id}
            filter={filter}

            onUpdate={this.handleSubjectFilterUpdate}
            onDelete={this.handleSubjectFilterDelete}
          />
        ))}

        <div className="button-row">
          <Button
            startIcon="+"
            color="secondary"
            variant="outlined"
            disabled={unusedSubjects.length === 0}
            onClick={this.openDialog}
          >
            филтър
          </Button>

          <Button
            color="primary"
            variant="contained"
            disabled={filters.length === 0}
          >
            продължи
          </Button>
        </div>

        <ListDialog
          open={dialogOpen}
          title="Изберете предмет"
          onClose={this.closeDialog}
        >
          {unusedSubjects.map((subject) => (
            <ListItem
              key={subject.id}
              button
              onClick={() => {
                this.handleSubjectFilterInsert(subject);
                this.closeDialog();
              }}
            >
              <ListItemText>{subject.name}</ListItemText>
            </ListItem>
          ))}
        </ListDialog>
      </div>
    );
  }
}

export default TestCreator;
