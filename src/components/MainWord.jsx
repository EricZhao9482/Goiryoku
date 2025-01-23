/* eslint-disable react/prop-types */

function MainWord({onHomeScreen, currentWord}) {

    // let display = "";
    // if (word > 0) {
    //     display = word;
    // }

    // logo displayed in homescreen
    const goiryoku = {jlptLevel:"N/A", word:"語彙力", reading:"ごいりょく", englishMeaning:"(the extent of) one's vocabulary"};

    return (
        <div id="main-word-stage" className="center main-word-container">
            <p id="main-word" className="center main-word fade-in-from-top">{onHomeScreen ? goiryoku.word : currentWord.word}</p>
        </div>
    )
}

export default MainWord;