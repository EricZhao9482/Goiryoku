
// eslint-disable-next-line react/prop-types
function KnowDontKnowButtons( {onHomeScreen} ) {
    return (
        <div id="kdk-buttons-container" className={`center ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <button id="know-button" className="btn-secondary">わかる</button>
            <button id="dont-know-button" className="btn-secondary">わからない</button>
        </div>
    )
}

export default KnowDontKnowButtons;