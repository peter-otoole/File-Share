var express = require("express"),
	app = express(),
	WEB_ADDRESS = "http://127.0.0.1",
	PORT = 80,
	URL = WEB_ADDRESS+":"+PORT;

console.log("    ######################################################################    ");
console.log("    #                                                                    #    ");
console.log("    #                         Private Media Share                        #    ");
console.log("    #                                                                    #    ");
console.log("    ######################################################################    \n");

console.log("Server Initialized and running at: "+URL);

	
app.get("/", function(request,response){

	
	response.sendfile("./views/base/home.html");
});

//Resources -> resolves the gives resource
app.get("/resources/:dynfolder/:dynfile", function(request, response) {
	var folder = request.params.dynfolder,
		file   = request.params.dynfile;

	console.log("Resoruces requested @ /resources/" + folder + "/" +file);

	if(folder === "img") {
		response.setHeader("Content-Type", "image/png");
	}else if(folder === "css"){
		response.setHeader("Content-Type", "text/css");
	}else if(folder === "js"){
		response.setHeader("Content-Type", "text/javascript");
	}
	
	response.sendfile("./resources/"+folder+"/"+file);
});

	
app.listen(PORT); 













