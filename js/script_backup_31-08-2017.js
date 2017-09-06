
(function ($, window, document, undefined) {

    var pluginName = "zGallery";


    function zGallery(element, options) {
        this.element = $(element);

        this.settings = $.extend({
            width: '',
            midW: 1000,  // при ширине меньше этой начинается адаптив
            mobW: 650,   // при ширине меньше этой показывается мобильная версия (в частности, касается поп-апов)
            isMobile: false // информация о том, соответствует данная ширина экрана мобильной версии
        }, options);

        this.init();
    }

    $.extend(zGallery.prototype, {

        setup: {
            counter: 0,
            container: '',
            currentPopupSource: '',
            ppSourceArray : [],
            currentSlide: 0,
            ppSourceContainer: '',
            slideW: 0,
            shift: 0
        },

        init: function () {

            var self = this;

            self.setup = $.extend(self.setup, self.settings);

            var winW = $(window).outerWidth();

            self.events();

            return true;

        },

        open: function(elem) {

            var self = this;

            self.setup.currentPopupSource = $(elem.data('src')),
                self.setup.ppSourceContainer = self.setup.currentPopupSource.parent();

            var galleryName = elem.data('zgallery'),

                linksGallery = $('[data-zgallery=' + galleryName + ']');


            self.setup.container = $('<div class="zgallery__container" id="zgallery-container' + self.setup.counter + '"><div class="zgallery__overlay"></div><div class="zgallery__inner"><div class="zgallery__navigation"><button class="zgallery__arrow zgallery__arrow-left"></button><button class="zgallery__arrow zgallery__arrow-right"></button></div><div class="zgallery__stage"><div class="zgallery__stage-inner-wrapper"><div class="zgallery__stage-inner"></div></div></div></div></div>');

            self.setup.container.prependTo('body');


            linksGallery.each(function(i, el) {

                var ppSource = $($(this).data('src'));

                if (ppSource.attr('id') === self.setup.currentPopupSource.attr('id'))
                {
                    self.setup.currentSlide = i;
                }

                ppSource.appendTo('.zgallery__stage-inner', self.setup.container).wrap('<div class="zgallery__slide"></div>');

                self.setup.slideW = $('.zgallery__slide').outerWidth();

                $('.zgallery__stage').width(self.setup.slideW);

                $('<a class="zgallery__close" href="javascript:;"></a>').appendTo(ppSource);

            });

            self.setup.shift = (self.setup.currentSlide * self.setup.slideW) * -1;

            $('.zgallery__stage-inner').width(self.setup.slideW * linksGallery.length).css({left: self.setup.shift});

        },

        events: function() {

            var self = this;

            /*var counter = 0,
                container,
                currentPopupSource,
                ppSourceArray = [],
                currentSlide,
                ppSourceContainer,
                slideW,
                shift;*/

            /* Open popup */

            self.element.on('click', '[data-zgallery]', function(){

                self.open($(this));

                /* self.setup.currentPopupSource = $($(this).data('src')),
                    self.setup.ppSourceContainer = self.setup.currentPopupSource.parent();

                var galleryName = $(this).data('zgallery'),

                    linksGallery = $('[data-zgallery=' + galleryName + ']');


                self.setup.container = $('<div class="zgallery__container" id="zgallery-container' + self.setup.counter + '"><div class="zgallery__overlay"></div><div class="zgallery__inner"><div class="zgallery__navigation"><button class="zgallery__arrow zgallery__arrow-left"></button><button class="zgallery__arrow zgallery__arrow-right"></button></div><div class="zgallery__stage"><div class="zgallery__stage-inner-wrapper"><div class="zgallery__stage-inner"></div></div></div></div></div>');

                self.setup.container.prependTo('body');


                linksGallery.each(function(i, el) {

                    var ppSource = $($(this).data('src'));

                    if (ppSource.attr('id') === self.setup.currentPopupSource.attr('id'))
                        {
                            self.setup.currentSlide = i;
                        }

                    ppSource.appendTo('.zgallery__stage-inner',  self.setup.container).wrap('<div class="zgallery__slide"></div>');

                    self.setup.slideW = $('.zgallery__slide').outerWidth();

                    $('.zgallery__stage').width(self.setup.slideW);

                    $('<a class="zgallery__close" href="javascript:;"></a>').appendTo(ppSource);

                });

                self.setup.shift = (self.setup.currentSlide * self.setup.slideW) * -1;

                $('.zgallery__stage-inner').width(self.setup.slideW * linksGallery.length).css({left: self.setup.shift}); */

            });


            /* Sliding */

            $('body').on('click', '.zgallery__arrow', function(){

                self.setup.shift = ($(this).hasClass('zgallery__arrow-left')) ? self.setup.shift + self.setup.slideW : self.setup.shift - self.setup.slideW;

                $('.zgallery__stage-inner').css({left: self.setup.shift});

            });



            /* Close popup */

            $('body').on('click', '.zgallery__close', function(){

                $('.zgallery__slide > *').each(function(i, el) {

                    $(this).unwrap().appendTo(self.setup.ppSourceContainer).find('.zgallery__close').remove();

                    $('.zgallery__overlay').fadeOut(function(){
                        self.setup.container.remove();
                    });

                });

            });
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

