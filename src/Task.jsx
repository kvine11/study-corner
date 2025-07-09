import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task(props) { //id text and deleteTask are props
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="task">
            <input type="checkbox" className="task-checkbox" onChange={props.deleteTask} />
            <span {...attributes} {...listeners} className="task-text">{props.text}</span>
        </div>
    );
}

export default Task;