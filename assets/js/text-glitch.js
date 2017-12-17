var glitchLength = 100;
var glitches = 25;

const CHARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '-', '#', '@', '+', '_', '(', ')', '[', ']'];

function glitch() {
	var j = 0;
	$('.glitch-text').each(function () {
		var $selector = $(this);
		var text = $selector.text();
		var textLength = text.length;
		var count = 0;
		var doNotChange = [];
		setTimeout(function () {
			$selector.hover(function () {
				$selector.addClass('glitch');
			}, function () {
				$selector.removeClass('glitch');
			})

		}, Math.ceil(Math.random() * 600) / 2);

		setTimeout(function () {
			$selector.css('visibility', 'visible');
			setIntervalX(function () {
				var newText = '';
				for (var i = 0; i < textLength; i++) {
					if (Math.random() < 0.875 && doNotChange.indexOf(i) === -1) {
						newText = newText + CHARS[Math.floor((Math.random() * CHARS.length))];
					} else {
						newText = newText + text[i];
						doNotChange.push(i);
					}
				}
				$selector.text(newText);
				$selector.attr('data-text', newText);
				count++;
			}, glitchLength, glitches, function () {
				$selector.text(text);
			});
		}, j * glitchLength * glitches + 100);
		j++;
	});
}

function setIntervalX(callback, delay, repetitions, onFinish) {
	var x = 0;
	var intervalID = window.setInterval(function () {

		callback();

		if (++x === repetitions) {
			window.clearInterval(intervalID);
			onFinish();
		}
	}, delay);
}