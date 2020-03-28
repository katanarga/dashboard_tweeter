window.addEventListener("load",function (){
    let search_bar = document.getElementById("search_bar");
    let btn_search = document.getElementById("btn_search");
    let inQuery = false;

    btn_search.addEventListener("click",async function (ev) {
        inQuery = true;
        btn_search.disabled = "disabled";
        let div_tweets = document.getElementById("div_tweets");
        let resTweets = await Tweets.search(search_bar.value);
        div_tweets.innerHTML="";
        div_tweets.innerHTML += "res "+resTweets;
        inQuery=false;
        btn_search.disabled = "";
    });
});