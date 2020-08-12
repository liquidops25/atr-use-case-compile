var viewMode = sessionStorage.getItem("viewMode");
var data = sessionStorage.getItem("data");
	data = JSON.parse(data);
var shortDesc = sessionStorage.getItem("remarks"); 
var acc_no = sessionStorage.getItem("acc_no"); 
var status = sessionStorage.getItem("status"); 


	function submitFunc(){
		var fname = $("#uc5_inp_first_name").val();
		var lname = $("#uc5_inp_last_name").val();
		var email = $("#uc5_inp_email").val();
		var contact = $("#uc5_inp_contact").val();
		var address = $("#uc5_inp_address").val();
		var acc_no = $("#uc5_inp_acc_no").val();
		var remarks = $("#uc5_inp_remarks").val();
		var description = "first-name:" + fname + ", last-name:" + lname + ", email:" + email + ", contact:" + contact;
			
			if(fname && lname && email && contact && address && acc_no && remarks){
				description = description + ", address:" + address + ", account:" + acc_no + ", remarks:" + remarks;
					console.log(description);
				var shortDesc = "Request for Upgrade ~" + acc_no;

					createTicket(shortDesc,description);
			} else {
				alert("All fields are mandatory.");
			}
	}


	function createTicket(shortDesc, description){
		var ticketData = {"short_description": shortDesc,"description": description, "approval":"Not Yet Requested", "request_state":"Pending Approval"};
		var username = "admin";
		var password = "Liquidops01";
		$.ajax({
			    url: "https://dev101268.service-now.com/api/now/table/sc_request",
			    headers: {
			        "Authorization": "Basic " + btoa(username + ":" + password),
	                'Accept':'application/json',
	                'Content-Type':'application/json'},
			    contentType: "application/json",
			    dataType: "json",
			    type: "POST", 
			    data: JSON.stringify(ticketData),
			    success: function(result){
			       if(result.result){
			       	var data = result.result;
			       	sessionStorage.setItem("ticket_number", data.number);

					dialog_content = "Thank you for using the Online Application, Here's your reference no: " + data.number;

					dialogBox(dialog_content, function(){
						$(".content").load("resources/html/telecomOnlineRequest/requestForUpgradeContinueandCreate.html");
					});
			       }
			  }
			});
	}


	function backFunc(){
		$(".content").load("resources/html/telecomOnlineRequest/requestForUpgradeContinueandCreate.html");
	}

	function setViewMode(action){
		if (action=="true") {
			var ele = document.getElementsByClassName("inp");
				if(ele)
					$(ele).removeClass("active");

			var eleAct = document.getElementsByClassName("lbl");
				if(eleAct){
					$(eleAct).addClass("active");
					populate(data,shortDesc,acc_no,status);
				}
			var eleAct = document.getElementsByClassName("uc5-border-bottom");
				if(eleAct){
					$(eleAct).addClass("active");
					populate(data,shortDesc,acc_no,status);
				}
			
				document.getElementById("status-container").style.display = "block";
			document.getElementById("btn_submit").style.display = "none";
		}
	}

	function populate(data,shortDesc,acc_no,status){
		console.log(data);
		test = data;
		$("#uc5_first_name").text(data["data"]["name"]["first"]);
		$("#uc5_last_name").text(data["data"]["name"]["last"]);
		$("#uc5_address").text(data["data"]["address"]);
		$("#uc5_contact").text(data["data"]["phone"]);
		$("#uc5_email").text(data["data"]["email"]);
		$("#uc5_acc_no").text(acc_no);
		$("#uc5_remarks").text(shortDesc);
		$("#uc5_status").text(status == "6" ? "Application is Approved" : status == "7" ? "Application is Disapproved" : status == "8" ? "Application is Canceled": "Application is Pending...");
	}



	$( document ).ready(function() {
		setViewMode(viewMode)
	});