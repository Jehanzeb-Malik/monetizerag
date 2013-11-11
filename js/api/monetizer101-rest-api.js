/** This is the Manager for remote calls to the shop **/
var ShopManager = {
		
	endpoint: Commons.connection.endpoint,
	searchUrl: null,
	widgetUrl: null,
	productUrl: null,
	merchantUrl: null,
	categoryUrl: null,
	
	merchantsCache: null,
	categoryTreeCache: null,
	subCategoriesCache: null,
	
	init : function( params )
	{
		this.categoryUrl = this.endpoint + '/shop/' + params.key + '/category/selection/list';
		this.merchantUrl = this.endpoint + '/shop/' + params.key + '/merchant/list';
		this.searchUrl   = this.endpoint + '/shop/' + params.key + '/product/search';
		this.widgetUrl   = this.endpoint + '/shop/' + params.key + '/widget';
		this.shopUrl     = this.endpoint + '/shop/';
	},
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'shopCode':   {String}, mandatory.
	 *  }
	 *  
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
	 * 
	 * NOTE: This service is intended to be called server side only (from server to server).
	 * 
	 * @return the shop account related to the given code.
	 * The shop account has the form: 
	 * {
	 *   id:           {Integer} unique identifier for the shop.
	 *   name:         {String}  the shop name to display.
	 *   websiteURL:   {String}  the related website URL (optional).
	 *   logoImageURL: {String} the website logo URL (optional).
	 *   shopCode:     {Integer} unique identification code for the shop.
	 * }
	 */
	getShop: function( params, onSuccess, onFailure )
	{
		
		var call = {
				endpoint: this.shopUrl,
				event: 'shop:getShop',
				params: params
		};
		
		RestService.perform( call, onSuccess, onFailure );
		
	},
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String} (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
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
	getMerchants : function( params, onSuccess, onFailure )
	{
		
		var call = {
			endpoint: this.merchantUrl,
			event: 'shop:getMerchants',
			params: params
		};
				
		RestService.perform( call,
					
		function( serviceResponse )
		{
			ShopManager.merchantsCache = ShopManager._buildMerchantMap( serviceResponse.data );
			_safelyCall( onSuccess, serviceResponse );
		},
					
		function( serviceResponse )
		{
			ShopManager.merchantsCache = null;
			_safelyCall( onFailure, serviceResponse );
		});
		
	},
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String} (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
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
	getCategories : function( params, onSuccess, onFailure )
	{
		
		if( _exists(ShopManager.categoryTreeCache) )
		{
			
			var serviceResponse = {
				type : 'local',
				params: params,
				event: 'shop:getCategories'
			};
			
			serviceResponse.data = ShopManager.categoryTreeCache;
			Commons.onAjaxSuccess( serviceResponse, null, null );
			_safelyCall( onSuccess, serviceResponse );
			
		}
		else
		{
			this._loadCategoryTree( params, onSuccess, onFailure );			
		}
		
	},
	
	/**
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
	 * 
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
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
	search: function( params, onSuccess, onFailure )
	{
	
		var call = {
			endpoint: this.searchUrl,
			event: 'shop:search',
			params: params
		};
		
		RestService.perform( call,
				
		function( serviceResponse )
		{
			if( _exists(serviceResponse.data) && _exists(serviceResponse.data.resultList) )
			{
				ShopManager._fillMerchantInfo( serviceResponse.data.resultList, params.isoCurrencyCode );
			}
			_safelyCall( onSuccess, serviceResponse );
		},

		onFailure );		
		
	},
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'categoryId':      {Integer} (the ID of the category related to the widget), mandatory.
	 *    'productLimit':    {Integer} limit of product to be returned (value between 0 and 100), optional (default 100).
	 *  }
	 * 
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
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
     *   merchantLogoURL: {URL} the URL of the logo image of the merchant.   
     *   currency: {String} one between 'USD' and 'GBP'.
     *   salePrice: {Double} the actual price of the product.
     *   retailPrice: {Double} the retail price of the product.
     *   expiry: {Date} the expiration date of the offer.
	 * }
	 */
	getCategoryWidget: function( params, onSuccess, onFailure )
	{
		
		var call = {
				endpoint: this.widgetUrl + '/category',
				event: 'shop:getCategoryWidget',
				params: params
		};
			
		RestService.perform( call,
				
		function( serviceResponse )
		{
			ShopManager._decorateProducts( serviceResponse.data, params.isoCurrencyCode );
			_safelyCall( onSuccess, serviceResponse );
		},

		onFailure );
		
	},
	
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *  }
	 *  
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
	 * 
	 * @return the most popular of the category tree roots returned by the getCategories() function.
	 */
	getPopularRootCategory: function( params, onSuccess, onFailure )
	{

		var localResponse = {
			event: 'shop:getPopularRootCategory',
			params: params,
			type: 'local'
		};
		
		if( _exists(ShopManager.categoryTreeCache) )
		{
			localResponse.data = ShopManager._getRandomCategory( ShopManager.categoryTreeCache );
			Commons.onAjaxSuccess( localResponse, null, null );
			_safelyCall( onSuccess, localResponse );
		}
		else
		{
			
			this._loadCategoryTree( params,
			
			function( serviceResponse )
			{
				localResponse.data = ShopManager._getRandomCategory( serviceResponse.data );
				Commons.onAjaxSuccess( localResponse, null, null );
				_safelyCall( onSuccess, localResponse );
			},

			function( serviceResponse )
			{
				localResponse.data = null;
				Commons.onAjaxError( localResponse, null, null );				
				_safelyCall( onFailure, localResponse );
			});			
		}
		
	},
	
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'limit':           {Integer} limit of sub-categories to be returned, optional (default unbounded).
	 *  }
	 * 
     * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
	 * 
	 * @return the most popular sub-categories.
	 */
	getPopularSubCategories:  function( params, onSuccess, onFailure )
	{
		
		var localResponse = {
			event: 'shop:getPopularSubCategories',
			params: params,
			type: 'local'
		};
		
		if( _exists(ShopManager.categoryTreeCache) )
		{
			localResponse.data = ShopManager._getRandomSubCategories( ShopManager.categoryTreeCache );
			Commons.onAjaxSuccess( localResponse, null, null );
			_safelyCall( onSuccess, localResponse );
		}
		else
		{
			this._loadCategoryTree( params,
					
			function( serviceResponse )
			{
				localResponse.data = ShopManager._getRandomSubCategories( serviceResponse.data );
				Commons.onAjaxSuccess( localResponse, null, null );
				_safelyCall( onSuccess, localResponse );
			},
			
			function( serviceResponse )
			{
				localResponse.data = null;
				Commons.onAjaxError( localResponse, null, null );				
				_safelyCall( onFailure, localResponse );
			});			
		}
		
	},
	
	
	/**
	 * @param params type Map 
	 *  may contain:
	 *  {
	 *    'isoCurrencyCode': {String}  (accepted values: 'USD', 'GBP'), mandatory.
	 *    'limit':           {Integer} limit of products to be returned, optional (default unbounded).
	 *  }
	 *  
	 * @param onSuccess the function to be called on service response success.
	 * @param onFailure the function to be called on service response failure.
	 * 
	 * @return the most popular products.
	 */
	getPopularProducts:  function( params, onSuccess, onFailure )
	{
		
		this.getPopularSubCategories( params,
				
		function( subCategoryResponse )
		{
			
			var localResponse = {
				event: 'shop:getPopularProducts',
				params: params,
				type: 'local' };
			
			var category = ShopManager._getRandomCategory( subCategoryResponse.data );
			if( category == null ) return;
			
			params.categoryId = category.id;
			ShopManager.getCategoryWidget( params,
					
			function( productWidgetResponse )
			{
				Commons.onAjaxSuccess( localResponse, null, null );
				localResponse.data = productWidgetResponse.data;
				_safelyCall( onSuccess, localResponse );
			},
			
			function( productWidgetResponse )
			{
				localResponse.data = null;
				Commons.onAjaxError( localResponse, null, null );				
				_safelyCall( onFailure, localResponse );
			} );
			
		},
		
		onFailure );
		
	},
	
	
	/* ***************** */
	/*  PRIVATE METHODS  */
	/* ***************** */
	
	/* *************************************************** */
	/*  The following methods are not intended to be used  */
	/*  directly, are for internal use only.               */
	/* *************************************************** */

	
	_loadCategoryTree: function( params, onSuccess, onFailure )
	{
		
		var call = {
				endpoint: this.categoryUrl,
				event: 'shop:getCategories',
				params: params
		};
		
		RestService.perform( call,
				
		function( serviceResponse )
		{
			ShopManager.categoryTreeCache = serviceResponse.data;
			_safelyCall( onSuccess, serviceResponse );
		},
				
		function( serviceResponse )
		{
			ShopManager.categoryTreeCache = null;
			_safelyCall( onFailure, serviceResponse );
		});
		
	},
	
	_decorateProducts: function( products, isoCurrencyCode )
	{
		
		if( ! _exists(products) ) return;
		
		if( _exists(ShopManager.merchantsCache) )
		{	
			ShopManager._fillMerchantInfo( products );
		}
		else
		{
			
			ShopManager.getMerchants(
				
				{isoCurrencyCode: isoCurrencyCode},
				
				function( serviceResponse )
				{
					if( _exists(ShopManager.merchantsCache) )
					{
						ShopManager._fillMerchantInfo( products );
					}
				}
					
			);
		}
		
		
	},

	_fillMerchantInfo: function( products )
	{
		
		if( _exists(ShopManager.merchantsCache) )
		{	
			for( var index in products )
			{
				var product = products[index];
				var merchant = ShopManager.merchantsCache[product.merchantId];
				if( merchant != null )
				{
					product.merchantLogoUrl = merchant.logoUrl;
				}
				else
				{
					product.merchantLogoUrl = '';
				}
			}
		}
		
	},
	
	_buildMerchantMap: function( merchants )
	{
		
		var merchantMap = {};
		
		if( _exists(merchants) )
		{	
			for( var index in merchants )
			{
				var merchant = merchants[index];
				merchantMap[merchant.id] = merchant;
			}
		}
		
		return merchantMap;
		
	},

	_getRandomCategory: function( categories )
	{
		
		if( _exists(categories) )
		{		
			var index = Math.floor( Math.random() * categories.length );
			return categories[index];
		}
		else
		{
			return null;
		}
		
	},

	_getRandomSubCategories: function( categories, limit )
	{
						
		if( ! _exists(this.subCategoriesCache) )
		{
		
			var subcategories = new Array();
			if( _exists(categories) )
			{
			
				var index = 0;
				for( var parent in categories )
				{
					var children = categories[parent].children;
					for( var child in children )
					{
						subcategories[index++] = children[child];
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
		
		if( ! _exists(array) ) return null;
		
		if( ! _exists(limit) || array.length <= limit ) return array;
		
		var subArray = new Array( limit );
		for( var index = 0; index < limit; index++ )
			subArray[index] = array[index];
		
		return subArray;
		
	}
	
};