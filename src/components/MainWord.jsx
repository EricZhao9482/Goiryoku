/* eslint-disable react/prop-types */
/**
 * MainWord component that displays at the center of the screen
 * @param {boolean} onHomeScreen - a bool to know if we're on the homescreen or not. decides if we display 語彙力 or some other word 
 * @param {Object} currentWord - object containing word details formatted as {jlptLevel:"", word:"", reading:"", englishMeaning:""}
 * @returns 
 */
function MainWord({onHomeScreen, currentWord}) {

    // logo displayed in homescreen
    const goiryoku = {jlptLevel:"N/A", word:"語彙力", reading:"ごいりょく", englishMeaning:"(the extent of) one's vocabulary"};

    return (
        <div id="main-word-stage" className="center main-word-container">
            <p id="main-word" className="center main-word fade-in-from-top">{onHomeScreen ? goiryoku.word : currentWord.word}</p>
        </div>
    )
}

export default MainWord;