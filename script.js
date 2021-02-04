var taskList;

var updateList = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
        dataType: 'json',
        success: function(response) {;
            taskList = response;
            for(var i = 0; i < response.tasks.length; i++){
                var circle;
                if(response.tasks[i].completed){
                    circle = '<i class="bi bi-check-circle"></i> ';
                } else circle = '<i class="bi bi-circle"></i> ';
                $('tbody').prepend($('<tr class="task"><td id="'+ response.tasks[i].id +'">' + circle + response.tasks[i].content + '<i class="bi bi-x"></i></td></tr>'));
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

var completeItem = function(compId) {
    $.ajax({
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + compId + '/mark_complete?api_key=286',
        type: 'PUT',
        data: JSON.stringify({
            task: {
              completed: 'true'
            }
          }),
        success: function(data) {
          console.log(data);
          console.log('Item Completed');
        }
      });
}

var incompleteItem = function(compId) {
    $.ajax({
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + compId + '/mark_active?api_key=286',
        type: 'PUT',
        data: JSON.stringify({
            task: {
              completed: 'false'
            }
          }),
        success: function(data) {
          console.log(data);
          console.log('Item Active');
        }
      });
}

$(document).on('click', '.bi-x', function(e) {
    console.log("clicked me!");
    var idNum = $(this).parent().attr('id');
    deleteItem(idNum);
    $(this).parent().parent().remove();
});

$(document).on('click', '.bi-circle', function(e){
    //console.log("clicked circle!");
    $(this).toggleClass("bi-circle");
    $(this).toggleClass("bi-check-circle");
    var idNum = $(this).parent().attr('id');
    completeItem(idNum);
});

$(document).on('click', '.bi-check-circle', function(e){
    //console.log("clicked checked circle!");
    $(this).toggleClass("bi-circle");
    $(this).toggleClass("bi-check-circle");
    var idNum = $(this).parent().attr('id');
    incompleteItem(idNum);
});

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