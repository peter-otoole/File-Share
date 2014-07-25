var common,	logger,	mongo, format,crypto;

module.exports = {
	
	/* Init function which initializes the required files 
	 */
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		mongo = require("mongodb").MongoClient;
		format = require("util").format;
		crypto = require("crypto");
	},
	
	/* This function checks if we can connect to the database or not
	 * Return(calls the callback): err,res,message
	 * 		- err: if an error has occurred or not
	 *		- res: a boolean value stating weather we have a connection or not
	 * 		- message: a message about what happened in the function, mostly for logging purposes 
	 */
	haveConnection: function(callback){
		
		var	log = logger("db.haveConnection");
		
		mongo.connect(common.DB_URL_COMPLETE, function (err, db) {
			
			if (err) {
				log.error("An error occurred while attempting to connection to the database. Error: "+err, 4);
				callback(true, false, "Could not connect to the database! Error: "+err);
			} else {
				log.info("Successfully connected to the database.");
				callback(false, true, "A connection was established.");
			}
		});
	},
	
	/* This function sets up the database documents and basic configuration information. 
	 * Return(calls the callback): err,res,message
	 * 		- err: if an error has occurred or not
	 * 		- message: a message about what happened in the function, mostly for logging purposes 
	 */
	initDatabase: function(callback){
		
		var	log = logger("db.initDatabase");
		
		mongo.connect(common.DB_URL_COMPLETE, function (err, db) {
		
			if(err){
				log.error("Error getting connection to the database", 5)
				callback(true, "Cannot connect to the database, database not set up.");
			}else{
			
				var globalVals = {};
				var accountVals = {};
				var fileSystemVals = {};
			
				var temp1 = db.globals.insert(globalVals);
				db.accounts.insert(globalVals);
				db.filesystem.insert(fileSystemVals);			
			
				log.info(temp1);
			
				callback(false, "Database Set up Correctly.");
			}
		});
	},
	 
	/* This function checks if this is the first time the server is running
	 * Return(calls the callback): err,res,message
	 * 		- err: if an error has occurred or not
	 * 		- res: a boolean value with the response. true = this is the first time running, false: the server has been run before
	 * 		- message: a message about what happened in the function, mostly for logging purposes 
	 */
	firstRun: function(callback){
		
		var log = logger("db.firstRun");
		
		log.info("Checking if this is the first run...");
		
		log.info("DB_URL_COMPLETE: "+common.DB_URL_COMPLETE)
		
		mongo.connect(common.DB_URL_COMPLETE, function (err, db) {
			
			var firstRun = true;
			
			try{
				
				if (err) {
					firstRun = true;
					log.error("An error occurred while attempting to connection to the database. Error: "+err, 4);
					callback(true, firstRun, "Could not connect to the database! Error: "+err);
				} else {
					log.info("Successfully connected to the database.");
					
					log.info("db.globals: "+db.globals);
					if( db.globals == undefined ){
						firstRun = true;
						log.info("This is the first run.");
					}else{
						firstRun = false;
						log.info("This is not the first run.");
					}
					
					db.close();
					
					callback(false, firstRun, "Calling callback with results.");
				}
				
			}catch(e){
				log.error("An error occurred while attempting to connection to the database. Error: "+e, 4);
				callback(true, firstRun, "Could not connect to the database! Error: "+e);
			}
		});
	},
	
	/* This function takes a message and logs it in the database 
	 * @param: log
	 *		- A string message which can be entered into the database
	 * Return: true
	 * 		- Does not wait on a callback
	 */
	storeLog: function(log){
		
		//TODOL Add functionality to save a log to the database
		return true;
	},
	
	/* This function takes the basic public information from the database and returns it to the user
	 * Return(calls the callback): err,res,message
	 * 		- err: if an error has occurred or not
	 * 		- res: an object containing all the basic information
	 * 		- message: a message about what happened in the function, mostly for logging purposes 
	 */
	getBasicServerData: function(callback){
	
		callback(false, {code: 200, name: "John Doe" }, "Found data in database and returning it to the user.");
	},
	
	/* This function takes a token and checks if the user is 
	 * @param: token
	 *		- The token is a 128 string of random characters which makes up the session identifier
	 * Return: err, res, message
	 * 		- err is whether or not an error has occurred
	 * 		- res is an object containing a field "code", either 200 or 404
	 * 		- message is a string containing the message of an error
	 */
	validateCredentials: function(token, callback){
		
		//TODO: Finished implementation
		callback(false, {code: 200}, "User is allowed.");
	},
	
	/* This function takes an email address and password and looks up the database and tries to sign in the user
	 * @param: email
	 *		- An email address for a given user
	 * @param: password
	 *		- A password in plain text which needs to be compared against the Hashed one in the database
	 * Return: err, res, message
	 * 		- err is whether or not an error has occurred
	 * 		- res is an object containing fields including code, name, random session ID etc
	 * 		- message is a string containing the message of an error
	 */
	signIn: function(email, password, callback){
		
		//TODO: Finished Implementation
		
		var hash = crypto.createHash("sha256").update(password).digest("base64");
		
		callback(false, {code: 200, name: "John Doe", session: "KJBlkbdslbc999y5r6tgvJHBJ"}, "User is signed in.");
	},
	
	/* This function signs out a user
	 * @param: token
	 *		- The token is a 128 string of random characters which makes up the session identifier
	 * Return: err, res, message
	 * 		- err is whether or not an error has occurred
	 * 		- res is an object containing a field "code"
	 * 		- message is a string containing the message of an error
	 */
	logOut: function(token, callback){
	
		//TODO: Finished Implementation
		callback(false, {code: 200}, "User is signed out.");
	},
	
	/* This function creates a user
	 * @param: email
	 *		- Is an email address which needs to be validated
	 * @param: fname
	 *		- Is a string of max length 32 characters
	 * @param: lname
	 *		- Is a string of max length 32 characters
	 * @param: key
	 *		- The token is a 256 string of random characters which makes up the session identifier
	 * @param: password
	 *		- Is a string of length 8 -> 32
	 * Return: err, res, message
	 * 		- err is whether or not an error has occurred
	 * 		- res is an object containing a field "code"
	 * 		- message is a string containing the message of an error
	 */
	createUser: function(email, fName, lName, key, password, callback){
	
		//TODO: Finished Implementation
		
		var hash = crypto.createHash("sha256").update(password).digest("base64");
		
		callback(false, {code: 200}, "User was created successfully.");
	}
};




