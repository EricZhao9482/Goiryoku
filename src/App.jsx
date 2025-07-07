import { useEffect, useState } from 'react'
import MainWord from './components/MainWord'
import Subsection from './components/Subsection'
import BeginButton from './components/BeginButton'
import DifficultySelect from './components/DifficultySelect'
import KnowDontKnowButtons from './components/KnowDontKnowButtons'
import BackButton from './components/BackButton'
import WordListsSection from './components/WordListsSection'
import Papa from "papaparse";
import './css/styling.css'

function App() {

  const goiryoku = {jlptLevel:"N/A", word:"語彙力", reading:"ごいりょく", englishMeaning:"(the extent of) one's vocabulary"};

  // state to show the word being displayed. default to 語彙力 for the homescreen
  // currentWord will always have the Object structure of {jlptLevel, word, reading, englishMeaning}
  const [currentWord, setCurrentWord] = useState(goiryoku);

  // state that keeps track of what info to display depending on if you're on homescreen or not
  const [onHomeScreen, setOnHomeScreen] = useState(true);

  // handles difficulty levels from N5-N1 as a string. 
  // These states are passed into the DifficultySelect component
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  // these two states are an array of wordDetail objects of all the words the user knows and dont knows
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);

  /**
   * anonymous function used to update the difficulty selection
   * This function gets passed down to the DifficultySelect component
   * @param {string} difficulty - formatted as "N5", "N1", etc
   */
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

  /**
   * anon function that starts the game when the begin button is clicked
   * this function gets passed down to the BeginButton Component
   */
  const handleBeginClick = () => {
    setOnHomeScreen(false);
    getWordGivenListOfDiff(selectedDifficulties);
  }

  /**
   * function that gets a random word given the current selected difficulties
   * and sets the currentWord to be displayed to the retrieved word
   * @param {String[]} diffLvls - the array of difficulties ie. ["N5","N4","N1"]
   */
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
              // console.log(retrievedWordDetails);

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
              // some definitions in the csv file have commas with no spaces after them 
              // which results in a really long single line which does not line break in the table
              // we will call this helper function to ensure a space comes after every comma
              wordDetails.englishMeaning = fix_commas(retrievedWordDetails[3]);
              setCurrentWord(wordDetails);
          },
          error: (err) => {
            setCurrentWord({jlptLevel:"N/A", word:"Failed to retrieve word", reading:"", englishMeaning:""});
            console.error("Error parsing CSV:", err);
          },
        });
    }

  /**
   * a helper function that ensures commas have a space after them in a given string
   * @param {string} s - a string fo the contents you want to fix commas for
   * @returns {string} the fixed string
   */
  const fix_commas = (s) => {
    const parts = s.split(","); 
    return parts
      .map((v) => v.trim()) // remove any trailing and leading white space from the separated words
      .join(", ")
  }
  

  /**
   * a function that handles things when the know (わかる) or dont know (わからない) buttons are clicked
   * this will add the current word to its respective list and then generate a new word to be displayed
   * @param {boolean} know - true (わかる) or false (わからない) depending on which button gets clicked
   */
  const handleKnowDontKnowClick = (know) => {
    // if the user clicks on the わかる button and the word does not already exist in the knownWords list 
    // then add it to the list of known words
    if (know && !knownWords.some( (listWordDetails) => {return listWordDetails.word === currentWord.word})) {
      setKnownWords([currentWord, ...knownWords]);
    } // otherwise that means the user clicked わからない so
    // we will check to ensure the current word does not already exist in the unknown words list before adding
    else if (!know && !unknownWords.some( (listWordDetails) => {return listWordDetails.word === currentWord.word} )) {
      setUnknownWords([currentWord, ...unknownWords]);
    }
    // finally cycle a new word into the current word 
    getWordGivenListOfDiff(selectedDifficulties);
  }

  /**
   * when the BackButton is clicked, return to the homescreen
   * this function gets passed into the BackButton component as its onClick function
   */
  const handleBackButtonClick = () => {
    setOnHomeScreen(true);
  }

  // useState is asynch so in order to reliably use it for printing out stuff to check state
  // I need to use the useEffect hook which gets called after everytime the specified state gets updated
  // using this for debugging purposes
  // useEffect(() => {
  //   console.log("-----------------------------------------")
  //   console.log("selected diff: " + selectedDifficulties);
  //   console.log("current word: ");
  //   console.log(currentWord);
  //   console.log("known words: ");
  //   console.log(knownWords);
  //   console.log("unknown words:")
  //   console.log(unknownWords);
  //   }, [selectedDifficulties, currentWord, knownWords, unknownWords]);


  return (
    <>
      <MainWord onHomeScreen={onHomeScreen} currentWord={currentWord}/>
      <Subsection onHomeScreen={onHomeScreen}/>
      <DifficultySelect onHomeScreen={onHomeScreen} updateDiffSelectFunc={updateDifficultySelection}/>
      <BeginButton onHomeScreen={onHomeScreen} onClickFunc={handleBeginClick}/>

      <KnowDontKnowButtons onHomeScreen={onHomeScreen} onClickFunc={handleKnowDontKnowClick}/>
      <BackButton onHomeScreen={onHomeScreen} onClickFunc={handleBackButtonClick} />
      <WordListsSection onHomeScreen={onHomeScreen} knownWordsList={knownWords} unknownWordsList={unknownWords}/>
      <footer>ver 0.8</footer>
    </>
  )
}

export default App;
