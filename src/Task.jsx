import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";

function Task(props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="task" data-task-index={props.index}>
            <input type="checkbox" className="task-checkbox" onChange={props.deleteTask} />
            <span className="task-text">{props.text}</span>
            <span {...attributes} {...listeners} className="drag-handle">⋮⋮</span>
        </div>
    );
}

export default Task;