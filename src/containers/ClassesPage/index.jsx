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
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../redux/store';

import {
  createClassRequest,
  getClassesRequest,
  createCollectionRequest,
  getCollectionsRequest,
  updateClassRequest,
  selectClass,
  selectCollection
} from '../../redux/classes/actions';

export class Page extends React.Component {
  state = {
    classModal: false,
    collectionModal: false,
    classTitle: '',
    collectonTitle: ''
  };

  componentDidMount() {
    this.props.getClassesRequest();
    this.props.getCollectionsRequest();
  }

  handleOpen = ({ currentTarget }) => {
    const { name } = currentTarget;
    this.setState({
      [name]: true
    });
  };

  handleClose = () => {
    this.setState({
      classModal: false,
      collectionModal: false,
    });
  };

  createClassForm = (e) => {
    e.preventDefault();
    const classData = {
      title: this.state.classTitle
    };
    this.props.createClassRequest(classData);
    this.setState({
      classModal: false,
      collectionModal: false,
      classTitle: ''
    });
  }

  createCollectionForm = (e) => {
    e.preventDefault();
    const collectionData = {
      title: this.state.collectonTitle
    };
    this.props.createCollectionRequest(collectionData);
    this.setState({
      classModal: false,
      collectionModal: false,
      collectonTitle: ''
    });
  }

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleEditClass = (formData) => {
    this.props.updateClassRequest(formData);
  }

  handleSelectClass = (classItem) => {
    this.props.selectClass(classItem);
    history.push('/class');
  }

  handleSelectCollection = (collectionItem) => {
    this.props.selectCollection(collectionItem);
    history.push('/collection');
  }

  render() {
    const {
      classModal, collectionModal, classTitle, collectonTitle
    } = this.state;
    const { classes } = this.props;
    const { classSessions, collectionList } = this.props.classSessions;

    return (
      <div>
        <CssBaseline />
        <Grid container spacing={16}>
          <Grid className={classes.grid} item xs={12}>
            <Paper>
              <Typography component="h1" variant="h5">
              Classes
              </Typography>
              {
                classSessions
                  ? (
                    <List component="nav">
                      {
                      classSessions.map(classItem => (
                        <ListItem
                          key={classItem.id}
                          button
                          onClick={() => this.handleSelectClass(classItem)}
                        >
                          <ListItemText primary={classItem.title} />
                        </ListItem>
                      ))
                    }
                    </List>
                  )
                  : (
                    <Typography component="p" variant="h5">
                    No classes
                    </Typography>
                  )
              }
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleOpen}
                name="classModal"
              >
                New Class
              </Button>
              <Typography component="h1" variant="h5">
                Collections
              </Typography>
              {collectionList
                ? (
                  <List component="nav">
                    {
                      collectionList.map(collectionItem => (
                        <ListItem
                          key={collectionItem.title}
                          button
                          onClick={() => this.handleSelectCollection(collectionItem)}
                        >
                          <ListItemText primary={collectionItem.title} />
                        </ListItem>
                      ))
                    }
                  </List>
                )
                : (
                  <Typography component="p" variant="h5">
                    No collections
                  </Typography>
                )
              }
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleOpen}
                name="collectionModal"
              >
                New Collection
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={classModal}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography component="h2" variant="h6" id="modal-title">
              Create class
            </Typography>
            <form onSubmit={this.createClassForm}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Class title</InputLabel>
                <Input id="classTitle" name="classTitle" autoComplete="title" value={classTitle} onChange={this.changeInput} autoFocus />
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

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={collectionModal}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography component="h2" variant="h6" id="modal-title">
              Create Collection
            </Typography>
            <form onSubmit={this.createCollectionForm}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="collectonTitle">Collection title</InputLabel>
                <Input id="collectonTitle" name="collectonTitle" autoComplete="title" value={collectonTitle} onChange={this.changeInput} autoFocus />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create Collection
              </Button>
            </form>
          </div>
        </Modal>
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
  grid: {
    padding: 20
  },
  typography: {
    useNextVariants: true,
  },
});

Page.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  classSessions: PropTypes.objectOf(PropTypes.any).isRequired,
  createClassRequest: PropTypes.func.isRequired,
  getClassesRequest: PropTypes.func.isRequired,
  createCollectionRequest: PropTypes.func.isRequired,
  getCollectionsRequest: PropTypes.func.isRequired,
  updateClassRequest: PropTypes.func.isRequired,
  selectClass: PropTypes.func.isRequired,
  selectCollection: PropTypes.func.isRequired
};

export const StyledPage = withStyles(styles)(Page);

export const ClassesPage = connect(
  state => ({ classSessions: state.classSessions }),
  dispatch => ({
    createClassRequest: bindActionCreators(createClassRequest, dispatch),
    getClassesRequest: bindActionCreators(getClassesRequest, dispatch),
    createCollectionRequest: bindActionCreators(createCollectionRequest, dispatch),
    getCollectionsRequest: bindActionCreators(getCollectionsRequest, dispatch),
    updateClassRequest: bindActionCreators(updateClassRequest, dispatch),
    selectClass: bindActionCreators(selectClass, dispatch),
    selectCollection: bindActionCreators(selectCollection, dispatch),
  })
)(StyledPage);
