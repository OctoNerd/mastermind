var mastermindGame = {
    //array to store the secret code.
    secretCode: [],
    //generates four random numbers between 0 and 7
    codeGenerator: function() {
        var i = 1,j;
        while(i <= 4) {
            j = Math.floor(Math.random() * (8));
            this.secretCode.push(j);
            i++;
        };
    },
    //prompts player to guess 4 digits which are then added to an array
    playerGuess: function() {
        var i = 1;
        var guessArray = [];
        while(i <= 4) {
            var guess = prompt("Guess a number between 0 and 7. Digit number " + i);
            var guessNum = Number(guess);
            guessArray.push(guessNum);
            i++;
        };
        this.colorCheck(guessArray, this.secretCode);
        //return guessArray;
    },
    colorCheck: function(guessArray,secretCode) {
        var guessIndex = 0;
        var codeIndex = 0;
        var correctColor = 0;
        for(guessIndex=0; guessIndex<4; guessIndex++) {
            for(codeIndex=0; codeIndex<4; codeIndex++) {
                 if(guessArray[guessIndex] == secretCode[codeIndex]) {
                    correctColor++;
                 };
            };
        };
        console.log(correctColor);
    }
};

mastermindGame.codeGenerator();
console.log(mastermindGame.secretCode);