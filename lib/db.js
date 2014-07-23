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
	 * Return: true | false
	 * 		- If we can connect to the database or not 
	 */
	haveConnection: function(callback){
		
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
		
		callback(false, result, "Returning, no error was thrown");
	},
	
	/* This function checks if this is the first time the server is running
	 * Return: true | false 
	 * 		- If it is the first time running we return true, otherwise false
	 */
	firstRun: function(callback){
		
		var log = logger("db.firstRun");
		
		log.info("Checking if this is the first run...");
		
		log.info("DB_URL_COMPLETE: "+common.DB_URL_COMPLETE)
		
		mongo.connect(common.DB_URL_COMPLETE, function (err, db) {
			
			try{
				
				var result = true;
				
				if (err) {
					log.error("An error occurred while attempting to connection to the database. Error: "+err, 5);
				} else {
					log.info("Successfully connected to the database. DB: "+db);
				}
				
				db.close();
			
				//TODO: add functionality to this to check if this is the first time we are running the server
				if(true){
					log.info("This is not the first run.");
					result = false;
				}else{
					log.info("This is the first run.");
					result = true;
				}
				
				callback(false, result, "Calling callback with results.");
			
			}catch(e){
				log.error("An error occurred while attempting to connection to the database. Error: "+e, 4);
				callback(true, db, "Could not connect to the database!");
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




