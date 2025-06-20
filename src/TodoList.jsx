import React, { useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
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
                    id: Date.now().toString(), 
                    text: newTask, 
                    completed: false,
                    status: 'backlog'
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

        const activeTask = tasks.find(task => task.id === activeId);
        
        // Check if dropped on a column
        if (String(overId).includes('column-')) {
            const newStatus = overId.replace('column-', '');
            // Only update if status is actually changing
            if (activeTask && activeTask.status !== newStatus) {
                setTasks(prevTasks => 
                    prevTasks.map(task => 
                        task.id === activeId 
                            ? {...task, status: newStatus} 
                            : task
                    )
                );
            }
        } 
        // Check if dropped on another task
        else {
            const overTask = tasks.find(task => task.id === overId);
            
            // If dropped on a task in the same column, reorder
            if (activeTask && overTask && activeTask.status === overTask.status) {
                setTasks(prevTasks => {
                    const oldIndex = getTaskPosition(activeId);
                    const newIndex = getTaskPosition(overId);
                    
                    if (oldIndex !== -1 && newIndex !== -1) {
                        return arrayMove(prevTasks, oldIndex, newIndex);
                    }
                    return prevTasks;
                });
            }
            // If dropped on a task in a different column, move to that column
            else if (activeTask && overTask && activeTask.status !== overTask.status) {
                setTasks(prevTasks => 
                    prevTasks.map(task => 
                        task.id === activeId 
                            ? {...task, status: overTask.status} 
                            : task
                    )
                );
            }
        }
    }

    function clearList() {
        setTasks([]);
    }

    // Filter tasks by status
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
            
            <DndContext 
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="kanban-board">
                    <div className="kanban-column">
                        <h3 className="column-title">TODO</h3>
                        <Column id="column-backlog" tasks={backlogTasks} />
                    </div>
                    
                    <div className="kanban-column">
                        <h3 className="column-title">DOING</h3>
                        <Column id="column-inProgress" tasks={inProgressTasks} />
                    </div>
                    
                    <div className="kanban-column">
                        <h3 className="column-title">DONE</h3>
                        <Column id="column-done" tasks={doneTasks} />
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default TodoList;