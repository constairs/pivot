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

const Classes = styled.div`
  margin-bottom: 20px;
`;

const Collections = styled.div`
  margin-bottom: 20px;
`;

const DraggableListItem = styled(ListItem)`
  background-color: #3f51b5;
  color: #ffffff;
  margin: 5px 0;
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
  const destinationResult = Array.from(destinationList);

  if (destinationResult.find(item => item.id === sourceResult[sourceStartIndex].id)) {
    console.log('Class already in collection!');
    return destinationResult;
  }

  destinationResult.splice(destinationEndIndex, 0, sourceResult[sourceStartIndex]);

  return destinationResult;
};

const removeAndReorder = (
  sourceList,
  sourceStartIndex) => {
  const sourceResult = Array.from(sourceList);
  sourceResult.splice(sourceStartIndex, 1);
  return sourceResult;
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
      changedByUser: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.classSessions.classSessions !== state.classesItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions.classSessions,
        collectionsItems: props.classSessions.collectionList,
        classesInCollectionItems: props.classSessions.collectionList.class_sessions,
      };
    }
    if (props.classSessions.collectionList !== state.collectionsItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions.classSessions,
        collectionsItems: props.classSessions.collectionList,
        classesInCollectionItems: props.classSessions.collectionList.class_sessions,
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

    const { source } = result;
    const { destination } = result;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    let { classesItems } = this.state;
    const { collectionsItems } = this.state;

    if (sourceId !== destinationId) {
      if (sourceId === 'droppable1') {
        const sourceList = classesItems;
        const destinationItem = collectionsItems.find(item => item.id === destinationId);
        const list = moveAndReorder(
          sourceList,
          source.index,
          destinationItem.class_sessions,
          destination.index
        );
        const resList = collectionsItems.map(
          item => (item.id === destinationId ? { ...item, class_sessions: list } : item)
        );
        this.setState({ collectionsItems: resList, changedByUser: true });
      } else {
        const sourceItem = collectionsItems.find(item => item.id === sourceId);
        const list = removeAndReorder(sourceItem.class_sessions, source.index);
        const resList = collectionsItems.map(
          item => (item.id === sourceId ? { ...item, class_sessions: list } : item)
        );
        this.setState({ collectionsItems: resList, changedByUser: true });
      }
    } else if (sourceId === 'droppable1') {
      classesItems = reorder(
        this.state.classesItems,
        source.index,
        destination.index);
      this.setState({ classesItems, changedByUser: true });
    } else if (sourceId !== 'droppable1' && destinationId === 'removeArea') {
      const sourceItem = collectionsItems.find(item => item.id === sourceId);
      const reorderRes = reorder(
        sourceItem.class_sessions,
        source.index,
        destination.index);
      const resList = collectionsItems.map(
        item => (item.id === sourceId ? { ...item, class_sessions: reorderRes } : item)
      );
      this.setState({ collectionsItems: resList, changedByUser: true });
    }
  }

  render() {
    const {
      classModal,
      collectionModal,
      classTitle,
      collectonTitle,
      classesItems,
      collectionsItems,
    } = this.state;
    const { classes } = this.props;
    const { classesFetching } = this.props.classSessions;

    return (
      <div>
        <Preloader fetching={classesFetching}>
          <CircularProgress className={classes.progress} size={50} />
        </Preloader>
        <CssBaseline />
        <StyledPaper>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {/* <Droppable droppableId="removeArea">
              {
                (provided, snapshot) => (
                  <div ref={provided.innerRef}> */}
            <Grid container spacing={16}>
              {/* {provided.placeholder} */}
              <Grid className={classes.grid} item xs={6}>
                <Typography color="primary" component="h1" variant="h4" gutterBottom>
                  Classes
                </Typography>
                {
                classesItems
                  ? (
                    <StyledPaper>
                      <Droppable droppableId="droppable1">
                        {
                          // eslint-disable-next-line
                          (provided, snapshot) => (
                            <Classes>
                              <List
                                component="nav"
                              >
                                <div
                                  ref={provided.innerRef}
                                >
                                  {
                            classesItems.map((classItem, index) => (
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
                                      <DraggableListItem
                                        key={classItem.id}
                                        onDrag={snapshot.isDraggingOver}
                                      >
                                        <ListItemText primary={classItem.title} />
                                      </DraggableListItem>
                                      {provided.placeholder}
                                    </div>
                                  )}
                              </Draggable>
                            ))
                          }
                                </div>
                              </List>
                            </Classes>
                          )}
                      </Droppable>
                    </StyledPaper>
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
                <Typography color="primary" component="h1" variant="h4" gutterBottom>
                  Collections
                </Typography>
                {collectionsItems
                  ? (
                    <List component="nav">
                      {
                      collectionsItems.map(collectionsItem => (
                        <StyledListItem
                          key={collectionsItem.title}
                        >
                          <Typography component="h1" variant="h5" gutterBottom>{collectionsItem.title}</Typography>
                          <Collections>
                            <StyledPaper>
                              <Droppable droppableId={collectionsItem.id}>
                                {
                                // eslint-disable-next-line
                                  (provided, snapshot) => (
                                    <div ref={provided.innerRef}>
                                      {
                                        collectionsItem.class_sessions
                                          ? (
                                            <List
                                              component="nav"
                                            >
                                              {
                                                collectionsItem.class_sessions.map((classItem, index) => (
                                                  <Draggable key={classItem.id} draggableId={`${collectionsItem.id}${classItem.id}`} index={index}>
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
                                                      )
                                                    }
                                                  </Draggable>
                                                ))
                                                }
                                            </List>
                                          ) : (
                                            <Typography component="p" variant="h5" gutterBottom>
                                              No classes in this collection
                                            </Typography>
                                          )
                                      }
                                      {provided.placeholder}
                                    </div>
                                  )
                                }
                              </Droppable>
                            </StyledPaper>
                          </Collections>

                        </StyledListItem>
                      ))
                    }
                    </List>
                  )
                  : (
                    <Typography component="p" variant="h5" gutterBottom>
                      No collections
                    </Typography>
                  )
            }
              </Grid>
            </Grid>
            {/* </div>
                )
              } */}
            {/* </Droppable> */}
          </DragDropContext>
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
