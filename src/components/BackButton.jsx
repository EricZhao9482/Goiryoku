/* eslint-disable react/prop-types */

function BackButton( {onHomeScreen, onClickFunc} ) {

    return (
        <div className="center back-btn-container">
            <button className={`btn-tertiary ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`} onClick={onClickFunc}>もどる</button>
        </div>
    )
}

export default BackButton;