var dbc, STORE_LOG;

module.exports = {

	PORT: 80,
	WEB_ADDRESS: "http://127.0.0.1",
	ADMIN_SECRET_KEY: "1234",
	REGULAR_SECRET_KEY: "123",
	START_DIRECTORY:"F:\\",
	WHITE_LIST: ["Music", "Films", "TV", "Image Files", "Share"],
	BLACK_LIST: [],
	
	/* Init function which initializes the required files 
	 */
	init: function(){	
		
		dbc = require("./db.js");
		STORE_LOG = false;
	},
	
	storeLog: function( value ){
	
		if(value !== undefined ){
			STORE_LOG = value;
		}
		
		return STORE_LOG;
	},
	
	logger: function(fun){
		
		var record = {
		
			info: function(message) {
			
				if( STORE_LOG ){
					dbc.storeLog(fun+"() - "+message);
				}
				console.log(fun+"() - "+message);
			},
			
			
			error: function(message, level){
			
				if( STORE_LOG ){
					if(level){
						dbc.storeLog(fun+"() - Level "+level+"error - "+message);
					}else{
						dbc.storeLog(fun+"() - Error - "+message);
					}
				}
				
				if(level){
					console.error(fun+"() - Level "+level+" error - "+message);
				}else{
					console.error(fun+"() - Error - "+message);
				}
			}
		};
		
		return record;
	},
	
	FS: {
		ANY: "ANY",
		ALL: "ALL"
	},
	
	INTERNAL_SERVER_ERROR: 500,
	INTERNAL_SERVER_ERROR_MSG: "An internal server error has occurred, please try again.",
	BAD_REQUEST: 400,
	BAD_REQUEST_MSG: "The request was not made correctly, please review your request.",
	NOT_FOUND: 404, 
	NOT_FOUND_MSG: "The entity you are looking for is not found.",
	FORBIDDEN: 403,
	FORBIDDEN_MSG: "You do not have authorisation to access this content.",
	REAUTHENTICATE: 401,
	REAUTHENTICATE_MSG: "Your session has been invalidated, please re-authenticate.",
	OK: 200,
	OK_MSG: "Request made, okay.",
	ACCEPTED: 202,
	ACCEPTED_MSG: "Request made, accepted."
};








