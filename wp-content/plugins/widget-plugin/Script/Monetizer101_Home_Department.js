jQuery(document).ready(function(){
    
    });

function loadHomeDepartmentWidget(){
    var output = '';
    var count = 0;
    
    try{
        for(var x = 0 ; x < global_CategoriesList.length ; x++){
            for(var y = 0 ; y<global_CategoriesList[x]['children'].length ; y++){
                count++;
                global_CategoriesList[x]['children'][y].count = count;
                output += Mustache.render(jQuery("#home_department_widget_tpl").html(), global_CategoriesList[x]['children'][y]);
            }
        }
        jQuery("#departments-list-widget-items").html(output);
    } catch (e) {
        console.log(e.message);
    }
}