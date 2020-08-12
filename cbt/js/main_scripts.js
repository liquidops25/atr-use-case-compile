
function goToHome(){
	var location = window.location.pathname;
			console.log("before",location);
			location = location[location.lentgh -1] = "index.html";
			console.log("before",location);
			window.location.href=location.toString();
}

function goMaintenance(){
	var location = window.location.pathname;
			location = location[location.lentgh -1] = "maintenance_page.html";
			window.location.href=location.toString();
}


$( document ).ready(function() {
	$("#btn_apply_now").click(function(){
		console.log("Click");
		var location = window.location.pathname;
			location = location[location.lentgh -1] = 'apply_page.html';
			window.location.href=location.toString();
	});

});