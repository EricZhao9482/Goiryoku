/* eslint-disable react/prop-types */

/**
 * The begin button that begins the app's gameplay loop
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility
 * @param {Function} onClickFunc - the  handleBeginClick function pasted down from the app
 * @returns 
 */
function BeginButton({onHomeScreen, onClickFunc}) {
    
    return (
        <div id="begin-btn" className={"center"}>
            <button className={`btn-secondary ${onHomeScreen ? "fade-in-from-bottom" : "hide"}`} onClick={onClickFunc}>Begin</button>
        </div>
    )
}

export default BeginButton;