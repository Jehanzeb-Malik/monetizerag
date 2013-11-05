
jQuery(document).ready(function() {

    $("#popupqq").click(function() {
        $(".overlay, .popup").fadeToggle(800);
    });

    $("#popup_close").click(function() {
        $(".overlay, .popup").fadeToggle();
    });

});



function loadProducts() {
    ShopManager.getCategoryWidget({
        isoCurrencyCode: 'GBP',
        widgetType: 'SEARCH',
        id: 9120936,
        categoryId: 33554432


    },
    function(jsResponse)
    {
        Commons.consoleLogger.debug(JSON.stringify(jsResponse));
        console.log(jsResponse);


        var output = Mustache.render(jQuery("#product_popup").html(), jsResponse);
        jQuery(".popup").html(output);
    });
}