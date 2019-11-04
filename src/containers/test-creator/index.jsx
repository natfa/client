import React from 'react';

import Grid from '@material-ui/core/Grid';

import TestCreationFilters from '../test-creation-filters';

class TestCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
    };

    this.handleFilterInsert = this.handleFilterInsert.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleFilterDelete = this.handleFilterDelete.bind(this);
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

  render() {
    const { filters } = this.state;

    return (
      <Grid spacing={2} container direction="row-reverse">
        <Grid item xs={12} sm={3}>
          <div>
            <p>Sidebar</p>
          </div>
        </Grid>

        <Grid item xs={12} sm={9}>
          <TestCreationFilters
            filters={filters}
            onFilterInsert={this.handleFilterInsert}
            onFilterUpdate={this.handleFilterUpdate}
            onFilterDelete={this.handleFilterDelete}
          />
        </Grid>
      </Grid>
    );
  }
}

export default TestCreator;
