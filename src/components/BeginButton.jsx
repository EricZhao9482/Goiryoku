
// eslint-disable-next-line react/prop-types
function BeginButton({onClickFunc}) {
    
    return (
        <div id="begin-btn" className="center btn-primary fade-in-from-bottom" onClick={onClickFunc}>
            <p>Begin</p>
        </div>
    )
}

export default BeginButton;