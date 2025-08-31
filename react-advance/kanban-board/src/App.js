import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css';

const initialData = {
  columns: {
    todo: {
      name: 'Todo',
      items: [
        { id: '1', content: 'Design UI' },
        { id: '2', content: 'Setup project' },
        { id: '3', content: 'Write documentation' },
      ],
    },
    inprogress: {
      name: 'In Progress',
      items: [
        { id: '4', content: 'Develop features' },
      ],
    },
    done: {
      name: 'Done',
      items: [
        { id: '5', content: 'Project planning' },
      ],
    },
  },
};


function App() {
  const [data, setData] = useState(initialData);
  const [newColName, setNewColName] = useState("");
  const [newTask, setNewTask] = useState({}); // { colId: taskText }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Same column
    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId];
      const copiedItems = Array.from(column.items);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setData({
        columns: {
          ...data.columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        },
      });
    } else {
      // Move between columns
      const sourceCol = data.columns[source.droppableId];
      const destCol = data.columns[destination.droppableId];
      const sourceItems = Array.from(sourceCol.items);
      const destItems = Array.from(destCol.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setData({
        columns: {
          ...data.columns,
          [source.droppableId]: {
            ...sourceCol,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destCol,
            items: destItems,
          },
        },
      });
    }
  };

  // Add new column
  const handleAddColumn = (e) => {
    e.preventDefault();
    const colId = newColName.trim().toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    if (!newColName.trim()) return;
    setData((prev) => ({
      columns: {
        ...prev.columns,
        [colId]: {
          name: newColName,
          items: [],
        },
      },
    }));
    setNewColName("");
  };

  // Add new task to column
  const handleAddTask = (e, colId) => {
    e.preventDefault();
    const taskText = (newTask[colId] || '').trim();
    if (!taskText) return;
    setData(prev => {
      const newId = Date.now().toString() + Math.random().toString(36).slice(2, 6);
      return {
        columns: {
          ...prev.columns,
          [colId]: {
            ...prev.columns[colId],
            items: [
              ...prev.columns[colId].items,
              { id: newId, content: taskText },
            ],
          },
        },
      };
    });
    setNewTask(nt => ({ ...nt, [colId]: '' }));
  };

  // Delete column
  const handleDeleteColumn = (colId) => {
    setData(prev => {
      const newCols = { ...prev.columns };
      delete newCols[colId];
      return { columns: newCols };
    });
  };

  // Delete task
  const handleDeleteTask = (colId, taskId) => {
    setData(prev => ({
      columns: {
        ...prev.columns,
        [colId]: {
          ...prev.columns[colId],
          items: prev.columns[colId].items.filter(item => item.id !== taskId),
        },
      },
    }));
  };

  return (
    <div className="kanban-root">
      <h1 className="kanban-title">Kanban Board</h1>
      <form onSubmit={handleAddColumn} className="kanban-add-col-form">
        <input
          type="text"
          placeholder="Add new column"
          value={newColName}
          onChange={e => setNewColName(e.target.value)}
          className="kanban-input"
        />
        <button type="submit" className="kanban-btn kanban-btn-primary">
          + Add Column
        </button>
      </form>
      <div className="kanban-board">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(data.columns).map(([colId, col]) => (
            <div className="kanban-column" key={colId}>
              <div className="kanban-column-header">
                <span className="kanban-column-title">{col.name}</span>
                <span className="kanban-task-count">{col.items.length}</span>
                <button className="kanban-btn kanban-btn-delete" title="Delete column" onClick={() => handleDeleteColumn(colId)}>&times;</button>
              </div>
              <Droppable droppableId={colId}>
                {(provided, snapshot) => (
                  <div
                    className="kanban-task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ background: snapshot.isDraggingOver ? '#d2e4fc' : undefined }}
                  >
                    {col.items.map((item, idx) => (
                      <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            className={`kanban-task${snapshot.isDragging ? ' dragging' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{item.content}</span>
                            <button className="kanban-btn kanban-btn-delete kanban-task-delete" title="Delete task" onClick={() => handleDeleteTask(colId, item.id)}>&times;</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <form className="kanban-add-task-form" onSubmit={e => handleAddTask(e, colId)}>
                <input
                  type="text"
                  placeholder="Add new task"
                  value={newTask[colId] || ''}
                  onChange={e => setNewTask(nt => ({ ...nt, [colId]: e.target.value }))}
                  className="kanban-input"
                />
                <button type="submit" className="kanban-btn kanban-btn-secondary">+ Add</button>
              </form>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
