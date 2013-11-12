var category_basic_product_list = '';
var category_basic_min_price = 0;
var category_basic_max_price = 0;

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
        
        //        jQuery(document).on('click', '.product-price-next-btn', function(){
        //            var gridSort = getParameterByName('sort');
        //            if(gridSort == ''){
        //                gridSort = '1';
        //            }
        //            window.location.href = monetizer_site_url + '/search/?keywords=' + jQuery(this).attr('data-category-name') + '&categoryIds=' + jQuery(this).attr('data-category-id') + '&percentOffMin=&resultLimit=24&resultOffset=0&layout=' + jQuery('.selected-layout').parent().attr('id').substring(0,4) + '&sort=' + gridSort;
        //        });
        
        jQuery(document).on('click', '.k-link .radio', function(){
            var radioControl = jQuery(this).siblings(".product-filter-discount")[0];
            jQuery(radioControl).trigger("click");
        });
        
        jQuery(document).on('click', '.product-filter-discount, .product-filter-sub-category, .k-link .checkbox', function(){
            try{
                var checkedSubCategories = jQuery('.product-filter-sub-category:checkbox:checked');
                var checkedDiscount = jQuery('.product-filter-discount:checkbox:checked');
                var salePrice = 0;
                var productList = '';
            
                jQuery('.grid-product').fadeOut(500);
                for(var x = 0 ; x < checkedSubCategories.length ; x++){
                    for(var y = 0 ; y < checkedDiscount.length ; y++){
                        productList = '';
                        productList = jQuery('.grid-product.'+jQuery(checkedSubCategories[x]).attr('id').replace('product-filter-sub-category-checkbox-', 'sub-catgeory-')+'.'+jQuery(checkedDiscount[y]).attr('id').replace('product-filter-discount-checkbox-', '')+'-off');
                        for(var z = 0 ; z < productList.length ; z++){
                            salePrice = parseInt(jQuery(productList[z]).find('.product-discounted-price').html().split(' ')[1], 10);
                            if((salePrice >= jQuery('#filter-panelbar-price-min-amount').val() && salePrice <= jQuery('#filter-panelbar-price-max-amount').val())){
                                jQuery(productList[z]).fadeIn(500);
                            }
                        }
                    }
                }
                reMargin();
            } catch (e) {
                console.log(e.message);
            }
        });
        
    //        jQuery(document).on('click', '.product-filter-sub-category', function(){
    //            var categoryId = jQuery(this).attr('id').replace('product-filter-sub-category-checkbox-', '');
    //            if(jQuery(this).is(':checked')){
    //                jQuery('.grid-product.sub-catgeory-'+categoryId).show(500);
    //            } else{
    //                jQuery('.grid-product.sub-catgeory-'+categoryId).hide(500);
    //            }            
    //        });
    } catch (e) {
        console.log(e.message);
    }
    
    jQuery(document).on('click', '.view-layout-btn', function(){
        
        try{
            jQuery('.selected-layout').attr('src', jQuery('.selected-layout').attr('src').replace('active', 'inactive'));
            jQuery('.selected-layout').removeClass('selected-layout');
            
            jQuery('#' + jQuery(this).attr('id') + ' img').attr('src', jQuery('#' + jQuery(this).attr('id') + ' img').attr('src').replace('inactive', 'active'));
            jQuery('#' + jQuery(this).attr('id') + ' img').addClass('selected-layout');
        }
        catch (e) {
            console.log(e.message);
        }
        
        var layout = jQuery(this).attr('id').substring(0,4);
        var currentClasses = jQuery.trim(jQuery('.grid-product').attr('class').replace('grid-product', '')).split(' ');
        var currentClass = '';
        var newClass = 'product-' + layout;
        
        for(var x = 0 ; x < currentClasses.length ; x++){
            if(currentClasses[x].indexOf("product-") != -1){
                currentClass = currentClasses[x];
                break;
            }
        }
        
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
                reMargin();
            });
        } catch (e) {
            console.log(e.message);
        }
    });
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
            try{
                Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
                category_basic_product_list = jsResponse.data;
                var layout = getParameterByName('layout');
                var subCatList = [];
                var subCatValue = '';
                if(layout == ''){
                    layout = '2col';
                }
        
                var temp = jsResponse.data;
                jsResponse.layout = layout;
                if(layout == '2col' || layout == '4col'){
                    jsResponse.showLayoutWithMargin = true;
                    jsResponse.showLayoutWithoutMargin = false;
                } else{
                    jsResponse.showLayoutWithMargin = false;
                    jsResponse.showLayoutWithoutMargin = true;
                }

                if(temp && temp.length > 0){
                    var discountRate = 0;
                    category_basic_min_price = parseInt(temp[0].salePrice, 10);
                    category_basic_max_price = parseInt(temp[0].salePrice, 10);
                    for(var i=0 ; i<temp.length ; i++){
                    
                        if(temp[i].salePrice < category_basic_min_price){
                            category_basic_min_price = Math.floor(parseInt(temp[i].salePrice, 10));
                        }
                        if(temp[i].salePrice > category_basic_max_price){
                            category_basic_max_price = Math.ceil(parseInt(temp[i].salePrice, 10));
                        }
                    
                        subCatValue = getCategoryName(global_CategoriesList, temp[i].categoryId) + '|-|' + temp[i].categoryId;
                        if(subCatList.indexOf(subCatValue) == -1){
                            subCatList.push(subCatValue);
                        }
                        temp[i].subCatName = getCategoryName(global_CategoriesList, temp[i].categoryId);
                        discountRate = 0;
                        discountRate =  ( ( ( temp[i].retailPrice - temp[i].salePrice ) / temp[i].retailPrice ) * 100 );
                        temp[i].classes = '';
                    
                        if(discountRate < 30){
                            temp[i].classes += ' less-30-off';
                        }
                        else if(discountRate >= 30 && discountRate < 40){
                            temp[i].classes += ' 30-off';
                        }
                        else if(discountRate >= 40 && discountRate < 50){
                            temp[i].classes += ' 40-off';
                        }
                        else if(discountRate >= 50 && discountRate < 60){
                            temp[i].classes += ' 50-off';
                        }
                        else if(discountRate >= 60){
                            temp[i].classes += ' 60-off';
                        }
                        temp[i].currencyType = getCurrencyCode(temp[i].currency);
                        temp[i].layout = layout;
                        temp[i].index = i+1;
                        temp[i].merchantLogoUrl = '';
                        if(global_MerchantList && global_MerchantList.length > 0){
                            for(var y=0 ; y<global_MerchantList.length ; y++){
                                if(global_MerchantList[y].id == temp[i].merchantId){
                                    temp[i].merchantLogoUrl = global_MerchantList[y].logoUrl;
                                    break;
                                }
                            }
                        }
                        if(layout != '4col'){
                            temp[i].showCategory = true;
                        } else{
                            temp[i].showCategory = false;
                        }
                    }
                    var output = Mustache.render(jQuery("#product_viewer_tpl").html(), jsResponse);
                    jQuery("#product-viewer-content").html(output);
//                    console.log(output);
//                    console.log(jQuery("#product-viewer-content").html());
                    if(getParameterByName('sort') != ''){
                        if(parseInt(getParameterByName('sort'), 10) == 1){
                            sortItemsDiscount();
                        }
                        else if(parseInt(getParameterByName('sort'), 10) == 2){
                            sortItemsPriceAscending();
                        }
                        else if(parseInt(getParameterByName('sort'), 10) == 3){
                            sortItemsPriceDescending();
                        }
                    }
                    
                
                    if(typeof(loadProductFilterSubCategories) != 'undefined'){
                        loadProductFilterSubCategories(subCatList);
                    }
                    if(typeof(loadProductFilterPrice) != 'undefined'){
                        loadProductFilterPrice();
                    }
                
                }else{
                    console.log('Dropping');
                    jQuery('.loading-container img').hide();
                    jQuery('.loading-container .loading-container-text').text('No Products Found');
                }
            } catch (e) {
                console.log(e.message);
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}

