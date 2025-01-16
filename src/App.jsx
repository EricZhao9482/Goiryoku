import { useEffect, useState } from 'react'
import MainWord from './components/MainWord'
import Subsection from './components/Subsection'
import BeginButton from './components/BeginButton'
import DifficultySelect from './components/DifficultySelect'
import JPDict from './components/JPDict'
import './css/styling.css'

function App() {

  const [testValue, setTestValue] = useState(0);

  const jpdict = new JPDict();

  // handles difficulty levels from N5-N1 as a string. 
  // These states are passed into the DifficultySelect component
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  // anonymous function used to update the difficulty selection
  // This function gets passed down to the DifficultySelect component
  const updateDifficultySelection = (difficulty) => {
    
    // make a copy of the array
    let difficulties = [...selectedDifficulties];

    // first check to see if the difficulty has already been selected
    let index = difficulties.indexOf(difficulty)

    // if the selected difficulty is already in the array of difficulties, remove it
    if (difficulties.indexOf(difficulty) != -1) {
        // this removes one element from the array at the specified index
        difficulties.splice(index, 1);
    } // otherwise add it to the array 
    else {
        difficulties.push(difficulty);
    }
    setSelectedDifficulties(difficulties)  
  } 

  // useState is asynch so in order to reliably use it for printing out stuff to check state
  // I need to use the useEffect hook which gets called after everytime the specified state gets updated
  // in this case, it is selectedDifficulties
  useEffect(() => {
    console.log("selected diff: " + selectedDifficulties);
    // const fetchWord = async () => {
    //   let word = jpdict.getWordGivenListOfDiff(selectedDifficulties).then(word=>{return word}).then(word=>{console.log(word)});
    //   // console.log(word);
    //   return word;
    // }
    // console.log("fetched word: " + fetchWord());
    }, [selectedDifficulties, jpdict]);

  function testFunc() {
    setTestValue(testValue+1);
    
    console.log("testing stuff: " + testValue);
    // const beginButton = document.getElementById("begin-btn");
    // beginButton.classList.add("hide")
  }

  return (
    <>
      <MainWord word={testValue}/>
      <Subsection />
      <DifficultySelect updateDiffSelectFunc={updateDifficultySelection}/>
      <BeginButton onClickFunc={()=>testFunc()}/>
    </>
  )
}

export default App;
