import React, { useState, useEffect } from "react";
import RubricArea from "./RubricArea";
import TodoArea from "./TodoArea";
import {compare, compareTodoes} from "./Utils";
    
function App() {

    const [items, setItems] = useState([]);

    
    const [todoes, setTodoes] = useState([]);
    const [rubricIndex, setRubricIndex] = useState(0);

    useEffect(() => {
        fetch("/todoes")
          .then((response) => response.json())
          .then((actualData) => {

            const sortedItems = actualData.sort(compare)
            setItems(sortedItems);
            setTodoes(sortedItems[0].todoes.sort(compareTodoes));
            setRubricIndex(0);
          });
      }, []); 
           
return <div >
    <div className="header bg-light rounded-pill">
    <h1>Doen of toch?</h1>
    </div>
    <div className="container"> 
        <div className="row">
            <TodoArea 
                items={items}
                setItems={setItems}
                todoes={todoes}
                setTodoes={setTodoes}
                rubricIndex={rubricIndex}
            />
            <RubricArea 
                items={items}
                setItems={setItems}
                setTodoes={setTodoes}
                rubricIndex={rubricIndex}
                setRubricIndex={setRubricIndex}
            />
        </div>
    </div>
</div>
}   

export default App;