function sortItemsPriceAscending(){
    jQuery('#product-viewer-sort-dropdown > li > input').attr('placeholder', 'Price: Lowest First');
    var list = jQuery('#grid-container');
    var items = jQuery(list).children('.grid-product');
    var itemsArr = [];
    
    for (var i = 0 ; i < items.length ; i++) {
        itemsArr.push(items[i]);
    }
    
    itemsArr.sort(function(a, b) {
        return parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10) == parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10)
        ? 0
        : (parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10) > parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10) ? 1 : -1);
    });
    
    jQuery(list).fadeOut(500, function(){
        var markup = [];
        for (var x = 0; x < itemsArr.length; ++x) {
            markup[parseInt(itemsArr[x].id.replace('product-', ''), 10)] = itemsArr[x].innerHTML;
        }
        jQuery(list).html('');
        for (var i = 0; i < itemsArr.length; ++i) {
            jQuery(list).append(itemsArr[i]);
            jQuery('#'+itemsArr[i].id).html(markup[parseInt(itemsArr[i].id.replace('product-', ''), 10)]);
        }
        jQuery(list).fadeIn(500);
    });
}

function sortItemsPriceDescending(){
    jQuery('#product-viewer-sort-dropdown > li > input').attr('placeholder', 'Price: Highest First');
    var list = jQuery('#grid-container');
    var items = jQuery(list).children('.grid-product');
    var itemsArr = [];
    
    for (var i = 0 ; i < items.length ; i++) {
        itemsArr.push(items[i]);
    }
    
    itemsArr.sort(function(a, b) {
        return parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10) == parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10)
        ? 0
        : (parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10) < parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10) ? 1 : -1);
    });
    
    jQuery(list).fadeOut(500, function(){
        var markup = [];
        for (var x = 0; x < itemsArr.length; ++x) {
            markup[parseInt(itemsArr[x].id.replace('product-', ''), 10)] = itemsArr[x].innerHTML;
        }
        jQuery(list).html('');
        for (var i = 0; i < itemsArr.length; ++i) {
            jQuery(list).append(itemsArr[i]);
            jQuery('#'+itemsArr[i].id).html(markup[parseInt(itemsArr[i].id.replace('product-', ''), 10)]);
        }
        jQuery(list).fadeIn(500);
    });
    
}

