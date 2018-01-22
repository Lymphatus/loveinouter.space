function playIntro() {
    var phrases = [
        // 'If you are gonna make it to the Moon',
        // 'I\'ll be right there by your side',
        'System booting',
        'Initializing audio channels',
        'Generating visual effects',
        'Connecting to neural network',
        'Decrypting thoughts',
        '[CRITICAL FAILURE]'
    ];

    var el = document.querySelector('#init-text');
    var fx = new TextScramble(el);

    var counter = 0;
    var loops = 0;
    $('#loading-progress').css('width', '100%');
    var next = function next() {
        if (loops === 1) {
            return false;
        }
        fx.setText(phrases[counter]).then(function () {
            setTimeout(next, 2000);
        });
        switch (counter) {
            case 0:
                break;
            case 1:
                audioController.play();
                break;
            case 5:
                playError();
        }
        counter = (counter + 1) % phrases.length;
        if (counter === 0) {
            loops++;
        }
    };
    next();
}

function playError() {
    $('#init-text').css('color', '#ff7c5e').addClass('animated infinite flash');
    $('#loading-progress').css('transition', '1s linear').css('width', '0px');
}

var audioController = {
    audioElem: $('#background-audio').get(0),

    play: function () {
        var ctx = new AudioContext();


        var audioSrc = ctx.createMediaElementSource(audioController.audioElem);
        var analyser = ctx.createAnalyser();
        analyser.connect(ctx.destination);
        audioSrc.connect(analyser);
        analyser.fftSize = 32;
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(frequencyData);
            $('.audio-bars > div').each(function () {
                $(this).css('height', Math.max(frequencyData[$(this).index()] * 20 / 255), 1);
            });
        }
        audioController.audioElem.volume = 0.2;
        audioController.audioElem.play();
        renderFrame();
    },
    toggle: function () {
        if (audioController.audioElem.paused) {
            audioController.audioElem.play();
        } else {
            audioController.audioElem.pause();
        }
    }
};

function playAudio() {

}
