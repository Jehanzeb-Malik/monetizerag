var ShopModel = {
	localProducts: null,
	putAllLocally: function( listOfProducts )
	{
		if( ! _.isArray(listOfProducts) )
			return;
		
		if( this.localProducts == null )
			this.localProducts = new Backbone.Collection( listOfProducts );
		
		else
			for( var i = 0; i < listOfProducts.length; i++ )
			{
				if( this.localProducts.get(listOfProducts[i].id) == null )
				{
					this.localProducts.push(listOfProducts[i]);
				}
			}

	}
};

/** This is the Manager for remote calls to the shop * */
var ShopManager = {
		
	endpoint: Commons.connection.endpoint,
	searchUrl: null,
	widgetUrl: null,
	productUrl: null,
	merchantUrl: null,
	categoryUrl: null,
	
	categoryTreeCache: null,
	subCategoriesCache: null,
	
	init : function( params )
	{
		this.categoryUrl = this.endpoint + '/shop/' + params.key + '/category/selection/list';
		this.merchantUrl = this.endpoint + '/shop/' + params.key + '/merchant/list';
		this.searchUrl   = this.endpoint + '/shop/' + params.key + '/product/search';
		this.widgetUrl   = this.endpoint + '/shop/' + params.key + '/widget';
	},
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String} (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return the list of all available merchants for the given currency.
	 * Each merchant has the following data:
	 * {
	 *   id:      {Integer} unique identifier for the merchant.
	 *   url:     {String} the URL of the merchant website (optional).
	 *   logoUrl: {String} the URL of the merchant logo immage (optional).
	 *   
	 *   currency: {String} uninteresting (optional).
	 *   category: {Category} uninteresting (optional).
	 * }
	 */
	getMerchants : function( params, callback )
	{
		
		var serviceResponse = {	type : 'xhr' };
		serviceResponse.params = params;
		
		jQuery.ajax({
			
			url:      this.merchantUrl,
			type:     "GET",
			data:     params,
			dataType: "json",
			
			success: function( json, textStatus, jqXHR )
			{
				serviceResponse.event = 'shop:getMerchants:success';
				Commons.onAjaxSuccess( serviceResponse, json, textStatus, jqXHR );
				callback( serviceResponse );
			},
			
			error: function( jqXHR, textStatus, errorThrown )
			{
				serviceResponse.event = 'shop:getMerchants:error';
				Commons.onAjaxError( serviceResponse, textStatus, jqXHR );
				callback( serviceResponse );
			}
			
		});

	},
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String} (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return a list of category trees.
	 * A node in the category tree may has the form:
	 * {
	 *   id:       {Integer} unique identifier for the category.
	 *   parentId: {Integer} the ID of the parent category (optional).
	 *   name:     {String}
	 *   children: [Category] list of children node in the category tree (may be empty).
	 *   validForSearch: {Boolean} tells if the ID of the current category can be used
	 *                             as a filter in the product search.
	 *   
	 *   disabled: {Boolean} uninteresting (optional).
	 *   merchants: [Merchant] uninteresting (optional).
	 * }
	 */
	getCategories : function( params, callback )
	{
		
		var serviceResponse = {	type : 'xhr' };
		serviceResponse.event = 'shop:getCategories';
		serviceResponse.params = params;
		
		if( ShopManager.categoryTreeCache == null )
		{
			this._loadCategoryTree( params, callback, serviceResponse );			
		}
		else
		{
			Commons.onAjaxSuccess( serviceResponse, null, null, null );
			callback( serviceResponse );
		}
		
	},
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'keywords': {String} space separated keywords, optional.
     *    'merchantIds': [Integer] list of merchant IDs, optional.
     *    'categoryIds': [Integer] list of category IDs, optional.
     *    'priceMin': {Double} floating point number, optional.
     *    'priceMax': {Double} floating point number, optional.
     *    'percentOffMin': {Double} floating point number (between 0 and 100), optional.
     *    'percentOffMax': {Double} floating point number (between 0 and 100), optional.
     *    'orderBy': {String} (accepted values: 'PRICE','PERCENT_OFF'), optional.
     *    'resultLimit': {Integer} value between 0 and 100, optional.
     *    'resultOffset: {Integer} value greater or equal than 0, optional.
     *    'facets': [String] list of values in: ['CATEGORY','MERCHANT','DISCOUNT'], optional.
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return an object representing the paginated result of the search.
	 * The result pagination object is in the form:
	 * {
	 *   resultList: [Product] list of products, see the 'getCategoryWidget' for the description
	 *                         of the Product object.
     *   paginationData:
	 *   {
	 *     limit: {Integer} page size.
	 *     offset: {Integer} the offset regard to the whole search result.
	 *     resultCount: {Integer} all the results of the search.
	 *   }
	 *   
	 *   facets: this field is populated only if the requested 'resultOffset' is 0 and
	 *           the requested 'facets' list is not empty.
	 *           
	 *           A Facet is a map that returns for each element the number of products
	 *           matching such element in the performed search.
	 *           
	 *   		If enabled, this field contains a map that relates each requested faced
	 *          (by name) with the related Faced object.
	 *          
	 *    For example, using the request parameter 'faced: ['CATEGORY'] the result may be:
	 *    {
	 *      ...
	 *      "facets": {
	 *        "category":{
	 *          "34078720":  707,
	 *          "33816576": 5949,
	 *          "34865152":  118,
	 *          "33554432":  899
	 *        }
	 *      },
	 *      ...
	 *    }
	 *    In this case the facet "category" relates each category_id with the count of
	 *    products that belongs to the category with such ID.  
	 */
	search: function( params, callback )
	{
	
		var serviceResponse = { type : 'xhr' };
		serviceResponse.params = params;
		
		jQuery.ajax(
		{
			url: this.searchUrl,
			type: "GET",
			data: params,
			dataType: "json",
			success: function( json, textStatus, jqXHR )
			{
				serviceResponse.event = 'shop:search:success';
				Commons.onAjaxSuccess( serviceResponse, json, textStatus, jqXHR );
				ShopModel.putAllLocally( json.resultList );
				callback( serviceResponse );
			},
			error: function( jqXHR, textStatus, errorThrown )
			{
				serviceResponse.event = 'shop:search:error';
				Commons.onAjaxError( serviceResponse, textStatus, jqXHR );
				callback( serviceResponse );
			}
		});

	},
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'categoryId':      {Integer} (the ID of the category related to the widget), mandatory.
	 *    'productLimit':    {Integer} limit of product to be returned (value between 0 and 100), optional (default 100).
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return a list of the products contained into the widget.
	 * A product is in the form:
	 * {
	 *   id: {Integer} unique identifier for the product.
     *   categoryId {Integer} ID of the related category.
     *   merchantId {Integer} ID of the related merchant.
     *   name: {String}.
     *   description: {String}.
     *   deepLink: {URL} the URL to redirect to during buy operation.
     *   imageURL: {URL} the URL of the big image.
     *   thumbnailURL: {URL} the URL of the thumbnail image.
     *   currency: {String} one between 'USD' and 'GBP'.
     *   salePrice: {Double} the actual price of the product.
     *   retailPrice: {Double} the retail price of the product.
     *   expiry: {Date} the expiration date of the offer.
	 * }
	 */
	getCategoryWidget: function( params, callback )
	{
		var serviceResponse = { type : 'xhr' };
		serviceResponse.params = params;
		
		jQuery.ajax({
		
			url: this.widgetUrl + '/category',
			type: "GET",
			data: params,
			dataType: "json",
			
			success: function( json, textStatus, jqXHR )
			{
			
				serviceResponse.event = 'shop:getCategoryWidget:success';
				Commons.onAjaxSuccess( serviceResponse, json, textStatus, jqXHR );
				ShopModel.putAllLocally( json );
				callback( serviceResponse );

			},
			
			error: function( jqXHR, textStatus, errorThrown )
			{
			
				serviceResponse.event = 'shop:getCategoryWidget:error';
				Commons.onAjaxError( serviceResponse, textStatus, jqXHR );
				callback( serviceResponse );
			}
			
		});
	},
	
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return the most popular of the category tree roots returned by the getCategories() function.
	 */
	getPopularRootCategory:  function( params, callback )
	{
		
		var localResponse = { event: 'shop:getPopularRootCategory', params: params };
		localResponse.params = params;
		
		if( ShopManager.categoryTreeCache == null )
		{
			localResponse.type = 'xhr';
			this._loadCategoryTree( params, function( serviceResponse )
			{
				localResponse.data = ShopManager._getRandomCategory( serviceResponse.data );
				callback( localResponse );
			}, localResponse );			
		}
		else
		{
			localResponse.type = 'local';
			localResponse.event = localResponse.event + ':success'; 
			Commons.onAjaxSuccess( localResponse, null, null, null );
			
			localResponse.data = ShopManager._getRandomCategory( ShopManager.categoryTreeCache );
			callback( localResponse );
		}
		
	},
	
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'limit':           {Integer} limit of sub-categories to be returned, optional (default unbounded).
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return the most popular sub-categories.
	 */
	getPopularSubCategories:  function( params, callback )
	{
		
		var localResponse = { event: 'shop:getPopularSubCategories', params: params };
		if( ShopManager.categoryTreeCache == null )
		{
			localResponse.type = 'xhr';
			this._loadCategoryTree( params, function( serviceResponse )
			{
				localResponse.data = ShopManager._getRandomSubCategories( serviceResponse.data );
				callback( localResponse );
			}, localResponse );			
		}
		else
		{
			localResponse.type = 'local';
			localResponse.event = localResponse.event + ':success'; 
			Commons.onAjaxSuccess( localResponse, null, null, null );
			
			localResponse.data = ShopManager._getRandomSubCategories( ShopManager.categoryTreeCache );
			callback( localResponse );
		}
		
	},
	
	
	/*
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'limit':           {Integer} limit of products to be returned, optional (default unbounded).
	 *  }
	 * @param callback the function to be called on service response.
	 * 
	 * @return the most popular products.
	 */
	getPopularProducts:  function( params, callback )
	{
				
		this.getPopularSubCategories( params, function( subCategoryResponse )
		{
			
			var category = ShopManager._getRandomCategory( subCategoryResponse.data );
			if( category == null ) return;
			
			params.categoryId = category.id;
			ShopManager.getCategoryWidget( params, function( productWidgetResponse )
			{
				
				var localResponse = { event: 'shop:getPopularProducts:success', params: params, type: 'local' };
				Commons.onAjaxSuccess( localResponse, null, null, null );
				
				localResponse.data = productWidgetResponse.data;
				callback( localResponse );
			});
			
		} );
		
	},
	
	
	/* ***************** */
	/*  PRIVATE METHODS  */
	/* ***************** */
	
	/* *************************************************** */
	/*  The following methods are not intended to be used  */
	/*  directly, are for internal use only.               */
	/* *************************************************** */
	

	_loadCategoryTree: function( params, callback, serviceResponse )
	{
	
		jQuery.ajax({
			
			url:      this.categoryUrl,
			type:     "GET",
			data:     params,
			dataType: "json",
			
			success: function( json, textStatus, jqXHR )
			{
				serviceResponse.event = serviceResponse.event + ':success';
				Commons.onAjaxSuccess( serviceResponse, json, textStatus, jqXHR );
				ShopManager.categoryTreeCache = serviceResponse.data;
				callback( serviceResponse );
			},
			
			error: function( jqXHR, textStatus, errorThrown )
			{
				serviceResponse.event = serviceResponse.event + ':error';
				Commons.onAjaxError( serviceResponse, textStatus, jqXHR );
				ShopManager.categoryTreeCache = null;
				callback( serviceResponse );
			}
		
		});
	
	},

	_getRandomCategory: function( categories )
	{
		
		if( categories == null || categories.length == 0 )
			return null;
		
		var index = Math.floor( Math.random() * categories.length );
		return categories[index];
		
	},

	_getRandomSubCategories: function( categories, limit )
	{
						
		if( this.subCategoriesCache == null )
		{
		
			var subcategories = new Array();
			if( categories != null )
			{
			
				var index = 0;
				for( var parent in categories )
				{
					var children = categories[parent].children;
					for( var child in children )
					{
						subcategories[index] = children[child];
						index = index + 1;
					}
				}
				
			}
			
			this.subCategoriesCache = this._shuffle( subcategories );
			
		}
		
		return this._subArray( this.subCategoriesCache, limit );
		
	},

	_shuffle: function( array )
	{
		
	    for( var i = array.length - 1; i > 0; i-- )
	    {
	    	var j = Math.floor( Math.random() * (i + 1) );
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;	        
	    }
	    
	    return array;
	    
	},

	_subArray: function( array, limit )
	{
		
		if( array == null ) return null;
		
		if( limit == null || array.length >= limit ) return array;
		
		var subArray = new Array( limit );
		for( var index = 0; index < limit; index++ )
			subArray[index] = array[index];
		
		return subArray;
		
	}
	
};