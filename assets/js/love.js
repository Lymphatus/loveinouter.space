function playIntro() {
    var phrases = ['If you are gonna make it to the Moon', 'I\'ll be right there by your side', 'System initializing...'];

    var el = document.querySelector('#init-text');
    var fx = new TextScramble(el);

    var counter = 0;
    var loops = 0;
    var next = function next() {
    	if (loops === 1) {
    	    playError();
    		return false;
		}
        fx.setText(phrases[counter]).then(function () {
            setTimeout(next, 2000);
        });
    	if (counter === phrases.length - 1) {
    	    setTimeout(function () {
                $('#loading-progress').css('width', '100%');
            }, 2500);

        }
        counter = (counter + 1) % phrases.length;
        if (counter === 0) {
        	loops++;
		}
    };
    next();
}

function playError() {

}
