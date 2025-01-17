import { useEffect, useState } from 'react'
import MainWord from './components/MainWord'
import Subsection from './components/Subsection'
import BeginButton from './components/BeginButton'
import DifficultySelect from './components/DifficultySelect'
import JPDict from './components/JPDict'
import Papa from "papaparse";
import './css/styling.css'

function App() {

  // state to show the word being displayed. default to 語彙力 for the homescreen
  const [currentWord, setCurrentWord] = useState("語彙力");

  // handles difficulty levels from N5-N1 as a string. 
  // These states are passed into the DifficultySelect component
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  // state that keeps track of what info to display depending on if you're on homescreen or not
  const [onHomeScreen, setOnHomeScreen] = useState(true);

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

  // const handleBeginClick = ()

  // function that gets a random word given the current selected difficulties
    async function getWordGivenListOfDiff(diffLvls) {

        // first check if the given array length to make sure it isn't empty
        let arrayLen = diffLvls.length;

        // if it is empty, default to all difficulties selected
        if (arrayLen === 0) {
            diffLvls = ["N5", "N4", "N3", "N2", "N1"];
        }

        // get random diff from list
        let randomDiff = diffLvls[Math.floor(Math.random()*diffLvls.length)];

        let csvFile = randomDiff + ".csv";

        const filePath = "vocabulary/" + csvFile;

        // Read the CSV file. these are await functs so this method needs to be labeled as async
        const response = await fetch(filePath); // Fetch the file
        const text = await response.text(); // Get the text content
      
        // Parse the CSV data
        Papa.parse(text, {
            // if parsing was successful 
            complete: (results) => {
                let resultsData = results.data;  // the entire csv file represented as an array
                let resultsLen = resultsData.length;  
                
                // generate a random index to pull from the array
                // (resultsLen-1) = the range from 1 to the length of results 
                // +1 ensures we don't pull from the header of the csv 
                let randomIndex = Math.floor(Math.random()*(resultsLen-1)) + 1;
                console.log("jp dict result: " + resultsData[randomIndex]);
                setCurrentWord(resultsData[randomIndex][2]);
                return resultsData[randomIndex];
            },
            error: (err) => {
              console.error("Error parsing CSV:", err);
            },
          });
        return [];
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
    }, [selectedDifficulties]);


  return (
    <>
      <MainWord currentWord={currentWord}/>
      <Subsection onHomeScreen={onHomeScreen}/>
      <DifficultySelect onHomeScreen={onHomeScreen} updateDiffSelectFunc={updateDifficultySelection}/>
      <BeginButton onHomeScreen={onHomeScreen} onClickFunc={()=>getWordGivenListOfDiff(selectedDifficulties)}/>
    </>
  )
}

export default App;
