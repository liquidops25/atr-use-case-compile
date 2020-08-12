function sumbitFunc(){

    var description = 'Employee Id: ' + $('#uc1_emp_id').val() + ', Employee Name: ' + $('#uc1_emp_name').val() + ', Supervisor: ' + $('#uc1_supervisor').val()
    + ', Workspace: ' + $('#uc1_work_loc').val() + ', Machine Type: '
    + $('#uc1_device').val() + ', Complaint: ' + $('#uc1_description').val();

    var request = {
        correlation_id: $('#uc1_department').val(),
        u_inc_call_email: $('#uc1_emp_email').val(),
        short_description: $('#uc1_summary').val(),
        description: description
    }

    console.log(request);

    var settings = {
        "url": "https://dev101268.service-now.com/api/now/table/incident",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Basic YWRtaW46TGlxdWlkb3BzMDE="
        },
        "data": JSON.stringify(request),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.result){
              var data = response.result;
              dialog_content = "Thank you for using the Online Application, Here's your reference no: " + data.number;

              dialogBox(dialog_content, function(){
                location.reload();
              });
             }
      });
    
}