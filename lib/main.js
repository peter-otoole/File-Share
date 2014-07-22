var express, app, common, logger, viewHandler, fileSystem, dbc;

module.exports = {
	
	/* Init function which initializes the required files 
	 */
	init:function(){
		
		express = require("express");
		app = express();
		common = require("./common.js");
		logger = common.logger;
		viewHandler = require("./view-handlers.js");
		fileSystem = require("./file-system.js");
		dbc = require("./db.js");
		
		var log = logger("main.init");
		
		
		log.info("##########################################################");
		log.info("#                                                        #");
		log.info("#                   Private Media Share                  #");
		log.info("#                                                        #");
		log.info("##########################################################\n");

		log.info("Initializing the Server...\n");
		
		log.info("initialising modules...");
		common.init();
		dbc.init();
		fileSystem.init();
		viewHandler.init();
		log.info("Modules initialised!\n");
		
		
		log.info("Checking database connection...");
		
		//Ensuring we can connect to the database...
		if( dbc.haveConnection() ){
			log.info("Connection made successfully, continuing...");
		}else{
			log.error("Unable to make connection, exiting application...", 5);
			process.exit(1);
		}
		
		//Ensuring we can find at least some of the files in the supplied white list
		if( !dbc.firstRun() ){
			log.info("Looking for files in file system...")
			if( fileSystem.checkFileSystem(common.FS.ANY) ){
				if( fileSystem.checkFileSystem(common.FS.ALL) ){
					log.info("Found all files in white list, continuing...");
				}else{
					log.error("Only able to find some files in the file system", 1);
				}
			}else{
				log.error("Unable to find any files in the white list, exiting application...", 5);
				process.exit(1);
			}
		}
		
		//Setting up the view handler
		log.info("Setting view handlers...")	
		app.get("/", viewHandler.getRoot);
		app.get("/resources/:dynfolder/:dynfile", viewHandler.getResources);
		app.post("/sign-in", viewHandler.postSignIn);
		app.post("/sign-out", viewHandler.postSignOut);
		app.post("/register", viewHandler.postRegister);
		app.get("/white-list", viewHandler.getWhiteList);
		app.get("/file-list", viewHandler.getFileList);
		app.get("/get-basic-server-data", viewHandler.getBasicServerData);
		app.get("/html/get-sign-in-page", viewHandler.getSignInPage);
		
		app.listen(common.PORT);
		log.info("Initialization complete, waiting for requests at: '"+common.WEB_ADDRESS+":"+common.PORT+"'\n\n");
		console.log("#########################################################################################\n\n");
	}
};







