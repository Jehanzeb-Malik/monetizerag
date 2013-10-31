function onReady()
{
		  
    var wait = function( execute )
    {
        window.setTimeout( execute, 1000 );
    }

    // Example: How to get all the merchants for a given currency.
    ShopManager.getMerchants({
        isoCurrencyCode: 'GBP'
    },
    function( jsResponse )
    {
        Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
    });

    // Example: How to get the category tree for a given currency.
    ShopManager.getCategories({
        isoCurrencyCode: 'GBP'
    },
    function( jsResponse )
    {
        Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
    });

    // Example: How to get the homepage highlighted popular root category for a given currency.
    wait( function()
    {
        ShopManager.getPopularRootCategory({
            isoCurrencyCode: 'GBP'
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
        });
    });

    // Example: How to get the homepage highlighted popular sub-categories for a given currency.
    wait( function()
    {
	    	    	
        ShopManager.getPopularSubCategories({
            isoCurrencyCode: 'GBP',
            limit: 5
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
        });
    });

    // Example: How to get the product widget related to the category with ID 33554432.
    ShopManager.getCategoryWidget({
        isoCurrencyCode : 'GBP',
        categoryId: 33554432,
        productLimit: 24
    },
    function( jsResponse )
    {
        Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
    });
				
    /*
	     * Example: How to search Reebok T-Shirts with at least the 30% off ordred by price.
	     *          This search also returns the products count for each matching category (facet).
	     */
    ShopManager.search({
        isoCurrencyCode : 'GBP',
        keywords: 'Reebok T-Shirt',
        categoryIds: 33554432,
        percentOffMin: 30,
        resultLimit: 5,
        resultOffset: 0,
        orderBy: 'price',
        facets: 'CATEGORY'
    },
    function( jsResponse )
    {
        Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
    });

    /*
	     * Example: How to search Reebok T-Shirts with at least the 30% off ordred by price.
	     *          In this case the resultOffset is greater than 0 therefore the returned
	     *          'facets' field is empty even if required.
	     */
    ShopManager.search({
        isoCurrencyCode : 'GBP',
        keywords: 'Reebok T-Shirt',
        categoryIds: 33554432,
        percentOffMin: 30,
        resultLimit: 5,
        resultOffset: 10,
        orderBy: 'price',
        facets: 'CATEGORY'
    },
    function( jsResponse )
    {
        Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
    });
		
    // Example: How to get the homepage highlighted popular products for a given currency.
    wait( function()
    {
                    
        ShopManager.getPopularProducts({
            isoCurrencyCode: 'GBP',
            limit: 25
        },
        function( jsResponse )
        {
            Commons.consoleLogger.debug( JSON.stringify(jsResponse) );
        });
    });

}