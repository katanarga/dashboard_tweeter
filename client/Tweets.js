var Tweets = {};

Tweets.ajax = function (method, url) {

    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange",  function () {
            /* quand la requête change à l'état 'terminé' */
            if (this.readyState == 4) {
                if (this.status == 200)
                    resolve(this.responseText);
                else
                    reject(this.status + " : " + this.responseText);
            }
        });

        /* on commence la requête HTTP */
        xhr.open(method, url);
        /* on définit quelques en-têtes */
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8"); // type de retour
        xhr.setRequestHeader( 'Api-User-Agent', 'M1Info/1.0' ); //spécifique à Wikimedia

        /* on envoie la requête */
         xhr.send();
    })
};

Tweets.query = async function (params) {
    let url = "index.html/search?text="+params;
    let res = await Tweets.ajax("GET", url);
    return JSON.parse(res);
}

function callbackFunc(response) {
    console.log(response);
}

Tweets.search = async function (str) {
    console.log(str);

    $.ajax({
        url : "./search?text="+str,
        type: "GET",
        dataType: "JSON",
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
            alert("HTTP Error "+XMLHttpRequest.status);
            alert("ready state is "+XMLHttpRequest.readyState);
            alert("text status is "+textStatus);
           }
    });
}