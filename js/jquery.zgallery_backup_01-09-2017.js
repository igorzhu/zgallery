(function ($, window, document, undefined) {

    var pluginName = "zGallery";


    function zGallery(element, options) {
        this.element = $(element);

        this.settings = $.extend({
            width: '',
            midW: 1000,  // при ширине меньше этой начинается адаптив
            mobW: 650,   // при ширине меньше этой показывается мобильная версия (в частности, касается поп-апов)
            isMobile: false, // информация о том, соответствует данная ширина экрана мобильной версии
            transition: 750 // время прокрутки слайда (ms)
        }, options);

        this.init();
    }

    $.extend(zGallery.prototype, {

        setup: {
            counter: 0,              // счётчик запуска экземпляров плагина
            container: '',           // контейнер для поп-апа
            currentPopupSource: '',  // элемент-источник контента для слайда, соответствующий ссылке, по которой сделан клик
            ppSourceArray : [],
            currentSlide: 0,         // порядковый номер слайда (отсчёт ведётся с 0)
            ppSourceContainer: '',   // контейнер элементов-источников контента для галереи
            slideW: 0,               // ширина слайда
            shift: 0,                // смещение полотна слайдера
            slidesN: 0               // число слайдов в галерее (не считая клонов)
        },

        init: function () {

            var self = this;

            self.setup = $.extend(self.setup, self.settings);

            var winW = $(window).outerWidth();

            self.events();

            return true;

        },

        open: function(elem, onOpened) {

            var self = this;

            self.setup.currentPopupSource = $(elem.data('src')),
            self.setup.ppSourceContainer = self.setup.currentPopupSource.parent();

            var galleryName = elem.data('zgallery'),

                linksGallery = $('[data-zgallery=' + galleryName + ']');


            // Создаём контейнер для поп-апа:

            self.setup.container = $('<div class="zgallery__container" id="zgallery-container' + self.setup.counter + '"><div class="zgallery__overlay"></div><div class="zgallery__inner"><div class="zgallery__navigation"><button class="zgallery__arrow zgallery__arrow-left"></button><button class="zgallery__arrow zgallery__arrow-right"></button></div><div class="zgallery__stage"><div class="zgallery__stage-inner-wrapper"><div class="zgallery__stage-inner"></div></div></div></div></div>');

            self.setup.container.prependTo('body');


            // Заполняем контейнер слайдами:

            linksGallery.each(function(i, el) {

                var ppSource = $($(this).data('src')); // элемент-источник контента для слайда

                if (ppSource.attr('id') === self.setup.currentPopupSource.attr('id'))
                    {
                        self.setup.currentSlide = i;
                    }

                ppSource.appendTo('.zgallery__stage-inner', self.setup.container).wrap('<div class="zgallery__slide"></div>');

                $('<a class="zgallery__close" href="javascript:;"></a>').appendTo(ppSource);

            });

            self.setup.slideW = $('.zgallery__slide').outerWidth();

            $('.zgallery__stage').width(self.setup.slideW);


            self.setup.slidesN = $('.zgallery__slide').length; // число слайдов без клонов


            // Создаём клоны первого и последнего элементов галереи:

            $('.zgallery__slide:last-child').clone().addClass('zgallery__slide_clone').prependTo('.zgallery__stage-inner');
            $('.zgallery__slide:nth-child(2)').clone().addClass('zgallery__slide_clone').appendTo('.zgallery__stage-inner');


            // Смещаем полотно слайдера так, чтобы отображался текущий слайд (в соответствии с кликнутой ссылкой):

            self.setup.shift = ((self.setup.currentSlide + 1) * self.setup.slideW) * -1;

            $('.zgallery__stage-inner').width(self.setup.slideW * (linksGallery.length + 2)).css({left: self.setup.shift});

            onOpened();

        },

        sliding: function(elem, swipeDirection, keyarrow, onSlided){

            var self = this;

            var sliderBand = $('.zgallery__stage-inner');

            if ($('.zgallery__stage-inner:animated', self.setup.container).length) {
                return false;
            }

            var slideLeft  =  elem ? elem.hasClass('zgallery__arrow-left') : false  ||  ( swipeDirection === 'swipeLeft') || ( keyarrow === 'leftArrow' ),
                slideRight =  elem ? elem.hasClass('zgallery__arrow-right') : false || ( swipeDirection === 'swipeRight') || ( keyarrow === 'rightArrow' );

            if (slideLeft)
                {
                    self.setup.shift += self.setup.slideW;

                    if (self.setup.currentSlide > 0 )
                        {
                            sliderBand.animate({
                                left: self.setup.shift
                            }, self.setup.transition);

                            self.setup.currentSlide--;
                        }

                    else
                        {
                            sliderBand.animate({
                                left: self.setup.shift
                            }, self.setup.transition, function(){

                                // устанавливаем слайдер на последний слайд:

                                self.setup.shift = (self.setup.slidesN * self.setup.slideW) * -1;

                                sliderBand.css({
                                    left: self.setup.shift
                                });
                            });

                            self.setup.currentSlide = self.setup.slidesN - 1;
                        }
                }

            else if (slideRight)
                {
                    self.setup.shift -= self.setup.slideW;

                    if( self.setup.currentSlide < self.setup.slidesN - 1)
                        {
                            sliderBand.animate({
                                left: self.setup.shift
                            }, self.setup.transition);

                            self.setup.currentSlide++;

                        }

                    else
                    {
                        sliderBand.animate({
                            left: self.setup.shift
                        }, self.setup.transition, function(){

                            // устанавливаем слайдер на первый слайд:

                            self.setup.shift = (self.setup.slideW) * -1;

                            sliderBand.css({
                                left: self.setup.shift
                            });
                        });

                        self.setup.currentSlide = 0;
                    }
                }
            if (onSlided)
                {
                    onSlided();
                }
        },

        swiping: function() {

            var self = this;

            $('.zgallery__slide').swipe({

                swipeLeft:function(event, distance, duration, fingerCount, fingerData, currentDirection) {

                   self.sliding(null, 'swipeRight', null);
                },

                swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {

                    self.sliding(null, 'swipeLeft', null);
                }
            });
        },

        events: function() {

            var self = this;

            /* Open popup */

            self.element.on('click', '[data-zgallery]', function(){

                self.open($(this), function() {

                    self.swiping();

                });

            });


            /* Sliding */

            $('body').on('click', '.zgallery__arrow', function(){

                self.sliding($(this), null, null);
            });


            /* Sliding with left/right arrows on the keybord; closing popup with Esc key */

            $('body').on('keydown', self.setup.container, function(e) {

                if (e.which === 37)
                    {
                        self.sliding(null, null, 'leftArrow');
                    }

                else if (e.which === 39)
                    {
                        self.sliding(null, null, 'rightArrow');
                    }

                else if (e.which === 27)
                    {
                        self.close();
                    }
            });

            /* Closing popup */

            $('body').on('click', '.zgallery__close', function(e){

                self.close();
            });

            $('body').on('click', '.zgallery__inner', function(e){

                if (e.target == this)
                    {
                        self.close();
                    }
            });
        },

        close: function(beforeClose, afterClose) {

            var self = this;

            if (beforeClose)
                {
                    beforeClose();
                }

            $('.zgallery__slide:not(.zgallery__slide_clone) > *').each(function(i, el) {

                $(this).unwrap().appendTo(self.setup.ppSourceContainer).find('.zgallery__close').remove();

                $('.zgallery__overlay').fadeOut(function(){
                        self.setup.container.remove();
                });
            });

            if (afterClose)
                {
                    afterClose();
                }
        }
    });


    $.fn[ pluginName ] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new zGallery(this, options));
            }
        });
        return this;
    };


    $('body').zGallery();


})(jQuery, window, document);

