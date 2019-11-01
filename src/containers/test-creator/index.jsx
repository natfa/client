import React from 'react';

import Button from '@material-ui/core/Button';

import SubjectFilter from '../../components/subject-filter';

import './styles.css';

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
              theme: { id: '2', subjectId: '1', name: 'Geometry' },
              1: 10,
              2: 0,
              3: 0,
              4: 0,
              5: 1,
            },
          ],
        },
        {
          subject: { id: '2', name: 'Programming' },
          themeFilters: [
            {
              theme: { id: '3', subjectId: '2', name: 'Web development' },
              1: 10,
              2: 20,
              3: 10,
              4: 10,
              5: 5,
            },
            {
              theme: { id: '4', subjectId: '2', name: 'Software development' },
              1: 10,
              2: 0,
              3: 0,
              4: 0,
              5: 1,
            },
          ],
        },
        {
          subject: { id: '3', name: 'Art' },
          themeFilters: [
            {
              theme: { id: '5', subjectId: '3', name: 'LUL' },
              1: 10,
              2: 20,
              3: 10,
              4: 10,
              5: 5,
            },
            {
              theme: { id: '6', subjectId: '3', name: 'SOME ART SOME' },
              1: 10,
              2: 0,
              3: 0,
              4: 0,
              5: 1,
            },
          ],
        },
        {
          subject: { id: '4', name: 'Films' },
          themeFilters: [
            {
              theme: { id: '7', subjectId: '4', name: 'Film history of the spanish cinema' },
              1: 10,
              2: 20,
              3: 10,
              4: 10,
              5: 5,
            },
            {
              theme: { id: '8', subjectId: '4', name: 'SOME ART SOME' },
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
      <div className="test-creator">
        {filters.map((filter) => (
          <SubjectFilter
            key={filter.subject.id}
            subjectFilter={filter}
          />
        ))}

        <div>
          <Button
            startIcon="+"
            color="secondary"
            variant="outlined"
          >
            филтър
          </Button>
        </div>
      </div>
    );
  }
}

export default TestCreator;
