/*!
 * Sliderify - A Simple Slider.
 * http://justclear.github.io/sliderify
 *
 * Author: Clear
 * Version: 1.1.1
 * Update: 2015-12-30
 * Powered by: TypeScript.
 *
 * Released under the MIT license
 */
'use strict';
(function ($) {
    /**
     * Creates a slider.
     * @class The Sliderify.
     * @public
     * @param {HTMLElement|jQuery} element - The element to create the sliderify for.
     * @param {Object} [options] - The options
     */
    var Sliderfiy = (function () {
        function Sliderfiy(element, options) {
            this.$element = $(element);
            this.defaults = {
                /**
                 * Initial slide.
                 * @param {Number}
                 */
                initialSlide: 0,
                /**
                 * Loop slide.
                 * @param {Boolean}
                 */
                loop: false,
                /**
                 * Whether to auto play.
                 * @param {Boolean}
                 */
                autoPlay: true,
                /**
                 * Auto play interval.
                 * @param {Number}
                 */
                autoPlayInterval: 3000,
                /**
                 * On hover to stop automaic play.
                 * @param {Boolean}
                 */
                onHoverStopAutoPlay: true,
                /**
                 * Sliding interval.
                 * @param {Number}
                 */
                slidingInterval: 500,
                /**
                 * Whether to hide the pagination.
                 * @param {Boolean}
                 */
                hidePagination: false,
                /**
                 * Whether to hide the pagination buttons.
                 * @param {Boolean}
                 */
                hidePaginationButtons: false,
                /**
                 * Pagination buttons text.
                 * @param {Array | String}
                 */
                paginationButtonsText: ['Prev', 'Next'],
                /**
                 * Whether use keyboard to control.
                 * @param {Boolean}
                 */
                keyboardControl: true,
                /**
                 * Support drag to slide.
                 * @param {Boolean}
                 */
                isDraggable: true
            };
            this.options = $.extend({}, this.defaults, options);
            this.initialize();
        }
        /**
         * Initializes the sliderify.
         * @protected
         */
        Sliderfiy.prototype.initialize = function () {
            this.render();
            this.setup();
            this.setStyle();
            // console.log(this.$element);
        };
        /**
         * Render the sliderify.
         * @public
         */
        Sliderfiy.prototype.render = function () {
            var sliderNum = this.slideNum(), bulletText = '';
            /**
             * Render bullet.
             */
            for (var i = 0; i < sliderNum; i++) {
                bulletText += '<span class="sliderify-bullet"></span>';
            }
            $(bulletText).appendTo('.sliderify-pagination');
            /**
             * Set the initial slide.
             */
            if ((this.options.initialSlide - 1) < 0) {
                this.changeSlider(0);
            }
            else if ((this.options.initialSlide - 1) > sliderNum) {
                this.changeSlider(sliderNum - 1);
            }
            else {
                this.changeSlider(this.options.initialSlide - 1);
            }
        };
        /**
         * Setup the plugin.
         * @protected
         */
        Sliderfiy.prototype.setup = function () {
            //
            // console.log('setup');
            var currentIndex = null, self = this;
            this.$element.find('.sliderify-bullet').on('click', function () {
                currentIndex = $(this).index();
                self.changeSlider(currentIndex);
            });
            this.$element.find('.sliderify-prev').on('click', function () {
                this.prevSlider();
            }.bind(this));
            this.$element.find('.sliderify-next').on('click', function () {
                this.nextSlider();
            }.bind(this));
            /**
             * Set keyboard control.
             */
            if (this.options.keyboardControl === true) {
                $(document).on('keydown', function () {
                    //
                    // console.log('keyEvents');
                    var keyCode = event.keyCode || event.which;
                    // keyCode 65 => A, keyCode 37 => Left
                    if (keyCode === 65 || keyCode === 37) {
                        this.prevSlider();
                    }
                    // keyCode 68 => S, keyCode 39 => Right
                    if (keyCode === 68 || keyCode === 39) {
                        this.nextSlider();
                    }
                }.bind(this));
            }
            /**
             * Set automatic play.
             */
            if (this.options.autoPlay === true) {
                this.autoPlay();
            }
            /**
             * Set draggable.
             */
            if (this.options.isDraggable === true) {
                this.drag();
            }
        };
        /**
         * Set style.
         * @public
         */
        Sliderfiy.prototype.setStyle = function () {
            //
            // console.log('setStyle');
            var sliderNum = this.slideNum();
            this.$element.find('.sliderify-slide').css({
                'width': (100 / sliderNum) + '%'
            });
            this.$element.children('.sliderify-wrapper').css({
                'width': sliderNum * 100 + '%'
            });
            if (this.options.hidePaginationButtons === true) {
                this.$element.find('.sliderify-prev, .sliderify-next').css({
                    'display': 'none'
                });
            }
            if (this.options.paginationButtonsText === 'arrow') {
                this.$element.children('.sliderify-prev, .sliderify-next')
                    .addClass('arrow');
            }
            else {
                this.$element.children('.sliderify-prev')
                    .text(this.options.paginationButtonsText[0])
                    .parent().children('.sliderify-next')
                    .text(this.options.paginationButtonsText[1]);
            }
            if (this.options.hidePagination === true) {
                this.$element.find('.sliderify-pagination').css({
                    'display': 'none'
                });
            }
        };
        /**
         * Auto play function.
         * @public
         */
        Sliderfiy.prototype.autoPlay = function (isAuto) {
            //
            // console.log('autoPlay');
            var timer = null, isAuto = isAuto || true, interval = this.options.autoPlayInterval + this.options.slidingInterval;
            timer = setInterval(function () {
                this.nextSlider();
            }.bind(this), interval);
            /**
             * On hover to stop automatic play.
             * @public
             */
            if (this.options.onHoverStopAutoPlay === true) {
                this.$element.mouseenter(function () {
                    // console.log('Enter');
                    clearInterval(timer);
                }).mouseleave(function () {
                    // console.log('Leave');
                    timer = setInterval(function () {
                        this.nextSlider();
                    }, interval);
                }.bind(this));
            }
        };
        /**
         * Slides to the specified item.
         * @public
         * @param {Number} index - The index of the item.
         */
        Sliderfiy.prototype.changeSlider = function (currentIndex) {
            //
            // console.log('changeSlider');
            var currentIndex = currentIndex;
            if (currentIndex < 0) {
                if (this.options.loop === true) {
                    currentIndex = this.slideNum() - 1;
                }
                else {
                    currentIndex = 0;
                }
            }
            else if (currentIndex > this.slideNum() - 1) {
                if (this.options.loop === true) {
                    currentIndex = 0;
                }
                else {
                    currentIndex = this.slideNum() - 1;
                }
            }
            // console.log(currentIndex);
            this.updateCurrent(currentIndex);
            this.$element.find('.sliderify-wrapper').stop(true, true).animate({
                'left': (-currentIndex * 100) + '%'
            }, this.options.slidingInterval);
        };
        /**
         * Slides to the previous item.
         * @public
         */
        Sliderfiy.prototype.prevSlider = function () {
            //
            // console.log('prevSlider');
            var currentIndex = $('.current').index();
            currentIndex--;
            this.changeSlider(currentIndex);
        };
        /**
         * Slides to the next item.
         * @public
         */
        Sliderfiy.prototype.nextSlider = function () {
            //
            // console.log('nextSlider');
            var currentIndex = $('.current').index();
            currentIndex++;
            this.changeSlider(currentIndex);
        };
        /**
         * Support drag to slide.
         * @public
         */
        Sliderfiy.prototype.drag = function () {
            var canMove = false, startX = null, endX = null, currentX = null, _x = null;
            this.$element.find(".sliderify-wrapper").mousedown(function (event) {
                // console.log('Mouse Down');
                event.preventDefault();
                canMove = true;
                startX = event.pageX;
                _x = event.pageX - parseInt($(this).css('left'));
            });
            $(document).mousemove(function (event) {
                if (canMove) {
                    // console.log('Mouse Move');
                    currentX = event.pageX - _x;
                    this.$element.find(".sliderify-wrapper").css({
                        'left': currentX
                    });
                }
            }.bind(this)).mouseup(function (event) {
                if (canMove) {
                    // console.log('Mouse Up');
                    // console.log(startX);
                    // console.log(endX);
                    // console.log(startX - endX);
                    endX = event.pageX;
                    if (startX - endX > 0) {
                        this.nextSlider();
                    }
                    else if (startX - endX < 0) {
                        this.prevSlider();
                    }
                }
                canMove = false;
            }.bind(this));
        };
        /**
         * Slider items number.
         * @public
         * @return {Number} - the number of slides
         */
        Sliderfiy.prototype.slideNum = function () {
            //
            // console.log('sliderItems');
            var slideNum = this.$element.find('.sliderify-slide').size();
            return slideNum;
        };
        /**
         * Slider current index.
         * @public
         * @return {Number} - the index of slides
         */
        Sliderfiy.prototype.current = function () {
            //
            // console.log('sliderItems');
            var current = this.options.initialSlide || 0;
            this.$element.find('.sliderify-slide, .sliderify-bullet')
                .removeClass('current').eq(current).addClass('current');
            current = $('.current').index();
            return current;
        };
        /**
         * Update current index.
         * @public
         * @param {Number} - the current index of slides
         */
        Sliderfiy.prototype.updateCurrent = function (currentIndex) {
            //
            this.$element.find('.sliderify-slide')
                .removeClass('current').eq(currentIndex)
                .addClass('current');
            this.$element.find('.sliderify-pagination span')
                .removeClass('current').eq(currentIndex)
                .addClass('current');
        };
        return Sliderfiy;
    })();
    $.fn.sliderify = function (options) {
        return this.each(function () {
            new Sliderfiy(this, options);
        });
    };
    $.fn.sliderify.version = '1.1.1';
})(jQuery);
