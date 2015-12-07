jQuery(document).ready(function($){
    //Load After Window Loads...
    $(window).load( function() {
        my_smartresize_function();
    });

    $(window).resize(function(){
        my_smartresize_function();
    });

});

//CAROUSEL...
function my_smartresize_function(){

    console.log("load-isotope");
    var $container = jQuery('.dt-sc-portfolio-container');

    jQuery('.dt-sc-sorting-container a').click(function(){
        jQuery('.dt-sc-sorting-container').find('a').removeClass('active-sort');
        jQuery(this).addClass('active-sort');

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