var collection = {
	
	sessionKey: "",
	POST: "POST", 
	GET: "GET",
	OWNERS_NAME: "",
	USER_NAME: "",
		
	requstSettings: {
		
		path: "",
		method: "",
		data: "",
		async: true,
		dataType: "JSON"
	},
	
	requestDispatcher: function(reqSettings, callback){
		
		cLog.info("Out going request with options: %j", reqSettings);
		
		if( reqSettings ){
		
			if( reqSettings.method === "POST" ){
				
				$.ajax({
					url: reqSettings.path,
					type: reqSettings.method,
					data: {	data: reqSettings.data },
					headers: { Authorization: collection.sessionKey },
					dataType: "JSON",
					async: reqSettings.async,
					success: function (data, code) {
					
						cLog.info("Got response from server. Response is: %j", data);
						callback(false, {results: data, code: code}, "Got response from POST.")
					}
				});
				
			}else if( reqSettings.method === "GET" ){
				
				$.ajax({
					url: reqSettings.path,
					type: reqSettings.method,
					headers: { Authorization: collection.sessionKey },
					dataType: "JSON",
					async: reqSettings.async,
					success: function (data, code) {
						
						cLog.info("Got response from server. Response is: %j", data);
						callback(false, {results: data, code: code}, "Got response from GET.")
					}
				});
				
			}else{
				
				callback(true, {}, "Method does not match a recognised value.");
			}
		}else{
			
			callback(true, {}, "Settings are not defined.");
		}
	},
	
	logger: function(local){
		
		var record = {
			
			info: function(message){
			
				console.log(local + "() - " + message);
			},
			
			error: function(message){
				
				console.error(local + "() - " + message);
			}
		};

		return record;
	}
};

var cLog = collection.logger("common.requestDispatcher");

	
	
	