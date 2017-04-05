var mastermindGame = {
    //array to store the secret code.
    secretCode: [],
    //stores the guess digits
    guessArray: [],
    //generates four random numbers between 0 and 7
    generateCode: function() {
        var i = 0,j;
        while(i < 4) {
            j = Math.floor(Math.random() * (8));
            this.secretCode.push(j);
            i++;
        }
    },
    //prompts player to guess 4 digits which are then added to an array
    playerGuess: function(colorNumber) {
        console.log("Turn number " + this.turnCounter);
        if(this.turnCounter <= 10) {
            var i = 0;
            if (i < 4) {
                this.guessArray.push(colorNumber);
                console.log(this.guessArray);
            }
            i++
            // for(i = 0; i < 4; i++) {
            //     var guess = prompt("Guess digit number " + i);
            //     var guessNum = Number(guess);
            //     guessArray.push(guessNum);
            // }
            
            //this.checkResult(guessArray, this.secretCode);
        }
    },
    //checks the digits of the guess array against the digits of the code array to see number of correct colors and positions
    checkResult: function(guessArray,secretCode) {
        var guessIndex = 0;
        var codeIndex = 0;
        var correctColor = 0;
        var correctPosition = 0;
        for(guessIndex=0; guessIndex<4; guessIndex++) { //iterate through guessArray
            var k = 3;
            var flag = 0;
            while(k > guessIndex){
                if(guessArray[guessIndex] == guessArray[k]) {//check guessArray against self
                    flag++;
                }
                k--;
            }
            if (flag == 0) { //if it doesn't match
                for(codeIndex=0; codeIndex<4; codeIndex++) {//check against secret code
                    if(guessArray[guessIndex] == secretCode[codeIndex]) {
                        correctColor++;
                    }
                }
            }
            if(guessArray[guessIndex] == secretCode[guessIndex]) {//check it against secretCode for position
                correctPosition++;
            }   
        }
        //finds number of black and white feedback pegs. Correct position implies correct color.
        var whitePegs = correctColor - correctPosition;
        this.whitePegs = whitePegs;
        this.blackPegs = correctPosition;
        this.checkWin(this.blackPegs);

        console.log("Number of digits correct: " + correctColor);
        console.log("Number of positions correct: " + correctPosition);

        console.log("Black pegs: " + this.blackPegs);
        console.log("White pegs: " + this.whitePegs);
    },
    checkWin: function(blackPegs) {
        if(blackPegs == 4) {
            alert("You won the game!");
            this.whitePegs = 0;
            this.blackPegs = 0;
            this.turnCounter = 1;
        } else if (this.turnCounter == 10){
            alert("Game over. You lost.");
            this.whitePegs = 0;
            this.blackPegs = 0;
            this.turnCounter = 1;
        } else {
            this.turnCounter++;
        }
    },
    whitePegs: 0,
    blackPegs: 0,
    turnCounter: 1
}

var handlers = {
    addGuess: function(colorNumber) {
        mastermindGame.playerGuess(colorNumber);
    }
}

var view = {
    setUpEventListeners: function() {
        document.querySelector(".button-row").addEventListener('click', function(event) {
            var elementClicked = event.target;
            //console.log(elementClicked);
            if (elementClicked.className == "color-button") {
                view.changeColor(elementClicked);
            }
        });
    },
    changeColor: function(elementClicked) {
        switch(elementClicked.id) {
            case "btnRed":
                //change color to red. color number 0
                handlers.addGuess(0);
                console.log("Guessed Red");
                break;
            case "btnOrange":
                //change color to orange. color number 1
                handlers.addGuess(1);
                console.log("Guessed Orange");
                break;
            case "btnYellow":
                //change color to yellow. color number 2
                handlers.addGuess(2);
                console.log("Guessed Yellow");
                break;
            case "btnGreen":
                //change color to green. color number 3
                handlers.addGuess(3);
                console.log("Guessed Green");
                break;
            case "btnBlue":
                //change color to blue. color number 4
                handlers.addGuess(4);
                console.log("Guessed Blue");
                break;
            case "btnPurple":
                //change color to purple. color number 5
                handlers.addGuess(5);
                console.log("Guessed Purple");
                break;
            case "btnWhite":
                //change color to white. color number 6
                handlers.addGuess(6);
                console.log("Guessed White");
                break;
            case "btnBlack":
                //change color to black. color number 7
                handlers.addGuess(7);
                console.log("Guessed Black");
                break;
            default:
                //Should I just put this as the last button..??
                break;
        }
    }
}

mastermindGame.generateCode();
view.setUpEventListeners();
//console.log(mastermindGame.secretCode);
//mastermindGame.playerGuess();