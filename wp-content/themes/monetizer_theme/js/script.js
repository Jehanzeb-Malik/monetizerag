jQuery(document).ready(function() {
    try {
    } catch (e) {
        console.log(e.message);
    }
});

function loadHomeWidgets(){
    try{
        
        ShopManager.getCategories({
            isoCurrencyCode: sessionStorage.isoCurrencyCode
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
            
            global_CategoriesList = jsResponse.data;
            loadHomeDepartmentWidget();
            
//            if(getParameterByName('referrer') != ''){
                jQuery('#drop-down-list1').html(createMarkup('', jsResponse.data, true, 0));
                var example = jQuery('#departments-dropdown').superfish({
                    width: '246px'
                });
//            }
        });
    
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
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/category/?id=' + data[x].id + '&layout=2col&sort=1">'+data[x].name+'</a>';
                }
                else if(level == 2){
                    markup += '<li class="current"><a href="' + monetizer_site_url + '/sub-category/?id=' + data[x].id + '&layout=2col&sort=1">'+data[x].name+'</a>';
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

var wait = function( execute )
{
    window.setTimeout( execute, 1000 );
}