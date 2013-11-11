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

function loadHomeSliderWidget(){
    wait( function()
    {
	    	    	
        ShopManager.getPopularSubCategories({
            isoCurrencyCode: 'GBP',
            limit: 5
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
            console.log('jsResponse');
            console.log(jsResponse);
            var temp = jsResponse.data;
            var limit = 6,
            amount = temp.length,
            lower_bound = 0,
            upper_bound = temp.length - 1,
            unique_random_numbers = [];

            if (limit > amount) limit = amount; //Infinite loop if you want more unique
            //Natural numbers than existemt in a
            // given range
            while (unique_random_numbers.length < limit) {
                var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
                if (unique_random_numbers.indexOf(random_number) == -1) { 
                    // Yay! new random number
                    unique_random_numbers.push( random_number );
                }
            }
            for( var x = 0 ; x < temp.length ; x++){
                if(unique_random_numbers.indexOf(x) == -1){
                    temp[x].show = false;
                }
                else{
                    temp[x].show = true;
                }
            }
            
            var output = Mustache.render(jQuery("#slider-popular-sub-categories").html(), jsResponse);
            jQuery("#slider-popular-departments-list").html(output);
        });
    });
    
    var categoryList = ['Fashion','Beauty & Health','Electronics','Home & Garden','Free Time','Toys & Gifts'];
    for(var y = 1 ; y < 7 ; y++){
        var childrenList = getCategoryChildren(global_CategoriesList, categoryList[y-1]);
        console.log(categoryList[y-1]);
        console.log(childrenList);
        var output = Mustache.render(jQuery("#slider-slide-sub-categories").html(), childrenList);
        jQuery('#region-right #slide-'+y+' ul').html(output);
    }
}