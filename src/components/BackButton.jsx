/* eslint-disable react/prop-types */
/**
 * Back button that returns you to the homescreen
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility   
 * @returns 
 */
function BackButton( {onHomeScreen, onClickFunc} ) {

    return (
        <div className="center back-btn-container">
            <button className={`btn-tertiary ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`} onClick={onClickFunc}>もどる</button>
        </div>
    )
}

export default BackButton;