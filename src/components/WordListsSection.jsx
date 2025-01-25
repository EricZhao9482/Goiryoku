/* eslint-disable react/prop-types */
import WordList from "./WordList";

/**
 * The section of the app that has the know and dont know word lists
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility
 * @param {Array} knownWordsList - a list of word objects that the user knows 
 * @param {Array} unknownWordsList - a list of word objects that the user doesn't know
 * @returns 
 */
function WordListsSection( {onHomeScreen, knownWordsList, unknownWordsList} ) {

    return (
        <div id="word-list-container" className={`center word-list-container ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <WordList listName={"Known Words"} wordList={knownWordsList}/>
            <WordList listName={"Unknown Words"} wordList={unknownWordsList}/>
        </div>
    )
}

export default WordListsSection;