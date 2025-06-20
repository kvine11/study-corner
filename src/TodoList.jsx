import React, { useState } from 'react';
import { closestCorners, DndContext } from '@dnd-kit/core';
import Column from './Column';
import { arrayMove } from "@dnd-kit/sortable";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    function handleTask(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [
                ...prevTasks, 
                {
                    id: tasks.length + 1,
                    text: newTask, 
                    completed: false,
                    status: 'backlog' // New tasks go to TODO column
                }
            ]);
            setNewTask('');
        }
    }

    function getTaskPosition(id) {
        return tasks.findIndex(task => task.id === id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;
        
        const activeId = active.id;
        const overId = over.id;
        
        if (activeId === overId) return;

        // Check if dropped on a column
        if (String(overId).includes('column-')) {
            const newStatus = overId.replace('column-', '');
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === activeId 
                        ? {...task, status: newStatus} 
                        : task
                )
            );
        } else {
            // Reorder within column
            setTasks(prevTasks => {
                const oldIndex = getTaskPosition(activeId);
                const newIndex = getTaskPosition(overId);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                    return arrayMove(prevTasks, oldIndex, newIndex);
                }
                return prevTasks;
            });
        }
    }

    function clearList() {
        setTasks([]);
    }

    // Filter tasks by status - moved inside component after tasks is defined
    const backlogTasks = tasks.filter(task => task.status === 'backlog' || !task.status) || [];
    const inProgressTasks = tasks.filter(task => task.status === 'inProgress') || [];
    const doneTasks = tasks.filter(task => task.status === 'done') || [];

    return (
        <div className="todo-container">
            <h2 className="todo-title">Tasks</h2>
            
            <div className="todo-input-container">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Enter new task..."
                    value={newTask}
                    onChange={handleTask}
                />
                <div className="todo-buttons">
                    <button className="todo-button" onClick={addTask}>Add Task</button>
                    <button className="todo-button" onClick={clearList}>Clear List</button>
                </div>
            </div>
            
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="kanban-board">
                    <div className="kanban-column">
                        <h3 className="column-title">TODO</h3>
                        <div className="column-content">
                            <Column id="column-backlog" tasks={backlogTasks} />
                        </div>
                    </div>
                    
                    <div className="kanban-column">
                        <h3 className="column-title">DOING</h3>
                        <div className="column-content">
                            <Column id="column-inProgress" tasks={inProgressTasks} />
                        </div>
                    </div>
                    
                    <div className="kanban-column">
                        <h3 className="column-title">DONE</h3>
                        <div className="column-content">
                            <Column id="column-done" tasks={doneTasks} />
                        </div>
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default TodoList;