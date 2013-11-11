var pageCount;
var currentPage;
var itemsPerPage;

var search_basic_product_list = '';

try{
    jQuery('#product-viewer .styled-list').attr('placeholder', jQuery('#product-viewer .styled-list').attr('placeholder').trim());
} catch (e) {
    console.log(e.message);
}

jQuery(document).ready(function(){
    try{
        jQuery(document).on('click', '.product-viewer-paginator .btn-prev', function(){
            if(currentPage > 1){
                window.location.href = document.URL.replace(/(resultOffset=)[^\&]+/, '$1' + (parseInt(getParameterByName('resultOffset'), 10) - itemsPerPage));
            }
        });
        jQuery(document).on('click', '.product-viewer-paginator .btn-next', function(){
            if(currentPage < pageCount){
                var gridSort = getParameterByName('sort');
                if(gridSort == ''){
                    gridSort = '1';
                }
                window.location.href = document.URL.replace(/(resultOffset=)[^\&]+/, '$1' + (parseInt(getParameterByName('resultOffset'), 10) + itemsPerPage)).replace(/(sort=)[^\&]+/, '$1' + gridSort).replace(/(layout=)[^\&]+/, '$1' + jQuery('.selected-layout').parent().attr('id').substring(0,4));
            }
        });
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
            jQuery('.selected-layout').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_4x4_inactive.png');
            jQuery('.selected-layout').removeClass('selected-layout');
            
            jQuery('#' + jQuery(this).attr('id') + ' img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_' + jQuery(this).attr('id').replace('column', '') + 'x' + jQuery(this).attr('id').replace('column', '') + '_active.png')
            jQuery('#' + jQuery(this).attr('id') + ' img').addClass('selected-layout');
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

function loadSearchWidgets(){
    try{
        var params = {};
        if(getParameterByName('merchantIds') != ''){
            params = {
                isoCurrencyCode : sessionStorage.isoCurrencyCode,
                keywords: getParameterByName('keywords'),
                merchantIds: getParameterByName('merchantIds'),
                percentOffMin: getParameterByName('percentOffMin'),
                resultLimit: getParameterByName('resultLimit'),
                resultOffset: getParameterByName('resultOffset'),
                orderBy: 'price',
                facets: 'MERCHANT'
            }
        }
        else{
            params = {
                isoCurrencyCode : sessionStorage.isoCurrencyCode,
                keywords: getParameterByName('keywords'),
                categoryIds: getParameterByName('categoryIds'),
                percentOffMin: getParameterByName('percentOffMin'),
                resultLimit: getParameterByName('resultLimit'),
                resultOffset: getParameterByName('resultOffset'),
                orderBy: 'price',
                facets: 'CATEGORY'
            }
        }
        ShopManager.search(params, function( jsResponse ){
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
            
            var layout = getParameterByName('layout');
            var showCategory = false;
        
            if(layout == ''){
                layout = '2col';
            }
            search_basic_product_list = jsResponse.data.resultList;
            var temp = jsResponse.data.resultList;
            jsResponse.data.layout = layout;
            if(layout == '2col' || layout == '4col'){
                jsResponse.data.showlayout = true;
            } else{
                jsResponse.data.showlayout = false;
            }
            
            if(temp && temp.length > 0){
                drawPaginator(jsResponse);
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
        
                var output = Mustache.render(jQuery("#product_viewer_tpl").html(), jsResponse.data);
                jQuery("#product-viewer-content").html(output);
                
            }else{
                jQuery('.loading-container img').hide();
                jQuery('.loading-container .loading-container-text').text('No Products Found');
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}

function drawPaginator(jsResponse){
    var totalItems = jsResponse.data.paginationData.resultCount;
    itemsPerPage = jsResponse.data.paginationData.limit;
    pageCount = Math.ceil(totalItems/itemsPerPage);
    currentPage = (jsResponse.data.paginationData.offset/itemsPerPage) + 1;
    
    jQuery('.product-viewer-paginator .page-counter').text('Page ' + currentPage + ' of ' + pageCount);
    jQuery('.product-viewer-paginator').show();
}