import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AddSubjectFilterDialog = ({
  open,
  onClose,

  subjects,
  onSubjectClick,
}) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>Изберете предмет</DialogTitle>
    <List>
      {subjects.map((subject) => (
        <ListItem
          button
          key={subject.id}
          onClick={() => {
            onSubjectClick(subject);
            onClose();
          }}
        >
          <ListItemText>{subject.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  </Dialog>
);

AddSubjectFilterDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubjectClick: PropTypes.func.isRequired,
};

AddSubjectFilterDialog.defaultProps = {
  open: false,
};

export default AddSubjectFilterDialog;
