function onReady(){
    if(jQuery('body').hasClass('page-template-template-cat-grid-php')){
        loadProducts();
    }
}

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