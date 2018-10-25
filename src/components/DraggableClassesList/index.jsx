import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Classes = styled(Paper)`
  padding: 40px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const DraggableListItem = styled(ListItem)`
  background-color: #3f51b5;
  border-radius: 3px;
  margin: 5px 0;
  position: relative;
  z-index: 5;
`;

const DraggableListItemText = styled(ListItemText)`
  > span {
    color: #ffffff;
  }
`;

export class DraggableClassesList extends React.Component {
  render() {
    const { classesItems, droppableId } = this.props;
    return (
      <Classes>
        <Droppable droppableId={droppableId}>
          {
            // eslint-disable-next-line
            (provided, snapshot) => (
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
                                <DraggableListItemText primary={classItem.title} />
                                <IconButton onClick={() => (
                                  this.props.clickEditClass(classItem)
                                )}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
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
            )
          }
        </Droppable>
      </Classes>
    );
  }
}


DraggableClassesList.propTypes = {
  clickEditClass: PropTypes.func.isRequired
};
