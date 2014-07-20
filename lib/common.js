var dbc, STORE_LOG;

module.exports = {

	PORT: 80,
	WEB_ADDRESS: "http://127.0.0.1",
	ADMIN_SECRET_KEY: "1234",
	REGULAR_SECRET_KEY: "123",
	START_DIRECTORY:"F:\\",
	WHITE_LIST: ["Music", "Films", "TV", "Image Files", "Share"],
	BLACK_LIST: [],

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
	
	logger: {
	
		log:function(fun, message){
			
			if( STORE_LOG ){
				dbc.storeLog(fun+"() - "+message);
			}
			console.log(fun+"() - "+message);
		},
	
		error:function(fun, message, level){
			
			if( STORE_LOG ){
				if(level){
					dbc.storeLog(fun+"() - Level "+level+"error - "+message);
				}else{
					dbc.storeLog(fun+"() - Error - "+message);
				}
			}
			
			if(level){
				console.log(fun+"() - Level "+level+"error - "+message);
			}else{
				console.log(fun+"() - Error - "+message);
			}
		}
	
	},
	
	FS: {
		ANY: "ANY",
		ALL: "ALL"
		
	}
	
};