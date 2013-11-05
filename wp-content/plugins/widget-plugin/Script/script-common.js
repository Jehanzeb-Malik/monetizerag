/*********************************************************************/
/*    Globals to hold re-usable data                                 */
/*********************************************************************/
var global_CategoriesList = '';

/*********************************************************************/
/*    Function called when api load is successful (in header.php)    */
/*********************************************************************/
function onReady(){
    if(jQuery('body').hasClass('page-template-template-cat-grid-php')){
        loadProducts();
    } else if(jQuery('body').hasClass('page-template-template-all-sellers-php')){
        loadMerchants();
    } else if(jQuery('body').hasClass('page-template-template-homepage-php')){
        loadHomeWidgets();
    } else if(jQuery('body').hasClass('page-template-template-category-grid-php') || jQuery('body').hasClass('page-template-template-sub-category-grid-php') || jQuery('body').hasClass('page-template-template-seller-grid-php')){
        loadCategoryWidgets();
    } else if(jQuery('body').hasClass('page-template-template-search-grid-php')){
        loadSearchWidgets();
    }
    
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