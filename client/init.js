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
        let map_places=new Map();
        for (var p in tts){
            nb_tweets++;
            date=tts[p].date.replace("T"," ");
            date=date.substr(0,19);
            div_content+= "<div><p><b>"+tts[p].user_name+" | "+date+"</b></p><p>"+tts[p].text+"</p></div><hr/>";
            place_name=tts[p].place_name.split(", ")[1];
            if(map_places.has(place_name)){
                map_places.set(place_name,map_places.get(place_name)+1);
            }
            else{
                map_places.set(place_name,1);
            }
        }
        map_places;
        let table_places="<table><tr>";
        map_places.forEach((value,key,map) => {
            table_places+="<td style='vertical-align:bottom;width:100px'><div style='background-color:white'>"+
              "<br/>".repeat(value)+"<center>"+value+"</center></div></td>";
        });
        table_places+="</tr><tr>";
        map_places.forEach((value,key,map) => {
            table_places+="<td style='text-align:center'><b>"+key+"</b></td>";
        });
        table_places+="</tr></table>";
        let h3_nb_tweets="<h3>Nombre de tweets contenant la chaine '"+search_bar.value+"' : "+nb_tweets+"</h3>";
        let h3_places="<h3>Répartition par pays :</h3>";
        div_tweets.innerHTML=h3_nb_tweets+h3_places+table_places+div_content;
        inQuery=false;
        btn_search.disabled = "";
    });
})