import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';

import {
  updateClassRequest,
} from '../../redux/classes/actions';

export class Page extends React.Component {
  state = {
    classSelect: '',
  };

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickEdit = () => {
    history.push('/edit');
  }

  handleEditClass = (formData) => {
    this.props.updateClassRequest(formData);
  }

  render() {
    const { currentCollection, classSessions } = this.props.classSessions;
    const { classSelect } = this.state;

    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h2" variant="h6">
            {currentCollection.title}
          </Typography>
          <Typography component="h2" variant="h6">
            Add class to collection
          </Typography>
          <FormControl>
            <InputLabel htmlFor="class">Add class</InputLabel>
            <Select
              value={classSelect}
              onChange={this.handleChange}
              inputProps={{
                name: 'class',
                id: 'class',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {classSessions.map(classItem => (
                <MenuItem key={classItem.id} value={classItem.id}>
                  {classItem.title}
                </MenuItem>
              ))
                }
            </Select>
          </FormControl>
        </Paper>
      </div>
    );
  }
}

Page.propTypes = {
  updateClassRequest: PropTypes.func.isRequired,
  classSessions: PropTypes.objectOf(PropTypes.any).isRequired
};

export const CollectionPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    updateClassRequest: bindActionCreators(updateClassRequest, dispatch),
  })
)(Page);
