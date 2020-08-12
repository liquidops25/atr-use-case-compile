var user_data;
	var token;
	var username = "admin";
	var password = "N6KMTNXNUZL1E9J0";
	var data = {
          "password": "N6KMTNXNUZL1E9J0",
          "username": "admin"
        }

	function createFunc(){
		sessionStorage.setItem("viewMode", "false");
		$(".content").load("resources/html/telecomOnlineRequest/requestForUpgrade.html");
	}

	function continueFunc(){
		getTicket();
	}

	function getToken(){
		$.ajax({
		    url: "https://dh-winnie.atrmywizard360.com/atr-gateway/identity-management/api/v1/auth/token?useDeflate=true",
		     headers: {
		        "Authorization": "Basic " + btoa(username + ":" + password)
		      },
		    contentType: "application/json",
		    dataType: "json",
		    type: "POST", 
		    data: JSON.stringify(data),
		    success: function(result){
		       token = result.token;
		   }
		});
	}

	function getTicket(){
			var ticket_number = document.getElementById("ticket_number").value;
			var snow_user = "admin";
			var snow_pass = "Liquidops01"
			var short_desc ="";
			var acc_no;
			var status;
			
			$.ajax({
		    url: "https://dev101268.service-now.com/api/now/table/sc_request?sysparm_limit=1&number=" + ticket_number,
		    headers: {
		          "Accept": "application/json",
		          "Content-Type": "application/json",
		          "Authorization": "Basic YWRtaW46TGlxdWlkb3BzMDE="},
		    success: function(result){
		    	console.log(result);
		    	 if(result.result == undefined){
		    	 	alert("System is down please try again later.");
		    	 } else if (result.result.length > 0) {
		    		var desc = result.result[0].description.split("remarks:")[1];		    		
		    		sessionStorage.setItem("status",result.result[0].state);
		    		sessionStorage.setItem("remarks", desc);
					sessionStorage.setItem("viewMode", "true");
		    		var shortDescription = result.result[0].short_description;
		    		var account_no = shortDescription.split(" ~")[1];
		    		if(shortDescription.split(" ~")[0] == "Request for Upgrade")
		    			getUserData(account_no);
		    		else
		    			alert("REFERENCE NUMBER not Found.");
		    	} else {
		    		alert("REFERENCE NUMBER not Found.");
		    	}
		    	
			  }
			});
		}


	function getUserData(account) {

		var settings = {
			"url": "https://coolbean-telecom-inc-e2d8b.firebaseio.com/CBT_DB/"+account+".json",
			"method": "GET",
			"timeout": 0,
		};

		$.ajax(settings).done(function (response) {
		 	user_data = response;
		     if(user_data && account!="" && account!=null){
				var action = false;
				var acc_no = account;
					sessionStorage.setItem("data", JSON.stringify(user_data));
					sessionStorage.setItem("acc_no", acc_no);
					$(".content").load("resources/html/telecomOnlineRequest/requestForUpgrade.html");
			} 
		});
	}



	$( document ).ready(function() {
	});