import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

function Column(props) { //tasks and deleteTask are props
    return (
        <div>
            <SortableContext items={props.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <ul className="todo-list">
                    {props.tasks.map((task, index) => (
                        <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                            <Task id={task.id} text={task.text} deleteTask={() => props.deleteTask(index)} />
                        </li>
                    ))}
                </ul>
            </SortableContext>
        </div>
    );
}

export default Column;