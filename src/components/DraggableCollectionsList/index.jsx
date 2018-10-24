import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Collections = styled.div`
  margin-bottom: 20px;
  background-color: ${props => (props.isDraggingOver ? 'green' : '#ffffff')};
`;

const DraggableListItem = styled(ListItem)`
  color: #ffffff;
  background-color: ${props => (props.dragDelete ? '#cc0000' : '#3f51b5')};
  margin: 5px 0;
  position: relative;
  z-index: 5;
`;

export class DraggableCollectionsList extends React.Component {
  render() {
    const { collectionsItem, droppableId } = this.props;
    return (
      <Droppable droppableId={droppableId}>
        {
          // eslint-disable-next-line
          (provided, snapshot) => (
            <Collections isDraggingOver={snapshot.isDraggingOver}>
              <div ref={provided.innerRef}>
                {
                  collectionsItem.class_sessions ? (
                    <List component="nav">
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
                                  <DraggableListItem
                                    key={classItem.id}
                                    dragDelete={snapshot.isDragging && snapshot.draggingOver === null ? 'true' : false}
                                  >
                                    <ListItemText primary={classItem.title} />
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
