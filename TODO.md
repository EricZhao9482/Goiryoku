
- debloat the css file. split the stylings so that each component has it's own designed css sheet for ease of maintenance

- make difficulties better styled for mobile viewing

- fix duplicate words glitching out the known/unknown word list
  * might make a testing.csv file with only one or two words to help easily recreate the bug

- try to see if buttons can be disabled until a new word loads
  * should be achievable by adding an additional state that freezes the button only until after the new word gets generated at the end of the getWordGivenListOfDiff() method inside app.jsx