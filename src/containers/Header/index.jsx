import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';


export const Head = ({ ...props }) => {
  const { logged } = props;
  return (
    <header>
      <nav>
        <ul>
          <Button variant="contained" color="primary">
            <Link href="/login" to="/login">
                Login
            </Link>
          </Button>
          {
            logged
              ? (
                <li>
                  <Link href="/profile" to="/profile">
                  Profile
                  </Link>
                </li>
              )
              : null
          }
        </ul>
      </nav>
    </header>
  );
};


Head.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export const Header = connect(
  state => ({ logged: state.persistedUser.logged })
)(Head);
