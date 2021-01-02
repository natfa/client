import React from 'react';
import dayjs from 'dayjs';
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import ExamCreationFilters from '../exam-creation-filters';
import ExamCreationGradeBoundaries from '../exam-creation-grade-boundaries';
import ExamCreationSidebar from '../../components/exam-creation-sidebar';

import examApi from '../../api/exam';
import { pointValues } from '../../constants';

class ExamCreator extends React.Component {
  constructor(props) {
    super(props);

    const today = dayjs();

    this.state = {
      name: '',
      date: dayjs(today),
      timeToSolve: dayjs(today).hour(0).minute(0).second(0),
      filters: [],
      filtersComplete: false,
      boundaries: [],
      examId: null,
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

    this.submitExamFilters = this.submitExamFilters.bind(this);
  }

  handleNameChange(name) {
    this.setState((state) => ({ ...state, name }));
  }

  handleDateChange(date) {
    this.setState((state) => ({ ...state, date: dayjs(date) }));
  }

  handleTimeToSolveChange(timeToSolve) {
    this.setState((state) => ({ ...state, timeToSolve: dayjs(timeToSolve) }));
  }

  handleFilterInsert(subject) {
    this.setState((state) => ({
      ...state,
      filters: [
        ...state.filters,
        {
          module: subject,
          themes: [],
        },
      ],
    }));
  }

  handleFilterUpdate(filter) {
    this.setState((state) => {

      const filters = state.filters
        .map((f) => {
          if (f.module.id === filter.module.id) {
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
        .filter((f) => f.module.id !== filter.module.id);

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
      boundaries: [],
    }));
  }

  handleBoundariesUpdate(boundaries) {
    console.log(boundaries);
    this.setState((state) => ({ ...state, boundaries }));
  }

  handleBoundariesSubmit() {
    this.submitExamFilters();
  }

  async submitExamFilters() {
    const {
      name,
      date,
      timeToSolve,
      filters,
      boundaries,
    } = this.state;

    // setup start and end date
    const startDate = dayjs(date);

    let parameters = [];

    filters.forEach((filter) => {
      const { themes } = filter;

      const filterParameters = themes.map((parameter) => {
        return {
          theme: parameter.theme,
          count: parameter.count,
        }
      });

      parameters = [...parameters, ...filterParameters];
    });

    const data = {
      name: name,
      startDate: startDate,
      timeToSolve: (timeToSolve.hour() * 3600) + (timeToSolve.minute() * 60),
      parameters: parameters,
      specialties: boundaries.map(b => b.specialty),
    };

    console.log(data);

    try {
      const response = await examApi.compile(data);
      if (!response.success) {
        console.error(response.data);
        return;
      }

      const exam = response.data;
      console.log(exam);

      this.setState((state) => ({ ...state, examId: exam.id }));
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      name,
      date,
      timeToSolve,
      filters,
      filtersComplete,
      boundaries,
      examId,
    } = this.state;

    /*
    if (examId !== null) {
      return <Redirect push to={`/exam/${examId}`} />;
    }
    */

    let totalPoints = 0;

    const totalQuestionCount = filters.reduce((tqcAcc, filter) => {
      const filterQuestionCount = filter.themes.reduce((fqcAcc, themeFilter) => {
        return fqcAcc + themeFilter.count;
      }, 0);
      return tqcAcc + filterQuestionCount;
    }, 0);

    return (
      <Grid spacing={2} container direction="row-reverse" style={{ height: '100%' }}>
        <Grid item xs={12} sm={3}>
          <ExamCreationSidebar
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
                <ExamCreationGradeBoundaries
                  maxPoints={totalPoints}
                  boundaries={boundaries}
                  onBoundariesUpdate={this.handleBoundariesUpdate}
                  onCancel={this.handleBoundariesCancel}
                  onSubmit={this.handleBoundariesSubmit}
                />
              ) : (
                <ExamCreationFilters
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

export default ExamCreator;
