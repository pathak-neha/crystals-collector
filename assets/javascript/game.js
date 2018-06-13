<script src="https://code.jquery.com/jquery.js">
$(document).ready(function () {
    var blue = {};
    var green = {};
    var yellow = {};
    var red = {};

    function containRandoms(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function generateRandoms() {
        blue.val = containRandoms(1, 12);
        green.val = containRandoms(1, 12);
        yellow.val = containRandoms(1, 12);
        red.val = containRandoms(1, 12);
    };

    function loadScreen() {
        var gameRules = $(".game-rules");
        gameRules.setAttribute("display", "none");
    }

    var startButton = $("#start-button");
    startButton.on("click", function () {
        loadScreen();
    });

});

</script>