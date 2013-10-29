jQuery(document).on('click', '.get_discount_click', function(e) {
    e.preventDefault();

    alert("clicked");
    //PRINT ON THE DIV
//            var divid = document.getElementById('print_title').innerHTML;
//            document.getElementById('print_title').innerHTML = jQuery(this).text();
//            console.log(divid);
});


function onApiLoad()
{
    //  alert("working") ;

    var url = document.URL;
    // getting value from url
    console.log("url: " + url);
    url = decodeURIComponent(url);
    url = url.split("?");
    // url[0], url[1] = parameters
    console.log(url);
    var params = url[1].split("&");
    console.log(params);
    var dept = params[1].split("=");
    console.log(dept[1]);
    var catName = dept[1];


    ShopManager.getWidget({
        widgetType: 'SEARCH',
        categoryName: catName, //name of product category
        isoCurrencyCode: sessionStorage.isoCurrencyCode
    }, function(jsResponse) {

        //  console.log(jsResponse);
        //  console.log(jsResponse.data.serviceOutcome.response.products.productList[0].name);

        // Count of Products
        var product_count = jsResponse.data.serviceOutcome.response.products.productList.length;
           console.log(product_count);

        // Fixing length of product name
        for (var i = 0; i < product_count; i++) {
            var title = jsResponse.data.serviceOutcome.response.products.productList[i].name;
            title = title.substring(0, 40) + "...";
            //      console.log(title);
            jsResponse.data.serviceOutcome.response.products.productList[i].name = title;
        }

        // fixing the price saving value
        for (var i = 0; i < product_count; i++) {
            var save_Amount = jsResponse.data.serviceOutcome.response.products.productList[i].saveAmount;
            save_Amount = save_Amount.toPrecision(4);
            //save_Amount = save_Amount.toPrecision(2) + ".00";
            // console.log(save_Amount);
            jsResponse.data.serviceOutcome.response.products.productList[i].saveAmount = save_Amount;
        }

        //generating random products
        if (product_count > 6) {
            var limit = 6,
                    amount = 6,
                    lower_bound = 1,
                    upper_bound = product_count,
                    unique_random_numbers = [];

            if (amount > limit)
                limit = amount; //Infinite loop if you want more unique
            //Natural numbers than existemt in a
            // given range
            while (unique_random_numbers.length < limit) {
                var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
                if (unique_random_numbers.indexOf(random_number) === -1) {
                    // Yay! new random number
                    unique_random_numbers.push(random_number);
                }
            }
            console.log(unique_random_numbers);
            

            for (var i = 0; i < 6; i++) {
                var unique_index = unique_random_numbers[i];
                jsResponse.data.serviceOutcome.response.products.productList[unique_index].show = true;
            }
            
//            for (var i = 0; i < 20; i++) {
//                if (jsResponse.data.serviceOutcome.response.products.productList[i].show === true){
//                    console.log(jsResponse.data.serviceOutcome.response.products.productList[i].name);
//                }
//                else
//                    console.log('not true')
//            }
            
        }
        
        var output = Mustache.render(jQuery("#shop_products").html(), jsResponse.data);

        jQuery("#Product_widget").html(output);  // Displaying on the page

    });

}