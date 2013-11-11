jQuery(document).ready(function() {
    try {
        jQuery('#search-button-header-all').on('click', function(){
            var val = jQuery('#search-input-list2').val();
            if(val != 'Search all'){
                var gridLayout = getParameterByName('layout');
                var gridSort = getParameterByName('sort');
                if(jQuery('.selected-layout').length == 1){
                    gridLayout = jQuery('.selected-layout').parent().attr('id').substring(0,4);
                }
                else if(gridLayout == ''){
                    gridLayout = '2col';
                }
                if(gridSort == ''){
                    gridSort = '1';
                }
                window.location.href = monetizer_site_url + '/search/?keywords=' + val + '&categoryIds=&percentOffMin=&resultLimit=24&resultOffset=0&layout=' + gridLayout + '&sort=' + gridSort;
            }
        });
        jQuery('#search-button-header-product-brand').on('click', function(){
            var val = jQuery('#search-input-list3').val();
            if(val != 'Search a product or brand'){
                var gridLayout = getParameterByName('layout');
                var gridSort = getParameterByName('sort');
                if(jQuery('.selected-layout').length == 1){
                    gridLayout = jQuery('.selected-layout').parent().attr('id').substring(0,4);
                }
                else if(gridLayout == ''){
                    gridLayout = '2col';
                }
                if(gridSort == ''){
                    gridSort = '1';
                }
                window.location.href = monetizer_site_url + '/search/?keywords=' + val + '&categoryIds=&percentOffMin=&resultLimit=24&resultOffset=0&layout=' + gridLayout + '&sort=' + gridSort;
            }
        });
        jQuery('#page-not-found-search-btn').on('click', function(){
            //            console.log('Search All');
            var val = jQuery('#not-found-search-input').val();
            if(val != 'Search for a product or brand'){
                window.location.href = monetizer_site_url + '/search/?keywords=' + val + '&categoryIds=&percentOffMin=&resultLimit=24&resultOffset=0&layout=3col&sort=1';
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});

function loadHomeWidgets(){
    try{
        if(getParameterByName('referrer') != ''){
            jQuery('#drop-down-list1').html(createMarkup('', global_CategoriesList, true, 0));
            var example = jQuery('#departments-dropdown').superfish({
                width: '246px'
            });
        } else {
            jQuery('#top-bar3 ul').replaceWith(createMarkupNavBar('', global_CategoriesList, true, 0));
            jQuery('#nav-bar-header').superfish({
                width: '784px'
            });
        }
    
    } catch (e) {
        console.log(e.message);
    }
}

function createMarkup(markup, data, flag, level){
    try {
        if(flag){
            markup += '<ul id="departments-dropdown" class="sf-menu">';
            markup += '<li class="current"><input class="styled-list" readonly placeholder="Shop by Departments" style="background: url(\'wp-content/themes/monetizer_theme/images/button-1.png\') no-repeat 100%; padding: 2px 10px;"></input>';
            markup += '<ul>';
        }
        else{
            markup += '<ul>';
        }
    
        for(var x in data){
            if(flag){
                markup += '<li class="current"><a tabindex="0">'+data[x].name+'</a>';
            }
            else{
                if(level == 1){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/category/?id=' + data[x].id + '&layout=3col&sort=1">'+data[x].name+'</a>';
                }
                else if(level == 2){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/search/?keywords=&categoryIds=' + data[x].id + '&percentOffMin=&resultLimit=24&resultOffset=0&layout=3col&sort=1">'+data[x].name+'</a>';
                }
            }

            if(data[x].children && data[x].children.length > 0){
                level++;
                markup += createMarkup('', data[x].children, false, level);
                level--;
            }
            markup += '</li>';
        }
        if(flag){
            markup += '</ul>';
            markup += '</li>';
            markup += '</ul>';
        }
        else{
            markup += '</ul>';
        }
        return markup;
    } catch (e) {
        console.log(e.message);
    }
}

function createMarkupSearch(markup, data, flag, level){
    try {
        if(flag){
            markup += '<ul id="search-dropdown" class="sf-menu">';
            markup += '<li class="current"><input class="styled-list" readonly placeholder="Search All" style="background: url(\'wp-content/themes/monetizer_theme/images/button-1.png\') no-repeat 100%; padding: 2px 10px;"></input>';
            markup += '<ul>';
        }
        else{
            markup += '<ul>';
        }
    
        for(var x in data){
            if(flag){
                markup += '<li class="current"><a tabindex="0">'+data[x].name+'</a>';
            }
            else{
                if(level == 1){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/category/?id=' + data[x].id + '&layout=3col&sort=1">'+data[x].name+'</a>';
                }
                else if(level == 2){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/search/?keywords=&categoryIds=' + data[x].id + '&percentOffMin=&resultLimit=24&resultOffset=0&layout=3col&sort=1">'+data[x].name+'</a>';
                }
            }

            if(data[x].children && data[x].children.length > 0){
                level++;
                markup += createMarkup('', data[x].children, false, level);
                level--;
            }
            markup += '</li>';
        }
        if(flag){
            markup += '</ul>';
            markup += '</li>';
            markup += '</ul>';
        }
        else{
            markup += '</ul>';
        }
        return markup;
    } catch (e) {
        console.log(e.message);
    }
}

function loadPageNotFoundSearchWidget(){
}

var wait = function( execute )
{
    window.setTimeout( execute, 1000 );
}

function createMarkupNavBar(markup, data, flag, level){
    try {
        if(flag){
            markup += '<ul id="nav-bar-header" class="sf-menu">';
        }
        else{
            markup += '<ul>';
        }
    
        for(var x in data){
            if(flag){
                markup += '<li class="current nav-bar-first-list"><span class="nav-bar-first-level">'+data[x].name.toUpperCase()+'</span>';
            }
            else{
                if(level == 1){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/category/?id=' + data[x].id + '&layout=3col&sort=1">'+data[x].name+'</a>';
                }
                else if(level == 2){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/search/?keywords=&categoryIds=' + data[x].id + '&percentOffMin=&resultLimit=24&resultOffset=0&layout=3col&sort=1">'+data[x].name+'</a>';
                }
            }

            if(data[x].children && data[x].children.length > 0){
                level++;
                markup += createMarkup('', data[x].children, false, level);
                level--;
            }
            markup += '</li>';
        }
        
        markup += '</ul>';
        
        return markup;
    } catch (e) {
        console.log(e.message);
    }
}