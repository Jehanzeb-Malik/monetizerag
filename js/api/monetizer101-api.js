if( ! (window.console && console.log) )
{
  console = {
    log:   function(){},
    debug: function(){},
    info:  function(){},
    warn:  function(){},
    error: function(){}
  };
}

/*
 * Googla tracking code
 */

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-9857650-9']);
  //_gaq.push(['_setDomainName', 'wazzamba.com']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    
  })();


/*
 * Deafult session. Used for demo's
 */
var defaultSession = {
	sid : 123456,
	sname : 'Phil',
	spoints : 20000,
	pid : 0000001,
	auth : '165z3g2z61s21',
	pkey : 1
};

function loadDefaultSession() {

	Commons.consoleLogger.info( 'loading deafault session' + JSON.stringify(defaultSession) );
	
	ProfileManager.id = defaultSession.sid;
	ProfileManager.name = defaultSession.sname;
	ProfileManager.points = defaultSession.spoints;
	
	SessionManager.key = defaultSession.pkey;
	SessionManager.authorized = true;
}

/** Event dispatcher * */
/*
 * This will be used to throw notifications about relevant event of the API.
 * This is mostly used to return results from sync remote call to servers. Ex:
 * EventDispatcher.trigger('shop:search:success',jsResponse) the shop API uses
 * the event dispatcher to notify back the response of the server. Any handler
 * subscribed to this events will be notified
 * EventDispatcher.on('shop:search:success', function(jsResponse) {
 * console.log(JSON.stringify(jsResponse)); });
 */
var EventDispatcher = {};

