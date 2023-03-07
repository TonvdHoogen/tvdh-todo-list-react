import React from "react";

function Todo(props) {
    const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    const newDate = new Date(props.date);

    function handleDelete() {
        props.handleDelete(props.task);
    };

    return <div className="bg-light rounded-pill">
        <p onClick={handleDelete}>{props.priority} {props.task} &emsp; ({newDate.getDate()} {months[newDate.getMonth()-1]})</p>
    </div>
}

export default Todo;