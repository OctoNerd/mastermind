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
        //console.log(this.secretCode);
    },
    guessDigit: 1,
    //prompts player to guess 4 digits which are then added to an array
    playerGuess: function(colorNumber) {
        if(this.turnCounter <= 10) {
            this.guessArray.push(colorNumber);
            this.guessDigit++;            
        }
        // if(this.guessDigit == 5) {
        //     console.log(this.guessArray);
        // }
    },
    //checks the digits of the guess array against the digits of the code array to see number of correct colors and positions
    checkResult: function() {
        var guessIndex = 0;
        var codeIndex = 0;
        var correctColor = 0;
        var correctPosition = 0;
        for(guessIndex=0; guessIndex<4; guessIndex++) { //iterate through guessArray
            var k = 3;
            var flag = false;
            while(k > guessIndex){
                if(this.guessArray[guessIndex] == this.guessArray[k]) {//check guessArray against self
                    flag = true;
                }
                k--;
            }
            if (flag == false) { //if it doesn't match
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
    },
    checkWin: function(blackPegs) {
        if(blackPegs == 4) {
            handlers.displayFeedback();
            handlers.displaySecretCode();
            alert("You won the game!");
            this.gameOver = true;
        } else if (this.turnCounter == 10){
            handlers.displayFeedback();
            handlers.displaySecretCode();
            alert("Game over. You lost.");
            this.gameOver = true;
        } else {
            handlers.displayFeedback();
            this.turnCounter++;
            this.guessArray = [];
        }
    },
    whitePegs: 0,
    blackPegs: 0,
    turnCounter: 1,
    gameOver: false
}

var handlers = {
    addGuess: function(colorNumber) {
        mastermindGame.playerGuess(colorNumber);
    },
    changeColor: function(elementClicked) {
        if (mastermindGame.gameOver == false) {
            view.changeColor(elementClicked);
        }
    },
    clearPegs: function() {
        if (mastermindGame.gameOver == false) {
            mastermindGame.guessDigit = 1;
            mastermindGame.guessArray = [];
            view.clearPegs();
        }
    },
    submitGuess: function() {
        if(mastermindGame.guessArray.length == 4 && mastermindGame.gameOver == false) {
            mastermindGame.checkResult();
            if(mastermindGame.gameOver == false) {
                view.highlightTurnNumber();
                view.unHighlightLastTurnNumber(mastermindGame.turnCounter);
            }
        }
    },
    displayFeedback: function() {
        if(mastermindGame.gameOver == false) {
            view.displayFeedback(mastermindGame.blackPegs, mastermindGame.whitePegs);
        }
    },
    displaySecretCode: function() {
        view.displaySecretCode(mastermindGame.secretCode);
    },
    reset: function() {
        view.reset();
        mastermindGame.guessArray = [];
        mastermindGame.gameOver = false;
        view.unHighlightLastTurnNumber(mastermindGame.turnCounter + 1);
        mastermindGame.turnCounter = 1;
        mastermindGame.guessDigit = 1;
        mastermindGame.blackPegs = 0;
        mastermindGame.whitePegs = 0;
        mastermindGame.secretCode = [];
        mastermindGame.generateCode();
        view.highlightTurnNumber();
    }
}

var view = {
    setUpEventListeners: function() {
        document.querySelector(".button-row").addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className == "color-button") {
                handlers.changeColor(elementClicked);
            } else if (elementClicked.className == "button btnClear") {
                handlers.clearPegs();
            } else if (elementClicked.className == "button btnSubmit") {
                handlers.submitGuess();
            } else if (elementClicked.className == "button btnReset") {
                handlers.reset();
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
    },
    displayFeedback: function(blackPegs, whitePegs) {
        var currentTurnColumnId = "#turnColumn" + parseInt(mastermindGame.turnCounter);
        var currentTurnColumn = document.querySelector(currentTurnColumnId);
        var feedbackBox = currentTurnColumn.firstChild.nextSibling;
        var i = 1;
        var currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
        var blackPegCount = blackPegs;
        var whitePegCount = whitePegs;
        while(blackPegCount > 0) {
            currentPeg.className = "feedbackPeg-black feedbackPos" + parseInt(i) + "-full";
            currentPeg.style.boxShadow = '0px 1px 2px #555';
            blackPegCount--;
            i++;
            currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
        }
        while(whitePegCount > 0) {
            currentPeg.className = "feedbackPeg-white feedbackPos" + parseInt(i) + "-full";
            currentPeg.style.boxShadow = '0px 1px 2px #555';
            whitePegCount--;
            i++;
            currentPeg = feedbackBox.querySelector(".feedbackPos" + i);
        }
    },
    highlightTurnNumber: function() {
        var currentTurnColumnId = "#turnColumn" + parseInt(mastermindGame.turnCounter);
        var currentTurnColumn = document.querySelector(currentTurnColumnId);
        var turnNumberElement = currentTurnColumn.querySelector(".turnIndicator-hidden");
        turnNumberElement.className = "turnIndicator";
    },
    unHighlightLastTurnNumber: function(turnNumber) {
        var lastTurnColumnId = "#turnColumn" + parseInt(turnNumber - 1);
        var lastTurnColumn = document.querySelector(lastTurnColumnId);
        var lastTurnNumberElement = lastTurnColumn.querySelector(".turnIndicator");
        lastTurnNumberElement.className = "turnIndicator-hidden";
    },
    displaySecretCode: function(secretCode) {
        var answerColumn = document.querySelector(".board-answerColumn");
        for (i=0; i<4; i++) {
            var currentPeg = answerColumn.querySelector(".pegSlot" + parseInt(i));

            switch(secretCode[i]) {
                case 0:
                    currentPeg.style.background = '#d81313';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 1:
                    currentPeg.style.background = '#e09916';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 2:
                    currentPeg.style.background = '#e5e519';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 3:
                    currentPeg.style.background = '#1cc91c';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 4:
                    currentPeg.style.background = '#1d80e2';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 5:
                    currentPeg.style.background = '#9e149e';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 6:
                    currentPeg.style.background = '#e5e5e5';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                case 7:
                    currentPeg.style.background = '#222';
                    currentPeg.style.boxShadow = '0px 2px 3px #555';
                    break;
                default:
                    break;
            }
        }
    },
    reset: function() {
        for(i=1; i<11; i++) {
            var currentTurnColumnId = "#turnColumn" + parseInt(i);
            var currentTurnColumn = document.querySelector(currentTurnColumnId);
            var answerColumn = document.querySelector(".board-answerColumn");
            
            for(j=1; j<5; j++) {
                var currentFeedbackPeg = currentTurnColumn.querySelector(".feedbackPos" + parseInt(j) + "-full");
                if (currentFeedbackPeg != null) {
                    currentFeedbackPeg.className = "feedbackPeg feedbackPos" + parseInt(j);
                    currentFeedbackPeg.style.boxShadow = "";
                }

                var currentPeg = currentTurnColumn.querySelector(".pegSlot" + parseInt(j));
                currentPeg.style.background = "gray";
                currentPeg.style.boxShadow = "";

                var currentAnsPeg = answerColumn.querySelector(".pegSlot" + parseInt(j-1));
                if (currentAnsPeg != null) {
                    currentAnsPeg.style.background = "gray";
                    currentAnsPeg.style.boxShadow = "";
                }
                
            }
        }
    }
}


mastermindGame.generateCode();
view.setUpEventListeners();
view.highlightTurnNumber();