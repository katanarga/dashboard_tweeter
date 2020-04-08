window.addEventListener("load",function () {
    let search_bar = document.getElementById("search_bar");
    let btn_search = document.getElementById("btn_search");
    let inQuery = false;

    btn_search.addEventListener("click",async function (ev) {
        inQuery = true;
        btn_search.disabled = "disabled";
        let div_tweets = document.getElementById("div_tweets");
        let resTweets = await Tweets.search(search_bar.value);
        let tts = JSON.parse(resTweets);
        let div_content="";
        for (var p in tts){
            date=tts[p].date.replace("T"," ");
            date=date.substr(0,19);
            div_content+= "<div><p><b>"+tts[p].user_name+" | "+date+"</b></p><p>"+tts[p].text+"</p></div><hr/>";
        }
        div_tweets.innerHTML=div_content;
        inQuery=false;
        btn_search.disabled = "";
    });
})