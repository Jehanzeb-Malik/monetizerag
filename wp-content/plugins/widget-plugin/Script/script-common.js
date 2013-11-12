/*********************************************************************/
/*    Globals to hold re-usable data                                 */
/*********************************************************************/
var global_CategoriesList = '';
var global_MerchantList = '';

/*********************************************************************/
/*    Function called when api load is successful (in header.php)    */
/*********************************************************************/
function onReady(){
    
    ShopManager.getMerchants({
        isoCurrencyCode: sessionStorage.isoCurrencyCode
    },
    function( merchantResponse )
    {
        global_MerchantList = merchantResponse.data;
        ShopManager.getCategories({
            isoCurrencyCode: sessionStorage.isoCurrencyCode
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
            
            global_CategoriesList = jsResponse.data;
            loadHomeWidgets();
            if(jQuery('body').hasClass('page-template-template-cat-grid-php')){
                loadProducts();
            } else if(jQuery('body').hasClass('page-template-template-all-sellers-php')){
                loadMerchants();
            } else if(jQuery('body').hasClass('page-template-template-homepage-php')){
                loadHomeSliderWidget();
                loadHomeDepartmentWidget();
                loadBestSellerWidget()
            } else if(jQuery('body').hasClass('page-template-template-category-grid-php') || jQuery('body').hasClass('page-template-template-sub-category-grid-php') || jQuery('body').hasClass('page-template-template-seller-grid-php')){
                loadCategoryWidgets();
                if(jQuery('body').hasClass('page-template-template-category-grid-php')){
                    loadCategoryHeaderWidget();
                    loadNarrowResultsWidget();
                }
            } else if(jQuery('body').hasClass('page-template-template-search-grid-php')){
                loadSearchWidgets();
            } else if(jQuery('body').hasClass('error404')){
                loadPageNotFoundSearchWidget();
            }
        });
    });
}

/********************************************/
/*    Get html code for currency            */
/********************************************/
function getCurrencyCode(currency){
    try{
        if(currency == 'USD'){
            return '36';
        }
        else if(currency == 'GBP'){
            return '163';
        }
        else if(currency == 'EUR'){
            return '128';
        }
        else{
            return '36';
        }
    } catch (e) {
        console.log(e.message);
    }
}

/********************************************/
/*    Get Param from url query string       */
/********************************************/
function getParameterByName(name)
{
    try{
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if(results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    } catch (e) {
        console.log(e.message);
    }
}

function getCategoryName(data, id, name){
    try {
        var category_name = name;
        for(var x in data){
            if(data[x].id == id){
                category_name = data[x].name;
                break;
            }
            else if(data[x].children && data[x].children.length > 0 && name != ''){
                category_name = getCategoryName(data[x].children, id, category_name);
            }
        }
        
        return category_name;
    } catch (e) {
        console.log(e.message);
    }
}

function getCategoryChildren(data, id, name){
    try {
        var categoryChildren = name;
        for(var x in data){
            if(data[x].name == id){
                categoryChildren = data[x].children;
                break;
            }
            else if(data[x].children && data[x].children.length > 0 && name != ''){
                categoryChildren = getCategoryChildren(data[x].children, id, categoryChildren);
            }
        }
        
        return categoryChildren;
    } catch (e) {
        console.log(e.message);
    }
}

function reMargin(){
    waitReMargin( function()
    {
        var layout = jQuery('.selected-layout').parent().attr('id').replace('umn', '');
        var itemList = jQuery(".grid-product:visible");
        if(layout == '2col'){
            jQuery(".grid-product").css({
                "marginRight": '16px'
            });
            for(var x = 1 ; x <= itemList.length ; x++){
                if((x%2) == 0){
                    jQuery(itemList[x-1]).css({
                        "margin-right": '0px'
                    });
                }
            }
        } else if(layout == '3col'){
            jQuery(".grid-product").css({
                "marginRight": '23px'
            });
            for(var i = 1 ; i <= itemList.length ; i++){
                if((i%3) == 0){
                    jQuery(itemList[i-1]).css({
                        "margin-right": '0px'
                    });
                }
            }
        } else if(layout == '4col'){
            jQuery(".grid-product").css({
                "marginRight": '8px'
            });
            for(var y = 1 ; y <= itemList.length ; y++){
                if((y%4) == 0){
                    jQuery(itemList[y-1]).css({
                        "margin-right": '0px'
                    });
                }
            }
        }
    });
    
}