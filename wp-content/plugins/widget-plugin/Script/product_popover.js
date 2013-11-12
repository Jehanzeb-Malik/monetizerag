jQuery(document).ready(function(){
    jQuery(document).on('click','.product-detail-close-btn', function(){
        jQuery("#window").fadeOut(500);
        jQuery("#window").html('');
    });
});
function drawPopover(data, id){
    
    jQuery('#window').width(jQuery(window).width()+'px');
    jQuery('#window').height(jQuery(window).height()+'px');
    
    var productIndex = -1;
    for(var x=0 ; data.length ; x++){
        if(data[x].id == id){
            productIndex = x;
            break;
        }
    }
    if(productIndex != -1){
        var output = Mustache.render(jQuery("#product_popover_tpl").html(), data[productIndex]);
        var setMarginLeft = ((parseInt(jQuery(window).width(), 10) - 810)/2);
        var setMarginTop = ((parseInt(jQuery(window).height(), 10) - 573 - 12)/2);
    
        jQuery("#window").html(output);
    
        if(setMarginLeft < 0){
            setMarginLeft = 0;
        }
        if(setMarginTop < 0){
            setMarginTop = 12;
        }
        jQuery('#product-popover-wrapper').css({
            'marginLeft': setMarginLeft + 'px',
            'marginTop': setMarginTop + 'px'
        });
        jQuery("#window").fadeIn(500);
    }
}