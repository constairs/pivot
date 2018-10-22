import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';
import { ClassEditItem } from '../../components/ClassEditItem';

import {
  updateClassRequest,
} from '../../redux/classes/actions';

export class Page extends React.Component {
  state = {
    modalOpen: false
  }

  handleOpen = () => {
    this.setState({
      modalOpen: true
    });
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  }

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
    this.setState(
      {
        modalOpen: false
      }
    );
  }

  render() {
    const { currectClass } = this.props.classSessions;

    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h2" variant="h6" id="modal-title">
            {currectClass.title}
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleOpen}
          >
            Edit
          </Button>
        </Paper>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <ClassEditItem
            onSubmitEditForm={this.handleEditClass}
            classSession={currectClass}
          />
        </Modal>
      </div>
    );
  }
}

Page.propTypes = {
  updateClassRequest: PropTypes.func.isRequired,
  classSessions: PropTypes.objectOf(PropTypes.any).isRequired
};

export const ClassPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    updateClassRequest: bindActionCreators(updateClassRequest, dispatch),
  })
)(Page);
