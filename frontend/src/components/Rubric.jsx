import React from "react";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Fab from "@material-ui/core/Fab";

function Rubric(props) {
  
    function handleClick() {
        props.changeIndex(props.index);
    };

    function handleDelete() {
        props.handleDelete(props.rubric, props.id);
    };

    return <div>
        <button type="button" className={props.isSelected ? "rubric-info btn btn-info btn-lg" : "rubric-info btn btn-light btn-lg"} onClick={handleClick}> {props.rubric} </button> 
            {props.isSelected && <Fab size="small" onClick={handleDelete}><DeleteOutlineOutlinedIcon /></Fab>}
    </div>;
}
 
export default Rubric;