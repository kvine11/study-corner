import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

function Column({ id, tasks }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id
    });
    
    return (
        <div 
            ref={setNodeRef} 
            className={`column-content ${isOver ? 'drag-over' : ''}`}
        >
            <SortableContext 
                items={tasks.map(task => task.id)} 
                strategy={verticalListSortingStrategy}
            >
                <ul className="todo-list">
                    {tasks && tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                                <Task id={task.id} text={task.text} />
                            </li>
                        ))
                    ) : (
                        <div className="empty-column">No tasks</div>
                    )}
                </ul>
            </SortableContext>
        </div>
    );
}

export default Column;