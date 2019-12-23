import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { Link as RouterLink, Redirect } from 'react-router-dom';

const WhiteIconButton = withStyles({
  root: {
    color: 'white',
  },
})(IconButton);

const PaddedContainer = withStyles({
  root: {
    paddingTop: '96px',
    height: '100vh',
  },
})(Container);

const ListItemLink = ({ to, text, onClick }) => {
  const link = React.forwardRef((props, ref) => (
    <RouterLink to={to} {...props} ref={ref} />
  ));

  return (
    <li>
      <ListItem onClick={onClick} button component={link}>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      goToHome: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    this.setState((state) => ({ ...state, goToHome: true }));
  }

  toggleDrawer() {
    this.setState((state) => ({ ...state, drawerOpen: !state.drawerOpen }));
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
            <ListItemLink
              onClick={this.toggleDrawer}
              key={page.pathname}
              to={page.pathname}
              text={page.name}
            />
          ))}
        </List>
      </Drawer>
    );
  }

  render() {
    const { goToHome } = this.state;
    const { children, pages } = this.props;

    if (goToHome) {
      return <Redirect push to="/" />;
    }

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            {pages
            && (
              <WhiteIconButton onClick={this.toggleDrawer} aria-label="menu">
                <MenuIcon />
              </WhiteIconButton>
            )}
            <Typography variant="h6">
              <MuiLink component={Link} to="/" color="inherit">
                Система за оценяване НАТФИЗ
              </MuiLink>
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
  pages: undefined,
};

export default Layout;
