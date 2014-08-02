var dbc, 
	db_url = "127.0.0.1:27017", //Default mongoose URL...
	db_url_complete = "mongodb://"+db_url+"/file_share_db",
	store_log = false,
	port = 80,
	web_address = "http://127.0.0.1",
	secret_key = "",
	start_directory ="",
	black_list = [],
	white_list = [
		{
			name: "Music",
			location: "C:\\files\\music"
		}
	];
	

module.exports = {

	PORT: port,
	WEB_ADDRESS: web_address,
	SECRET_KEY: secret_key,
	START_DIRECTORY: start_directory,
	BLACK_LIST: black_list,
	STORE_LOG: store_log,
	DB_URL: db_url,
	DB_URL_COMPLETE: db_url_complete,
	WHITE_LIST: white_list,
	
	/* Init function which initializes the required files 
	 */
	init: function(){	
		
		dbc = require("./db.js");
	},
	
	storeLog: function( value ){
	
		if(value !== undefined ){
			store_log = value;
		}
		
		return store_log;
	},
	
	logger: function(fun){
		
		var record = {
		
			info: function(message) {
			
				if( store_log ){
					dbc.storeLog(fun+"() - "+message);
				}
				console.log(fun+"() - "+message);
			},
			
			
			error: function(message, level){
			
				if( store_log ){
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
	ACCEPTED_MSG: "Request made, accepted.",
	
	setDbURL: function(dbUrl){
	
		db_url = dbUrl;
		db_url_complete = "mongodb://"+dbUrl+"/test";
	},
	
	COLLECTIONS: {
		
		ACCOUNTS: {
			name: "accounts",
			longName: "file_share_db.accounts" 
		}, 
		GLOBALS: {
			name: "globals",
			longName: "file_share_db.globals"
		}, 
		LOGS: {
			name: "logs",
			longName: "file_share_db.logs"
		}, 
		FILE_SYSTEM: {
			name: "filesystem",
			longName: "file_share_db.filesystem"
		},
		SYSTEM_INDEX:{
			name: "system.indexes",
			longName: "file_share_db.system.indexes"
		}
	},
	
	DATABASE_SCHEMA: {
	
		ACCOUNTS_SCHEMA: {
			
			firstName: String,
			lastName: String,
			emailAddress: String,
			userLevel: Number,
			activity: { usage: Number, 
						activityLog:[
							{ type: String, description: String, timeStamp: Date }
						]},
			accountActive: Boolean,
			signUpDate: Date,
			password: String, 
			salt: String
		},
		
		GLOBALS_SCHEMA: {
			
			storeLogs: Boolean,
			port: Number,
			webAddress: String,
			secretKey: String		
		},
		LOGS_SCHEMA: {
			
			type: String,
			message: String,
			level: Number
		},
		FILE_SYSTEM_SCHEMA: {
			
			whiteList: [
				{directory: String, accessLevel: Number}
			],
			blackList: [
				{directory: String, accessLevel: Number}
			]
		}
	}
};








