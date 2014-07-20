var common, logger;

module.exports = {
	
	init: function(){
		
		common = require("./common.js");
		logger = common.logger;
	},
	
	getRoot:function(request,response){
		
		var location = "view-handlers.getRoot";
		
		
		logger.log(location, "Returning basic home page.");
		response.sendfile("./views/base/home.html");
	},
	
	getResources:function(request, response) {
		
		var location = "view-handlers.getResources";
		
		var folder = request.params.dynfolder,
			file   = request.params.dynfile;

		logger.log(location, "Resources requested @ /resources/" + folder + "/" +file);

		if(folder === "img") {
			response.setHeader("Content-Type", "image/png");
		}else if(folder === "css"){
			response.setHeader("Content-Type", "text/css");
		}else if(folder === "js"){
			response.setHeader("Content-Type", "text/javascript");
		}
		
		response.sendfile("./resources/"+folder+"/"+file);
	}

};