/* eslint-disable react/prop-types */

/**
 * Subsection holding the welcome message on the homescreen
 * @param {boolean} onHomeScreen - lets the component know if its on the homescreen or not to determine visibility
 * @returns 
 */
function Subsection( {onHomeScreen} ) {

    return (
        <section id="welcome-msg" className={`center ${onHomeScreen ? "fade-in-from-top" : "hide"}`}> 
            <p>Test the limits of your Japanese vocabulary knowledge<br />
            See how many words you can recognize</p>
        </section>
    )
}

export default Subsection;