
// eslint-disable-next-line react/prop-types
function Subsection( {onHomeScreen} ) {

    return (
        <section id="welcome-msg" className={`center ${onHomeScreen ? "fade-in-from-top" : "hide"}`}> 
            <p>Test the limits of your Japanese vocabulary knowledge<br />
            See how many words you can recognize</p>
        </section>
    )
}

export default Subsection;