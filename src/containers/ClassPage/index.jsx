import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getClassesRequest
} from '../../redux/classes/actions';

export class Page extends React.Component {
  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h1" variant="h5">Class</Typography>
        </Paper>
      </div>
    );
  }
}

export const ClassPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    getClassesRequest: bindActionCreators(getClassesRequest, dispatch)
  })
)(Page);
