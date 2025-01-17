
// eslint-disable-next-line react/prop-types
function KnowDontKnowButtons( {onHomeScreen} ) {
    return (
        <div id="kdk-buttons-container" className={` ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <div id="know-button" className={`center btn-primary`}>
                <p>わかる</p>
            </div>
            <div id="dont-know-button" className={`center btn-primary`}>
                <p>わからない</p>
            </div>
        </div>
    )
}

export default KnowDontKnowButtons;