
// eslint-disable-next-line react/prop-types
function BeginButton({onHomeScreen, onClickFunc}) {
    
    return (
        <div id="begin-btn" className={`center btn-primary ${onHomeScreen ? "fade-in-from-bottom" : "hide"}`} onClick={onClickFunc}>
            <p>Begin</p>
        </div>
    )
}

export default BeginButton;