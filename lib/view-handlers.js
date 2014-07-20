var dbc, common, logger, validator, passwordHash;

module.exports = {
	
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
		validator = require("validator");
		passwordHash = require("password-hash");
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
		
		var email = validator.trim(request.body.emailAddress),
			password = validator.trim(request.body.password);
			
		dbc.validateCredentials(email, password, function(err, res, message){

			if(err){
				log.error("An internal server error has occurred. Here is the message: "+message);
				response.send(common.CODES.INTERNAL_SERVER_ERROR, {});
			}else{
				log.info("Attempted to sign in, returning "+res.code);
				response.send(res.code, res.message);
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
				response.send(common.CODES.INTERNAL_SERVER_ERROR, {})
			}else{
				log.info("Attempted to sign out, returning "+res.code);
				response.send(res.code, res.message);
			}
		});
	},
	
	postRegister: function(request, response){
	
		var log = logger("view-handlers.postSignIn");
		log.info("User attempting to sign in.");
		
		var email = validator.trim(request.body.emailAddress),
			password = validator.trim(request.body.password);
	
	},
	
	getWhiteList: function(request, response){
	
	
	},
	
	getFileList: function(request, response){
	
	
	}

};