import React from 'react';
import Dayjs from '@date-io/dayjs';

import Grid from '@material-ui/core/Grid';

import TestCreationFilters from '../test-creation-filters';
import TestCreationGradeBoundaries from '../test-creation-grade-boundaries';
import TestCreationSidebar from '../../components/test-creation-sidebar';

import { pointValues } from '../../constants';

class TestCreator extends React.Component {
  constructor(props) {
    super(props);

    const dayjs = new Dayjs();
    const now = new Date(Date.now());
    now.setHours(0, 0, 0);

    this.state = {
      name: '',
      // date: dayjs.date(),
      date: null,
      // timeToSolve: dayjs.date(now),
      timeToSolve: null,
      filters: [],
      filtersComplete: false,
      boundaries: {
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    };


    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeToSolveChange = this.handleTimeToSolveChange.bind(this);

    this.handleFilterInsert = this.handleFilterInsert.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleFilterDelete = this.handleFilterDelete.bind(this);

    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this);

    this.handleBoundariesCancel = this.handleBoundariesCancel.bind(this);
    this.handleBoundariesUpdate = this.handleBoundariesUpdate.bind(this);
    this.handleBoundariesSubmit = this.handleBoundariesSubmit.bind(this);
  }

  handleNameChange(name) {
    this.setState((state) => ({ ...state, name }));
  }

  handleDateChange(date) {
    this.setState((state) => ({ ...state, date }));
  }

  handleTimeToSolveChange(timeToSolve) {
    this.setState((state) => ({ ...state, timeToSolve }));
  }

  handleFilterInsert(subject) {
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

  handleFilterUpdate(filter) {
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

  handleFilterDelete(filter) {
    this.setState((state) => {
      const filters = state.filters
        .filter((f) => f.subject.id !== filter.subject.id);

      return {
        ...state,
        filters,
      };
    });
  }

  handleFiltersSubmit() {
    this.setState((state) => ({ ...state, filtersComplete: true }));
  }

  handleBoundariesCancel() {
    this.setState((state) => ({
      ...state,
      filtersComplete: false,
      boundaries: {
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    }));
  }

  handleBoundariesUpdate(boundaries) {
    this.setState((state) => ({ ...state, boundaries }));
  }

  handleBoundariesSubmit() {
    const {
      name,
      date,
      timeToSolve,
      filters,
      boundaries,
    } = this.state;

    const requestBody = {
      name,
      start: date,
      end: date,
      timeToSolve,
      filters,
      boundaries,
    };

    console.log(requestBody);
  }

  render() {
    const {
      name,
      date,
      timeToSolve,
      filters,
      filtersComplete,
      boundaries,
    } = this.state;

    let totalPoints = 0;

    // IMPORTANT
    // this operation has a side effect:
    // the total points are being counted as the total question count is being figured out
    // this is done so that there aren't two separate computations that would go through the same
    // operations. I did this because on my end applying filters was being very slow
    const totalQuestionCount = filters.reduce((tqcAcc, filter) => {
      const filterQuestionCount = filter.themeFilters.reduce((fqcAcc, themeFilter) => {
        const themeQuestionCount = pointValues.reduce((thqcAcc, pointValue) => {
          totalPoints += pointValue * themeFilter[pointValue];
          return thqcAcc + themeFilter[pointValue];
        }, 0);

        return fqcAcc + themeQuestionCount;
      }, 0);

      return tqcAcc + filterQuestionCount;
    }, 0);

    return (
      <Grid spacing={2} container direction="row-reverse" style={{ height: '100%' }}>
        <Grid item xs={12} sm={3}>
          <TestCreationSidebar
            name={name}
            onNameChange={this.handleNameChange}
            date={date}
            onDateChange={this.handleDateChange}
            timeToSolve={timeToSolve}
            onTimeToSolveChange={this.handleTimeToSolveChange}
            totalQuestionCount={totalQuestionCount}
            totalPoints={totalPoints}
          />
        </Grid>

        <Grid item xs={12} sm={9} style={{ height: '100%', overflow: 'auto' }}>
          {
            filtersComplete
              ? (
                <TestCreationGradeBoundaries
                  maxPoints={totalPoints}
                  boundaries={boundaries}
                  onBoundariesUpdate={this.handleBoundariesUpdate}
                  onCancel={this.handleBoundariesCancel}
                  onSubmit={this.handleBoundariesSubmit}
                />
              ) : (
                <TestCreationFilters
                  filters={filters}
                  totalQuestionCount={totalQuestionCount}
                  onFilterInsert={this.handleFilterInsert}
                  onFilterUpdate={this.handleFilterUpdate}
                  onFilterDelete={this.handleFilterDelete}
                  onSubmit={this.handleFiltersSubmit}
                />
              )
          }
        </Grid>
      </Grid>
    );
  }
}

export default TestCreator;
