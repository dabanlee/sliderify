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
	 * Sliderify default options.
	 * @public
	 */
	Sliderify.defaults = {
		// Initial slide.
		initialSlide: 0, 
		
		// Whether to auto play.
		autoPlay: true, 
		
		// Auto play interval.
		autoPlayInterval: 3000,

		// Sliding interval.
		slidingInterval: 500,
		
		// Whether to hide the pagination.
		hidePagination: false, 
		
		// Whether to hide the pagination buttons.
		hidePaginationButtons: false, 
		
		// Whether use keyboard to control.
		keyboardControl: true 
	}

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
		this.$element = $(element);

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Sliderify.defaults, options);

		/**
		 * Initializes the sliderify.
		 * @protected
		 */
		this.initialize();
	}

	/**
	 * Initializes the sliderify.
	 * @protected
	 */
	Sliderify.prototype.initialize = function() {
		// console.log(this.current());

		this.render();
		this.setup();
		this.setStyle();
	}

	/**
	 * Render the sliderify.
	 * @public
	 */
	Sliderify.prototype.render = function() {

		var sliderNum = this.slideNum(),
			bulletText = '';

		/**
		 * Render bullet.
		 */
		for(var i = 0; i < sliderNum; i ++) {
			bulletText += '<span class="sliderify-bullet"></span>';
		}

		$(bulletText).appendTo('.sliderify-pagination');

		/**
		 * Set the initial slide.
		 */
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
		var currentIndex = null,
			self = this;

		this.$element.find('.sliderify-bullet').on('click', function() {

			currentIndex = $(this).index();
			self.changeSlider(currentIndex);
		});

		this.$element.find('.sliderify-prev').on('click', function() {

			self.prevSlider();
		});

		this.$element.find('.sliderify-next').on('click', function() {

			self.nextSlider();
		});


		/**
		 * Set keyboard control.
		 */
		if(this.options.keyboardControl === true) {

			$(document).on('keydown', function() {
				//
				// console.log('keyEvents');

				var keyCode = event.keyCode || event.which;

				// keyCode 65 => A, keyCode 37 => Left
				if(keyCode === 65 || keyCode === 37) {

					self.prevSlider();
				}

				// keyCode 68 => S, keyCode 39 => Right
				if(keyCode === 68 || keyCode === 39) {

					self.nextSlider();
				}
			});
		}

		/**
		 * Set automatic play.
		 */
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

		this.$element.find('.sliderify-slide').css({
			'width' : (100 / sliderNum) + '%'
		});

		this.$element.children('.sliderify-wrapper').css({
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
	 * Auto play function.
	 * @public
	 */
	Sliderify.prototype.autoPlay = function() {
		//
		// console.log('autoPlay');

		var self = this,
			timer = null,
			interval = this.options.autoPlayInterval + this.options.slidingInterval;

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

		var currentIndex = currentIndex;

		this.updateCurrent(currentIndex);

		this.$element.find('.sliderify-wrapper').stop(true, true).animate({

			'left': (- currentIndex * 100) + '%'
		}, this.options.slidingInterval);
	}

	/**
	 * Slides to the previous item.
	 * @public
	 */
	Sliderify.prototype.prevSlider = function() {
		//
		// console.log('prevSlider');

		var currentIndex = $('.current').index();

		currentIndex --;

		if(currentIndex < 0){

			currentIndex = this.slideNum() - 1;
		}

		this.changeSlider(currentIndex);
	}

	/**
	 * Slides to the next item.
	 * @public
	 */
	Sliderify.prototype.nextSlider = function() {
		//
		// console.log('nextSlider');

		var currentIndex = $('.current').index();

		currentIndex ++;

		if(currentIndex > this.slideNum() - 1){

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

	/**
	 * Slider current index.
	 * @public
	 * @return {Number} - the index of slides
	 */
	Sliderify.prototype.current = function() {
		//
		// console.log('sliderItems');
		var current = this.options.initialSlide || 0;

		this.$element.find('.sliderify-slide, .sliderify-bullet')
		.removeClass('current').eq(current).addClass('current');

		current = $('.current').index();

		return current;
	}

	/**
	 * Update current index.
	 * @public
	 * @param {Number} - the current index of slides
	 */
	Sliderify.prototype.updateCurrent = function(currentIndex) {
		//
		this.$element.find('.sliderify-slide')
		.removeClass('current').eq(currentIndex)
		.addClass('current');

		this.$element.find('.sliderify-pagination span')
		.removeClass('current').eq(currentIndex)
		.addClass('current');
	}

	$.fn.sliderify = function(options) {

		return this.each(function() {

			new Sliderify(this, options);
		});
	};

	$.fn.sliderify.version = '1.1.0';

})(jQuery);