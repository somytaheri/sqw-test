/**
 * Created by somi on 9/03/15.
 */
$(function() {
    $('.header .btn-arrow-dwn').click(function() {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
    });
}());