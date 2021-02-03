var taskList;

var updateList = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
        dataType: 'json',
        success: function(response) {;
            taskList = response;
            for(var i = 0; i < response.tasks.length; i++){
                $('tbody').prepend($('<tr class="task"><td><i class="bi bi-circle"></i> ' + response.tasks[i].content + '</td></tr>'));
                console.log(response.tasks[i].content);
            }
            //$('tr.task').html(taskList.tasks[0].content);
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}
updateList();

var inputNewReminder = function() {
    var reminder = document.querySelector('input').value;
    if(reminder){
        $.ajax({
            type: 'POST',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: reminder
              }
            }),
            success: function (response, textStatus) {
              console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
    }
    updateList();
}

window.addEventListener('keypress', function(e){
    if(e.key == "Enter"){
        inputNewReminder();
        updateList();
    }
});

var consoleLog = function(){
    console.log(taskList);
    console.log(taskList.tasks[0].content);
};
