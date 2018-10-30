import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { history } from '../../redux/store';
import { ClassEditItem } from '../../components/ClassEditItem';

import {
  updateClassRequest,
  deleteClassRequest
} from '../../redux/classes/actions';

const StyledPaper = styled(Paper)({
  padding: '40px',
});

const Buttons = styled.div`
  margin-top: 15px;
  button {
    margin-right: 15px;
  }
`;

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

  clickDelete = () => {
    this.props.deleteClassRequest(this.props.classSessions.currectClass.id);
  }

  render() {
    const { currectClass, classesFetching } = this.props.classSessions;

    return (
      <div>
        <Preloader fetching={classesFetching}>
          <CircularProgress size={50} />
        </Preloader>
        <CssBaseline />
        <StyledPaper>
          <Typography component="h2" variant="h6" id="modal-title">
            {currectClass.title}
          </Typography>
          <Buttons>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={this.handleOpen}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={this.clickDelete}
            >
              Delete
            </Button>
          </Buttons>
        </StyledPaper>

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
  deleteClassRequest: PropTypes.func.isRequired,
  classSessions: PropTypes.objectOf(PropTypes.any).isRequired
};

export const ClassPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    updateClassRequest: bindActionCreators(updateClassRequest, dispatch),
    deleteClassRequest: bindActionCreators(deleteClassRequest, dispatch)
  })
)(Page);
