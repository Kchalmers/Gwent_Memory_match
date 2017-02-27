function deck_randomizer() {
    
}

$(document).ready(function () {
    var count = 0;
    var background = ['background-1.jpg', 'background-2.jpg', 'background-3.jpg', 'background-4.jpg', 'background-5.jpg'];
    $('#game-area').css({'background-image': 'url(images/backgrounds/' + background[Math.floor(Math.random() * background.length)] + ')'});
});