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

    function deleteTask(index) {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(prevTask => newTasks);
    }

    function toggleTask(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
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
                <Column tasks = {tasks}></Column>
            </DndContext>

        </div>
    );
}

export default TodoList;