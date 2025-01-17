
// eslint-disable-next-line react/prop-types
function MainWord({currentWord}) {

    // let display = "";
    // if (word > 0) {
    //     display = word;
    // }

    return (
        <div id="main-word-stage" className="center main-word-container">
            <p id="main-word" className="center main-word fade-in-from-top">{currentWord}</p>
        </div>
    )
}

export default MainWord;