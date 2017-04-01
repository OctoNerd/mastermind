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
    }
};

mastermindGame.codeGenerator();
console.log(mastermindGame.secretCode);