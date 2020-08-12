let data = [];
const addData = (ev)=>{
   // ev.preventDefault();
    first = document.getElementById('uc4_first_name').value;
    last = document.getElementById('uc4_last_name').value;
    email = document.getElementById('uc4_email').value;
    eid = document.getElementById('uc4_emp_id').value;
    appweb = document.getElementById('uc4_url').value;
    type = document.getElementById('uc4_use_type').value;
    account = document.getElementById('uc4_acc_type').value;
    if (first == null || first == "", last == null || last == "", email == null || email == "", eid == null || eid == "", appweb == null || appweb == "") {
        alert("Please Fill Out All the Fields");
        return false;
    }
    //else {
    //    alert("Form Submitted. Status of your request will be receive via Email");
    //}
      
    description = 'Employee Name: '+ first +' '+ last +','+ 'Employee email: '+ email +','+ 'Employee eid: '+ eid +','+ 'User Type: '+ type+','+'Account Type: '+ account +','+ 'url: '+ appweb
    short_description = 'User Provision - '+account
    
    var requestBody = JSON.stringify({"description": description,"short_description": short_description})
    var client=new XMLHttpRequest();
    client.open("post","https://dev101268.service-now.com/api/now/table/incident");
    
    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');
    //client.setRequestHeader('Access-Control-Allow-Origin', '*');
    //client.setRequestHeader('Access-Control-Allow-Credentials', true);
    client.withCredentials = false;
    
    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'Liquidops01'));
     
    client.onreadystatechange = function () {
        if (client.status === 201) {
            var json = JSON.parse(client.responseText);
            dialog_content = "Form Submitted. Status of your request will be receive via Email. This is your ticket number: "+ json.result.number;

             dialogBox(dialog_content, function(){
                goToUseCase(4);
            });
        //console.log(this.responseText);
        
        }
    };
    
    client.send(requestBody);

    //document.forms[0].reset();
}
    //console.warn('added', {data});
    //let pre = document.querySelector('#msg pre');
    //pre.textContent = '\n' + JSON.stringify(movies, '\t', 2);

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('button').addEventListener('click', addData);

});

