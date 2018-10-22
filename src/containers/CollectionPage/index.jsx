import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateCollectionRequest,
} from '../../redux/classes/actions';

export class Page extends React.Component {
  state = {
    classValue: '',
    classesList: []
  };

  handleChangeSelect = ({ target }) => {
    const { value } = target;
    this.setState({
      classValue: value,
      classesList: [...this.state.classesList, { title: value.title, id: value.id }]
    });
  }

  removeClass = (id) => {
    this.setState({
      classesList: this.state.classesList.filter(classItem => (classItem.id !== id)),
    });
  };

  handleAddClass = (e) => {
    e.preventDefault();
    const data = {
      class_sessions: this.state.classesList,
    };
    this.props.updateCollectionRequest(data);
  }

  render() {
    const { currentCollection, classSessions } = this.props.classSessions;
    const { classValue, classesList } = this.state;

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
          <form onSubmit={this.handleAddClass}>
            <FormControl>
              <InputLabel htmlFor="classValue">Add</InputLabel>

              <Select
                value={classValue}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'classValue',
                  id: 'classValue',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {classSessions.map(classItem => (
                  <MenuItem key={classItem.id} value={classItem}>
                    {classItem.title}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>
            <div>
              {
                classesList.map(classItem => (
                  <div key={classItem.id}>
                    {classItem.title}
                    <button
                      type="button"
                      onClick={() => this.removeClass(classItem.id)}
                    >
                      x
                    </button>
                  </div>
                ))
              }
            </div>
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              name="classModal"
            >
              Add class
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

Page.propTypes = {
  updateCollectionRequest: PropTypes.func.isRequired,
  classSessions: PropTypes.objectOf(PropTypes.any).isRequired
};

export const CollectionPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    updateCollectionRequest: bindActionCreators(updateCollectionRequest, dispatch),
  })
)(Page);
