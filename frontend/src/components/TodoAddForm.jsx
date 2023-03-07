import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";

function TodoAddForm(props) {

    const [todo, setTodo] = useState({task: "", priority: 6, date: new Date()});

    function handleChangeTodo(event) {
        const {name, value} = event.target;
        console.log(name + "/" +value);
        setTodo(prevTodo => {
            return {...prevTodo, [name]: value, date: new Date()};
        });
        event.preventDefault();
    } ;

    function handleAddTodo(event) {
        props.handleAddTodo(todo);
        setTodo({task: "", priority: 6, date: new Date()});

        event.preventDefault();
    }
   
    return <form className="row g-3">
        <div className="col-auto">
            <input className="task-input" onChange={handleChangeTodo} name="task" placeholder="Taak" value={todo.task}/>
        </div>
        <div className="col-auto">
            <p className="prio-input"><i>Prioriteit: </i></p>
        </div>
        <div className="col-auto">
            <select onChange={handleChangeTodo} name="priority" className="priority-select form-select form-select-sm" aria-label="Default select example" value={todo.priority}>
                
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div className="col-auto">
            <Fab onClick={handleAddTodo} size="small"><AddIcon fontSize="small" /></Fab>
        </div>
    </form>
};

export default TodoAddForm;
