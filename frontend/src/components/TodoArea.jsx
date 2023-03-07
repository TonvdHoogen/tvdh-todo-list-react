import React from "react";
import axios from "axios";
import {compare, compareTodoes} from "./Utils"
import Todo from "./ToDo";
import TodoAddForm from "./TodoAddForm";

function TodoArea(props) {

    function handleAddTodo(todo) {
        props.setItems(prevItems => {
            const unchangedItems = prevItems.filter((item, index) => {
                return index !== props.rubricIndex;
            });
            const prevItem = prevItems[props.rubricIndex];
            const changedItem = {...prevItem, todoes: [...prevItem.todoes, todo]};

            axios.post('/todoes', changedItem);
            
            props.setTodoes(changedItem.todoes.sort(compareTodoes));
            return [...unchangedItems, changedItem].sort(compare);
        });
    };
 
    function handleDeleteTodo(task) {
        props.setItems(prevItems => {
            const unchangedItems = prevItems.filter((item, index) => {
                return index !== props.rubricIndex;
            });
            const prevItem = prevItems[props.rubricIndex];
            const changedItem = {...prevItem, todoes: prevItem.todoes.filter(todo => {
                return todo.task !== task;
            })};
            axios.post("/deleteTodo", {rubric: props.items[props.rubricIndex].rubric, task: task});
            
            props.setTodoes(changedItem.todoes.sort(compareTodoes));
            return [...unchangedItems, changedItem].sort(compare);
        });
    };
    function getRubric() {
        console.log(props.items.length);
        const ret = (props.items.length > 0) ? props.items[props.rubricIndex].rubric : "Nog geen data";
        console.log(ret);
        return ret;
    }

return <div className="head-list col-xl-7">
    <h3>{getRubric()}</h3>
    {props.todoes.map((todo) => {
        return <Todo 
            key={todo._id}
            id={todo._id}
            task={todo.task}
            priority={todo.priority}
            date={todo.date} 
            handleDelete={handleDeleteTodo}
            />
    })}
    <TodoAddForm 
        handleAddTodo={handleAddTodo}
    />
</div>

};

export default TodoArea;