// if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) {
// 	window.addEventListener('load', function() {
// In Bulldog this will all be in the same file.
		
		// Common function to show/hide pics
		function showhide(){
			if (expanded === false){
				// Closed, so expand
				pics.classList.remove('click-hidden');
				close.classList.remove('click-hidden');
				expand.classList.add('click-hidden');
				
				// inView(); // Call prog
				
				var kids = pics.getElementsByTagName("figure");
				var lastFig = kids[kids.length-1];
				var lastRect = lastFig.getBoundingClientRect();
				lastTop = lastRect.top;
				var lastHeight = lastRect.height;
				lastBottom = lastTop + lastHeight;

				expanded = true;
			} else {
				// Open, so close
				pics.classList.add('click-hidden');
				close.classList.add('click-hidden');
				expand.classList.remove('click-hidden');
				expanded = false;
			}
		}

		function removeButton(){
			console.log('SCROLOLOLOLOLOLOLOLING');
			var wT = window.pageYOffset,
			wB = wT + window.innerHeight;
			if (lastBottom < wT){
				close.classList.add('click-hidden');
			} else if (lastBottom > wT && close.classList.contains('click-hidden')){
				close.classList.remove('click-hidden');
			}

		}
		
		// Set vars
		var expanded = false; // Boolean check for expanding/closing
		var pics = document.getElementById('click-pics'); // These are the additional pics
		var expand = document.getElementById('click-expand'); // This is the expand button
		var close = document.getElementById('click-close'); // This is the button to close 
		var lastTop, lastBottom;

		expand.addEventListener('click', showhide); // Open
		close.addEventListener('click', showhide);  // Close
		window.addEventListener('scroll', removeButton, false);
		
// 	}, false);
// }