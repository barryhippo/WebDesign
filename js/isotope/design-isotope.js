jQuery(document).ready(function($){
    $('#icon-plus').click(function(){
        $('#filters-menu').slideToggle(400, function(t,e,n,i,a){return e==a?n+i:i*(-Math.pow(2,-10*e/a)+1)+n});
    });

    //$('#grid-container').removeClass('cbp-animation-fadeOutTop');
    //Load After Window Loads...
    $(window).load( function() {
        my_smartresize_function();
    });

    $(window).resize(function(){
        my_smartresize_function();
    });

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