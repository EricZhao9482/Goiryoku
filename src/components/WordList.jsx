/* eslint-disable react/prop-types */
function WordList( {listName, wordList} ) {

    const definition_col = "definition-col";

    return (
        <div>
            <p>{listName}</p>
            <table>
                <tbody>
                    <tr>
                        <th>言葉</th>
                        <th>読み方</th>
                        <th>JLPT</th>
                        <th className={definition_col}>英訳</th>
                    </tr>
                    {wordList.map( (word) => (
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
    )
}

export default WordList;