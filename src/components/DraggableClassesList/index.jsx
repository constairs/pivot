import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Classes = styled.div`
  margin-bottom: 20px;
`;

const DraggableListItem = styled(ListItem)`
  color: #ffffff;
  background-color: #3f51b5;
  margin: 5px 0;
  position: relative;
  z-index: 5;
`;

export class DraggableClassesList extends React.Component {
  render() {
    const { classesItems, droppableId } = this.props;
    return (
      <Droppable droppableId={droppableId}>
        {
        // eslint-disable-next-line
        (provided, snapshot) => (
          <Classes>
            <List component="nav">
              <div ref={provided.innerRef}>
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
                {provided.placeholder}
              </div>
            </List>
          </Classes>
        )
      }
      </Droppable>
    );
  }
}
