import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';


export const Head = ({ ...props }) => {
  const { logged } = props;
  return (
    <header>
      <nav>
        <ul>
          {
            !logged
              ? (
                <li>
                  <Link href="/login" to="/login">
                    Login
                  </Link>
                </li>
              )
              : null
          }
          {
            logged
              ? (
                <li>
                  <Link href="/" to="/">
                    Collections
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
