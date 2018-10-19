import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ClassItem } from '../../components/ClassItem';

import {
  createClassRequest,
  getClassesRequest
} from '../../redux/classes/actions';

export class Page extends React.Component {
  state = {
    modalOpen: false,
    title: ''
  };

  componentDidMount() {
    this.props.getClassesRequest();
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  createClassForm = (e) => {
    e.preventDefault();
    this.setState({
      modalOpen: false,
      title: ''
    });
    const classData = {
      title: this.state.title
    };
    this.props.createClassRequest(classData);
  }

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { title } = this.state;
    const { classes, classesList } = this.props;

    const classSession = {
      end_time: null,
      id: '0ce98a81-9250-4d75-87b4-1f66c7306110',
      instructor: {
        avatar_url: 'http://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
        email: 'josh@trainwithpivot.com',
        first_name: 'Joshua',
        id: '5aa214c9-8f44-425f-b82a-e6de17ca81e9',
        last_name: 'Augustin',
        username: 'august'
      },
      media: [
        {
          index: 0,
          type_id: 9,
          url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        },
        {
          index: 0,
          type_id: 11,
          url: 'https://s3-us-west-1.amazonaws.com/pivot-development/result.jsonl'
        }
      ],
      start_time: null,
      title: 'My New Plan Again',
      workout_plan_id: '636e2214-fc52-42c8-a155-f4215ed4ce2a'
    };

    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h1" variant="h5">
              Classes
          </Typography>
          <ClassItem classSession={classSession} />
          <div>
            {classesList
              ? (
                <ul>
                  {
              classesList.map(classItem => (<li>{classItem.title}</li>))
            }
                </ul>
              )
              : (
                <Typography component="p" variant="h5">
                  No classes
                </Typography>
              )
          }
          </div>
          <Typography component="h1" variant="h5">
              Collections
          </Typography>
          <div />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleOpen}
          >
            New Class
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <Typography component="h2" variant="h6" id="modal-title">
              Create class
              </Typography>
              <form onSubmit={this.createClassForm}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="title">Class title</InputLabel>
                  <Input id="title" name="title" autoComplete="title" value={title} onChange={this.changeInput} autoFocus />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </form>
            </div>
          </Modal>
        </Paper>
      </div>
    );
  }
}


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    left: '50%',
    top: '50%',
    marginTop: theme.spacing.unit * -15,
    marginLeft: theme.spacing.unit * -25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

Page.defaultProps = {
  classesList: []
};

Page.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  createClassRequest: PropTypes.func.isRequired,
  getClassesRequest: PropTypes.func.isRequired,
  classesList: PropTypes.arrayOf(PropTypes.any)
};

export const StyledPage = withStyles(styles)(Page);

export const ClassesPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    createClassRequest: bindActionCreators(createClassRequest, dispatch),
    getClassesRequest: bindActionCreators(getClassesRequest, dispatch)
  })
)(StyledPage);
