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
        let map_hashtags=new Map();
        for(var p in tts){
            nb_tweets++;
            date=tts[p].date.replace("T"," ");
            date=date.substr(0,19);
            div_content+= "<div><p><b>"+tts[p].user_name+" | "+date+"</b></p><p>"+tts[p].text+"</p></div><hr/>";
            hashtags=[tts[p].hashtag_0,tts[p].hashtag_1,tts[p].hashtag_2];
            for(let i=0;i<3;i++){
                h=hashtags[i];
                if(h!==null){
                    if(map_hashtags.has(h)){
                        map_hashtags.set(h,map_hashtags.get(h)+1);
                    }
                    else{
                        map_hashtags.set(h,1);
                    }
                }
            }
            place_name=tts[p].place_name.split(", ")[1];
            if(map_places.has(place_name)){
                map_places.set(place_name,map_places.get(place_name)+1);
            }
            else{
                map_places.set(place_name,1);
            }
        }
        let table_places=create_histogram_country(map_places);
        let h3_nb_tweets="<h3>Nombre de tweets contenant la chaine '"+search_bar.value+"' : "+nb_tweets+"</h3>";
        let h3_places="<h3>Répartition par pays :</h3>";
        div_tweets.innerHTML=h3_nb_tweets+h3_places+table_places+div_content;
        inQuery=false;
        btn_search.disabled = "";
    });
})

function create_histogram_country(map_places){
    let nb_places=0;
    let table_places="";
    while(nb_places<map_places.size){
        let i=nb_places;
        let j=nb_places;
        let x=0;
        table_places+="<table><tr>";
        for(let [key,value] of map_places){
            if(x<nb_places){
                x++;
                continue;
            }
            if(i==nb_places+20){
                break;
            }
            else{
                table_places+="<td style='vertical-align:bottom;width:5%'><div style='background-color:white'>"+
                "<br/>".repeat(value)+"<center>"+value+"</center></div></td>";
                i++;
            }
        }
        x=0;
        table_places+="</tr><tr>";
        for(let [key,value] of map_places){
            if(x<nb_places){
                x++;
                continue;
            }
            if(j==nb_places+20){
                break;
            }
            else{
                table_places+="<td style='text-align:center'><b>"+key+"</b></td>";
                j++;
            }
        }
        nb_places+=20;
        if(nb_places>=map_places.size){
            let cells=map_places.size%20;
            if(cells!=0){
                table_places+="<td style='vertical-align:bottom;width:5%'><div style='background-color:skyblue'></div></td>".repeat(20-cells);
            }
        }
        table_places+="</tr></table>";
    }
    return table_places;
}