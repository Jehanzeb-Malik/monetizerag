jQuery(document).ready(function(){
    
});

function loadCategoryHeaderWidget(){
    jQuery('#category-title').text(getCategoryName(global_CategoriesList, getParameterByName('id')));
}