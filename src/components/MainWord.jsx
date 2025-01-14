
// eslint-disable-next-line react/prop-types
function MainWord({word}) {

    // code to test some stuff in react
    // word === testvalue in this case
    let display = "";
    if (word > 0) {
        display = word;
    }

    return (
        <div id="main-word-stage" className="center main-word-container">
            <p id="main-word" className="center main-word fade-in-from-top">語彙力{display}</p>
        </div>
    )
}

export default MainWord;