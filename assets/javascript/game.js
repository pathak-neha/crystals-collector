$(document).ready(function () {
    // -------------------------------------------- UPDATE SCREEN/DISPLAY ------------------------------------------------------
    // this section of the code adds the gems into the html
    var colors = ['blue', 'green', 'yellow', 'red'];
    $('#gems-group').append('<div>');

    for (i = 0; i < colors.length; i++) {
        var gems = $('<img>');
        gems.addClass('gem gem-' + colors[i]);
        gems.attr('color', colors[i]);
        gems.attr('src', './assets/images/' + colors[i] + '.png');
        $('#gems-group').append(gems);
    };

    // a function to update session stats (used between games)
    function updateStats() {
        $('#wins').text(wins);
        $('#losses').text(losses);
    }

    // --------------- BUTTONS FUNCTIONALITY ----------------
    $('#show-rules').on('click', function () {
        $('#start-button').text('Click to dismiss');
        $('.shadow').show();
        $('#game-rules').show();
    });

    $('#reset-btn').on('click', function () {
        counter = 0;
        $('#counter').text(counter);
    });

    // initialize game play/toggle rules in the initial screen
    //     note the start button is also the "dismiss button"
    $('#start-button').on('click', function () {
        $('.shadow').hide();
        $('#game-rules').hide();
    });

    // ---------------------------------------------------- GAME FUNCTIONALITY ---------------------------------------------------
    // defining global variables
    var counter = 0;
    var randomNumber;
    var wins = 0;
    var losses = 0;

    // a function to generate random integers between a specified max and min
    function containRandoms(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        // note that the maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // a function to assign values to the gems
    function generateGemValues() {

        // generate 4 distinct random numbers [the "if" statement can be eliminated to remove this condition]
        var randomArr = [];
        while (randomArr.length < 4) {
            var n = containRandoms(1, 13);
            if (randomArr.indexOf(n) == -1) {
                randomArr.push(n);
            }
        }
        // assign values to gems
        $('.gem-blue').val(randomArr[0]);
        $('.gem-green').val(randomArr[1]);
        $('.gem-yellow').val(randomArr[2]);
        $('.gem-red').val(randomArr[3]);

    };

    // to create the "randomNumber" that the user must score to win
    // note that this function makes sure that each game is winnable, and the randomNumber
    //          could otherwise be acheived simply using the containRandoms function above
    function generateRandom() {
        do {
            // Generate 4 random numbers (duplicates allowed here)
            var randomArr = [];
            while (randomArr.length < 4) {
                var n = containRandoms(1, 13);
                randomArr.push(n);
            }

            // add the values together to create "randomNumber" - the multiplication with the gem values makes each score achievable
            randomNumber = parseInt($('.gem-blue').val()) * randomArr[0];
            randomNumber += parseInt($('.gem-green').val()) * randomArr[1];
            randomNumber += parseInt($('.gem-yellow').val()) * randomArr[2];
            randomNumber += parseInt($('.gem-red').val()) * randomArr[3];

            // the "do/while" loop restricts the randomNumber variable with the limitations provided in the instructions
        } while (randomNumber < 19 || randomNumber > 120);

        // ********************* run the next 5 lines to check game functionality ***************** 
        console.log('to win:');
        console.log('click blue ' + randomArr[0] + ' times');
        console.log('click green ' + randomArr[1] + ' times');
        console.log('click yellow ' + randomArr[2] + ' times');
        console.log('click red ' + randomArr[3] + ' times');

        // clear the counter (since every time this function is invoked it should start a new game)
        counter = 0;
        $('#counter').text(counter);

        // update display
        $('#random-number').val(randomNumber);
        $('#random-number').text($('#random-number').val());

    }

    // call functions to generate values and random; prepare for game play
    generateGemValues();
    generateRandom();

    // a function for game play: runs main game functionality
    //            is called on a 'click' event on any of the gems 
    $('.gem').on('click', function () {
        // used the 'value' of each gem to update the counter
        counter += parseInt($(this).val());
        $('#counter').text(counter);

        // ---------------------- CONDITIONALS BEGIN ---------------------
        // if the user reaches the correct value (win)
        var winGame = setTimeout(function () {
            if (randomNumber === counter) {
                wins++;
                updateStats();
                if (confirm('You win! Start a new game?')) {
                    generateGemValues();
                    alert('Remember: the gems have been assigned new values.');
                    generateRandom();
                } else {
                    alert('Ok. Thank you for playing.');
                }
            }
        }, 250);

        // if the user crosses the correct value (loss)
        var winGame = setTimeout(function () {
            if (counter >= (randomNumber + 1)) {
                losses++;
                updateStats();
                if (confirm('You lose. Try again?')) {
                    generateGemValues();
                    alert('Remember: the gems have been assigned new values.');
                    generateRandom();
                } else {
                    alert('Ok. Better luck next time!');
                };
            };
        }, 250);
    });
});