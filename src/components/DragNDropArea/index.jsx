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

const StyledPaper = styled(Paper)`
  padding: 40px;
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
      classesItems: props.classSessions,
      collectionsItems: props.collectionList,
      // eslint-disable-next-line
      changedByUser: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.classSessions !== state.classesItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions,
        collectionsItems: props.collectionList,
        classesInCollectionItems: props.collectionList.class_sessions,
      };
    }
    if (props.collectionList !== state.collectionsItems && !state.changedByUser) {
      return {
        classesItems: props.classSessions,
        collectionsItems: props.collectionList,
        classesInCollectionItems: props.collectionList.class_sessions,
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
          changedByUser: true
        }));
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
          // eslint-disable-next-line
          changedByUser: true
        });
      }
    } else if (sourceId === 'classesDrop') {
      classesItems = reorder(
        this.state.classesItems,
        source.index,
        destination.index);
      this.setState({
        classesItems,
        // eslint-disable-next-line
        changedByUser: true
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
        // eslint-disable-next-line
        changedByUser: true
      });
    }
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
              <StyledPaper>
                <DraggableClassesList classesItems={classesItems} droppableId="classesDrop" />
              </StyledPaper>
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
            {collectionsItems ? (
              <List component="nav">
                {
                  collectionsItems.map(collectionsItem => (
                    <StyledPaper key={collectionsItem.title}>
                      <Typography component="h1" variant="h5" gutterBottom>{collectionsItem.title}</Typography>
                      <DraggableCollectionsList
                        collectionsItem={collectionsItem}
                        droppableId={collectionsItem.id}
                      />
                    </StyledPaper>
                  ))
                }
              </List>
            ) : (
              <Typography component="p" variant="h5" gutterBottom>
                  No collections
              </Typography>
            )
            }
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}

DragNDropArea.propTypes = {
  classSessions: PropTypes.arrayOf(PropTypes.any).isRequired,
  collectionList: PropTypes.arrayOf(PropTypes.any).isRequired
};
