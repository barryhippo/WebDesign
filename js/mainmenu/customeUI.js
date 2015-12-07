(function($) {
    "use strict";

    $(document).ready(function() {
        $('.dropdown-submenu').hover(function () {
            if ($(window).width() >= 479) {
                var p = $(this);
                var offset = p.offset();

                var multiLeft = offset.left;
                var multilevelWidth = $(".multilevel").width();
                var sublevelWidth = $(this).find(".dropdown-menu").width();

                var allWidth = multiLeft + multilevelWidth + sublevelWidth;

                if ($(window).width() <= allWidth) {
                    $(this).find(".dropdown-menu").css("marginLeft", "-" + (multilevelWidth + sublevelWidth) + "px");
                } else {
                    $(".dropdown-submenu>.dropdown-menu").css("marginLeft", " ");
                }
            } else {
                $(".dropdown-submenu>.dropdown-menu").css("marginLeft", " ");
            }
        });


    });

})(jQuery);

