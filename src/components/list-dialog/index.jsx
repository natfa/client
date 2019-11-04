import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';

const ListDialog = ({
  title,
  open,
  onClose,
  children,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <List>
      {children}
    </List>
  </Dialog>
);

ListDialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

ListDialog.defaultProps = {
  open: false,
};

export default ListDialog;
