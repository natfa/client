import React from 'react';

import Grid from '@material-ui/core/Grid';

import SubjectFilter from '../../components/subject-filter';

class TestCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
              theme: { id: '2', subjectId: '2', name: 'Geometry' },
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
  }

  render() {
    const { filters } = this.state;

    return (
      <Grid
        container
        direciton="column"
        spacing={9}
      >
        {filters.map((filter) => (
          <SubjectFilter
            key={filter.subject.id}
            subjectFilter={filter}
          />
        ))}
      </Grid>
    );
  }
}

export default TestCreator;
