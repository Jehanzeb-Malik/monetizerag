var best_seller_product_list = '';
function loadBestSellerWidget(){
    try{
        wait( function()
        {
            ShopManager.getPopularProducts({
                isoCurrencyCode: sessionStorage.isoCurrencyCode,
                limit: 24
            },
            function( jsResponse )
            {
                Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
                //                console.log('jsResponse');
                //                console.log(jsResponse);
                var showCategory = false;
                var subCatValue = '';
        
                var temp = jsResponse.data;
                best_seller_product_list = jsResponse.data;
                if(temp && temp.length > 0){
                    for(var i=0 ; i<temp.length ; i++){
                        temp[i].currencyType = getCurrencyCode(temp[i].currency);
                        temp[i].index = i+1;
                        temp[i].subCatName = getCategoryName(global_CategoriesList, temp[i].categoryId);
                        temp[i].merchantLogoUrl = '';
                        if(global_MerchantList && global_MerchantList.length > 0){
                            for(var y=0 ; y<global_MerchantList.length ; y++){
                                if(global_MerchantList[y].id == temp[i].merchantId){
                                    temp[i].merchantLogoUrl = global_MerchantList[y].logoUrl;
                                    break;
                                }
                            }
                        }
                    }
        
                    var output = Mustache.render(jQuery("#home_best_seller_widget_tpl").html(), jsResponse);
                    jQuery("#best-seller-widget-items").html(output);
                    
                    jQuery('#grid-container').flexslider({
                        animation: "slide",
                        animationLoop: false,
                        directionNav: true,
                        itemWidth: 229,
                        itemMargin: 21,
                        controlsContainer: jQuery(".best-seller-control-nav")
                    });

                } else {
                    jQuery('#best-seller-widget-items .loading-container img').hide();
                    jQuery('#best-seller-widget-items .loading-container .loading-container-text').text('No Products Found');
                }
            });
        });
        
    } catch (e) {
        console.log(e.message);
        jQuery('#best-seller-widget-items .loading-container img').hide();
        jQuery('#best-seller-widget-items .loading-container .loading-container-text').text('No Products Found');
    }
}