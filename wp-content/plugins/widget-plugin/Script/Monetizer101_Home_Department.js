jQuery(document).ready(function(){
    
    });

function loadHomeDepartmentWidget(){
    var output = '';
    var count = 0;
    
    try{
        ShopManager.getCategories({
            isoCurrencyCode: sessionStorage.isoCurrencyCode
        },
        function( jsResponse )
        {
            var temp = jsResponse.data;
//            console.log('jsResponse');
//            console.log(jsResponse);
            
            if(temp && temp.length > 0)
            {    
                Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
                for(var x = 0 ; x < temp.length ; x++){
                    for(var y = 0 ; y<temp[x]['children'].length ; y++){
                        count++;
                        temp[x]['children'][y].count = count;
                        output += Mustache.render(jQuery("#home_department_widget_tpl").html(), temp[x]['children'][y]);
                    }
                }
                jQuery("#departments-list-widget-items").html(output);
            } else{
                jQuery('#departments-list-widget-items .loading-container img').hide();
                jQuery('#departments-list-widget-items .loading-container .loading-container-text').text('Categories Not Found');
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}