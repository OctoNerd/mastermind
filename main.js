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
    playerGuess: function() {
        var i = 1;
        var guessArray = [];
        while(i <= 4) {
            var guess = prompt("Guess a number between 0 and 7. Digit number " + i);
            var guessNum = Number(guess);
            guessArray.push(guessNum);
            i++;
        };
        return guessArray;
    }
};

mastermindGame.codeGenerator();
console.log(mastermindGame.secretCode);