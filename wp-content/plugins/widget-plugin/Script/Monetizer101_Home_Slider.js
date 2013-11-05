jQuery(document).ready(function() {
    jQuery('.flexslider-home').flexslider({
        animation: "slide",
        reverse: true,                  //Boolean: Reverse the animation direction
        slideshowSpeed: 10000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
        pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        start: function(){
            jQuery('#region-right #slide-1').show();
        },
        before: function(e){
            var slideFrom = e.currentSlide+1;
            var slideTo = e.animatingTo+1;
            
            jQuery('#region-right #slide-'+slideFrom).fadeOut();
            jQuery('#region-right #slide-'+slideTo).fadeIn();
        }
    })
});

