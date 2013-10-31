/*********************************************************************/
/*    Function called when api load is successful (in header.php)    */
/*********************************************************************/
function onReady(){
    if(jQuery('body').hasClass('page-template-template-cat-grid-php')){
        loadProducts();
    }
}

/********************************************/
/*    Get html code for currency            */
/********************************************/
function getCurrencyCode(currency){
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
}

/********************************************/
/*    Get Param from url query string       */
/********************************************/
function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}