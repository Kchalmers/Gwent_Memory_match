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

//runs inizialize function
$(document).ready(initializeGame);
// functions starts initial functions
function initializeGame() {
    $('.card').click(card_clicked);
    $('.music').click(audio_switch);
    backgroundRandomizer();
    randomize_cards();
    display_stats();
    prevent_drag();
    $('.reset').click(reset);
}
//function changes background img
function backgroundRandomizer() {
    $('#game-area').css({
        'background-image': 'url(images/backgrounds/' + background[Math.floor(Math.random() * background.length)] + ')'
    });
}
//function shows change in stats
function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy = Math.round(accuracy * 100);
    console.log('Accuracy %: ', accuracy);
    $('.accuracy .value').text(accuracy + '%');
}
//sets the stats back to 0
function reset_stats() {
    games_played++;
    matches = 0;
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
    display_stats();
}
//sets the first and second cards clicked back to null
function card_click_reset() {
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('First Card Clicked: ', first_card_clicked, 'Second Card Clicked: ', second_card_clicked);
}
//makes first and second cards clicked flip to show card backs
function flipCardBack() {
    $(first_card_clicked).toggleClass('flipped');
    $(second_card_clicked).toggleClass('flipped');
    card_click_reset();
    click_stop = true;
}
//flips all flipped cards back and resets stats and background
function reset() {
    card_click_reset();
    reset_stats();
    backgroundRandomizer();
    randomize_cards();
    $('.flipped').removeClass('flipped');
}
//Randomize card locations
function randomize_cards() {
    var cards = $('#game-area').children();
    while (cards.length) {
        $('#game-area').append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }
}
//turns audio on and off
function audio_switch() {
    if($('#audio').prop('muted')){
        $('#audio').prop('muted', false)
    }else{
        $('#audio').prop('muted', true)
    }
}
//prevents img ghost from appearing on drag and revealing what cad is underneath
function prevent_drag(){
    $('img').prop('draggable', false);
}
//will show a victory message after all matches are made
function victory() {
    $('#game-area').replaceWith('<img src="../memory_match/images/victory.png" id = "victory">')
}

//what happens when cards are clicked
function card_clicked(){
    //prevents the cards from being clicked
    if (click_stop != true){
        return;
    }
    //prevents already flipped cards from being clicked
    if ($(this).hasClass('flipped') == true){
        return;
    }
    //flips the card to show face
    $(this).addClass('flipped');
    if(first_card_clicked === null){
        first_card_clicked = this;
        console.log('first card is: ', first_card_clicked);
    }
    else{
        second_card_clicked = this;
        console.log('second card is: ', second_card_clicked);
        attempts++;
        console.log('Attempts: ', attempts);
        //compares the face images against each other
        if($(second_card_clicked).children('.front').find('img').attr('src') === $(first_card_clicked).children('.front').find('img').attr('src')){
            match_counter++;
            console.log('Match Counter: ', match_counter);
            matches++;
            console.log('Matches: ', matches);
            card_click_reset();
            //end of game
            if(match_counter == total_possible_matches){
                victory();
                console.log('victory');
            }
        }
        else {
            click_stop = false;
            setTimeout(flipCardBack, 1500);
        }
        accuracy = (matches/attempts);
        console.log('Accuracy: ', accuracy);
        display_stats();
    }
}