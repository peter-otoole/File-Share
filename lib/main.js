var express, app, common, logger, viewHandler, fileSystem, dbc;

module.exports = {

	init:function(){
	
		var location = "main.init";
		
		express = require("express");
		app = express();
		common = require("./common.js");
		logger = common.logger;
		viewHandler = require("./view-handlers.js");
		fileSystem = require("./file-system.js");
		dbc = require("./db.js");
		
		
		logger.log(location, "##########################################################");
		logger.log(location, "#                                                        #");
		logger.log(location, "#                   Private Media Share                  #");
		logger.log(location, "#                                                        #");
		logger.log(location, "##########################################################\n");

		logger.log(location, "Initializing the Server...\n");
		
		logger.log(location, "initialising modules...");
		common.init();
		dbc.init();
		fileSystem.init();
		viewHandler.init();
		logger.log(location, "Modules initialised!\n");
		
		
		logger.log(location, "Checking database connection...");
		
		//Ensuring we can connect to the database...
		if( dbc.haveConnection() ){
			logger.log(location, "Connection made successfully, continuing...");
		}else{
			logger.error(location, "Unable to make connection, exiting application...", 5);
			process.exit(1);
		}
		
		//Ensuring we can find at least some of the files in the supplied white list
		if( !dbc.firstRun() ){
			logger.log(location, "Looking for files in file system...")
			if( fileSystem.checkFileSystem(common.FS.ANY) ){
				if( fileSystem.checkFileSystem(common.FS.ALL) ){
					logger.log(location, "Found all files in white list, continuing...");
				}else{
					logger.error(location, "Only able to find some files in the file system", 1);
				}
			}else{
				logger.error(location, "Unable to find any files in the white list, exiting application...", 5);
				process.exit(1);
			}
		}
		
		//Setting up the view handler
		logger.log(location, "Setting view handlers...")	
		app.get("/", viewHandler.getRoot);
		app.get("/resources/:dynfolder/:dynfile", viewHandler.getResources);
		app.listen(common.PORT);
		logger.log(location, "Initialization complete, waiting for requests at: '"+common.WEB_ADDRESS+":"+common.PORT+"'\n\n");
		console.log("#########################################################################################\n\n");
	}
};


