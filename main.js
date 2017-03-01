var background = ['background-1.jpg', 'background-2.jpg', 'background-3.jpg', 'background-4.jpg', 'background-5.jpg'];
var north_cards = ['Esterad_Thyssen.png', 'John_Natalis.png', 'Philippa_Eilhart.png', 'Sabrina_Glevissig.png', 'Sheldon_Skaggs.png', 'Siegfried_of_Denesle.png', 'Sile_de_Tansarville.png', 'Vernon_Roche.png', 'Ves.png'];
var skellige_cards = ['Blueboy_Lugos.png', 'Cerys.png', 'Donar_an_Hindar.png', 'Ermion.png', 'Hemdall.png', 'Hjalmar.png', 'Holger_Blackhand.png', 'Madman_Lugos.png', 'Olaf.png'];
var monster_cards = ['Arachas_Behemoth.png', 'Crone_Brewess.png', 'Draug.png', 'Fiend.png', 'Fire_Elemental.png', 'Imlerith.png', 'Kayran.png', 'Leshen.png', 'Toad.png'];
var scoiatael_cards = ['Dennis_Cranmer.png', 'Eithne.png', 'Filavandrel_aen_Fidhail.png', 'Ida_Emean_aep_Sivney.png', 'Iorveth.png', 'Isengrim_Faoiltiarna.png', 'Milva.png', 'Saesenthessis.png', 'Yaevinn.png'];
var nilfgaardian_cards = ['Assire_var_Anahid.png', 'Cahir_Ceallach.png', 'Cynthia.png', 'Fringilla_Vigo.png', 'Letho_of_Gulet.png', 'Menno_Coehoorn.png', 'Morvran_Voorhis.png', 'Shilard_Fitz-Oesterlen.png', 'Tibor_Eggebracht.png'];
var cards =[north_cards, skellige_cards, monster_cards, scoiatael_cards, nilfgaardian_cards];
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var SetTimeout = setTimeout();
$(document).ready(function () {
    backgroundRandomizer();
    shuffle(cards);
    $('.card').click(card_clicked);
    display_stats();
    $('.reset').on("click", function () {
        reset_stats();
        display_stats();
        backgroundRandomizer();
        $('.card').removeClass('flipped');
    });
});
function backgroundRandomizer() {
    $('#game-area').css({'background-image': 'url(images/backgrounds/' + background[Math.floor(Math.random() * background.length)] + ')'});
}
function shuffle(cards) {
    for (var x, y, z = cards.length; z; x = parseInt(Math.random() * z), y = cards[--z], cards[z] = cards[x], cards[x] = y);
    return cards;
}
function card_clicked(){
    $(this).addClass('flipped');
    if(first_card_clicked === null){
        first_card_clicked = $(this);
        }
    else{
        second_card_clicked = $(this);
        attempts++;
        console.log('Attempts: ', attempts);
        if($(second_card_clicked).find('img').attr('src') === $(first_card_clicked).find('img').attr('src')){
            match_counter++;
            console.log('Match Counter: ', match_counter);
            matches++;
            console.log('Matches: ', matches);
            $(first_card_clicked).off("click");
            $(second_card_clicked).off("click");
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('match made');
            if(match_counter == total_possible_matches){
                alert("You won");
            }
        }
        else {
            var timeout = setTimeout( function() {
                    $(first_card_clicked).removeClass('flipped');
                    $(second_card_clicked).removeClass('flipped');
                    first_card_clicked = null;
                    second_card_clicked = null;
                }, 2000);
        }
        accuracy = (matches/attempts);
        console.log('Accuracy: ', accuracy);
        display_stats();
    }
}
function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy = Math.round(accuracy * 100);
    console.log('Accuracy %: ', accuracy);
    $('.accuracy .value').text(accuracy + '%');
}
function reset_stats() {
    games_played++;
    matches = 0;
    attempts = 0;
    accuracy = 0;
    display_stats();
}