
// eslint-disable-next-line react/prop-types
function DifficultySelect( {updateDiffSelectFunc} ) {
    
    const difficultyLevels = ["N5", "N4", "N3", "N2", "N1"];

    // const [selectedDifficulties, setSelectedDifficulties] = useState([]);

    function handleDiffSelection(difficulty) {

        // calls this function passed down from the App parent component
        updateDiffSelectFunc(difficulty);
        
    } 


    return (
        <>
        <div className="center difficulty-select fade-in-from-bottom">
            <p className="select-msg" > Select your difficulty levels</p>
            <ul>
                {difficultyLevels.map( (diffLvl) => (
                    <li key={diffLvl} onClick={()=> handleDiffSelection(diffLvl)}> {diffLvl} </li>
                ) )}
            </ul>
        </div>
        </>
    )
}

export default DifficultySelect;