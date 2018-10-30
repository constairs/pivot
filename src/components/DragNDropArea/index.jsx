import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import { DraggableClassesList } from '../DraggableClassesList';
import { DraggableCollectionsList } from '../DraggableCollectionsList';

const Collection = styled(Paper)`
  padding: 40px;
  margin-bottom: 20px;
`;

const CollectionTitle = styled(Typography)`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  };
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

export class DragNDropArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classesItems: props.classSessions || [],
      collectionsItems: props.collectionList || [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.classSessions !== state.classesItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions,
        collectionsItems: props.collectionList,
      };
    }
    if (props.collectionList !== state.collectionsItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions,
        collectionsItems: props.collectionList,
      };
    }
    return null;
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      const { source } = result;
      const sourceId = source.droppableId;
      if (sourceId !== 'classesDrop') {
        const sourceItem = this.state.collectionsItems.find(item => item.id === sourceId);
        const list = removeAndReorder(sourceItem.class_sessions, source.index);
        this.setState(state => ({
          collectionsItems: state.collectionsItems.map(
            item => (item.id === sourceId ? { ...item, class_sessions: list } : item)
          ),
        }));

        const classesIds = list.map(
          item => ({ id: item.id })
        );

        this.props.updateCollection({
          collectionId: sourceId,
          class_sessions: classesIds
        });
      }
      return;
    }

    const { source } = result;
    const { destination } = result;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    let { classesItems } = this.state;
    const { collectionsItems } = this.state;

    if (sourceId !== destinationId) {
      if (sourceId === 'classesDrop') {
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
        this.setState({
          collectionsItems: resList,
        });
        // this.props.updateCollection({ collectionId: destinationId, addedClasses: list });
        const classesIds = list.map(
          item => ({ id: item.id })
        );

        this.props.updateCollection({
          collectionId: destinationId,
          class_sessions: classesIds
        });
      }
    } else if (sourceId === 'classesDrop') {
      classesItems = reorder(
        this.state.classesItems,
        source.index,
        destination.index);
      this.setState({
        classesItems,
      });
    } else {
      const sourceItem = collectionsItems.find(item => item.id === sourceId);
      const reorderRes = reorder(
        sourceItem.class_sessions,
        source.index,
        destination.index);
      const resList = collectionsItems.map(
        item => (item.id === sourceId ? { ...item, class_sessions: reorderRes } : item)
      );
      this.setState({
        collectionsItems: resList,
      });
      // this.props.updateCollection({ collectionId: destinationId, addedClasses: reorderRes });
      const classesIds = reorderRes.map(
        item => ({ id: item.id })
      );

      this.props.updateCollection({
        collectionId: destinationId,
        class_sessions: classesIds
      });
    }
  }

  removeClassFromCollection = (removeData) => {
    const collectionItem = this.state.collectionsItems.find(
      item => item.id === removeData.collectionId
    );
    const classesList = collectionItem.class_sessions.filter(
      item => item.id !== removeData.classId
    );
    this.setState(state => ({
      collectionsItems: state.collectionsItems.map(
        item => (item.id === removeData.collectionId
          ? { ...item, class_sessions: classesList }
          : item
        )
      ),
    }));


    const classesIds = classesList.map(
      item => ({ id: item.id })
    );

    this.props.updateCollection({
      collectionId: removeData.collectionId,
      class_sessions: classesIds
    });
  }

  handleClick = ({ currentTarget }) => {
    this.props.onClickAddBtn(currentTarget);
  }

  clickClassItem = (classItem) => {
    this.props.onClickClass(classItem);
  }

  render() {
    const {
      classesItems,
      collectionsItems,
    } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Typography color="primary" component="h1" variant="h4" gutterBottom>
              Classes
            </Typography>
            {
              classesItems ? (
                <DraggableClassesList clickEditClass={this.clickClassItem} classesItems={classesItems} droppableId="classesDrop" />
              ) : (
                <Typography component="p" variant="h5" gutterBottom>
                  No classes
                </Typography>
              )
            }
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              name="classModal"
            >
              New Class
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography color="primary" component="h1" variant="h4" gutterBottom>
              Collections
            </Typography>
            {
              collectionsItems ? (
                <List component="nav">
                  {
                    collectionsItems.map(collectionsItem => (
                      <Collection key={collectionsItem.title}>
                        <CollectionTitle component="h1" variant="h5" gutterBottom onClick={() => (this.props.onClickCollection(collectionsItem))}>{collectionsItem.title}</CollectionTitle>
                        <DraggableCollectionsList
                          collectionsItem={collectionsItem}
                          droppableId={collectionsItem.id}
                          removeClass={this.removeClassFromCollection}
                        />
                      </Collection>
                    ))
                  }
                </List>
              ) : (
                <Typography component="p" variant="h5" gutterBottom>
                No collections
                </Typography>
              )
            }
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              name="collectionModal"
            >
              New Collection
            </Button>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}

DragNDropArea.propTypes = {
  classSessions: PropTypes.arrayOf(PropTypes.any).isRequired,
  collectionList: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickAddBtn: PropTypes.func.isRequired,
  updateCollection: PropTypes.func.isRequired,
  onClickClass: PropTypes.func.isRequired,
  onClickCollection: PropTypes.func.isRequired
};
