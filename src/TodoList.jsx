import React, { useState } from 'react';
import {closestCorners, DndContext} from '@dnd-kit/core';
import Column from './Column';
import { arrayMove } from "@dnd-kit/sortable";

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

    /**
     * Deletes a task with a fade out animation
     * @param {number} index - The index of the task to delete
     */
    function deleteTask(index) {
        // Find the task element using its data attribute
        const taskElement = document.querySelector(`[data-task-index="${index}"]`);
        
        if (taskElement) { //checks if the task element exists
            // Start the fade out animation by changing animation-play-state from 'paused' to 'running'
            taskElement.style.animationPlayState = 'running';
            
            // Wait for the animation to complete before removing the task from state
            taskElement.addEventListener('animationend', () => {
                // Remove the task from the tasks array by filtering out the task at the given index
                setTasks(tasks => tasks.filter((_, i) => i !== index));
            });
        }
    }

    function getTaskPosition(id) {
        return tasks.findIndex(task => task.id === id); //find the index of the task we are dragging
    }

    function handleDragEnd(event) {
        const {active, over} = event //active is the element we are dragging, over is the element which will be replaced

        if (active.id === over.id) {
          return;
        }

        setTasks(tasks => {
            const oldPos = getTaskPosition(active.id); //gets position of element before it was dragged
            const newPos = getTaskPosition(over.id); //gets position of element after it was dragged

            return arrayMove(tasks, oldPos, newPos); //moves the element to the new position
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
            />

            <div style={{ textAlign: 'center' }}>
                <button className="todo-button" onClick={addTask}>Add Task</button>
                <button className="todo-button" onClick={clearList}>Clear List</button>
            </div>
            
            <DndContext collisionDetection={closestCorners} onDragEnd = {handleDragEnd}>
                <Column tasks = {tasks} deleteTask = {deleteTask}></Column>
            </DndContext>

        </div>
    );
}

export default TodoList;