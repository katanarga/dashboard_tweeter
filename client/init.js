window.addEventListener("load",function (){
    let search_bar = this.document.getElementById("search_bar");
    let btn_search = this.document.getElementById("btn_search");
    let inQuery = false;

    btn_search.addEventListener("click",async function (ev) {
        inQuery = true;
        btn_search.disabled = "disabled";
        let div_tweets = await Tweets.search_by(search_bar.value);
        div_tweets.innerHTML="";
        div_tweets.innerHTML += "user_name: ..."; //TODO
        inQuery=false;
        btn_search.disabled = "";
    });
});