var Tweets = {};

function callbackFunc(response) {
    console.log(response);
}
// appel python 
// TODO: Serveur Python
// def GET(): return search_by_...
Tweets.search_by(input) = async function () {
    $.ajax({
        url : '../query_data.py',
        type: 'GET',
        dataType: 'JSON',
        data:{
            "user_name": $("user_name").val(),
            "text": $("text").val(),
            "date": $("date").val()
        },
        success: function(data){
            callbackFunc(data.user_name);
            $('#div_tweets').html(data.result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
           }
    });
}