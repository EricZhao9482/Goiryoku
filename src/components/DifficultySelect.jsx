/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
/**
 * The list of difficulties on the homescreen
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility
 * @param {Function} updateDifficultySelection - a function passed down from the app component to update its state
 * @returns 
 */
function DifficultySelect( {onHomeScreen, updateDiffSelectFunc} ) {
    
    // the difficulty levels correspond to their csv file name so make sure they match
    const difficultyLevels = ["N5", "N4", "N3", "N2", "N1"];
    
    // create map for selected state below
    let selectedMap = new Map(
        difficultyLevels.map(difficulty => [difficulty, false])
      );
    
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