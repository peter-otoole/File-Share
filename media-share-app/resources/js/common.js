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
		
		try{
			cLog.info("Out going request with options: "+ JSON.stringify(reqSettings) );
		}catch(e){
			cLog.errpr("Cannot log request settings.", 2);
		}
		
		if( reqSettings ){
		
			if( reqSettings.method === collection.POST ){
				
				$.ajax({
					url: reqSettings.path,
					type: reqSettings.method,
					data: {	data: reqSettings.data },
					headers: { Authorization: collection.sessionKey },
					dataType: "JSON",
					async: reqSettings.async
				}).done(function(data){
					try{
						cLog.info("Got response from server. Response is: "+JSON.stringify(data)+", code: "+data.code);
					}catch(e){
						cLog.errpr("Cannot log response. Error: "+e, 2);
						cLog.info("Got response from server. Response is: "+data+", code: "+data.code);
					}
					callback(false, {res: data, code: data.code}, "Got response from POST.");
				});
				
			}else if( reqSettings.method === collection.GET ){
				
				$.ajax({
					url: reqSettings.path,
					type: reqSettings.method,
					headers: { Authorization: collection.sessionKey },
					dataType: "JSON",
					async: reqSettings.async
				}).done(function(data){
					
					try{
						cLog.info("Got response from server. Response is: "+JSON.stringify(data)+", code: "+data.code);
					}catch(e){
						cLog.errpr("Cannot log response. Error: "+e, 2);
						cLog.info("Got response from server. Response is: "+data+", code: "+data.code);
					}
					callback(false, {res: data, code: data.code}, "Got response from GET.");
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
			
			error: function(message, error){
				
				if(error){
					console.error(local + "() - Error level: "+error+" - "+message);
				}else{
					console.error(local + "() - "+message);
				}
			}
		};

		return record;
	}
};

var cLog = collection.logger("common.requestDispatcher");

	
	
	