import { useEffect, useState } from 'react'
import MainWord from './components/MainWord'
import Subsection from './components/Subsection'
import BeginButton from './components/BeginButton'
import DifficultySelect from './components/DifficultySelect'
import KnowDontKnowButtons from './components/KnowDontKnowButtons'
import WordListsSection from './components/WordListsSection'
import Papa from "papaparse";
import './css/styling.css'

function App() {

  const goiryoku = {jlptLevel:"N/A", word:"語彙力", reading:"ごいりょく", englishMeaning:"(the extent of) one's vocabulary"};

  // state to show the word being displayed. default to 語彙力 for the homescreen
  const [currentWord, setCurrentWord] = useState(goiryoku);

  // state that keeps track of what info to display depending on if you're on homescreen or not
  const [onHomeScreen, setOnHomeScreen] = useState(true);

  // handles difficulty levels from N5-N1 as a string. 
  // These states are passed into the DifficultySelect component
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  // these two states are an array of wordDetail objects of all the words the user knows and dont knows
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);

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

  // anon function that starts the game when the begin button is clicked
  const handleBeginClick = () => {
    setOnHomeScreen(false);
    getWordGivenListOfDiff(selectedDifficulties);
  }

  // function that gets a random word given the current selected difficulties
  // and sets the current word to be displayed to the retrieved word
  // TODO: make sure that there are no duplicate words that show up (edge case) 
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
              const retrievedWordDetails = resultsData[randomIndex]
              console.log(retrievedWordDetails);
              // setCurrentWord(retrievedWordDetails[2]);

              // create an object that represents the word details to store in state later
              const wordDetails = {};

              wordDetails.jlptLevel = randomDiff;
              // if there is no kanji for the word
              if (retrievedWordDetails[2] === '' || retrievedWordDetails[2] === null) {
                // set the word to the hiragana reading and the reading to be blank
                wordDetails.word = retrievedWordDetails[1];
                wordDetails.reading = '';
              } else {
                // otherwise word will be displayed with kanji and the reading with hiragana 
                wordDetails.word = retrievedWordDetails[2];
                wordDetails.reading = retrievedWordDetails[1];
              }
              wordDetails.englishMeaning = retrievedWordDetails[3];
              setCurrentWord(wordDetails);
          },
          error: (err) => {
            setCurrentWord("Failed to retrieve word");
            console.error("Error parsing CSV:", err);
          },
        });
    }
  
  // a function that handles things when the know or dont know buttons are clicked
  // this will add the current word to its respective list and then generate a new word to be displayed
  // know argument is a boolean
  const handleKnowDontKnowClick = (know) => {
    if (know) {
      setKnownWords([currentWord, ...knownWords]);
    } else {
      setUnknownWords([currentWord, ...unknownWords]);
    }
    getWordGivenListOfDiff(selectedDifficulties);
  }

  // useState is asynch so in order to reliably use it for printing out stuff to check state
  // I need to use the useEffect hook which gets called after everytime the specified state gets updated
  // using this for debugging purposes
  useEffect(() => {
    console.log("-----------------------------------------")
    console.log("selected diff: " + selectedDifficulties);
    console.log("current word: ");
    console.log(currentWord);
    console.log("known words: ");
    console.log(knownWords);
    console.log("unknown words:")
    console.log(unknownWords);
    }, [selectedDifficulties, currentWord, knownWords, unknownWords]);


  return (
    <>
      <MainWord currentWord={currentWord}/>
      <Subsection onHomeScreen={onHomeScreen}/>
      <DifficultySelect onHomeScreen={onHomeScreen} updateDiffSelectFunc={updateDifficultySelection}/>
      <BeginButton onHomeScreen={onHomeScreen} onClickFunc={handleBeginClick}/>

      <KnowDontKnowButtons onHomeScreen={onHomeScreen} onClickFunc={handleKnowDontKnowClick}/>
      <WordListsSection onHomeScreen={onHomeScreen} knownWordsList={knownWords} unknownWordsList={unknownWords}/>
    </>
  )
}

export default App;
