try {
    jQuery('#product-viewer .styled-list').attr('placeholder', jQuery('#product-viewer .styled-list').attr('placeholder').trim());
} catch (e) {
    console.log(e.message);
}

jQuery(document).ready(function() {
    try {
        jQuery('#product-viewer-sort-dropdown').superfish({
            animation: {
                height: 'show'
            }
        });
    } catch (e) {
        console.log(e.message);
    }

    jQuery(document).on('click', '.view-layout-btn', function() {

        try {
            jQuery('#2column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_2x2_inactive.png')
            jQuery('#3column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_3x3_inactive.png')
            jQuery('#4column img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_4x4_inactive.png')

            jQuery('#' + jQuery(this).attr('id') + ' img').attr('src', monetizer_site_url + '/wp-content/plugins/widget-plugin/Style/images/product-viewer/btn_product_viewer_' + jQuery(this).attr('id').replace('column', '') + 'x' + jQuery(this).attr('id').replace('column', '') + '_active.png')
        }
        catch (e) {
            console.log(e.message);
        }

        var layout = jQuery(this).attr('id').substring(0, 4);
        var currentClass = jQuery.trim(jQuery('.grid-product').attr('class').replace('grid-product', ''));
        var newClass = 'product-' + layout;

        try {
            jQuery('#grid-container').hide(500, function() {
                if (layout == '4col') {
                    jQuery('.product-category').hide();
                    jQuery('#grid-container').css({
                        'marginLeft': '-5px'
                    });
                } else if (layout == '3col') {
                    jQuery('.product-category').show();
                    jQuery('#grid-container').css({
                        'marginLeft': '0px'
                    });
                } else if (layout == '2col') {
                    jQuery('.product-category').show();
                    jQuery('#grid-container').css({
                        'marginLeft': '-5px'
                    });
                }
                jQuery('.grid-product').removeClass(currentClass).addClass(newClass);
                jQuery('#grid-container').show(500);
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

function loadCategoryWidgets() {
    try {
        ShopManager.getCategoryWidget({
            isoCurrencyCode: sessionStorage.isoCurrencyCode,
            categoryId: getParameterByName('id'),
            productLimit: 24
        },
        function(jsResponse)
        {
            Commons.consoleLogger.debug(JSON.stringify(jsResponse));

            var layout = getParameterByName('layout');
            var showCategory = false;

            if (layout == '') {
                layout = '2col';
            }

            var temp = jsResponse.data;
            jsResponse.layout = layout;
            if (layout == '2col' || layout == '4col') {
                jsResponse.showlayout = true;
            } else {
                jsResponse.showlayout = false;
            }

            var per_off;
            console.log(jsResponse);

            global_CategoriesList = [{"id": 1, "name": "Fashion", "children": [{"id": 33554432, "parentId": 0, "name": "Clothing", "disabled": false, "children": [{"id": 33816576, "parentId": 33554432, "name": "Man", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 34078720, "parentId": 33554432, "name": "Woman", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 34865152, "parentId": 33554432, "name": "Accessories", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 50331648, "parentId": 0, "name": "Bags & Luggage", "disabled": false, "children": [{"id": 50593792, "parentId": 50331648, "name": "Bags", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 51118080, "parentId": 50331648, "name": "Luggage", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 184549376, "parentId": 0, "name": "Jewellery", "disabled": false, "children": [{"id": 184811520, "parentId": 184549376, "name": "Jewels", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 185073664, "parentId": 184549376, "name": "Watches", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 218103808, "parentId": 0, "name": "Shoes", "disabled": false, "children": [{"id": 218365952, "parentId": 218103808, "name": "Man", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 218628096, "parentId": 218103808, "name": "Woman", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 218890240, "parentId": 218103808, "name": "Kid", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 234881024, "parentId": 0, "name": "Special Occasion", "disabled": false, "children": [{"id": 235667456, "parentId": 234881024, "name": "Accessories", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}], "validForSearch": false}, {"id": 2, "name": "Beauty & Health", "children": [{"id": 83886080, "parentId": 0, "name": "Beauty", "disabled": false, "children": [{"id": 84148224, "parentId": 83886080, "name": "Fragrances", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 84410368, "parentId": 83886080, "name": "Cosmetics", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 84672512, "parentId": 83886080, "name": "Wellness", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 84934656, "parentId": 83886080, "name": "Accessories", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 285212672, "parentId": 0, "name": "Vision Care", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "validForSearch": false}, {"id": 3, "name": "Electronics", "children": [{"id": 100925440, "parentId": 100663296, "name": "Computer & Software", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 101711872, "parentId": 100663296, "name": "Audio & Video", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 101974016, "parentId": 100663296, "name": "Photography", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "validForSearch": false}, {"id": 4, "name": "Home & Garden", "children": [{"id": 117440512, "parentId": 0, "name": "Food & Drinks", "disabled": false, "children": [{"id": 117964800, "parentId": 117440512, "name": "Confectionery", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 134217728, "parentId": 0, "name": "Garden", "disabled": false, "children": [{"id": 134479872, "parentId": 134217728, "name": "Flowers & Plants", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 134742016, "parentId": 134217728, "name": "Furniture", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 135004160, "parentId": 134217728, "name": "Accessories", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}, {"id": 167772160, "parentId": 0, "name": "Home", "disabled": false, "children": [{"id": 168034304, "parentId": 167772160, "name": "Furniture", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 168296448, "parentId": 167772160, "name": "Textiles", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 168558592, "parentId": 167772160, "name": "Appliances", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}], "validForSearch": false}, {"id": 5, "name": "Free Time", "children": [{"id": 67108864, "parentId": 0, "name": "Books & Magazines", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 251658240, "parentId": 0, "name": "Sports", "disabled": false, "children": [{"id": 251920384, "parentId": 251658240, "name": "Sportware", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 252444672, "parentId": 251658240, "name": "Equipment", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}], "validForSearch": false}, {"id": 6, "name": "Toys & Gifts", "children": [{"id": 301989888, "parentId": 0, "name": "Baby & Kids", "disabled": false, "children": [{"id": 302514176, "parentId": 301989888, "name": "Apparel", "disabled": false, "children": [], "merchants": null, "validForSearch": true}, {"id": 302776320, "parentId": 301989888, "name": "Toys", "disabled": false, "children": [], "merchants": null, "validForSearch": true}], "merchants": null, "validForSearch": true}], "validForSearch": false}];



            if (temp && temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                    temp[i].currencyType = getCurrencyCode(temp[i].currency);
                    temp[i].layout = layout;
                    var discount = temp[i].retailPrice - temp[i].salePrice;

                    if (temp[i].retailPrice === 0) {
                        per_off = 0;
                    }
                    else {
                        per_off = (discount / temp[i].retailPrice) * 100;
                    }

                    //console.log(per_off + "%");
                    temp[i].classes = "";
                    if (per_off > 60) {
                        temp[i].classes = temp[i].classes + " 60%_off";
                    }
                    if (per_off > 50 && per_off < 60) {
                        temp[i].classes = temp[i].classes + " 50%_off";
                    }
                    if (per_off > 40 && per_off < 50) {
                        temp[i].classes = temp[i].classes + " 40%_off";
                    }
                    if (per_off > 30 && per_off < 40) {
                        temp[i].classes = temp[i].classes + " 30%_off";
                    }
                    if (per_off < 30) {
                        temp[i].classes = temp[i].classes + " <30%_off";
                    }



                    temp[i].categoryName = getCategoryName(global_CategoriesList, temp[i].categoryId);
                   // console.log(Category_name);

                    
                    
                    temp[i].index = i + 1;
                    if (layout != '4col') {
                        temp[i].showCategory = true;
                    } else {
                        temp[i].showCategory = false;
                    }
                }

                var output = Mustache.render(jQuery("#product_viewer_tpl").html(), jsResponse);
                jQuery("#product-viewer-content").html(output);

            } else {
                jQuery('.loading-container img').hide();
                jQuery('.loading-container .loading-container-text').text('No Products Found');
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}