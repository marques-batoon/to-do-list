var taskList;

var updateList = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
        dataType: 'json',
        success: function(response) {;
            taskList = response;
            for(var i = 0; i < response.tasks.length; i++){
                $('tbody').prepend($('<tr class="task"><td id="'+ response.tasks[i].id +'"><i class="bi bi-circle"></i> ' + response.tasks[i].content + '<i class="bi bi-x"></i></td></tr>'));
                console.log(response.tasks[i]);
            }
            //$('tr.task').html(taskList.tasks[0].content);
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}

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
              $('<tr class="task"><td id="' + response.task.id + '"><i class="bi bi-circle"></i> ' + response.task.content + '<i class="bi bi-x"></i></td></tr>').insertBefore('#inputRow');
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
          
        
    }

}

var deleteItem = function(delId) {
    $.ajax({
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + delId + '?api_key=286',
        type: 'DELETE',
        success: function(result) {
            console.log(result);
        }
    });
}

$(document).on('click', '.bi-x', function(e) {
    console.log("clicked me!");
    var idNum = $(this).parent().attr('id');
    deleteItem(idNum);
    $(this).parent().parent().remove();
})

window.addEventListener('keypress', function(e){
    if(e.key == "Enter"){
        inputNewReminder();
        $('input').val('');
    }
});

var consoleLog = function(){
    console.log(taskList);
    console.log(taskList.tasks[0].content);
};

updateList();