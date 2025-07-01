import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ id, text }) { //a task is denoted with the text of the task and an id to distinguish 
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id }); //destructuring assignment
    //equivalent to const sortable = useSortable({ id }); and then sortable.attributes, sortable.listeners, etc.
    //{} means to extract these specific properties from the object returned by useSortable

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
            <input type="checkbox" className="task-checkbox" />
            <span className="task-text">{text}</span>
        </div>
    );
}

export default Task;