/** Geolocation Manager * */
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
		if( _.isNull(sessionStorage.isoCurrencyCode)
		 || _.isUndefined(sessionStorage.isoCurrencyCode)
		 || _.isEmpty(sessionStorage.isoCurrencyCode))
		{
			return this.isoCurrencyCode
		}
		else
		{
			return sessionStorage.isoCurrencyCode;
		}
	},
	
	init : function( callback )
	{
		// Initialize GEO Location
		jQuery.getJSON( "http://www.geoplugin.net/json.gp?jsoncallback=?", function( data )
		{
			GeoManager.defaultLocation = data;
			if( GeoManager.getIsoCurrencyCode() == 'undefined'
				|| _.isNull(GeoManager.getIsoCurrencyCode())
				|| _.isUndefined(GeoManager.getIsoCurrencyCode())
				|| _.isEmpty(GeoManager.getIsoCurrencyCode()))			
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

/** ProfileManager * */
var ProfileManager = {
		
	id: null,
	name: null,
	points: null,
	
	/*
	 * @Params parameters. EX: {amount: 200}. @Return serviceResponse marked
	 * with 'profile:decrease:success' Event. @Trigger
	 * 'profile:decrease:success' Event
	 */
	decreasePoints : function(params) {
		var serviceResponse = {
			type : 'RESULT'
		};
		serviceResponse.result = {};
		serviceResponse.params = params;
		Commons.consoleLogger.info('Decreasing ' + params.amount + " points");
		if (this.points > params.amount) {
			this.points -= params.amount;
			sessionStorage.setItem("user-points", this.points);
			serviceResponse.event = 'profile:decrease:success';
		} else {
			// That should be never happen
			serviceResponse.event = 'profile:decrease:error';
			serviceResponse.result.error = 'profile:decrease:error';
		}
		serviceResponse.data = {
			points : this.points
		};
		Commons.triggerResponseAsEvent(serviceResponse);
		return serviceResponse;
	}
}

/** SessionManager * */
var SessionManager = {
	authorized : false,// SessionManager Object. Currently only anonimous
	// session are
	// in place
	key : null,// partner identifier
	secured : false,// tells if the session is secured
	id : null
// internal session id
}

/** Coomons Manager * */
var Commons = {
	connection: {
		host: null,
		endpoint: monetizer_site_url + '/shop-rest/api/v2'
	},
	
	consoleLogger : null,

	// This is the function that will be called when all the
	// required libraries are loaded and the API is ready to work.
	// Overwrite it to implement our own callback behavior
	onReady: function()
	{
		this.consoleLogger.info( 'API is ready, but no prime element found, please check that your prime script element is correctly configured' );
	},
	
	// This function returns a simplified xhr object to describe the http request status
	ajaxStatus: function( jqXHR, textStatus )
	{
		var xhr = {};
		if( !_.isNull(jqXHR) )
		{
			xhr.status = jqXHR.status;
			xhr.textStatus = textStatus;
			xhr.errorThrown = jqXHR.statusText;
		}
		return xhr;		
	},

	// This function returns a simplified xhr object to describe the http request status
	onAjaxSuccess: function( serviceResponse, json, textStatus, jqXHR )
	{

		serviceResponse.data = json;
		serviceResponse.xhr = Commons.ajaxStatus( jqXHR, textStatus );

		var logBuffer = new Array();
		logBuffer.push( 'TYPE:' + serviceResponse.type );
		logBuffer.push( 'STATUS:' + JSON.stringify(serviceResponse.xhr) );
		logBuffer.push( 'EVENT:' + serviceResponse.event );

		Commons.consoleLogger.info( logBuffer.join() );
		this.triggerResponseAsEvent( serviceResponse );

	},
	
	// This function dispatch a service respone as event
	onAjaxError: function( serviceResponse, textStatus, jqXHR )
	{
		serviceResponse.xhr = Commons.ajaxStatus( jqXHR, textStatus );
		Commons.consoleLogger.error( JSON.stringify(serviceResponse.xhr) );
		EventDispatcher.trigger( 'shop:getWidget:error', serviceResponse );
	},
	
	triggerResponseAsEvent : function( serviceResponse )
	{
		if( EventDispatcher.trigger )
		{
			EventDispatcher.trigger( serviceResponse.event, serviceResponse );
		}
	}
	
};

requirejs.config({
	
	// By default load any module IDs from js/lib
	baseUrl: monetizer_site_url + '/js/api',
	
	// except, if the module ID starts with "vendor",
	// load it from the js/vendor directory. paths
	// config is relative to the baseUrl.
	paths: {
		vendor : '../vendor'
	},
	
	shim: {
		'vendor/backbone' : {
			// These script dependencies should be loaded before loading
			// backbone.js
			deps : [ 'vendor/underscore' ]
		},
		
		'monetizer101-rest-api' : {
			// These script dependencies should be loaded before loading
			// shop-api
			deps : [ 'vendor/backbone', 'vendor/log4javascript' ]
		}
	}
});

// Setup API acosystem
requirejs( [ 'vendor/underscore', 'vendor/backbone', 'vendor/log4javascript', 'monetizer101-rest-api' ],
		
		function( underscore, backbone, monetizer101_rest_api )
		{
			
			_.extend( EventDispatcher, Backbone.Events );
			
			var primeElement = jQuery('#monetizer101-api');
			if( _.isNull(primeElement) || _.isUndefined(primeElement) )
			{
				console.log('monetizer101-api element MISSED, API not WORKING ');
				return;
			}
			else
			{
				// TODO validate data attributes for prime node
				var onLoadEval = primeElement.attr('data-onload');
				var logOptions = jQuery.parseJSON(primeElement.attr('data-log'));
				_initLog(logOptions);
				if( _.isNull(onLoadEval) || _.isUndefined(onLoadEval) )
				{
					console.log( 'API is ready, but no ready callback configured, nothing to do' );
				}
				else
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

				var id     = getParam('sid');
				var name   = getParam('sname');
				var points = getParam('spoints');
				var key    = getParam('pkey');

				ProfileManager.id     = 2;
				ProfileManager.name   = 'Phil';
				ProfileManager.points = 2000;

				SessionManager.key        = 2;
				SessionManager.authorized = true;

				if (!_.isEqual(id, 0) && !_.isEqual(id, 'undefined')
						&& !_.isUndefined(id)) {
					ProfileManager.id = id;
				}

				if (!_.isEqual(name, 0) && !_.isEqual(name, 'undefined')
						&& !_.isUndefined(name)) {
					ProfileManager.name = name;
				}
				if (!_.isEqual(points, 0) && !_.isEqual(points, 'undefined')
						&& !_.isUndefined(points)) {

					ProfileManager.points = points;

				}
				if (!_.isEqual(key, 0) && !_.isEqual(key, 'undefined')
						&& !_.isUndefined(key)) {
					SessionManager.key = key;
					SessionManager.authorized = true;
				}

				// this currently has non meaning
				SessionManager.authorized = true;

				if (sessionStorage.getItem('user-points')) {
					ProfileManager.points = sessionStorage
							.getItem('user-points');
					Commons.consoleLogger
							.info('Recovered User Points from session: '
									+ ProfileManager.points);
				}

				/* init managers */
				ShopManager.init({
					key : SessionManager.key
				});
//				AffiliateManager.init({
//					key : SessionManager.key
//				});
//				CouponManager.init({
//					key : SessionManager.key
//				});

			}

		});

/*
 * Private functions
 */
function _initLog( logOptions )
{
	/** Configuring log4js * */
	var log = log4javascript.getLogger();
	var consoleAppender = new log4javascript.BrowserConsoleAppender();
	consoleAppender.setThreshold( log4javascript.Level[logOptions.level] );
	
	var consoleLayout = new log4javascript.PatternLayout( "%d{HH:mm:ss} %-5p - %m%n" );
	consoleAppender.setLayout(consoleLayout);
	
	log.addAppender(consoleAppender);
	Commons.consoleLogger = log;
}

function _urlParam( name )
{
	
	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	if( _.isUndefined(results) || _.isNull(results) || _.isEmpty(results) )
		return 0;
	
	var value = results[1];
	if( _.isUndefined(value) || _.isNull(value) || _.isEmpty(value) )
		return 0;
	
	return decodeURIComponent( value );
			
}

function getParam( key )
{
	function parseParams() {
		var params = {}, e, a = /\+/g, // Regex for replacing addition symbol
										// with a space
		r = /([^&=]+)=?([^&]*)/g, d = function(s) {
			return decodeURIComponent(s.replace(a, " "));
		}, q = document.location.search.substring(1);

		while (e = r.exec(q))
			params[d(e[1])] = d(e[2]);

		return params;
	}

	if (!this.queryStringParams)
		this.queryStringParams = parseParams();

	return this.queryStringParams[key];
}
