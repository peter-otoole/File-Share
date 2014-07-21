var common,	logger,	fs;

module.exports = {
	
	/* Init function which initializes the required files 
	 */
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		fs = require("fs");
	},
	
	/* This function checks if any|all files in the white list are found
	 * Return: true | false
	 * 		- Either has found it or not
	 */
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
	},
	
	/* This function gets all the files and folders in a starting folder
	 * @param: startFolder
	 * 		- a string of the starting folder in relation to the start location
	 * Return: err, res, message
	 * 		- err: true or false if an error has occurred
	 * 		- res: contains a structure for files and folders
	 * 		- message: a string with a message for status
	 */
	getFileList: function(startFolder, callback){
	
		//TODO: Add implementation
		callback(false, {list: {files: [], folders:[]}}, "Files where found.")
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