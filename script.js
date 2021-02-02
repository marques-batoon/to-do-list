var taskList;

$.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
    dataType: 'json',
    success: function(response) {;
        taskList = response;
        for(var i = 0; i < response.tasks.length; i++){
            $('tbody').append($('<p class="task">' + response.tasks[i].content + '</p>'));
            $('tbody').append($('<tr class="task">' + response.tasks[i].content + '</tr>'));
            console.log(response.tasks[i].content);
        }
        //$('tr.task').html(taskList.tasks[0].content);
    },
    error: function(request, errorMessage) {
        console.log(errorMessage);
    }
});


var consoleLog = function(){
    console.log(taskList);
    console.log(taskList.tasks[0].content);

};