import React from 'react';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import {
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const PaddedContainer = withStyles({
  root: {
    paddingTop: '96px',
  },
})(Container);

const withLayout = (Component) => (
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        drawerOpen: false,
      };

      this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
      this.setState((state) => ({ drawerOpen: !state.drawerOpen }));
    }

    render() {
      const { drawerOpen } = this.state;

      return (
        <>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar disableGutters>
              <IconButton onClick={this.toggleDrawer} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Company Logo
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            variant="temporary"
            onClose={this.toggleDrawer}
          >
            <List>
              <ListItem>
                <ListItemText>Some text as long as I need it to be, Im pretty sure :)</ListItemText>
              </ListItem>
            </List>
          </Drawer>

          <PaddedContainer>
            <Component {...this.props} />
          </PaddedContainer>
        </>
      );
    }
  }
);

export default withLayout;
