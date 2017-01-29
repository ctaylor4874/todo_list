$(function () {
    var setData = function(html) {
        console.log(html);
        html.forEach(function(item){
            console.log(item.description);
            $('#task-list').append("<li>" + item.description +  "</li>");
        })
    };

    $.get('/tasks', setData);

    $('#form').submit(function (event) {
        event.preventDefault();
        var gotData = function (html) {
            console.log(html);
            $('#task-list').append("<li>" + html.description + "</li>");
        };
        var usr_input = $('#new-task').serialize();
        $.post('/add_task', usr_input, gotData);
    });

});
