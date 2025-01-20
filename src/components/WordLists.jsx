/* eslint-disable react/prop-types */

function WordLists( {onHomeScreen, knownWordsList, unknownWordsList} ) {

    const definition_col = "definition-col";

    return (
        <div id="word-list-container" className={`center word-list-container ${onHomeScreen ? "hide" : "fade-in-from-bottom"}`}>
            <div>
                <p>Known Words</p>
                <table id="known-words-table">
                    <tbody>
                        <tr>
                            <th>言葉</th>
                            <th>読み方</th>
                            <th>JLPT</th>
                            <th className={definition_col}>英訳</th>
                        </tr>
                        {knownWordsList.map( (word) => (
                            <tr key={word.word}>
                                <td>{word.word}</td>
                                <td>{word.reading}</td>
                                <td>{word.jlptLevel}</td>
                                <td className={definition_col}>{word.englishMeaning}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <p>Unknown Words</p>
                <table id="unknown-words-table">
                    <tbody>
                        <tr>
                            <th>言葉</th>
                            <th>読み方</th>
                            <th>JLPT</th>
                            <th className={definition_col}>英訳</th>
                        </tr>
                        {unknownWordsList.map( (word) => (
                            <tr key={word.word}>
                                <td>{word.word}</td>
                                <td>{word.reading}</td>
                                <td>{word.jlptLevel}</td>
                                <td className={definition_col}>{word.englishMeaning}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WordLists;