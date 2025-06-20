import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ id, text }) {
    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition,
        isDragging 
    } = useSortable({ 
        id,
        transition: {
            duration: 200,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms ease',
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            {...listeners} 
            style={style} 
            className={`task ${isDragging ? 'is-dragging' : ''}`}
        >
            <input type="checkbox" className="task-checkbox" />
            <span className="task-text">{text}</span>
        </div>
    );
}

export default Task;