import React from 'react';
import PropTypes from 'prop-types';

import SubjectFilterComponent from '../../components/subject-filter';

import themeApi from '../../api/theme';

class SubjectFilterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: [],
    };
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

  handleThemeInsert() {
    alert('Inserting a theme');
  }

  handleThemeDelete(themeId) {
    alert(`Deleting theme with ${themeId}`);
  }

  handleCountChange(themeId, pointValue, value) {
    alert(`Changing ${themeId} ${pointValue} point to ${value}`);
  }

  render() {
    const { filter, onDelete } = this.props;

    return (
      <SubjectFilterComponent
        filter={filter}

        onDelete={onDelete}
        onThemeInsert={this.handleThemeInsert}
        onThemeDelete={this.handleThemeDelete}
        onCountChange={this.handleCountChange}
      />
    );
  }
}

SubjectFilterContainer.propTypes = {
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
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SubjectFilterContainer;
