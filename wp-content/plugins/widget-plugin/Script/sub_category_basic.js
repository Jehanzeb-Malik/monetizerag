try{
    jQuery('#product-viewer .styled-list').attr('placeholder', jQuery('#product-viewer .styled-list').attr('placeholder').trim());
} catch (e) {
    console.log(e.message);
}

jQuery(document).ready(function(){
    try{
        jQuery('#product-viewer-sort-dropdown').superfish({
            animation: {
                height:'show'
            }
        });
    } catch (e) {
        console.log(e.message);
    }
    
    jQuery(document).on('click', '.view-layout-btn', function(){
        
        try{
            jQuery('#2column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_2x2_inactive.png')
            jQuery('#3column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_3x3_inactive.png')
            jQuery('#4column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_4x4_inactive.png')
            
            jQuery('#' + jQuery(this).attr('id') + ' img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_' + jQuery(this).attr('id').replace('column', '') + 'x' + jQuery(this).attr('id').replace('column', '') + '_active.png')
        }
        catch (e) {
            console.log(e.message);
        }
        
        var layout = jQuery(this).attr('id').substring(0,4);
        var currentClass = jQuery.trim(jQuery('.grid-product').attr('class').replace('grid-product', ''));
        var newClass = 'product-' + layout;
        
        try{
            jQuery('#grid-container').fadeOut(500, function(){
                if(layout == '4col'){
                    jQuery('.product-category').hide();
                    jQuery('#grid-container').css({
                        'marginLeft' : '-5px' 
                    });
                } else if(layout == '3col'){
                    jQuery('.product-category').show();
                    jQuery('#grid-container').css({
                        'marginLeft' : '0px' 
                    });
                } else if(layout == '2col'){
                    jQuery('.product-category').show();
                    jQuery('#grid-container').css({
                        'marginLeft' : '-5px' 
                    });
                }
                jQuery('.grid-product').removeClass(currentClass).addClass(newClass);
                jQuery('#grid-container').fadeIn(500);
            });
        } catch (e) {
            console.log(e.message);
        }
        
    //        var currentURL = document.URL;
    //        currentURL = currentURL.split('?');
    //        
    //        if(currentURL[1] == undefined){
    //            document.location.href = currentURL[0] + '?layout=' + layout;
    //        } else if(currentURL[1].indexOf('layout=') == -1){
    //            document.location.href = currentURL[0] + '?layout=' + layout + '&' + currentURL[1];
    //        } else {
    //            currentURL = currentURL.join('?');
    //            currentURL = currentURL.replace(/(layout=)[^\&]+/, '$1' + layout);
    //            document.location.href = currentURL;
    //        }
    })
});

function loadCategoryWidgets(){
    try{
        ShopManager.getCategoryWidget({
            isoCurrencyCode : sessionStorage.isoCurrencyCode,
            categoryId: getParameterByName('id'),
            productLimit: 24
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
        
            var layout = getParameterByName('layout');
            var showCategory = false;
        
            if(layout == ''){
                layout = '2col';
            }
        
            var temp = jsResponse.data;
            jsResponse.layout = layout;
            if(layout == '2col' || layout == '4col'){
                jsResponse.showlayout = true;
            } else{
                jsResponse.showlayout = false;
            }

            if(temp != 'undefined'){
                for(var i=0 ; i<temp.length ; i++){
                    temp[i].currencyType = getCurrencyCode(temp[i].currency);
                    temp[i].layout = layout;
                    temp[i].index = i+1;
                    if(layout != '4col'){
                        temp[i].showCategory = true;
                    } else{
                        temp[i].showCategory = false;
                    }
                }
        
                var output = Mustache.render(jQuery("#product_viewer_tpl").html(), jsResponse);
//                jQuery("#product-viewer-content").html(output);
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}