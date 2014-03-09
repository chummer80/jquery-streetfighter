var states = {
	STILL:0, 
	READY:1, 
	THROWING:2, 
	COOL:3
}

var X_KEY_CODE = 88;

$(document).ready(function() {
	var eRyuState = states.STILL;
	var bMouseOverRyu = false;
	var bXPressed = false;
	var bXHeld = false;
	var bRyuClicked = false;
	
	// Make Ryu strike a cool pose when the X key is pressed.
	$(document)
		.keydown(function(event) {
			// When the X key is held, the X-pressed event fires repeatedly.
			// Only handle the initial event that fires and not the repeated ones.
			if (event.which == X_KEY_CODE) {
				if (!bXHeld) {
					bXPressed = true;
				}
				bXHeld = true;
			}
		})
		.keyup(function(event) {
			if (event.which == X_KEY_CODE) {
				bXHeld = false;
				bXPressed = false;
			}
		});
		
	// Mouse event handlers for the Ryu element
	$('.ryu')
		// animate Ryu when mousing over him, as long as no key is being pressed
		.mouseenter(function() {
			bMouseOverRyu = true;
		})
		.mouseleave(function() {
			bMouseOverRyu = false;
			bRyuClicked = false;
		})
		// shoot fireball if Ryu is clicked
		.mousedown(function() {
			bRyuClicked = true;
		})
		.mouseup(function() {
			bRyuClicked = false;
		});	
		
	// State machine loop
	setInterval(stateMachine, 10);
		
	function stateMachine() {
		switch(eRyuState) {
			case states.STILL:
				if (bXPressed) {
					eRyuState = states.COOL;
					showRyu(eRyuState);
					bXPressed = false;
				}
				else if (bMouseOverRyu) {
					eRyuState = states.READY;
					showRyu(eRyuState);
				}
				break;
			
			case states.READY:
				if (bXPressed) {
					eRyuState = states.COOL;
					showRyu(eRyuState);
					bXPressed = false;
				}
				else if (bRyuClicked) {
					playHadoukenSound();
					animateHadouken();
					eRyuState = states.THROWING;
					showRyu(eRyuState);
				}
				else if (!bMouseOverRyu) {
					eRyuState = states.STILL;
					showRyu(eRyuState);
				}
				break;
			
			case states.THROWING:
				if (bXPressed) {
					eRyuState = states.COOL;
					showRyu(eRyuState);
					bXPressed = false;
					bRyuClicked = false;
				}
				else if (!bRyuClicked) {
					if (bXHeld) {
						eRyuState = states.COOL;
					}
					else if (bMouseOverRyu) {
						eRyuState = states.READY;
					}
					else {
						eRyuState = states.STILL;
					}
					showRyu(eRyuState);
				}
				break;
			
			case states.COOL:
				if (!bXHeld) {
					if (bMouseOverRyu) {
						eRyuState = states.READY;
					}
					else {
						eRyuState = states.STILL;
					}
					showRyu(eRyuState);
				}
				else if (bRyuClicked) {
					playHadoukenSound();
					animateHadouken();
					eRyuState = states.THROWING;
					showRyu(eRyuState);
				}
				break;
			
			default:
				console.log('Ryu state machine: unhandled state: ' + eRyuState);
		}
	}
});

// Show the requested image of Ryu and hide the rest of the images
function showRyu (style) {
	switch(style) {
		case states.STILL:
			$('.ryu-still').show();
			$('.ryu-ready').hide();
			$('.ryu-throwing').hide();
			$('.ryu-cool').hide();
			break;
		
		case states.READY:
			$('.ryu-still').hide();
			$('.ryu-ready').show();
			$('.ryu-throwing').hide();
			$('.ryu-cool').hide();
			break;
		
		case states.THROWING:
			$('.ryu-still').hide();
			$('.ryu-ready').hide();
			$('.ryu-throwing').show();
			$('.ryu-cool').hide();
			break;
		
		case states.COOL:
			$('.ryu-still').hide();
			$('.ryu-ready').hide();
			$('.ryu-throwing').hide();
			$('.ryu-cool').show();
			break;
		
		default:
			console.log('error in showRyu(): style ' + style + ' unrecognized.');
	}
}

// Play hadouken sound
function playHadoukenSound () {
  $('#hadouken-sound')[0].volume = 0.5;
  $('#hadouken-sound')[0].load();
  $('#hadouken-sound')[0].play();
}

// Play hadouken animation
function animateHadouken () {
	$('.hadouken')
		// if this animation was already running, end it and start it again.
		.finish()
		.show()
		// Move fireball from left to right side of the page, then put it back.
		.animate({'left':'700px'}, 500,	function() {
			$(this).hide();
			$(this).css('left', '-139px');
		});
}