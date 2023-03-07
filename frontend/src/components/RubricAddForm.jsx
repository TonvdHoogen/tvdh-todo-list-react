import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";

function RubricAddForm(props) {
    const [newRubricName, setNewRubricName] = useState("");
 
    function handleRubricNameChange(event) {
        const value = event.target.value;
        setNewRubricName(value);

        event.preventDefault();
    };

    function handleAddNewRubric(event) {
        props.handleAddNewRubric(newRubricName);
        event.preventDefault();
    };


    return <div>
        <form className="row g-3">
            <div className="col-auto">
                <input className="rubric-input" onChange={handleRubricNameChange} placeholder="Nieuwe rubriek"/>
            </div>
            <div className="col-auto">
                <Fab size="small" onClick={handleAddNewRubric}><AddIcon /></Fab>
            </div> 
        </form>
 
    </div>
};

export default RubricAddForm;