/*
MIT License

Copyright (c) 2017 Craig Buckler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Modified by Rob Denton/The Register-Guard

*/

// (function($, window, document, undefined) {
	
	// 'use strict';
	
	// send ga
	function sendGA(pct,pageview,event){
		if ((typeof window.storyMeta != 'undefined') && (typeof window.ga != 'undefined')){
			if (pageview == true) {
				window.ga('send','pageview',{
					'dimension1': window.storyMeta.d1,
					'dimension2': window.storyMeta.d2,
					'dimension3': window.storyMeta.d3,
					'dimension4': window.storyMeta.d4,
					'dimension5': window.storyMeta.d5,
					'dimension6': window.storyMeta.d6,
					'dimension7': window.storyMeta.d7,
					'dimension8': pct
				});
			}
			if (event == true) {
				window.ga('send', 'event', 'image', 'load', 'prog');
			}
		}
	}
	
	function progSSP(){
		var svg = document.getElementById('click-ssp-svg');
		
		// Need to do some functions to get API and loop over to write HTML
		
		// Swap ID
		//svg.id = 'click-ssp-prog';


	}

	// progressive-image.js
	if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) {
		window.addEventListener('load', function() {
			// replace with full image
			function loadFullImage(item,first) {
				// replace image
				function addImg() {
					// disable click
					item.addEventListener('click', function(e) { e.preventDefault(); }, false);
					// add full image
					item.appendChild(img).addEventListener('animationend', function(e) {
						// remove preview image
						var pImg = item.querySelector && item.querySelector('img.preview');
						if (pImg) {
							e.target.alt = pImg.alt || '';
							item.removeChild(pImg);
							e.target.classList.remove('reveal');
						}
					});
				}
				// Do stuff
				if (!item || !item.href) { return; }
				// load image
				var img = new Image();
				if (item.dataset) {
					img.srcset = item.dataset.srcset || '';
					img.sizes = item.dataset.sizes || '';
					img.dataset.pct = item.dataset.pct || '';
				}
				img.src = item.href;
				img.className = 'reveal';
				if (img.complete) { addImg(); }
				else { img.onload = addImg; }
				if (first == true){ 
					sendGA(img.dataset.pct,false,true); 
				} else { 
					sendGA(img.dataset.pct,true,true);
				}
				//sendGA(img.pct);
			}
			// image in view?
			function inView() {
				//var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
				var wT = window.pageYOffset,
				// Add 600 to bottom to load images before they're scrolled to.
				wB = wT + window.innerHeight + 600,
				cRect, pT, pB, p = 0;
				while (p < pItem.length) {
					cRect = pItem[p].getBoundingClientRect();
					pT = wT + cRect.top;
					pB = pT + cRect.height;
					if (wT < pB && wB > pT) {
						loadFullImage(pItem[p], first);
						first = false;
						pItem[p].classList.remove('replace');
					}
					else { p++; }
				}
			}

			// Click functions moved out of conditional
			// See: https://stackoverflow.com/a/26768233
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
					expanded = true;
					inView();
				} else {
					window.scroll(0, firstPic.offsetTop + firstPic.offsetHeight);
					expanded = false;
				}
			}
			
			// Function disappears close button if the bottom of the last image has reached half the page height, will reappear if scrolled back up
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
			function scroller() {
				timer = timer || setTimeout(function() {
					timer = null;
					window.requestAnimationFrame(inView);
				}, 300);
			}
			// start
			var pItem = document.getElementsByClassName('progressive replace'), 
			timer,
			first = true;
			window.addEventListener('scroll', scroller, false);
			window.addEventListener('resize', scroller, false);
			inView();

			// Story page
			if (document.getElementById('click-expand')){

				// Set vars
				var expanded = false; // Boolean check for expanding/closing
				var firstPic = document.getElementById('click-first'); // First image, outside click-pics
				var pics = document.getElementById('click-pics'); // These are the additional pics
				var expand = document.getElementById('click-expand'); // This is the expand button
				var close = document.getElementById('click-close'); // This is the button to close 
				var lastTop, lastBottom;
				
				expand.addEventListener('click', showhide); // Open
				close.addEventListener('click', showhide);  // Close
				window.addEventListener('scroll', scroller); // Call scroller

				expand.classList.remove('click-hidden');

			}

		}, false);
	}

	
	
// }(jQuery, window, document));