
/**
 * A class that handles generating a new word and definitions
 */
class JPDict {

    constructor() {
        
    }

    getWordGivenListOfDiff(diffLvls) {

        // first check if the given array length to make sure it isn't empty
        let arrayLen = diffLvls.length;

        // if it is empty, default to an array of ["N5"].
        if (arrayLen === 0) {
            diffLvls = ["N5"];
        }
        // TODO: Finish this code's logic 
    }

}

export default JPDict;


