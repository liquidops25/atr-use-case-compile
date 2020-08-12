
var token;
var username = "admin";
var ticket_found = false;
var password = "656eac8ca99aa6ad6a82e923bfdd138a";
var data = {
          "password": "656eac8ca99aa6ad6a82e923bfdd138a",
          "username": "admin"
        }

function createFunc(){
	document.getElementById("main_page").style.display = "none";
	document.getElementById("new_page").style.display = "block";
}

function continueFunc(){
	remove();
	getTicket();
	setTimeout(function(){
		if(ticket_found){
			ticket_found = false;
			document.getElementById("main_page").style.display = "none";
			document.getElementById("continue_page").style.display = "block";
		} else {
			alert("Reference No. Not Found!");
		}
	 }, 1000);
	
}

function backFunc(){
	document.getElementById("main_page").style.display = "block";
	document.getElementById("continue_page").style.display = "none";
	document.getElementById("new_page").style.display = "none";
}

function getToken(){
			$.ajax({
			    url: "https://dh-dhcoolbean.atrmywizard-aiops.com/atr-gateway/identity-management/api/v1/auth/token?useDeflate=true",
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
	var short_desc ="";
	var acc_no;
	var status;
	$.ajax({
    url: "https://dh-dhcoolbean.atrmywizard-aiops.com/atr-gateway/ticket-management/api/v1/tickets/search?isFuzzy=true&value=" + ticket_number,
    headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "apiToken": token},
    success: function(result){
    	var test = result;
    	console.log(test)
	        if(test.length > 0){
	            var d1 = test[0]["coreData"]["shortDescription"];
	            status = test[0]["coreData"]["state"];
	            ticket_found = true;
	            short_desc = d1.split(" ~")[0];
	            acc_no =  d1.split(" ~")[1];
	            getUserData(short_desc,acc_no,status)
	        } else {
	            console.log("not found!");
	        }
	  }
	});
}

function getUserData(shortDescription,account,status) {
	
	var settings = {
		"url": "https://coolbean-telecom-inc-e2d8b.firebaseio.com/CBT_DB/"+account+".json",
		"method": "GET",
		"timeout": 0,
	};

	$.ajax(settings).done(function (response) {
		var user_data = response;
		if(user_data){
		     populate(user_data,shortDescription,account,status);       
		}
	});
}

function checkAccNo(){
	var acc_no = $("#inp_account").val();
	console.log("check",acc_no);
	var settings = {
		"url": "https://coolbean-telecom-inc-e2d8b.firebaseio.com/CBT_DB/"+acc_no+".json",
		"method": "GET",
		"timeout": 0,
	};

	$.ajax(settings).done(function (response) {
		var user_data = response;
		console.log("test2",user_data)
		if(user_data){
		   createTicket();
		} 
		else{
			alert("Account number not found");
		}
	});


}

function createTicket(){
	/*var name = $("#inp_name").val();
	var address = $("#inp_address").val();*/
	var account = $("#inp_account").val();
	var remarks = document.getElementById("inp_remarks").value;

	var shortDesc = remarks + " ~" + account; 
	var ticketData = {"shortDescription": shortDesc,"type" : "STANDALONE"};
		$.ajax({
		    url: "https://dh-dhcoolbean.atrmywizard-aiops.com/atr-gateway/ticket-management/api/v1/tickets?bypassAutomationRule=false",
		    headers: {
		        "Authorization": "Basic " + btoa(username + ":" + password),
		        "apiToken": token},
		    contentType: "application/json",
		    dataType: "json",
		    type: "POST", 
		    data: JSON.stringify(ticketData),
		    success: function(result){
		       console.log(result);
		       var ticket_number = result["coreData"]["number"]
		       successPage(ticket_number);
		  }
		});
}

function successPage(ticket_number){
	setTimeout(function(){
		if(ticket_number){
			var message = "Thank you for using CBT Inc. Online Application, Your reference no: " + ticket_number;
			document.getElementById("main_page").style.display = "none";
			document.getElementById("continue_page").style.display = "none";
			document.getElementById("new_page").style.display = "none";
			document.getElementById("success_page").style.display = "block";
			$("#successMsg").text(message);
		} else {
			alert("Error, Submit failed");
		}
	 }, 1000);
}
var test;
function populate(data,shortDesc,acc_no,status){
	console.log(data);
	test = data;
	$("#name").text(data["data"]["name"]["first"]);
	$("#address").text(data["data"]["address"]);
	$("#account").text(acc_no);
	$("#remarks").text(shortDesc);
	$("#status").text(status == "Resolved" ? "Application is Approved" : status == "Closed" ? "Application is Disapproved" : status == "Canceled" ? "Application is Canceled": "Application is Pending...");
}

function remove(){
	$("#name").text("");
	$("#address").text("");
	$("#account").text("");
	$("#remarks").text("");
	$("#status").text("");
}

$( document ).ready(function() {
		getToken();   
});