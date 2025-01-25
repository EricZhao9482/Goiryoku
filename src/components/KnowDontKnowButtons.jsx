/* eslint-disable react/prop-types */

/**
 * 
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility 
 * @param {Function} onClickFunc - the handleKnowDontKnowClick function passed down from the app 
 * @returns 
 */
function KnowDontKnowButtons( {onHomeScreen, onClickFunc} ) {
    return (
        <div id="kdk-buttons-container" className={`center ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <button id="know-button" className="btn-secondary" onClick={()=>onClickFunc(true)}>わかる</button>
            <button id="dont-know-button" className="btn-secondary" onClick={()=>onClickFunc(false)}>わからない</button>
        </div>
    )
}

export default KnowDontKnowButtons;