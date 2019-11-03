import React from 'react';

import Button from '@material-ui/core/Button';

import SubjectFilter from '../../components/subject-filter';
import AddSubjectFilterDialog from '../../components/add-subject-filter-dialog';

import subjectAPI from '../../api/subject';

import './styles.css';

class TestCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      dialogOpen: false,
      filters: [
        {
          subject: { id: '1', name: 'Math' },
          themeFilters: [
            {
              theme: { id: '1', subjectId: '1', name: 'Algebra' },
              1: 10,
              2: 20,
              3: 10,
              4: 10,
              5: 5,
            },
            {
              theme: { id: '2', subjectId: '1', name: 'Geometry' },
              1: 10,
              2: 0,
              3: 0,
              4: 0,
              5: 1,
            },
          ],
        },
      ],
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
    console.error('Not tested');
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

        <AddSubjectFilterDialog
          open={dialogOpen}
          onClose={this.closeDialog}
          subjects={unusedSubjects}
          onSubjectClick={this.handleSubjectFilterInsert}
        />
      </div>
    );
  }
}

export default TestCreator;
