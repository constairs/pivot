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
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

const StyledPaper = styled(Paper)({
  padding: '40px',
});

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
  opacity: ${props => (props.fetching ? '100' : '0')};
  display: none;
`;

const StyledListItem = styled(ListItem)`
  display: block!important;
`;

const reorder = (
  list,
  startIndex,
  endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveAndReorder = (
  sourceList,
  sourceStartIndex,
  destinationList,
  destinationEndIndex) => {
  const sourceResult = Array.from(sourceList);
  // designate the draggable to be removed from sourceResult
  const [removed] = sourceResult.splice(sourceStartIndex, 1);
  // because we used splice, sourceresult no longer contains the element that was moved out of it

  const destinationResult = Array.from(destinationList);
  // add the draggable that we removed from the sourceList into the destinationResult
  destinationResult.splice(destinationEndIndex, 0, removed);

  // return the two arrays
  // sourceResult should be the source droppable but without the draggable that got moved
  // destinationResult should be the destination droppable with the moved draggable added
  // in the correct position
  return [sourceResult, destinationResult];
};

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classModal: false,
      collectionModal: false,
      classTitle: '',
      collectonTitle: '',
      classesItems: props.classSessions.classSessions,
      collectionsItems: props.classSessions.collectionList,
    };
  }

  static getDervivedStateFromProps(props, state) {
    if (props.classSessions.classSessions !== state.classesItems) {
      return {
        classesItems: props.classSessions.classSessions,
        collectionsItems: props.classSessions.collectionList
      };
    }
    if (props.classSessions.collections !== state.collectionsItems) {
      return {
        classesItems: props.classSessions.classSessions,
        collectionsItems: props.classSessions.collectionList
      };
    }
    return null;
  }

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

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // prepare to compare the source to the destination
    const { source } = result;
    const { destination } = result;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    console.log(`moving from ${sourceId} to ${destinationId}`);

    // just a short form of the two item arrays from state
    let { classesItems } = this.state;
    let { collectionsItems } = this.state;

    // If the place we moved the draggable out of
    // is different from the place we moved it to, execute this
    if (sourceId !== destinationId) {
      console.log(`Hey, looks like source droppable (${sourceId}) is different from destination droppable (${destinationId})`);
      // we only have two lists- droppable1 and droppable2
      // so if the source is droppable1, then the destination is droppable2
      if (sourceId === 'droppable1') {
        const sourceList = classesItems;
        const destinationList = collectionsItems;
        // Note: source.index and destination.index are generated onDragEnd-
        // source.index is the index where the dragged item started out in the source droppable
        // destination.index is the index where the dragged
        // item was placed by the user, in the destination droppable
        // after we pass the parameters to moveAndReorder, we will get back an array of two arrays
        // lists[0] will be the source droppable with the moved draggable taken out
        // lists[1] will be the target droppable with
        // the moved draggable added in at the correct index
        const lists = moveAndReorder(
          sourceList,
          source.index,
          destinationList,
          destination.index
        );
        // so now we set the state to our two lists
        this.setState({ classesItems: lists[0], collectionsItems: lists[1] });
      } else if (sourceId === 'droppable2') {
        const sourceList = collectionsItems;
        const destinationList = classesItems;
        const lists = moveAndReorder(
          sourceList,
          source.index,
          destinationList,
          destination.index
        );

        this.setState({ collectionsItems: lists[0], classesItems: lists[1] });
      }
    } else { // If it was moved within the same list, then just reorder that list
      console.log('Source is the same as destination');
      console.log(`reordering ${sourceId}`);
      if (sourceId === 'droppable1') {
        classesItems = reorder(
          this.state.classesItems,
          source.index,
          destination.index);

        this.setState({ classesItems });
      } else if (sourceId === 'droppable2') {
        collectionsItems = reorder(
          this.state.collectionsItems,
          source.index,
          destination.index);

        this.setState({ collectionsItems });
      }
    }
  }

  render() {
    const {
      classModal,
      collectionModal,
      classTitle,
      collectonTitle,
      // classesItems,
      // collectionsItems
    } = this.state;
    const { classes } = this.props;
    const { classSessions, collectionList, classesFetching } = this.props.classSessions;

    return (
      <div>
        <Preloader fetching={classesFetching}>
          <CircularProgress className={classes.progress} size={50} />
        </Preloader>
        <CssBaseline />
        <StyledPaper>
          <Grid container spacing={16}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Grid className={classes.grid} item xs={6}>
                <Typography component="h1" variant="h5" gutterBottom>
              Classes
                </Typography>
                {
                classSessions
                  ? (
                    <Droppable droppableId="droppable1">
                      {(provided, snapshot) => (
                        <div
                          inverted={snapshot.isDraggingOver}
                          tertiary={snapshot.isDraggingOver}
                        >
                          <List
                            component="nav"
                          >
                            <div
                              ref={provided.innerRef}
                            >
                              {
                            classSessions.map((classItem, index) => (
                              <Draggable
                                key={classItem.id}
                                draggableId={classItem.id}
                                index={index}
                              >
                                {
                                  // eslint-disable-next-line
                                  (provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <ListItem
                                        key={classItem.id}
                                      >
                                        <ListItemText primary={classItem.title} />
                                      </ListItem>
                                      {provided.placeholder}
                                    </div>
                                  )}
                              </Draggable>
                            ))
                          }
                            </div>
                          </List>
                        </div>
                      )}
                    </Droppable>
                  )
                  : (
                    <Typography component="p" variant="h5" gutterBottom>
                    No classes
                    </Typography>
                  )
              }
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={this.handleOpen}
                  name="classModal"
                >
                New Class
                </Button>
              </Grid>
              <Grid item xs={6}>
                {collectionList
                  ? (
                    <List component="nav">
                      {
                      collectionList.map(collectionsItem => (
                        <StyledListItem
                          key={collectionsItem.title}
                        >
                          <Typography component="h1" variant="h5" gutterBottom>{collectionsItem.title}</Typography>
                          <div>
                            {
                              collectionsItem.class_sessions
                                ? (
                                  <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                      <div
                                        inverted={snapshot.isDraggingOver}
                                        tertiary={snapshot.isDraggingOver}
                                      >
                                        <List
                                          component="nav"
                                        >
                                          <div ref={provided.innerRef}>
                                            {
                                          collectionsItem.class_sessions.map((classItem, index) => (
                                            <Draggable key={classItem.id} draggableId={`droppable2${classItem.id}`} index={index}>
                                              {
                                                // eslint-disable-next-line
                                                (provided, snapshot) => (
                                                  <div>
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                    >
                                                      <ListItem
                                                        key={classItem.id}
                                                      >
                                                        <ListItemText primary={classItem.title} />
                                                      </ListItem>
                                                    </div>
                                                    {provided.placeholder}
                                                  </div>
                                                )}
                                            </Draggable>
                                          ))
                                        }
                                          </div>
                                        </List>
                                      </div>
                                    )}
                                  </Droppable>
                                )
                                : (
                                  <Typography component="p" variant="h5" gutterBottom>
                              No classes in this collection
                                  </Typography>
                                )
                          }
                          </div>

                        </StyledListItem>
                      ))
                    }
                    </List>
                  )
                  : null
            }
              </Grid>
            </DragDropContext>
          </Grid>
        </StyledPaper>

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

export const ClassesPageDragable = connect(
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
