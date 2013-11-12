/*
 * Initializes the output console for logging purposes. 
 */
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

/** Event dispatcher **/
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


/** Commons Manager **/
var Commons = {
		
	connection: {
		host: null,
		endpoint: InitData.baseUrl + 'api/v2'
	},
	
	consoleLogger: null,

	// This is the function that will be called when all the
	// required libraries are loaded and the API is ready to work.
	// Overwrite it to implement our own callback behavior
	onReady: function()
	{
		this.consoleLogger.info( 'API is ready, but no prime element found, please check that your prime script element is correctly configured' );
	},
	
	// This function returns a simplified XHR object to describe the HTTP request status
	ajaxStatus: function( jqXHR, status )
	{
		var xhr = {};
		if( !_.isNull(jqXHR) )
		{
			xhr.status = jqXHR.status;
			xhr.textStatus = status;
			xhr.errorThrown = jqXHR.statusText;
		}
		return xhr;		
	},

	// This function returns a simplified xhr object to describe the http request status
	onAjaxSuccess: function( serviceResponse, status, jqXHR )
	{

		if( ! _exists(serviceResponse) )
		{
			return;
		}
		
		serviceResponse.xhr  = Commons.ajaxStatus( jqXHR, status );

		var logBuffer = new Array();
		logBuffer.push( 'TYPE:'   + serviceResponse.type );
		logBuffer.push( 'STATUS:' + JSON.stringify(serviceResponse.xhr) );
		logBuffer.push( 'EVENT:'  + serviceResponse.event + ':success' );

		Commons.consoleLogger.info( logBuffer.join() );
		this.triggerResponseAsEvent( serviceResponse );

	},
	
	// This function dispatch a service response as event
	onAjaxError: function( serviceResponse, status, jqXHR )
	{
		
		if( ! _exists(serviceResponse) )
		{
			return;
		}
		
		serviceResponse.xhr  = Commons.ajaxStatus( jqXHR, status );
		
		var logBuffer = new Array();
		logBuffer.push( 'TYPE:'   + serviceResponse.type );
		logBuffer.push( 'STATUS:' + JSON.stringify(serviceResponse.xhr) );
		logBuffer.push( 'EVENT:'  + serviceResponse.event + ':error' );
			
		Commons.consoleLogger.warn( logBuffer.join() );
		this.triggerResponseAsEvent( serviceResponse );
		
	},
	
	/**
	 * If a function 'trigger' is defined for the EventDispatcher
	 * calls such function, otherwise nothing is done.
	 * 
	 * @param serviceResponse the service response that generates the event.
	 */
	triggerResponseAsEvent: function( serviceResponse )
	{
		if( _exists(serviceResponse) &&
			_exists(EventDispatcher) && _exists(EventDispatcher.trigger) )
		{
			EventDispatcher.trigger( serviceResponse.event, serviceResponse );
		}
	}
	
};


/**
 * Represents the common access point to the remote ReST API.
 */
var RestService = {
		
	
	/**
	 * Performs the remote call and invokes the provided callbacks
	 * on service response.
	 * 
	 * @param call      the remote call info,
	 * may contain:
	 * {
	 *   endpoint: the service endpoint to call, mandatory.
	 *   method:   the http method to use, optional (default 'GET').
	 *   event:    the event name to be fired on service callback, optional (default 'undefined').
	 *   params:   a map containing the service request parameters, optional.
	 *   type:     the service call type, optional (default 'xhr').
	 * }
	 * @param onSuccess the callback to be called on service success response. 
	 * @param onFailure the callback to be called on service failure response. 
	 */
	perform: function( call, onSuccess, onFailure )
	{
		
		if( ! _exists(call) || ! _exists(call.endpoint) )
		{
			return;
		}
		
		var service = { endpoint: call.endpoint };
		service.method = _exists( call.method ) ? call.method : 'GET';
		service.params = _exists( call.params ) ? call.params : {};
		service.event  = _exists( call.event )  ? call.event  : 'undefined';
		service.type   = _exists( call.type )   ? call.type   : 'xhr';
		
		var serviceResponse = {
			type: service.type,
			event: service.event,
			params: service.params
		};
	
		jQuery.ajax({
		
			url:      service.endpoint,
			type:     service.method,
			data:     service.params,
			dataType: "json",
		
			success: function( data, status, jqXHR )
			{
				serviceResponse.data = data;
				Commons.onAjaxSuccess( serviceResponse, status, jqXHR );
				_safelyCall( onSuccess, serviceResponse );
			},
			
			error: function( jqXHR, errorType, exceptionThrown )
			{
				Commons.onAjaxError( serviceResponse, errorType, jqXHR );
				_safelyCall( onFailure, serviceResponse );				
			}
		
		});

	}
};


/* ***************** */
/*  PRIVATE METHODS  */
/* ***************** */

/* *************************************************** */
/*  The following methods are not intended to be used  */
/*  directly, are for internal use only.               */
/* *************************************************** */


/**
 * Returns {true} if the given object exists and is not empty.
 *  
 * @param object the object to evaluate.
 * @returns {Boolean}
 */
function _exists( object )
{
	
	if( _.isNull(object) || _.isUndefined(object) )
	{
		return false;
	}

	if( ! _.isFunction(object) && _.isEmpty(object) )
	{
		return false;
	}
	
//	if( _.isString(object) && _.isEqual(object, 'undefined') )
//	{
//		return false;
//	}
	
	return true;
	
};


/**
 * Checks if the given callback exists and invokes it
 * with the given data.
 * 
 * @param callback the callback function to call.
 * @param data     the data to send to the function.
 */
function _safelyCall( callback, data )
{
	
	if( _exists(callback) )
	{
		callback( data );
	}
	
}


/**
 * Initializes the log4javascript with the given configurations.
 * 
 * @param logOptions options to use during configuration.
 */
function _initLog( logOptions )
{
	var log = log4javascript.getLogger();
	var consoleAppender = new log4javascript.BrowserConsoleAppender();
	consoleAppender.setThreshold( log4javascript.Level[logOptions.level] );
	
	var consoleLayout = new log4javascript.PatternLayout( "%d{HH:mm:ss} %-5p - %m%n" );
	consoleAppender.setLayout(consoleLayout);
	
	log.addAppender(consoleAppender);
	Commons.consoleLogger = log;
};



function _urlParam( name )
{
	
	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	if( _.isUndefined(results) || _.isNull(results) || _.isEmpty(results) )
		return 0;
	
	var value = results[1];
	if( _.isUndefined(value) || _.isNull(value) || _.isEmpty(value) )
		return 0;
	
	return decodeURIComponent( value );
			
};

function _getParam( key )
{
	function _parseParams()
	{
		var params = {}, e, a = /\+/g, // Regex for replacing addition symbol
										// with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function(s)
		{
			return decodeURIComponent(s.replace(a, " "));
		},
		q = document.location.search.substring(1);

		while( e = r.exec(q) )
		{
			params[d(e[1])] = d(e[2]);
		}

		return params;
	}

	if( ! this.queryStringParams )
	{
		this.queryStringParams = _parseParams();
	}

	return this.queryStringParams[key];
};


