window.addEventListener("load",function () {
    let search_bar = document.getElementById("search_bar");
    let btn_search = document.getElementById("btn_search");
    let inQuery = false;

    btn_search.addEventListener("click",async function (ev) {
        inQuery = true;
        btn_search.disabled = "disabled";
        let div_tweets = document.getElementById("div_tweets");
        console.log("init search value",search_bar.value);
        let resTweets = await Tweets.search(search_bar.value);
        div_tweets.innerHTML="";
        var tts = JSON.parse(resTweets);

        for (var p in tts) {
            // div_tweets.innerHTML += "<p id='user_name'>"+tts[p].user_name+"</p><p id='text'>"
            // +tts[p].text+"</p><p id='date'>"+tts[p].date+"</p>";
            console.log("user:\n",tts[p].user_name);
        }

        div_tweets.innerHTML += resTweets;
        inQuery=false;
        btn_search.disabled = "";
    });

})