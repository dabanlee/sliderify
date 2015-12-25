/*!
 * Sliderify - A Simple Slider.
 * http://justclear.github.io/sliderify
 * 
 * Author: Clear
 * Version: 1.1.0
 * Update: 2015-12-25
 * 
 * Released under the MIT license
 */

;(function($) {

	/**
	 * Creates a slider.
	 * @class The Sliderify.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the sliderify for.
	 * @param {Object} [options] - The options
	 */

	function Sliderify(element, options) {

		/**
		 * Plugin element.
		 * @public
		 */
		this.element = element;
		this.$element = $(element);

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, $.fn.sliderify.defaults, options);
		this.initialize();
	}

	/**
	 * Initializes the sliderify.
	 * @protected
	 */
	Sliderify.prototype.initialize = function() {
		var element = this.element,
			currentIndex = this.options.initialSlide;

		// console.log(this.element);	

		this.render();
		this.setup();
		this.setStyle();
	}

	/**
	 * Render the sliderify.
	 * @public
	 */
	Sliderify.prototype.render = function() {
		//
		// console.log('render');
		// console.log(this.slideNum());
		var sliderNum = this.slideNum(),
			currentIndex = $(this).index(),
			bulletText = '';

		// render bullet
		for(var i = 0; i < sliderNum; i ++) {
			bulletText += '<span class="sliderify-bullet"></span>';
		}

		$(bulletText).appendTo('.sliderify-pagination');

		if((this.options.initialSlide - 1) < 0) {

			this.changeSlider(0);

		} else if((this.options.initialSlide - 1) > sliderNum){

			this.changeSlider(sliderNum - 1);

		} else {

			this.changeSlider(this.options.initialSlide - 1);

		}
	}

	/**
	 * Setup the plugin.
	 * @protected
	 */
	Sliderify.prototype.setup = function() {
		//
		// console.log('setup');
		var currentIndex = 0,
			self = this;

		this.$element.find('.sliderify-bullet').on('click', function() {

			$(this).addClass('current')
			.siblings()
			.removeClass('current');

			currentIndex = $(this).index();
			self.changeSlider(currentIndex);
		});

		this.$element.find('.sliderify-prev').on('click', function() {

			self.prevSlider();
		});

		this.$element.find('.sliderify-next').on('click', function() {

			self.nextSlider();
		});

		if(this.options.keyboardControl === true) {

			$(document).on('keydown', this.keyEvents);
		}

		if(this.options.autoPlay === true) {

			this.autoPlay();
		}
	}

	/**
	 * Set style.
	 * @public
	 */
	Sliderify.prototype.setStyle = function() {
		//
		// console.log('setStyle');

		var sliderNum = this.slideNum();

		$('.sliderify-container').css({
			// 
		});

		this.$element.find('.sliderify-slide').css({
			'width' : (100 / sliderNum) + '%'
		});

		$('.sliderify-container').children('.sliderify-wrapper').css({
			'width': sliderNum * 100 + '%'
		});

		if(this.options.hidePaginationButtons === true) {

			this.$element.find('.sliderify-prev, .sliderify-next').css({
				'display': 'none'
			});
		}

		if(this.options.hidePagination === true) {

			this.$element.find('.sliderify-pagination').css({
				'display': 'none'
			});
		}
	}

	/**
	 * Set animation.
	 * @public
	 */
	Sliderify.prototype.setAnimation = function() {
		//
		// console.log('setStyle');

	}

	/**
	 * The keyboard events.
	 * @public
	 */
	Sliderify.prototype.keyEvents = function() {
		//
		console.log('keyEvents');

		var keyCode = event.keyCode || event.which,
			self = this;

		// keyCode 65 => A, keyCode 37 => Left
		if(keyCode === 65 || keyCode === 37) {

			self.prevSlider();
		}

		// keyCode 68 => S, keyCode 39 => Right
		if(keyCode === 68 || keyCode === 39) {

			self.nextSlider();
		}
	}

	/**
	 * Auto play function.
	 * @public
	 */
	Sliderify.prototype.autoPlay = function() {
		//
		// console.log('autoPlay');

		var self = this,
			timer = null,
			autoPlayInterval = null,
			slidingInterval = null,
			interval = null;

		/**
		 * Make sure auto play interval greater than sliding interval
		 */
		autoPlayInterval = this.options.autoPlayInterval,
		slidingInterval = this.options.slidingInterval,
		interval = autoPlayInterval > slidingInterval ? autoPlayInterval : slidingInterval;

		timer = setInterval(function() {
			
			self.nextSlider();
		}, interval);
	}

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} index - The index of the item.
	 */
	Sliderify.prototype.changeSlider = function(currentIndex) {
		//
		// console.log('changeSlider');

		var currentIndex = currentIndex,
			pagination = $('.sliderify-pagination');

		this.$element.find('.sliderify-slide').removeClass('current')
		.eq(currentIndex).addClass('current');

		pagination.children('span').removeClass('current')
		.eq(currentIndex).addClass('current');

		this.$element.find('.sliderify-wrapper').animate({
			'left': (- currentIndex * 100) + '%'
		}, this.options.slidingInterval, this.options.slidingEasing);
	}

	/**
	 * Slides to the previous item.
	 * @public
	 */
	Sliderify.prototype.prevSlider = function() {
		//
		console.log('prevSlider');

		var slideNum = this.slideNum(),
			currentIndex = $('.current').index();

		currentIndex --;

		if(currentIndex < 0){

			currentIndex = slideNum - 1;
		}

		this.changeSlider(currentIndex);
	}

	/**
	 * Slides to the next item.
	 * @public
	 */
	Sliderify.prototype.nextSlider = function() {
		//
		console.log('nextSlider');

		var slideNum = this.slideNum(),
			currentIndex = $('.current').index();

		currentIndex ++;

		if(currentIndex > slideNum - 1){

			currentIndex = 0;
		}

		this.changeSlider(currentIndex);
	}

	/**
	 * Slider items number.
	 * @public
	 * @return {Number} - the number of slides
	 */
	Sliderify.prototype.slideNum = function() {
		//
		// console.log('sliderItems');
		var slideNum = this.$element.find('.sliderify-slide').size();

		return slideNum;
	}

	$.fn.sliderify = function(options) {

		return this.each(function() {

			new Sliderify(this, options);
		});
	};

	/**
	 * Sliderify default options.
	 * @public
	 */
	$.fn.sliderify.defaults = {
		initialSlide: 0,
		autoPlay: true,
		autoPlayInterval: 3000,
		slidingInterval: 5000,
		slidingEasing: 'linear',
		hidePagination: false,
		hidePaginationButtons: false,
		keyboardControl: true
	}

	$.fn.sliderify.version = '1.0.0';

})(jQuery);