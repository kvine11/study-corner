import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    function handleTask(event){
        setNewTask(event.target.value)
    }

    function addTask(event) {
        if (newTask.trim() !== "") {
            setTasks(prevTask => [...tasks, { text: newTask, completed: false }]);
            setNewTask('');
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

    function moveTaskUp(index){
        if(index > 0)
        {
            const updatedTasks = [...tasks]
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1)
        {
            const updatedTasks = [...tasks]
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]]
            setTasks(updatedTasks)
        }
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
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`todo-item ${task.completed ? 'completed' : ''}`}
                      
                    >
                        {task.text}
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            
                        </button>

                        <button onClick = {() => moveTaskUp(index)}>↑</button>

                        <button onClick={() =>moveTaskDown(index)}>↓</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;