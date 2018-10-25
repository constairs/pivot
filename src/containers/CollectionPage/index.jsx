import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import {
  updateCollectionRequest,
} from '../../redux/classes/actions';

const StyledChip = styled(Chip)({
  marginTop: '10px',
  marginLeft: '5px',
  marginRight: '5px'
});

const StyledPaper = styled(Paper)({
  padding: '40px'
});

const StyledSelect = styled(Select)({
  width: '200px'
});

export class Page extends React.Component {
  state = {
    classValue: '',
    classesList: []
  };

  handleChangeSelect = ({ target }) => {
    const { value } = target;
    if (value) {
      this.setState(state => ({
        classesList: [...state.classesList, { title: value.title, id: value.id }],
        classValue: ''
      })
      );
    }
  }

  removeClass = (id) => {
    this.setState(
      state => ({
        classesList: state.classesList.filter(classItem => (classItem.id !== id))
      })
    );
  };

  handleAddClass = (e) => {
    e.preventDefault();
    const data = {
      class_sessions: this.state.classesList.map(classItem => ({ id: classItem.id })),
    };
    this.props.updateCollectionRequest(data);
    this.setState({
      classesList: [],
      classValue: ''
    });
  }

  render() {
    const { currentCollection, classSessions } = this.props.classSessions;
    const { classValue, classesList } = this.state;

    return (
      <div>
        <CssBaseline />
        <StyledPaper>
          <Typography component="h1" variant="h5" gutterBottom>
            {currentCollection.title}
          </Typography>

          {
            currentCollection.class_sessions
              ? (
                <List component="div">
                  {
                    currentCollection.class_sessions.map(classItem => (
                      <ListItem
                        key={classItem.id}
                        button
                      >
                        <ListItemText primary={classItem.title} />
                      </ListItem>
                    ))
                  }
                </List>
              )
              : null
          }

          <Typography component="h2" variant="h6">
            Add class to collection
          </Typography>
          <form onSubmit={this.handleAddClass}>
            <FormControl>
              <InputLabel htmlFor="classValue">Add</InputLabel>

              <StyledSelect
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
              </StyledSelect>
            </FormControl>
            <div>
              {
                classesList.map(classItem => (
                  <StyledChip
                    key={classItem.id}
                    label={classItem.title}
                    onDelete={() => this.removeClass(classItem.id)}
                  />
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
        </StyledPaper>
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
    updateCollectionRequest: bindActionCreators(updateCollectionRequest, dispatch)
  })
)(Page);
