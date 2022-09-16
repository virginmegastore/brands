/**
 * jQuery plugin for Responsive Hotspot
 *
 * Author: SK Lam
 */
 (function() {
	'use strict';

	/*
		Reposition the HotSpots during init and resize windows
	*/
	function _positionHotspots(options) {
		var imageWidth = $(options.mainselector + ' ' + options.imageselector).prop('naturalWidth'); 
		var imageHeight = $(options.mainselector + ' ' + options.imageselector).prop('naturalHeight');

		var bannerWidth = $(options.mainselector).width();
		var bannerHeight = $(options.mainselector).height();
		$(options.selector).each(function() {
			var xPos = $(this).attr('x');
			var yPos = $(this).attr('y');
			xPos = xPos / imageWidth * bannerWidth;
			yPos = yPos / imageHeight * bannerHeight;

			$(this).css({
				'top': yPos,
				'left': xPos,
				'display': 'block',
			});
			$(this).children(options.tooltipselector).css({
				'margin-left': - ($(this).children(options.tooltipselector).width() / 2)
			});
		});
	}

	// Bind the events (hover or click) for the tooltip

	
	$.fn.hotSpot = function( options ) {
 
    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object â€“ this is to keep from overriding our "defaults" object.
    var _options = $.extend( {}, $.fn.hotSpot.defaults, options );
 
		// Position each hotspot
		this.each(function() {
				_positionHotspots.call($(this), _options);
		});

		// Bind the windows resize event to recalculate the hotspot position
		$(window).resize(function() {
				this.each(function() {
						_positionHotspots.call($(this), _options);
				});
		}.bind(this));

		// Bind the hover/click for selector to show the tooltip
	
		
		return this;
	};
	
	// Plugin defaults
	$.fn.hotSpot.defaults = {
		mainselector: '#hotspotImg',
		selector: '.hot-spot',
		imageselector: '.img-responsive',
		tooltipselector: '.tooltip',

	};
}(jQuery));