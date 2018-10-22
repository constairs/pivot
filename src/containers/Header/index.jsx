import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import { connect } from 'react-redux';


export const Head = ({ ...props }) => {
  const { logged } = props;
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button>
          <Link href="/" to="/">
            Home
          </Link>
        </Button>
        {
            !logged
              ? (
                <Button color="primary" variant="outlined">
                  <Link href="/login" to="/login">
                  Login
                  </Link>
                </Button>
              )
              : null
          }
      </Toolbar>
    </AppBar>
  );
};


Head.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export const Header = connect(
  state => ({ logged: state.persistedUser.logged })
)(Head);
