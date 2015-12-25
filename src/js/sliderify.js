/*!
 * Sliderify - A simple slider.
 * http://justclear.github.io
 * 
 * Author: Clear
 * Version: 1.0.0
 * Date: 2015-12-24
 * 
 * Released under the MIT license
 */

;(function($) {

	var Sliderify = function(element, options) {
		this.element = element;
		this.opts = $.extend({}, $.fn.sliderify.defaults, options);
		this.init();
	}

	Sliderify.prototype = {

		// initial
		init: function() {
			var self = this,
				element = this.element,
				$this = $(this.element),
				opts = this.opts;

			// console.log(opts);

			self.render(element);
			self.main(element);
			self.setStyle(element);
			self.setAnimation();
		},

		// Main
		main: function(element) {
			//
			var $this = $(element),
				self = this,
				currentIndex = 0;

			$this.find('.sliderify-bullet').on('click', function() {

				$(this).addClass('current')
				.siblings()
				.removeClass('current');

				currentIndex = $(this).index();
				changeSlider(currentIndex);
			});

			$this.find('.sliderify-prev').on('click', function() {

				prevSlider();
			});

			$this.find('.sliderify-next').on('click', function() {

				nextSlider();
			});

			if(this.opts.keyboardControl === true) {

				$(document).on('keydown', self.keyEvents);
			}

			if(this.opts.autoPlay === true) {

				this.autoPlay();
			}
		},

		render: function(element) {
			//
			var self = this,
 				$this = $(element),
				sliderItems = $this.find('.sliderify-slide'),
				sliderNum = sliderItems.size(),
				currentIndex = $(this).index(),
				bulletText = '';

			// render bullet
			for(var i = 0; i < sliderNum; i ++) {
				bulletText += '<span class="sliderify-bullet"></span>';
			}

			$(bulletText).appendTo('.sliderify-pagination');

			if((this.opts.initialSlide - 1) < 0) {

				changeSlider(0);

			} else if((this.opts.initialSlide - 1) > sliderNum){

				changeSlider(sliderNum - 1);

			} else {

				changeSlider(this.opts.initialSlide - 1);

			}
		},

		// Set Style
		setStyle: function(element) {
			var $this = $(element);

			sliderItems = $this.find('.sliderify-slide');
			sliderNum = sliderItems.size();

			$('.sliderify-container').css({
				// 
			});

			sliderItems.css({
				'width' : (100 / sliderNum) + '%'
			});

			$('.sliderify-container').children('.sliderify-wrapper').css({
				'width': sliderNum * 100 + '%'
			});

			if(this.opts.hidePaginationButtons === true) {

				$this.find('.sliderify-prev, .sliderify-next').css({
					'display': 'none'
				});
			}

			if(this.opts.hidePagination === true) {

				$this.find('.sliderify-pagination').css({
					'display': 'none'
				});
			}
		},

		// Set Animation
		setAnimation: function() {

			$('.sliderify-container').animate({
				// 
			});
		},

		// Key Events
		keyEvents: function(event) {

			var keyCode = event.keyCode || event.which,
				self = this;

			// keyCode 65 => A, keyCode 37 => Left
			if(keyCode === 65 || keyCode === 37) {

				prevSlider();
			}

			// keyCode 68 => S, keyCode 39 => Right
			if(keyCode === 68 || keyCode === 39) {

				nextSlider();
			}
		},

		// Auto Play
		autoPlay: function() {

			var timer;

			timer = setInterval(function() {
				
				nextSlider();
			}, this.opts.autoPlayInterval);
		}
	}

	function changeSlider(currentIndex) {
		//
		var currentIndex = currentIndex,
			pagination = $('.sliderify-pagination');

		$('.sliderify-slide').removeClass('current')
		.eq(currentIndex).addClass('current');

		pagination.children('span').removeClass('current')
		.eq(currentIndex).addClass('current');

		$('.sliderify-wrapper').animate({
			'left': (- currentIndex * 100) + '%'
		});

	}

	function prevSlider() {

		var slideNum = $('.sliderify-slide').size(),
			currentIndex = $('.current').index(),
			self = this;

		currentIndex --;

		if(currentIndex < 0){

			currentIndex = slideNum - 1;
		}

		changeSlider(currentIndex);

		// console.log('Prev');
	}

	function nextSlider() {

		var slideNum = $('.sliderify-slide').size(),
			currentIndex = $('.current').index(),
			self = this;

		currentIndex ++;

		if(currentIndex > slideNum - 1){

			currentIndex = 0;
		}

		changeSlider(currentIndex);

		// console.log('Next');
	}

	$.fn.sliderify = function(options) {

		return this.each(function() {

			new Sliderify(this, options);
		});
	};

	$.fn.sliderify.defaults = {
		initialSlide: 0,
		autoPlay: true,
		autoPlayInterval: 3000,
		hidePagination: false,
		hidePaginationButtons: false,
		keyboardControl: true
	}

	$.fn.sliderify.version = '1.0.0';

})(jQuery);