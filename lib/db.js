var common,	logger,	mongo, format;

module.exports = {
	
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		mongo = require("mongodb").MongoClient;
		format = require("util").format;
	},

	haveConnection: function(){
		
		var	log = logger("db.haveConnection"),
			result = false;
		
		log.info("Checking if we have a connect to the database...");
		
		//TODO: add functionality to this to check if we can cnnection to the database
		if(true){
			log.info("We can connect to the database.");
			result = true;
		}else{
			log.info("We can't connect to the database.");
			result = false;
		}
		
		return result;
	},
	
	firstRun: function(){
		
		var log = logger("db.firstRun"),
			result = true;
		
		log.info("Checking if this is the first run...");
		
		//TODO: add functionality to this to check if this is the first time we are running the server
		if(true){
			log.info("This is not the first run.");
			result = false;
		}else{
			log.info("This is the first run.");
			result = true;
		}
		
		return result;
	},
	
	storeLog: function(log){
		
		//TODOL Add functionality to save a log to the database
		return true;
	}
};

