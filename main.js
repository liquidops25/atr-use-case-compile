
console.log('test');
  var db = firebase.firestore();
  function formSubmit(){
	var InputCustID=document.getElementById("custID").value;
	var InputCustName=document.getElementById("custName").value;
	var InputEmail=document.getElementById("email").value;
	var InputPrice=document.getElementById("price").value;
	var InputSKU=document.getElementById("sku").value;
	var InputUnit=document.getElementById("unit").value;
	var description = ('CustomerID: ' + InputCustID + ', CustomerName: ' + InputCustName + ', Email: ' + InputEmail + ', Price: ' + InputPrice + ', SKU: ' + InputSKU + ', Unit: ' + InputUnit)	
	var short_desc = ('New Order Request')
	var requestBody = JSON.stringify({"short_description": short_desc , "description": description, "caller_id":"6816f79cc0a8016401c5a33be04be441"}); 


var client=new XMLHttpRequest();
client.open("post","https://dev101268.service-now.com/api/now/table/incident");

client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'Liquidops01'));


client.send(requestBody);  

	db.collection("BillingForm").doc().set(
	{
		CustomerID: InputCustID,
		CustomerName: InputCustName,
		Email: InputEmail,
		Price: InputPrice,
		SKU: InputSKU,
		Unit: InputUnit
	})
	  .then(function(){
		  console.log("Data Saved");
	  })
	  .catch(function(error){	
		  console.log("error", error);
	  });
  }