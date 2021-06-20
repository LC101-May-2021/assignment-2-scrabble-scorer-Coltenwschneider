// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let inputWord = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  inputWord = input.question("\n\nLet's play some scrabble! Enter a word: ");
};


function simpleScore(word) {
  let simpleWordScore = 0;
  for (let i = 0; i < word.length; i++) {
    simpleWordScore++
  }
  return simpleWordScore;
}

// let simpleScore;

function vowelBonusScore(word) {
  let vowelArray = ["a", "e", "i", "o", "u"]
  let vowelConsonantScore = 0;
  for (let i = 0; i < word.length; i++){
    if (vowelArray.includes(word[i].toLowerCase())){
      vowelConsonantScore+=3;
    } else {
      vowelConsonantScore++;
    }
  }
return vowelConsonantScore
}

// let vowelBonusScore;

// let scrabbleScore;

// const scoringAlgorithms = [];

function transform(oldObject) {
  let newObject={};

  for (key in oldObject) {
    for ( let i = 0; i < oldObject[key].length; i++) {
      newObject[(oldObject[key][i]).toLowerCase()] = Number(key);
    }
  }
  return newObject;
}

// let newPointStructure;

// let oldScrabbleScorerObject = {
//   name: "Scrabble",
//   description: "The traditional scoring algorithm.",
//   scorerFunction: word => oldScrabbleScorer(word)
// };

let scrabbleScoreObject = {
  // name: "Scrabble",
  // description: "The traditional scoring algorithm.",
  scoringFunction: (word) => scrabbleScore(word)
};


let simpleScoreObject = {
  // name: "Simple Score",
  // description: "Each letter is worth 1 point.",
  scoringFunction: (word) => simpleScore(word)
};

let vowelBonusScoreObject = {
  // name: "Bonus Vowels",
  // description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: (word) => vowelBonusScore(word)
};

const scoringAlgorithms= [ simpleScoreObject, vowelBonusScoreObject, scrabbleScoreObject ];

function scorerPrompt(userInput) {
  if (userInput === "0") {
    return simpleScoreObject;
  }
  else if (userInput === "1") {
    return vowelBonusScoreObject;
  }
  else if (userInput === "2") {
    return scrabbleScoreObject;
  }
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word) {
  	word = word.toLowerCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
    letterPoints += newPointStructure[word[i]];
	}
	return letterPoints;
}

function runProgram() {
   let letterPoints = 0;
   initialPrompt();
   for (i = 0; i < scoringAlgorithms.length; i++) {
     console.log(i + ": " + scoringAlgorithms[i].name);
   }
   let userMethodSelect = input.question("Which scoring algorithm would you like to use?: ")
   let userObjectSelect = scorerPrompt(userMethodSelect); 
   letterPoints = userObjectSelect.scoringFunction(inputWord);
   console.log(`Score for '${inputWord}' is: ${letterPoints}`)
  //  let letterPoints = oldScrabbleScorer(inputWord);
  // let letterPoints = simpleScore(inputWord);
  // let letterPoints = vowelBonusScore(inputWord);
  //  console.log(`Your score for ${inputWord} is \n${letterPoints}.`)
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

