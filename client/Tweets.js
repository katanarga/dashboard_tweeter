var Tweets = {};

// TODO: appel python ?
// package Flask ?
Tweets.search_by = async function () {
    $.ajax({
        url : '/',
        data:{
            user_name: $('#user_name').val(),
            text: $('#text').val(),
            date: $('#date').val()
        },
        dataType: 'JSON',
        type: 'GET',
        success: function(data){
            $('#div_tweets').html(data.result);
        }
    });
}