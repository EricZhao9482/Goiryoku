/* eslint-disable react/prop-types */

function WordLists( {onHomeScreen, knownWordsList, unknownWordsList} ) {

    return (
        <div id="word-list-container" className={`center word-list-container ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <div>
                <p>Known Words</p>
                <table id="known-words-table">
                    <tr>
                        <th>言葉</th>
                        <th>読み方</th>
                        <th>JLPT</th>
                        <th>英訳</th>
                    </tr>
                    {knownWordsList.map( (word) => (
                        <tr key={word.word}>
                            <td>{word.word}</td>
                            <td>{word.reading}</td>
                            <td>{word.jlptLevel}</td>
                            <td>{word.englishMeaning}</td>
                        </tr>
                    )
                )}
                </table>
            </div>
            <div>
                <p>Unknown Words</p>
                <table id="unknown-words-table">
                    <tr>
                        <th>言葉</th>
                        <th>読み方</th>
                        <th>JLPT</th>
                        <th>英訳</th>
                    </tr>
                    {unknownWordsList.map( (word) => (
                        <tr key={word.word}>
                            <td>{word.word}</td>
                            <td>{word.reading}</td>
                            <td>{word.jlptLevel}</td>
                            <td>{word.englishMeaning}</td>
                        </tr>
                    )
                )}
                </table>
            </div>
        </div>
    )
}

export default WordLists;