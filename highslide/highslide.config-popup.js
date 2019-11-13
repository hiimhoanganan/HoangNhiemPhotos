/**
*	Site-specific configuration settings for Highslide JS
*/
hs.graphicsDir = 'highslide/graphics/';
hs.align = 'center';
hs.outlineType = 'rounded-white';
hs.showCredits = false;
hs.dimmingOpacity = 0.5;
hs.dimmingDuration = 0;
hs.fadeInOut = true;
hs.padToMinWidth = true;
hs.allowMultipleInstances = false;
hs.registerOverlay({
	html: '<div class="close-simple-white" onclick="return hs.close(this)" title="Close"></div>',
	position: 'top right',
	useOnHtml: true,
	fade: 2 // fading the semi-transparent overlay looks bad in IE
});



// Add the slideshow controller
hs.addSlideshow({
	slideshowGroup: 'group1',
	interval: 5000,
	repeat: false,
	useControls: false,
	fixedControls: false,
	overlayOptions: {
		opacity: 0.75,
		position: 'bottom center',
		offsetX: 0,
		offsetY: -15,
		hideOnMouseOut: true
	}
});

// gallery config object
var config1 = {
	slideshowGroup: 'group1',
	transitions: ['expand', 'crossfade']
};
