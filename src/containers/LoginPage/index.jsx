import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { userLoginRequest } from '../../redux/user/actions';

const Preloader = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(255,255,255, .67);
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  transition: .2s;
  display: ${props => (props.fetching ? 'flex' : 'none')};
`;

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.userLoginRequest(this.state);
  }

  render() {
    const { classes } = this.props;
    const { userFetching } = this.props.user;
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <Preloader fetching={userFetching}>
          <CircularProgress className={classes.progress} size={50} />
        </Preloader>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.submitForm}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" value={email} onChange={this.changeInput} autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.changeInput}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Page = withStyles(styles)(SignIn);

export const LoginPage = connect(
  state => ({ user: state.persistedUser }),
  dispatch => ({ userLoginRequest: bindActionCreators(userLoginRequest, dispatch) })
)(Page);

SignIn.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};
