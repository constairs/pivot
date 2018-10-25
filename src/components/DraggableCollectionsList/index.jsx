import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Collections = styled.div`
  margin-bottom: 20px;
  background-color: ${props => (props.isDraggingOver ? '#66BB6A' : '#ffffff')};
`;

const DraggableListItem = styled(ListItem)`
  color: #ffffff;
  background-color: ${props => (props.dragDelete ? '#EF5350' : '#3f51b5')};
  margin: 5px 0;
  border-radius: 4px;
  position: relative;
  z-index: 5;
`;

const DraggableListItemText = styled(ListItemText)`
  > span {
    color: #ffffff;
  }
`;

export class DraggableCollectionsList extends React.Component {
  render() {
    const { collectionsItem, droppableId } = this.props;
    return (
      <Droppable droppableId={droppableId}>
        {
          (provided, snapshot) => (
            <Collections isDraggingOver={snapshot.isDraggingOver}>
              <div ref={provided.innerRef}>
                {
                  collectionsItem.class_sessions ? (
                    <List component="nav">
                      {
                        collectionsItem.class_sessions.map((classItem, index) => (
                          <Draggable key={classItem.id} draggableId={`${collectionsItem.id}${classItem.id}`} isDragDisabled index={index}>
                            {
                              // eslint-disable-next-line
                              provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <DraggableListItem
                                    key={classItem.id}
                                  >
                                    <DraggableListItemText primary={classItem.title} />
                                    <IconButton
                                      onClick={() => (
                                        this.props.removeClass({
                                          collectionId: collectionsItem.id,
                                          classId: classItem.id
                                        })
                                      )}
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </DraggableListItem>
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
            </Collections>
          )
        }
      </Droppable>
    );
  }
}

DraggableCollectionsList.propTypes = {
  removeClass: PropTypes.func.isRequired
};
