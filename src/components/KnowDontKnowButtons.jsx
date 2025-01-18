
// eslint-disable-next-line react/prop-types
function KnowDontKnowButtons( {onHomeScreen, onClickFunc} ) {
    return (
        <div id="kdk-buttons-container" className={`center ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <button id="know-button" className="btn-secondary" onClick={()=>onClickFunc(true)}>わかる</button>
            <button id="dont-know-button" className="btn-secondary" onClick={()=>onClickFunc(false)}>わからない</button>
        </div>
    )
}

export default KnowDontKnowButtons;