/*
 * Initializes the InitData object, with default data if it wasn't already initialized before.
 */
if( InitData == null )
{
  var InitData = {};
}

if( InitData.contextUrl == null )
{
	InitData.contextUrl = 'shop-rest/';
}

if( InitData.baseUrl != null && InitData.baseUrl != '' )
{
	InitData.baseUrl = InitData.baseUrl + InitData.contextUrl;
}
else
{
	InitData.baseUrl = '';
}

if( InitData.shopId == null )
{
	InitData.shopId = 1;
}



/*
 * Initializes the Google tracking API.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-9857650-9']);
//_gaq.push(['_setDomainName', 'wazzamba.com']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function()
{
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


/** Geolocation Manager **/
/*
 * Is used to compute the currency to display in the shop.
 */
var GeoManager = {
		
	defaultLocation : null,
	isoCurrencyCode : null,
	
	setIsoCurrencyCode: function( isoCurrencyCode )
	{
		this.isoCurrencyCode = (isoCurrencyCode == "GBP" ? "GBP" : "USD");
		sessionStorage.isoCurrencyCode = this.isoCurrencyCode;
	},
	
	getIsoCurrencyCode: function()
	{
		if( _exists(sessionStorage.isoCurrencyCode) )
		{
			return sessionStorage.isoCurrencyCode;
		}
		else
		{
			return this.isoCurrencyCode
		}
	},
	
	init: function( callback )
	{
		// Initialize GEO Location
		jQuery.getJSON( "http://www.geoplugin.net/json.gp?jsoncallback=?", function( data )
		{
			GeoManager.defaultLocation = data;
			if( ! _exists(GeoManager.getIsoCurrencyCode()) )							
			{
				GeoManager.setIsoCurrencyCode( GeoManager.defaultLocation.geoplugin_currencyCode );
			}
							
			Commons.consoleLogger.info( "Wazzamba Assigned to the user ISO currency code:"
										+ GeoManager.getIsoCurrencyCode()
										+ " from original GEO ISO code:"
										+ GeoManager.defaultLocation.geoplugin_currencyCode );

			callback.call();

		});
	}
}


/**
 * Configuration of the library dependencies.
 */
requirejs.config({
	
	// By default load any module IDs from js/lib
	baseUrl: InitData.baseUrl + 'js',
	
	// except, if the module ID starts with "vendor",
	// load it from the js/vendor directory. paths
	// config is relative to the baseUrl.
	paths: { kendo: '../../js/kendo', vendor: 'vendor', api: 'api' },
	
	shim: {
		'api/common101': {
			// These script dependencies should be loaded before loading shop-api.
			deps: [ 'vendor/log4javascript' ]
		},

		'api/monetizer101-rest-api': {
			// These script dependencies should be loaded before loading shop-api.
			deps: [ 'api/common101', 'vendor/log4javascript' ]
	}
	}
});

/**
 * Download and setup of the required libraries following the configured dependencies.
 */

requirejs( [ 'kendo/kendo.window.min', 'kendo/kendo.panelbar.min', 'vendor/underscore', 'vendor/log4javascript', 'api/common101', 'api/monetizer101-rest-api' ],
		
	function( underscore, monetizer101_rest_api )
	{
			
		var primeElement = jQuery('#monetizer101-api');
		if( _exists(primeElement) )
		{
			var logOptions = jQuery.parseJSON( primeElement.attr('data-log') );
			_initLog(logOptions);
				
			var onLoadEval = primeElement.attr( 'data-onload' );
			if( _exists(onLoadEval) )
			{
				GeoManager.init(function()
				{
					_.defer( function()
					{
						eval( onLoadEval );
					});
				});
					
				Commons.consoleLogger.info( 'API is ready, calling the configured ready callback: '	+ onLoadEval );
			}
			else
			{
				console.log( 'API is ready, but no ready callback configured, nothing to do' );
			}

			ShopManager.init({ key : InitData.shopId });

		}
		else
		{
			console.log('monetizer101-api element MISSED, API not WORKING ');
			return;
		}

	});


/* ***************** */
/*  PRIVATE METHODS  */
/* ***************** */

/* *************************************************** */
/*  The following methods are not intended to be used  */
/*  directly, are for internal use only.               */
/* *************************************************** */

