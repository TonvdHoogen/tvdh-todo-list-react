import React from "react";
import Rubric from "./Rubric";
import RubricAddForm from "./RubricAddForm";
import axios from "axios";
import { compare, compareTodoes } from "./Utils";

function RubricArea(props) {
 
    function handleRubricChange(index) {
        props.setRubricIndex(index);
        props.setTodoes(props.items[index].todoes.sort(compareTodoes));
    };

    function handleAddNewRubric(newRubric) {
        const rubric = { rubric: newRubric, todoes: []};
        props.setItems(prevItems => {
            axios.post("/rubric", rubric);
            return [...prevItems, rubric].sort(compare);
        });
        
    };

    function handleDeleteRubric(rubric, id) {
        props.setItems(prevItems => {
            const newItems = prevItems.filter((item) => {
                return item.rubric !== rubric;
            });
            axios.post("/deleteRubric", {id: id});
            props.setTodoes(newItems[0].todoes.sort(compareTodoes));
            props.setRubricIndex(0);
            return newItems;
        });
    };

    return  <div className="head-list col-xl-4">
        <h3>Rubrieken</h3>
        {props.items.map((item, index) => {
            return <Rubric 
                key={item._id}
                id={item._id}
                index={index}
                isSelected={index === props.rubricIndex}
                rubric={item.rubric} 
                changeIndex={handleRubricChange}
                handleDelete={handleDeleteRubric}
                />
        })}
        <RubricAddForm 
            handleAddNewRubric={handleAddNewRubric} 
        />
   </div>

};

export default RubricArea;