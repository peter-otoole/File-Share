var common,	logger,	fs;

module.exports = {

	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		fs = require("fs");
	},

	checkFileSystem: function(type){
		
		var log = logger("file-system.checkFileSystem"),
			result = false;
			
		log.info("Checking can we find "+type+" files in the white list...");
		
		if( type === common.FS.ANY ){
			if( searchAny() ){
				log.info("Found some of the files in the white list.");
				result=true;
			}else{
				log.info("Did not find any of the files in the white list.");
				result=false;
			}
		}else if( type === common.FS.ALL ){
			if( searchAll() ){
				log.info("Found all the files in the white list.");
				result=true;
			}else{
				log.info("Did not find all of the files in the white list.");
				result=false;
			}
		}else{
			log.error("Could not match input type, returning false.", 3);
		}
		
		return result;
	}
	
};

var searchAll = function(){
	
	//TODO: Add implementation which checks if we can find all files in the white list
	return true;
};

var searchAny = function(){
	
	//TODO: Add implementaion which checks if we can find any of the files in the white list
	return true;
};