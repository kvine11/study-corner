import React, { useState } from 'react';
import {closestCorners, DndContext} from '@dnd-kit/core';
import Column from './Column';
import { arrayMove } from "@dnd-kit/sortable";
import SpotifyPlayer from './SpotifyPlayer';

function TodoList() {
    const [tasks, setTasks] = useState([
    ]);

    const [newTask, setNewTask] = useState('');


    function handleTask(event){
        setNewTask(event.target.value)
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((tasks) => [...tasks, {id: tasks.length + 1, text: newTask, completed: false}]); //adds a new task to the list
            setNewTask(''); //clears the input field after adding a task
        }
    }

    function addTaskKeyDown(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    function deleteTask(index) {
        const taskElement = document.querySelector(`[data-task-index="${index}"]`);
        
        if (taskElement) {
            taskElement.style.animationPlayState = 'running';
            
            taskElement.addEventListener('animationend', () => {
                setTasks(tasks => tasks.filter((_, i) => i !== index));
            });
        }
    }

    function getTaskPosition(id) {
        return tasks.findIndex(task => task.id === id);
    }

    function handleDragEnd(event) {
        const {active, over} = event

        if (active.id === over.id) {
          return;
        }

        setTasks(tasks => {
            const oldPos = getTaskPosition(active.id);
            const newPos = getTaskPosition(over.id);

            return arrayMove(tasks, oldPos, newPos);
        })
    }

    function clearList() {
        setTasks([]);
    }

    return (
        <div className="todo-container">
            <h2 className="todo-title">Tasks</h2>
            <input
                type="text"
                className="todo-input"
                placeholder="Enter new task..."
                value={newTask}
                onChange={handleTask}
                onKeyDown={addTaskKeyDown}
            />

            <div style={{ textAlign: 'center' }}>
                <button className="todo-button" onClick={addTask}>Add Task</button>
                <button className="todo-button" onClick={clearList}>Clear List</button>
            </div>
            
            <DndContext collisionDetection={closestCorners} onDragEnd = {handleDragEnd}>
                <Column tasks = {tasks} deleteTask = {deleteTask}></Column>
            </DndContext>

            <div className="spotify-wrapper">
                <SpotifyPlayer />
            </div>
        </div>
    );
}

export default TodoList;