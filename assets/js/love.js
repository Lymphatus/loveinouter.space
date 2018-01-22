$(document).ready(function () {
	playIntro();
});

// function playIntro() {
// 	new Typed('#init-text', {
// 		strings: [
// 			'If u a',
// 			'If you are gona',
// 			'If you are gonna make it to the moon',
// 			'If you are gonna make it to the Moon',
// 			'If you are gonna make it to the Moon',
// 			'I\'ll be right thwre',
// 			'I\'ll be right there',
// 			'I\'ll be right there by your side',
// 			'I\'ll be right there by your side',
// 			'System initializing...'
// 		],
// 		typeSpeed: 50,
// 		backSpeed: 25,
// 		backDelay: 300,
// 		startDelay: 1000,
// 		smartBackspace: true,
// 		loop: false,
// 		cursorChar: '_',
// 		onComplete: function () {
// 			$('#loading-progress').css('width', '100%');
// 			$('#init-text').addClass('animated flash infinite');
// 			$('.typed-cursor').addClass('animated flash infinite');
// 			setTimeout(function () {
// 				$('#init-text').removeClass('animated flash infinite');
// 				$('.typed-cursor').removeClass('animated flash infinite');
// 				$('#loading-progress').css('width', 0);
// 				new Typed('#init-text', {
// 					strings: [
// 						'Error',
// 						'Error',
// 						'Code: 51PP4',
// 						'Code: 51PP4',
// 						'Code: 51PP4',
// 						'Cannot reach destination',
// 						'Reverting HUD...'
// 					],
// 					typeSpeed: 50,
// 					backSpeed: 25,
// 					backDelay: 300,
// 					startDelay: 1000,
// 					showCursor: false,
// 					onComplete: function () {
// 						$('#init-text').removeClass('animated flash infinite');
// 						$('.typed-cursor').removeClass('animated flash infinite');
// 						$('#loading-progress').css('width', '100%');
// 					}
// 				});
// 			}, 2000);
// 		}
// 	});
// }

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