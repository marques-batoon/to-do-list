var tasks;

$.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
    dataType: 'json',
    success: function(response) {
        //console.log(response);
        tasks = response;

        $('p.task').html(tasks.tasks[0].content);
    },
    error: function(request, errorMessage) {
        console.log(errorMessage);
    }
});


var consoleLog = function(){
    console.log(tasks);
    console.log(tasks.tasks[0].content);

};