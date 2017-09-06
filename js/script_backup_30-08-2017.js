
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

        },

        init: function () {

            var self = this;

            self.setup = $.extend(self.setup, self.settings);

            var winW = $(window).outerWidth();

            self.events();

            return true;

        },

        events: function() {

            var self = this;

            var counter = 0,
                container,
                currentPopupSource,
                slideCounter = 0,
                ppSourceArray = [],
                currentIndex;

            /* Open popup */

            self.element.on('click', '[data-zgallery]', function(){

                counter++;

                currentPopupSource = $($(this).data('src'));

                var galleryName = $(this).data('zgallery'),

                    gallery = $('[data-zgallery=' + galleryName + ']');



                gallery.each(function(i, el) {

                    ppSource = $($(this).data('src'));

                    if (ppSource.attr('id') === currentPopupSource.attr('id'))
                        {
                            currentIndex = i;
                        }

                    ppSourceArray.push(ppSource);
                });

                console.log(currentIndex);



                container = $('<div class="zgallery__container" id="zgallery-container' + counter + '"><div class="zgallery__overlay"></div><div class="zgallery__inner"><div class="zgallery__navigation"><button class="zgallery__arrow zgallery__arrow-left"></button><button class="zgallery__arrow zgallery__arrow-right"></button></div><div class="zgallery__stage"><div class="zgallery__slide"></div><a class="zgallery__close" href="javascript:;"></a> </div></div></div>');

                container.prependTo('body');

                currentPopupSource.wrap('<div class="zgallery__tag-wrapper"></div>');

                currentPopupSource.appendTo('.zgallery__slide', container);

            });


            /* Sliding */

            $('body').on('click', '.zgallery__arrow', function(){

                $('.zgallery__slide', container).addClass('zgallery__slide_transitioning')/*.hide(function(){

                    currentPopupSource.appendTo('.zgallery__tag-wrapper').unwrap();

                    console.log($(this));
                    $(this).remove();

                    $('<div class="zgallery__slide">').prependTo('.zgallery__stage', container);

                    currentIndex++;

                    console.log(ppSourceArray[currentIndex]);

                    ppSourceArray[currentIndex].appendTo('.zgallery__slide', container);
                })*/;

            });



            /* Close popup */

            $('body').on('click', '.zgallery__close', function(){

                currentPopupSource.appendTo('.zgallery__tag-wrapper').unwrap();

                console.log(container);

                $('.zgallery__inner', container).hide();

                $('.zgallery__overlay').fadeOut(function(){
                    container.remove();
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

