
function MemoryMatch() {
    var background = ['background-1.jpg', 'background-2.jpg', 'background-3.jpg', 'background-4.jpg', 'background-5.jpg'];
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matches = 9;
    var match_counter = 0;
    var matches = 0;
    var attempts = 0;
    var accuracy = 0;
    var games_played = 0;
    var click_stop = true;
    var self = this;
    var modal = document.getElementById('victoryModal');
    var span = document.getElementsByClassName("close")[0];

    this.initializeGame = function() {
        $('.card').click(this.card_clicked);
        $('.music').click(this.audio_switch.bind(this));
        this.backgroundRandomizer();
        this.randomize_cards();
        this.display_stats();
        this.prevent_drag();
        $('.reset').click(this.reset.bind(this));
    };

    this.backgroundRandomizer = function() {
        $('#game-area').css({
            'background-image': 'url(images/backgrounds/' + background[Math.floor(Math.random() * background.length)] + ')'
        });
    };
    this.display_stats = function() {
        $('.games-played .value').text(games_played);
        $('.attempts .value').text(attempts);
        accuracy = Math.round(accuracy * 100);
        $('.accuracy .value').text(accuracy + '%');
    };
    this.reset_stats = function() {
        games_played++;
        matches = 0;
        attempts = 0;
        accuracy = 0;
        match_counter = 0;
        this.display_stats();
    };
    this.card_click_reset = function() {
        first_card_clicked = null;
        second_card_clicked = null;
    };
    this.flipCardBack = function() {
        $(first_card_clicked).toggleClass('flipped');
        $(second_card_clicked).toggleClass('flipped');
        self.card_click_reset();
        click_stop = true;
    };
    this.reset = function() {
        if (modal) {
            modal.style.display = "none";
        }
        this.card_click_reset();
        this.reset_stats();
        this.backgroundRandomizer();
        this.randomize_cards();
        $('.flipped').removeClass('flipped');
    };
    this.randomize_cards = function() {
        var cards = $('#game-area').children();
        while (cards.length) {
            $('#game-area').append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
        }
    };
    this.audio_switch = function() {
        if($('#audio').prop('muted')){
            $('#audio').prop('muted', false)
        }else{
            $('#audio').prop('muted', true)
        }
    };
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    this.prevent_drag = function(){
        $('img').prop('draggable', false);
    };
    this.victory = function() {
            modal.style.display = "block";
    };
    this.card_clicked = function() {
        //prevents the cards from being clicked
        if (!click_stop) {
            return;
        }
        //prevents already flipped cards from being clicked
        if ($(this).hasClass('flipped')) {
            return;
        }
        //flips the card to show face
        $(this).toggleClass('flipped');
        if (first_card_clicked === null) {
            first_card_clicked = this;
        }
        else {
            second_card_clicked = this;
            attempts++;
            //compares the face images against each other
            if ($(second_card_clicked).children('.front').find('img').attr('src') === $(first_card_clicked).children('.front').find('img').attr('src')) {
                match_counter++;
                matches++;
                self.card_click_reset();
                //end of game
                if (match_counter === total_possible_matches) {
                    setTimeout(self.victory, 2000);
                }
            }
            else {
                click_stop = false;
                setTimeout(self.flipCardBack, 1500);
            }
            accuracy = (matches / attempts);
            self.display_stats();
        }
    }
}

$(document).ready(function() {
    game = new MemoryMatch();
    $('#audio').prop('muted', true);
    game.initializeGame();
});