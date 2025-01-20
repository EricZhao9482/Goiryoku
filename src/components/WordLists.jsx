/* eslint-disable react/prop-types */
import WordList from "./WordList";
function WordLists( {onHomeScreen, knownWordsList, unknownWordsList} ) {

    return (
        <div id="word-list-container" className={`center word-list-container ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <WordList listName={"Known Words"} wordList={knownWordsList}/>
            <WordList listName={"Unknown Words"} wordList={unknownWordsList}/>
        </div>
    )
}

export default WordLists;