function sortItemsDiscount(){
    jQuery('#product-viewer-sort-dropdown > li > input').attr('placeholder', 'Biggest Discount');
    var list = jQuery('#grid-container');
    var items = jQuery(list).children('.grid-product');
    var itemsArr = [];
    
    for (var i = 0 ; i < items.length ; i++) {
        itemsArr.push(items[i]);
    }
    
    itemsArr.sort(function(a, b) {
        var discountA = 0;
        var discountB = 0;
        if(parseInt(jQuery(a).find('.product-original-price').html().split(' ')[1], 10) <= 0 || parseInt(jQuery(a).find('.product-original-price').html().split(' ')[1], 10) == parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10)){
            discountA = 0;
        } else{
            discountA = ( ( ( parseInt(jQuery(a).find('.product-original-price').html().split(' ')[1], 10) - parseInt(jQuery(a).find('.product-discounted-price').html().split(' ')[1], 10) ) / parseInt(jQuery(a).find('.product-original-price').html().split(' ')[1], 10) ) * 100 );
        }
        if(parseInt(jQuery(b).find('.product-original-price').html().split(' ')[1], 10) <= 0 || parseInt(jQuery(b).find('.product-original-price').html().split(' ')[1], 10) == parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10)){
            discountB = 0;
        } else{
            discountB = ( ( ( parseInt(jQuery(b).find('.product-original-price').html().split(' ')[1], 10) - parseInt(jQuery(b).find('.product-discounted-price').html().split(' ')[1], 10) ) / parseInt(jQuery(b).find('.product-original-price').html().split(' ')[1], 10) ) * 100 );
        }
        
        return discountA == discountB
        ? 0
        : (discountA < discountB ? 1 : -1);
    });
    
    jQuery(list).fadeOut(500, function(){
        var markup = [];
        for (var x = 0; x < itemsArr.length; ++x) {
            markup[parseInt(itemsArr[x].id.replace('product-', ''), 10)] = itemsArr[x].innerHTML;
        }
        jQuery(list).html('');
        for (var i = 0; i < itemsArr.length; ++i) {
            jQuery(list).append(itemsArr[i]);
            jQuery('#'+itemsArr[i].id).html(markup[parseInt(itemsArr[i].id.replace('product-', ''), 10)]);
        }
        jQuery(list).fadeIn(500);
    });
    
}