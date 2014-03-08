$(document).ready(function() {
	var bRyuPosing = false;
	var bMouseOverRyu = false;
	
	// Make Ryu strike a cool pose when the X key is pressed.
	// Holding X disables all mouse interactions.
	$(document)
		.keydown(function(event) {
			if (event.which == 88)
			{
				bRyuPosing = true;
				showRyu('cool');
			}
		})
		.keyup(function(event) {
			if (event.which == 88)
			{
				bRyuPosing = false;				
				if (bMouseOverRyu)
					showRyu('ready');
				else
					showRyu('still');
			}
		});
		
	// Mouse event handlers for the Ryu element
	// These should have no effect when Ryu is striking a pose.
	$('.ryu')
		// animate Ryu when mousing over him
		.mouseenter(function() {
			bMouseOverRyu = true;
			if (!bRyuPosing) 
				showRyu('ready');
		})
		.mouseleave(function() {
			bMouseOverRyu = false;
			if (!bRyuPosing) 
				showRyu('still');			
		})
		// shoot fireball if Ryu is clicked
		.mousedown(function() {
			if (!bRyuPosing) {
				showRyu('throwing');
				playHadoukenSound();
				animateHadouken();
			}
		})
		.mouseup(function() {
			if (!bRyuPosing)
				if (bMouseOverRyu)
					showRyu('ready');
				else
					showRyu('still');
		});	
});

// Show the requested image of Ryu and hide the rest of the images
function showRyu (style) {
	switch(style) {
		case 'still':
			$('.ryu-still').show();
			$('.ryu-ready').hide();
			$('.ryu-throwing').hide();
			$('.ryu-cool').hide();
			break;
		case 'ready':
			$('.ryu-still').hide();
			$('.ryu-ready').show();
			$('.ryu-throwing').hide();
			$('.ryu-cool').hide();
			break;
		case 'throwing':
			$('.ryu-still').hide();
			$('.ryu-ready').hide();
			$('.ryu-throwing').show();
			$('.ryu-cool').hide();
			break;
		case 'cool':
			$('.ryu-still').hide();
			$('.ryu-ready').hide();
			$('.ryu-throwing').hide();
			$('.ryu-cool').show();
			break;
		default:
			console.log('error in showRyu(): style \"' + style + '\" unrecognized.');
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