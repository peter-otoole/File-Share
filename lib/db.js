var common,	logger,	mongo, format;

module.exports = {
	
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		mongo = require("mongodb").MongoClient;
		format = require("util").format;
	},

	haveConnection: function(){
		
		var location = "db.haveConnection",
			result = false;
		
		logger.log(location, "Checking if we have a connect to the database...");
		
		//TODO: add functionality to this to check if we can cnnection to the database
		if(true){
			logger.log(location, "We can connect to the database.");
			result = true;
		}else{
			logger.log(location, "We can't connect to the database.");
			result = false;
		}
		
		return result;
	},
	
	firstRun: function(){
		
		var location = "db.firstRun",
			result = true;
		
		logger.log(location, "Checking if this is the first run...");
		
		//TODO: add functionality to this to check if this is the first time we are running the server
		if(true){
			logger.log(location, "This is not the first run.");
			result = false;
		}else{
			logger.log(location, "This is the first run.");
			result = true;
		}
		
		return result;
	},
	
	storeLog: function(log){
		
		//TODOL Add functionality to save a log to the database
		return true;
	}
};

