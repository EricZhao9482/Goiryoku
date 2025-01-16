// import { csv } from "jquery-csv";
import Papa from "papaparse";
// import fs from "node:fs";
// import path from "path";

/**
 * A class that handles generating a new word and definitions
 */
class JPDict {

    constructor() {
        // this.csvReader = csv;   
    }

    async getWordGivenListOfDiff(diffLvls) {

        // first check if the given array length to make sure it isn't empty
        let arrayLen = diffLvls.length;

        // if it is empty, default to all difficulties selected
        if (arrayLen === 0) {
            diffLvls = ["N5", "N4", "N3", "N2", "N1"];
        }

        // get random diff from list
        let randomDiff = diffLvls[Math.floor(Math.random()*diffLvls.length)];

        let csvFile = randomDiff + ".csv";

        const filePath = "vocabulary/" + csvFile;

        // Read the CSV file. these are await functs so this method needs to be labeled as async
        const response = await fetch(filePath); // Fetch the file
        const text = await response.text(); // Get the text content
      
        // Parse the CSV data
        Papa.parse(text, {
            // if parsing was successful 
            complete: (results) => {
                let resultsData = results.data;  // the entire csv file represented as an array
                let resultsLen = resultsData.length;  
                
                // generate a random index to pull from the array
                // (resultsLen-1) = the range from 1 to the length of results 
                // +1 ensures we don't pull from the header of the csv 
                let randomIndex = Math.floor(Math.random()*(resultsLen-1)) + 1;
                console.log("jp dict result: " + resultsData[randomIndex]);
                return resultsData[randomIndex];
            },
            error: (err) => {
              console.error("Error parsing CSV:", err);
            },
          });
        return [];
    }
}

export default JPDict;