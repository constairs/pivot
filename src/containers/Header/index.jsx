import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogoutRequest } from '../../redux/user/actions';

const StyledLink = styled(Link)`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #000;
  margin-right: 15px;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  };
`;

export const Head = ({ ...props }) => {
  const { logged } = props;
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <StyledLink href="/" to="/">
            Home
        </StyledLink>
        {
          logged
            ? (
              <Button color="primary" variant="outlined" onClick={() => (props.userLogoutRequest())}>
                Logout
              </Button>
            )
            : null
        }
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
  userLogoutRequest: PropTypes.func.isRequired,
};

export const Header = connect(
  state => ({ logged: state.persistedUser.logged }),
  dispatch => ({
    userLogoutRequest: bindActionCreators(userLogoutRequest, dispatch)
  })
)(Head);
