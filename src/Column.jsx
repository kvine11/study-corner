import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

function Column({ tasks }) {
    return (
        <div>
            <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <ul className="todo-list">
                    {tasks.map(task => (
                        <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                            <Task id={task.id} text={task.text} />
                        </li>
                    ))}
                </ul>
            </SortableContext>
        </div>
    );
}

export default Column;