var express, app, common, logger, viewHandler, fileSystem, dbc;

module.exports = {
	
	/* Init function which initializes the required files 
	 */
	init:function(dbURL){
		
		express = require("express");
		app = express();
		common = require("./common.js");
		logger = common.logger;
		viewHandler = require("./view-handlers.js");
		fileSystem = require("./file-system.js");
		async = require("async");
		dbc = require("./db.js");
		
		var log = logger("main.init");
		
		
		log.info("############################################################################");
		log.info("#                                                                          #");
		log.info("#                            Private Media Share                           #");
		log.info("#                                                                          #");
		log.info("############################################################################\n");

		log.info("Initializing the Server...\n");
		
		log.info("initialising modules...");
		common.init();
		dbc.init();
		fileSystem.init();
		viewHandler.init();
		log.info("Modules initialised!\n");
		
		if( dbURL && dbURL != undefined && dbURL !== "" ){
			log.info("Got database host URL okay...");
			common.setDbURL(dbURL);
		}else{
			log.error("Supplied database URL was not of the correct form, exiting application.", 5);
			process.exit(1);
		}
		
		log.info("Checking database connection...");
		
		async.waterfall([
			function(callback){
			
				//Ensuring we can connect to the database...
				dbc.haveConnection(function(err, res, message){
					
					if(err){
						log.error("Unable to make connection, error: "+message+", exiting application...", 5);
						callback(err);
						process.exit(1);
					}else{
						if( res ){
							log.info("Connection made successfully, continuing...\n");
						}else{
							log.error("Unable to make connection, exiting application...\n", 5);
							process.exit(1);
						}
						callback(false);
					}
				});
			},
			function(callback){
			  
				dbc.databaseAlreadySetUp(function(err, res, message){
					
					if(err){
						log.error("Unable to connection to the database, error: "+message+", exiting application...", 5);
						callback(err);
						process.exit(1);
					}else{
						
						//Ensuring we can find at least some of the files in the supplied white list
						if( res ){
							
							log.info("The database has been set up already.");
						
							log.info("Looking for files in file system...")
							if( fileSystem.checkFileSystem(common.FS.ANY) ){
								if( fileSystem.checkFileSystem(common.FS.ALL) ){
									log.info("Found all files in white list, continuing...\n");
								}else{
									log.error("Only able to find some files in the file system\n", 1);
								}
							}else{
								log.error("Unable to find any files in the white list, exiting application...\n", 5);
								process.exit(1);
							}
							
							callback(false);
							
						}else{
							log.info("The database has not been set up already.");
							log.info("Setting up database.");
							
							dbc.initDatabase(function(err,message){
							
								if(err){
									log.error("An error occurred while setting up the database, please try again. Error: "+message, 5);
									callback("An error occurred while setting up the database, please try again. Error: "+message);
								}else{
									log.info("Database set up correctly.");
									callback(false);
								}
							});
							
						}
					}
					
				});
			},
			function(callback){
				
				try{
					//Setting up the view handler
					log.info("Setting view handlers...");
					app.get("/", viewHandler.getRoot);
					app.get("/resources/:dynfolder/:dynfile", viewHandler.getResources);
					app.post("/json/sign-in", viewHandler.postSignIn);
					app.post("/json/sign-out", viewHandler.postSignOut);
					app.post("/json/register", viewHandler.postRegister);
					app.get("/json/white-list", viewHandler.getWhiteList);
					app.get("/json/file-list", viewHandler.getFileList);
					app.get("/json/get-basic-server-data", viewHandler.getBasicServerData);
					app.get("/html/get-sign-in-page", viewHandler.getSignInPage);
					app.get("/html/get-sign-in-page", viewHandler.getSignInPage);
					app.get("/html/get-configuration-page", viewHandler.getConfigurationPage);
					
					app.listen(common.PORT);
					
					log.info("View Handlers set up successfully.");
					callback(false);
					
				}catch(e){
					log.error("An error occurred while setting view handlers.", 5);
					callback("Setting up view handlers threw an exception.");
				}
			}
			
		], function(err){
			
			if(err){
				log.error("Errors occurred while setting up server, error: "+err+", exiting application...", 5);
				process.exit(1);
			}else{
				console.log("\n#########################################################################################\n");
				log.info("Initialization complete, waiting for requests at: '"+common.WEB_ADDRESS+":"+common.PORT+"'\n");
				console.log("#########################################################################################\n\n");
			}
		});
	}
};

