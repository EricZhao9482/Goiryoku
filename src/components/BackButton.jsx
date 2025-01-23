/* eslint-disable react/prop-types */

function BackButton( {onHomeScreen, onClickFunc} ) {

    return (
        <div className="center">
            <button className={`center btn-secondary ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`} onClick={onClickFunc}>もどる</button>
        </div>
    )
}

export default BackButton;