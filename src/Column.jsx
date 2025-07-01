import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

function Column({ tasks }) { //a column copmponent represents a bunch of tasks
    return (
        <div>
            <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>  
                {/*sortable context creates a sortable area where items can be dragged and reoredered */}
                {/*items tells which specific items can be sorted */}
                {/*arrow function task => task.id just returns the id of the task. map creates a new array with the ids of the tasks */}

                <ul className="todo-list"> 
                    {tasks.map(task => { {/*for every task, map create a new list item */}
                        return (
                            <li key={task.id} className = {'todo-item'}>
                                <Task id={task.id} text={task.text} />
                            </li>
                        );
                    })}

                </ul>
            </SortableContext>
        </div>
    );
}

export default Column;