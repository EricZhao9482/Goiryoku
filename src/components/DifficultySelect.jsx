import { useEffect, useState } from 'react'
// eslint-disable-next-line react/prop-types
function DifficultySelect( {onHomeScreen, updateDiffSelectFunc} ) {
    
    const difficultyLevels = ["N5", "N4", "N3", "N2", "N1"];
    
    // TODO: make this use the map function for scalability
    let selectedMap = new Map( [
                                ["N5", false],
                                ["N4", false],
                                ["N3", false],
                                ["N2", false],
                                ["N1", false]
                                ] );
    
    // a map that will keep track of which difficulties have been selected via boolean
    // this map later gets referred to when adding styling 
    const [selected, setSelected] = useState( selectedMap );

    function handleDiffSelection(difficulty) {

        // calls this function passed down from the App parent component
        // updates the parent app's logic to keep track of what's been selected to the parent
        updateDiffSelectFunc(difficulty);

        // set selectedMap to selected because it keeps getting overwritten by the top declaration 
        selectedMap = selected;

        // selected items will now be highlighted to show to the user it has been selected
        // We will simply flip the boolean val in our map after each click 
        selectedMap.set(difficulty, !selectedMap.get(difficulty))
        setSelected(selectedMap);
        
    } 

    // useEffect(()=> {console.log(selected)}, [selected])

    return (
        <>
        <div className={`center difficulty-select ${onHomeScreen ? "fade-in-from-bottom" : "hide"}`}>
            <p className="select-msg" > Select your difficulty levels</p>
            <ul>
                {difficultyLevels.map( (diffLvl) => (
                    <li key={diffLvl} 
                    className={selected.get(diffLvl) ? "difficulty-selected" : ""}
                    onClick={()=> handleDiffSelection(diffLvl)}> {diffLvl} </li>
                ) )}
            </ul>
        </div>
        </>
    )
}

export default DifficultySelect;