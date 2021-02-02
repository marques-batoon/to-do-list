$.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=286',
    dataType: 'json',
    success: function(response) {
        console.log(response);
    },
    error: function(request, errorMessage) {
        console.log(errorMessage);
    }
});