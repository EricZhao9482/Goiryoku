/* eslint-disable react/prop-types */
function WordList( {listName, wordList} ) {

    // constants for css styling
    const word_col = "word-col";
    const reading_col = "reading-col";
    const jlpt_col = "jlpt-col";
    const definition_col = "definition-col";


    let listNameFormatting = `${listName}`
    if (wordList.length > 0) {
        listNameFormatting += ` (${wordList.length})`;
    }  

    return (
        <div>
            <p>{listNameFormatting}</p>
            <table>
                <tbody>
                    <tr>
                        <th className={word_col}>言葉</th>
                        <th className={reading_col}>読み方</th>
                        <th className={jlpt_col}>JLPT</th>
                        <th className={definition_col}>英訳</th>
                    </tr>
                    {wordList.map( (word) => (
                        <tr key={word.word}>
                            <td className={word_col}>{word.word}</td>
                            <td className={reading_col}>{word.reading}</td>
                            <td className={jlpt_col}>{word.jlptLevel}</td>
                            <td className={definition_col}>{word.englishMeaning}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default WordList;