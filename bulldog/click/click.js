// Common function to show/hide pics
function showhide(){

	pics.classList.toggle('click-hidden');
	close.classList.toggle('click-hidden');
	expand.classList.toggle('click-hidden');

	if (expanded === false){
		var kids = pics.getElementsByTagName("figure");
		var lastFig = kids[kids.length-1];
		var lastRect = lastFig.getBoundingClientRect();
		lastTop = lastRect.top;
		var lastHeight = lastRect.height;
		lastBottom = lastTop + lastHeight;
		// Bad, terrible, awful hack to trigger prog
		//window.scroll(0, window.pageYOffset - 1);
		//window.scroll(0, window.pageYOffset + 1);

		expanded = true;
	} else {
		window.scroll(0, first.offsetTop);

		expanded = false;
	}
}

function closeButton(){
	if (expanded === true){
		// Get half the window height
		var windowHalf = window.pageYOffset + (window.innerHeight / 2);
		if (lastBottom < windowHalf){
			// if the bottom of the last image is less than (above) half the window
			close.classList.add('click-hidden');
		} else if (lastBottom > windowHalf){
			// if the bottom of the last image is greater than (below) half the window
			close.classList.remove('click-hidden');
		}
	}
}

// throttled scroll/resize
// Code borrowed from prog
function scrolling() {
	var timer = timer || setTimeout(function() {
		timer = null;
		window.requestAnimationFrame(closeButton);
	}, 300);
}

// Set vars
var expanded = false; // Boolean check for expanding/closing
var first = document.getElementById('click-first'); // First image, outside click-pics
var pics = document.getElementById('click-pics'); // These are the additional pics
var expand = document.getElementById('click-expand'); // This is the expand button
var close = document.getElementById('click-close'); // This is the button to close 
var lastTop, lastBottom;

expand.addEventListener('click', showhide); // Open
close.addEventListener('click', showhide);  // Close
window.addEventListener('scroll', scrolling);
