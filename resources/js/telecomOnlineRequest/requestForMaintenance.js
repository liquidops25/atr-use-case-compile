function submitFunc(){
		var fullname = $("#uc5_inp_full_name").val();
		var email = $("#uc5_inp_email").val();
		var contact = $("#uc5_inp_contact").val();
		var address = $("#uc5_inp_address").val();
		var acc_no = $("#uc5_inp_acc_no").val();
		var remarks = $("#uc5_inp_remarks").val();
		var description = "full-name:" + fullname + ", email:" + email + ", contact:" + contact;
			
			if(fullname && email && contact && address && acc_no && remarks){
				description = description + ", address:" + address + ", account:" + acc_no + ", remarks:" + remarks;
					console.log(description);
				var shortDesc = "Request for Maintenance ~" + acc_no;

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

					dialog_content = "Thank you for using the Online Application, Here's your reference no: " + data.number;

					dialogBox(dialog_content, function(){
						location.reload();
					});
			       }
			  }
			});
	}