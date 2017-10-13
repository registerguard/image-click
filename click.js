// Common function to show/hide pics
function showhide(){
	if (expanded === false){
		// Closed, so expand
		pics.classList.remove('hidden');
		close.classList.remove('hidden');
		expand.classList.add('hidden');
		expanded = true;
	} else {
		// Open, so close
		pics.classList.add('hidden');
		close.classList.add('hidden');
		expand.classList.remove('hidden');
		expanded = false;
	}
}

// Set vars
var expanded = false; // Boolean check for expanding/closing
var pics = document.getElementById('pics'); // These are the additional pics
var expand = document.getElementById('expand'); // This is the expand button
var close = document.getElementById('close'); // This is the button to close 

expand.addEventListener('click', showhide); // Open
close.addEventListener('click', showhide);  // Close