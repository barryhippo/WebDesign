(function($) {
    "use strict";

    (function ($, window, document, undefined) {

        var gridContainer = $('#grid-container'),
            filtersContainer = $('#filters-container');

        // init cubeportfolio
        gridContainer.cubeportfolio({

            animationType: '',//'fadeOutTop',

            gapHorizontal: 0,

            gapVertical: 0,

            gridAdjustment: 'responsive',

            caption: 'overlayBottomPush',

            displayType: 'lazyLoading',

            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxShowCounter: true

            // NOTE: singlePage is not enabled in this example
        });

        // add listener for filters click
        filtersContainer.on('click', '.cbp-filter-item', function (e) {

            var me = $(this);

            // get cubeportfolio data and check if is still animating (reposition) the items.
            if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }

            // filter the items
            gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

        });

        // activate counter for filters
        gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


        /* LOAD MORE START */
        var loadMoreObject = {

                init: function () {

                    var t = this;

                    // the job inactive
                    t.isActive = false;

                    t.numberOfClicks = 0;

                    // cache link selector
                    t.loadMore = $('.cbp-l-loadMore-text-link');

                    // cache window selector
                    t.window = $(window);

                    // add events for scroll
                    t.addEvents();

                    // trigger method on init
                    t.getNewItems();

                },

                addEvents: function () {

                    var t = this;

                    t.window.on("scroll.loadMoreObject", function() {
                        // get new items on scroll
                        t.getNewItems();
                    });
                },

                getNewItems: function () {

                    var t = this, topLoadMore, topWindow, clicks;

                    if ( t.isActive || t.loadMore.hasClass('cbp-l-loadMore-text-stop') ) return;

                    topLoadMore = t.loadMore.offset().top;
                    topWindow = t.window.scrollTop() + t.window.height();

                    if (topLoadMore > topWindow) return;

                    // this job is now busy
                    t.isActive = true;

                    // increment number of clicks
                    t.numberOfClicks++;

                    // perform ajax request
                    $.ajax({
                        url: t.loadMore.attr('data-href'),
                        type: 'POST',
                        dataType: 'HTML',
                        cache: true
                    })
                        .done( function (result) {
                            var items, itemsNext;

                            // find current container
                            items = $(result).filter( function () {
                                return $(this).is('div' + '.cbp-loadMore-block' + t.numberOfClicks);
                            });

                            gridContainer.cubeportfolio('appendItems', items.html(),
                                function () {

                                    // check if we have more works
                                    itemsNext = $(result).filter( function () {
                                        return $(this).is('div' + '.cbp-loadMore-block' + (t.numberOfClicks + 1));
                                    });

                                    if (itemsNext.length === 0) {

                                        t.loadMore.text('');
                                        t.loadMore.addClass('cbp-l-loadMore-text-stop');

                                        t.window.off("scroll.loadMoreObject");

                                    } else {
                                        // make the job inactive
                                        t.isActive = false;

                                        topLoadMore = t.loadMore.offset().top;
                                        topWindow = t.window.scrollTop() + t.window.height();

                                        if (topLoadMore <= topWindow) {
                                            t.getNewItems();
                                        }
                                    }

                                });

                        })
                        .fail(function() {
                            // make the job inactive
                            t.isActive = false;
                        });
                }
            },
            loadMore = Object.create(loadMoreObject);

        // Cube Portfolio is an event emitter. You can bind listeners to events with the on and off methods. The supported events are: 'initComplete', 'filterComplete'

        // when the plugin is completed
        gridContainer.on('initComplete', function () {
            loadMore.init();
        });

        // when the height of grid is changed
        gridContainer.on('filterComplete', function () {
            loadMore.window.trigger('scroll.loadMoreObject');
        });


        /* LOAD MORE END */

        $('#icon-plus').click(function(){
            $('#filters-menu').slideToggle(400, function(t,e,n,i,a){return e==a?n+i:i*(-Math.pow(2,-10*e/a)+1)+n});
        });

        //Load After Window Loads...
        $(window).load( function() {
            my_smartresize_function();
        });

        $(window).resize(function(){
            my_smartresize_function();
        });

        function my_smartresize_function(){
            console.log("load-isotope");
            var $container = jQuery('.dt-sc-portfolio-container');

            jQuery('.dt-sc-sorting-container a').unbind( "click" ).click(function(){
                jQuery('.dt-sc-sorting-container').find('a').removeClass('active-sort');
                jQuery(this).addClass('active-sort');
                $('#filters-menu').slideToggle(400, function(t,e,n,i,a){return e==a?n+i:i*(-Math.pow(2,-10*e/a)+1)+n});
                var selector = jQuery(this).attr('data-filter');

                var opt = {
                    filter: selector,
                    itemSelector:'.dt-sc-portfolio-container .portfolio',
                    masonry: {
                        columnWidth: 0
                    }
                };
                $container.isotope(opt);
                return false;
            });

            var opt = {
                itemSelector: '.dt-sc-portfolio-container .portfolio',
                masonry: {
                    columnWidth: 0
                }
            };
            $container.isotope(opt);
        }
    })(jQuery, window, document);

})(jQuery);