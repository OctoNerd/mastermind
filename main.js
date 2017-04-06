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
        console.log(this.secretCode);
    },
    guessDigit: 1,
    //prompts player to guess 4 digits which are then added to an array
    playerGuess: function(colorNumber) {
        //console.log("Turn number " + this.turnCounter);
        if(this.turnCounter <= 10) {
            this.guessArray.push(colorNumber);
            console.log(this.guessArray);
            this.guessDigit++;            
        }
    },
    //checks the digits of the guess array against the digits of the code array to see number of correct colors and positions
    checkResult: function() {
        var guessIndex = 0;
        var codeIndex = 0;
        var correctColor = 0;
        var correctPosition = 0;
        for(guessIndex=0; guessIndex<4; guessIndex++) { //iterate through guessArray
            var k = 3;
            var flag = 0;
            while(k > guessIndex){
                if(this.guessArray[guessIndex] == this.guessArray[k]) {//check guessArray against self
                    flag++;
                }
                k--;
            }
            if (flag == 0) { //if it doesn't match
                for(codeIndex=0; codeIndex<4; codeIndex++) {//check against secret code
                    if(this.guessArray[guessIndex] == this.secretCode[codeIndex]) {
                        correctColor++;
                    }
                }
            }
            if(this.guessArray[guessIndex] == this.secretCode[guessIndex]) {//check it against secretCode for position
                correctPosition++;
            }   
        }
        //finds number of black and white feedback pegs. Correct position implies correct color.
        var whitePegs = correctColor - correctPosition;
        this.whitePegs = whitePegs;
        this.blackPegs = correctPosition;
        this.checkWin(this.blackPegs);
        this.guessDigit = 1;

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
            handlers.displayFeedback();
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
    },
    clearPegs: function() {
        mastermindGame.guessDigit = 1;
        mastermindGame.guessArray = [];
    },
    submitGuess: function() {
        if(mastermindGame.guessArray.length == 4) {
            mastermindGame.checkResult();
        }
    },
    displayFeedback: function() {
        view.displayFeedback(mastermindGame.blackPegs, mastermindGame.whitePegs);
    }

}

var view = {
    setUpEventListeners: function() {
        document.querySelector(".button-row").addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className == "color-button") {
                view.changeColor(elementClicked);
            } else if (elementClicked.className == "button btnClear") {
                view.clearPegs();
            } else if (elementClicked.className == "button btnSubmit") {
                handlers.submitGuess();
            }
        });
    },
    changeColor: function(elementClicked) {
        var currentTurnColumnId = "#turnColumn" + parseInt(mastermindGame.turnCounter);
        var currentTurnColumn = document.querySelector(currentTurnColumnId);
        var currentPeg = currentTurnColumn.firstChild.nextSibling.nextSibling.nextSibling.querySelector(".pegSlot" + mastermindGame.guessDigit);


        if (mastermindGame.guessDigit < 5) {
            switch(elementClicked.id) {
                case "btnRed":
                    //change color to red. color number 0
                    handlers.addGuess(0);
                    currentPeg.style.background = '#d81313';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnOrange":
                    //change color to orange. color number 1
                    handlers.addGuess(1);
                    currentPeg.style.background = '#e09916';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnYellow":
                    //change color to yellow. color number 2
                    handlers.addGuess(2);
                    currentPeg.style.background = '#e5e519';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnGreen":
                    //change color to green. color number 3
                    handlers.addGuess(3);
                    currentPeg.style.background = '#1cc91c';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnBlue":
                    //change color to blue. color number 4
                    handlers.addGuess(4);
                    currentPeg.style.background = '#1d80e2';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnPurple":
                    //change color to purple. color number 5
                    handlers.addGuess(5);
                    currentPeg.style.background = '#9e149e';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnWhite":
                    //change color to white. color number 6
                    handlers.addGuess(6);
                    currentPeg.style.background = '#e5e5e5';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case "btnBlack":
                    //change color to black. color number 7
                    handlers.addGuess(7);
                    currentPeg.style.background = '#222';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                default:
                    //Should I just put this as the last button..??
                    break;
            }
        }
    },
    clearPegs: function() {
        var currentTurnColumnId = "#turnColumn" + parseInt(mastermindGame.turnCounter);
        var currentTurnColumn = document.querySelector(currentTurnColumnId);
        var colorPeg1 = currentTurnColumn.querySelector(".pegSlot1");
        var colorPeg2 = currentTurnColumn.querySelector(".pegSlot2");
        var colorPeg3 = currentTurnColumn.querySelector(".pegSlot3");
        var colorPeg4 = currentTurnColumn.querySelector(".pegSlot4");

        colorPeg1.style.background = "gray";
        colorPeg1.style.boxShadow = "";

        colorPeg2.style.background = "gray";
        colorPeg2.style.boxShadow = "";

        colorPeg3.style.background = "gray";
        colorPeg3.style.boxShadow = "";

        colorPeg4.style.background = "gray";
        colorPeg4.style.boxShadow = "";

        handlers.clearPegs();
    },
    displayFeedback: function(blackPegs, whitePegs) {
        var currentTurnColumnId = "#turnColumn" + parseInt(mastermindGame.turnCounter);
        var currentTurnColumn = document.querySelector(currentTurnColumnId);
        var feedbackBox = currentTurnColumn.firstChild.nextSibling;
        var i = 1;
        var currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
        var blackPegCount = blackPegs;
        var whitePegCount = whitePegs;
        console.log("BlackPegCount: " + blackPegCount);
        console.log("WhitePegCount: " + whitePegCount);
        
        
        while(blackPegCount > 0) {
            currentPeg.className = "feedbackPeg-black feedbackPos" + parseInt(i) + "-full";
            blackPegCount--;
            i++;
            currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
            //console.log("New black count: " + blackPegCount + " i: " + i);
        }

        while(whitePegCount > 0) {
            currentPeg.className = "feedbackPeg-white feedbackPos" + parseInt(i) + "-full";
            whitePegCount--;
            i++;
            currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
            //console.log("New white count: " + whitePegCount + " i: " + i);
        }

        //console.log(blackPegs);
        //console.log(whitePegs);
    }
}

mastermindGame.generateCode();
view.setUpEventListeners();
//console.log(mastermindGame.secretCode);
//mastermindGame.playerGuess();