import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SubjectFilterComponent from '../../components/subject-filter';
import ListDialog from '../../components/list-dialog';

import themeApi from '../../api/theme';

class SubjectFilterContainer extends React.Component {
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

  handleCountChange(themeId, pointValue, value) {
    if (Number.isNaN(Number(value))) return;

    const { filter, onUpdate } = this.props;
    const numberValue = Number(value);

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

    return (
      <>
        <SubjectFilterComponent
          filter={filter}

          canAddThemes={unusedThemes.length !== 0}
          onDelete={onDelete}
          onThemeInsert={this.openDialog}
          onThemeDelete={this.handleThemeDelete}
          onCountChange={this.handleCountChange}
        />
        <ListDialog
          open={dialogOpen}
          title="Изберете тема"
          onClose={this.closeDialog}
        >
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
        </ListDialog>
      </>
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
