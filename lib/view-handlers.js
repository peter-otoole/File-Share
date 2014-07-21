var dbc, common, logger, validator, passwordHash;

module.exports = {
	
	/* Init function which initializes the required files 
	 */
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		validator = require("validator");
		dbc = require("./db.js");
	},
	
	getRoot:function(request,response){
		
		var log = logger("view-handlers.getRoot");
		
		
		log.info("Returning basic home page.");
		response.sendfile("./views/base/home.html");
	},
	
	getResources:function(request, response) {
		
		var log = logger("view-handlers.getResources");
		
		var folder = request.params.dynfolder,
			file   = request.params.dynfile;

		log.info("Resources requested @ /resources/" + folder + "/" +file);

		if(folder === "img") {
			response.setHeader("Content-Type", "image/png");
		}else if(folder === "css"){
			response.setHeader("Content-Type", "text/css");
		}else if(folder === "js"){
			response.setHeader("Content-Type", "text/javascript");
		}
		
		response.sendfile("./resources/"+folder+"/"+file);
	},
	
	postSignIn: function(request, response){
		
		var log = logger("view-handlers.postSignIn");
		log.info("User attempting to sign in.");
		
		var email = validator.trim(request.body.email),
			password = validator.trim(request.body.password);
			
		dbc.signIn(email, password, function(err, res, message){

			if(err){
				log.error("An internal server error has occurred. Here is the message: "+message);
				response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG});
			}else{
				if( res.code === 200 ){
					log.info("User signed in, returning "+common.OK);
					response.send(common.OK, {message: common.OK_MSG, name: res.name, session: res.session});
				}else{
					log.info("Cannot sign user in, returning "+common.NOT_FOUND);
					response.send(common.NOT_FOUND, {message: common.NOT_FOUND_MSG});
				}
			}
		});
	},
	
	postSignOut: function(request, response){
		
		var log = logger("view-handlers.postSignOut");
		log.info("User attempting to sign out.");
		
		var token = validator.trim(request.headers.Authorization);
		
		dbc.logOut(token, function(err,res,message){
			
			if(err){
				log.error("An internal server error has occurred. Here is the message: "+message);
				response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG})
			}else{
				if( res.code === 200 ){
					log.info("User has signed out, returning "+common.OK);
					response.send(common.OK, {message: common.OK_MSG+" Signed out."});
				}else{
					log.info("Could not signed user out, returning "+common.NOT_FOUND);
					response.send(common.NOT_FOUND, {message: common.NOT_FOUND_MSG+"Could not sign out."});
				}
			}
		});
	},
	
	postRegister: function(request, response){
	
		var log = logger("view-handlers.postRegister");
		log.info("User attempting to register.");
		
		var email = validator.trim(request.body.email),
			password = validator.trim(request.body.password),
			fName = validator.trim(request.body.fName),
			lName = validator.trim(request.body.lName),
			key = validator.trim(request.body.key);
		
		dbc.createUser(email, fName, lName, key, password, function(err, res, message){
			
			if( err ){
				log.error("An error has occurred, error: "+err+", message: "+message, 3);
				response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG});
			}else{
				if(res.code === 200){
					log.info("User created, returning "+common.OK);
					response.send(common.OK, {message: common.OK_MSG});
				}else if(res.code === 403){
					log.info("Could not create user, key is invalid. Returning "+common.FORBIDDEN);
					response.send(common.FORBIDDEN, {message: common.FORBIDDEN_MSG});
				}else{
					log.info("Could not create user, returning "+common.BAD_REQUEST);
					response.send(common.BAD_REQUEST, {message: common.BAD_REQUEST_MSG});
				}
			}
		});
	},
	
	getWhiteList: function(request, response){
		
		var log = logger("view-handlers.getWhiteList");
		log.info("Get white list.");
		
		var token = validator.trim(request.headers.Authorization);
		
		dbc.validateCredentials(token, function(err,res,message){
			
			if(err){
				log.error("An error has occurred, error: "+err+", message: "+message, 3);
				response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG});
			}else{
				if( res.code === 200 ){
					
					dbc.getWhiteList(function(error, result, mess){
						
						if( error || result.list == [] ){
							log.error("An error has occurred, error: "+error+", message: "+mess, 3);
							response.send(common.NOT_FOUND, {message: common.NOT_FOUND_MSG});
						}else{
							log.info("Got folder & file list, returning to the user.");
							response.send(common.OK, {message: common.OK_MSG, list: result.list});
						}
					});
				}else{
					log.info("User session cannot be validated, returning "+common.REAUTHENTICATE);
					response.send(common.REAUTHENTICATE, {message: common.REAUTHENTICATE_MSG});
				}
			}
		});
	},
	
	getFileList: function(request, response){
		
		var log = logger("view-handlers.getFileList");
		log.info("Get file list for a specific folder.");
		
		var token = validator.trim(request.headers.Authorization),
			folder = validator.trim(request.body.folder);
		
		dbc.validateCredentials(token, function(err,res,message){
			
			if(err){
				log.error("An error has occurred, error: "+err+", message: "+message, 3);
				response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG});
			}else{
				if( res.code === 200 ){
					
					fs.getFileList(folder, function(error, result, mess){
						
						if( error || result.list == [] ){
							log.error("An error has occurred, error: "+error+", message: "+mess, 3);
							response.send(common.INTERNAL_SERVER_ERROR, {message: common.INTERNAL_SERVER_ERROR_MSG});
						}else{
							log.info("Got folder & file list, returning to the user.");
							response.send(common.OK, {message: common.OK_MSG, list: result.list});
						}
					});
				}else{
					log.info("User session cannot be validated, returning "+common.REAUTHENTICATE);
					response.send(common.REAUTHENTICATE, {message: common.REAUTHENTICATE_MSG});
				}
			}
		});
	}

};






