$(document).ready(function(){
	
	var log = collection.logger("main.document.ready");
	
	$( "#banner-reload-elements" ).click(function() {
		location = "/";
	});
	
	log.info("Getting Sign In HTML from server.");
	$( ".main-content-container" ).load( "/html/get-sign-in-page", function() {
	
		var settings = collection.requstSettings;
		
		settings.path = "/get-basic-server-data";
		settings.method = collection.GET;
		settings.data = "";
		settings.async = true;
		settings.dataType = "JSON";
		
		log.info("Getting basic information.");
		collection.requestDispatcher(settings, function(err, res, message){
		
			if(err){
				log.error("Error occurred, error: %s", message);
				$( "#server-name-usage" ).html("No Name");
			}else{
				if(res.code === 200 ){
					log.info("Got basic information.");
					$( "#server-name-usage" ).html(res.results.name);
				}else{
					log.info("Did not get 200 response code from server. Cannot get server information.");
					$( "#server-name-usage" ).html("No Name");
				}
			}
		});
		
	
	});

});