$(function () {
    var setData = function (html) {
        console.log(html);
        html.forEach(function (item) {
            console.log(item.description);
            $('#task-list').append("<li><span>" + item.description + "</span><input id='done_checkbox' type='checkbox'></li>");
        });
        $(this).focus(
            function () {
                $(this).val('');
            });
    };

    $.get('/tasks', setData);

    $('#form').submit(function (event) {
        event.preventDefault();
        var gotData = function (html) {
            $('#task-list').append("<li><span>" + html.description + "</span><input id='done_checkbox' type='checkbox'></li>");
        };
        var usr_input = $('#new-task').serialize();
        $.post('/add_task', usr_input, gotData);
        $(this).focus(
            function () {
                $(this).val('');
            });
    });
    $('#task-list').on('click', '#done_checkbox', function () {
        console.log($(this));
        $(this).siblings('span').toggleClass('stroked');
        console.log($(this).siblings('span').html());
        var data = {
            "task": $(this).siblings("span").html()
        };
        console.log(data);
        $.ajax({
            url: "/mark_task",
            method: "post",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function (data) {
                console.log("Success!");
            },
            error: function (data) {
                console.log("Error!");
            }
        })
    });
    $('#remove-completed').click(function () {
        var data = {
            "delete": 1
        };
        console.log(data);
        $.ajax({
            url: "/delete",
            method: "post",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function (data) {
                console.log("Success!");
            },
            error: function (data) {
                console.log("Error!");
            }
        });
        location.reload();
    });
});
