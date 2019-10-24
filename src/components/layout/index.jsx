import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const PaddedContainer = withStyles({
  root: {
    paddingTop: '96px',
  },
})(Container);


class Layout extends React.Component {
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

  renderDrawer() {
    const { drawerOpen } = this.state;
    const { pages } = this.props;

    return (
      <Drawer
        anchor="left"
        open={drawerOpen}
        variant="temporary"
        onClose={this.toggleDrawer}
      >
        <List>
          {pages.map((page) => (
            <ListItem key={page.pathname} button>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }

  render() {
    const { children, pages } = this.props;

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            {pages
            && (
              <IconButton onClick={this.toggleDrawer} aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">
              Company Logo
            </Typography>
          </Toolbar>
        </AppBar>

        {pages
        && this.renderDrawer()}

        <PaddedContainer>
          {children}
        </PaddedContainer>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object),
};

Layout.defaultProps = {
  pages: [],
};

export default Layout;
