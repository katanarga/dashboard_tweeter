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
        let nb_tweets=0;
        let div_content="";
        for (var p in tts){
            nb_tweets++;
            date=tts[p].date.replace("T"," ");
            date=date.substr(0,19);
            div_content+= "<div><p><b>"+tts[p].user_name+" | "+date+"</b></p><p>"+tts[p].text+"</p></div><hr/>";
        }
        let h3="<h3>Nombre de tweets contenant la chaine "+search_bar.value+" : "+nb_tweets+"</h3>";
        div_tweets.innerHTML=h3+div_content;
        inQuery=false;
        btn_search.disabled = "";
    });
})