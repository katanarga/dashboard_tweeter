window.addEventListener("load",function () {
    let search_bar = document.getElementById("search_bar");
    let btn_search = document.getElementById("btn_search");
    let div_results = document.getElementById("div_results");
    let text_nb_tweets="";
    let interval=[];

    btn_search.addEventListener("click",async function (ev) {
        if(interval.length>0){
            clearInterval(interval.pop());
        }
        btn_search.disabled = "disabled";
        let resTweets="";
        if(document.getElementById("radio_text").checked){
            resTweets=await Tweets.search(search_bar.value);
            text_nb_tweets="<h2>Nombre de tweets contenant la chaine '"+search_bar.value+
            "' : <span id='nb_tweets' style='font-size:800%;color:white'>0</span></h2>";
        }
        else if(document.getElementById("radio_user_name").checked){
            resTweets=await Tweets.search_name(search_bar.value);
            text_nb_tweets="<h2>Nombre de tweets écrits par un utilisateur dont le nom contient la chaine '"+search_bar.value+
            "' : <span id='nb_tweets' style='font-size:800%;color:white'>0</span></h2>";
        }
        else{
            resTweets=await Tweets.search_htag(search_bar.value);
            text_nb_tweets="<h2>Nombre de tweets écrits par un utilisateur dont le hashtag contient la chaine '"+search_bar.value+
            "' : <span id='nb_tweets' style='font-size:800%;color:white'>0</span></h2>";
        }
        let tts = JSON.parse(resTweets);
        let nb_tweets=0;
        let div_content="<div style='clear:both;background-color:white'>";
        let map_places=new Map();
        let map_hashtags=new Map();
        let locations=[];
        for(var p in tts){
            nb_tweets++;
            date=tts[p].date.replace("T"," ");
            date=date.substr(0,19);
            div_content+= "<p><b>"+tts[p].user_name+" | "+date+"</b></p><p>"+tts[p].text+"</p><hr/>";
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
            locations.push([tts[p].longitude,tts[p].latitude]);
        }
        div_content+="</div>";
        let pie_chart_and_table_hashtags=create_pie_chart_hashtags(map_hashtags);
        let table_places=create_histogram_country(map_places);
        let text_world_map="<h2>Réapartition géographique des utilisateurs qui ont tweeté:</h2>";
        let world_map_svg="<center><object id='world_map' type='image/svg+xml' data='world_map.svg' style='width: 60%'></object></center>";
        let text_hashtags="<h2>Répartition des hashtags (les hashtags sont affichés dans le sens des aiguilles d'une montre):</h2>";
        let div_top_hashtags="<div style='display:inline-block;float:left;'><h3>Top 5 des hashtags :</h3>";
        let nb_top_tweets = map_hashtags.size<=5 ? map_hashtags.size : 5;
        let m=0;
        for(let g=1;g<=nb_top_tweets;g++){
            m=Math.max(...map_hashtags.values());
            for(let [k,v] of map_hashtags){
                if(v==m){
                    map_hashtags.delete(k);
                    div_top_hashtags+="<p><b>"+g+" - #"+k+" ("+v+" tweets)</b></p>";
                    break;
                }
            }
        }
        div_top_hashtags+="</div>";
        let text_places="<h2 style='clear:both'>Répartition par pays :</h2>";
        let text_tweets="<h2 style='clear:both'>Tweets :</h2>";
        if(nb_tweets==0){
            div_results.innerHTML=text_nb_tweets;
        }
        else{
            div_results.innerHTML=text_nb_tweets+text_hashtags+div_top_hashtags+pie_chart_and_table_hashtags+
               text_places+table_places+text_world_map+world_map_svg+text_tweets+div_content;
            let world_map=document.getElementById("world_map");
            world_map.addEventListener("load",function(){
                let x_point=0;
                let y_point=0;
                let points="";
                let width_map=world_map.offsetWidth;
                let height_map=world_map.offsetHeight;
                for(let i=0;i<locations.length;i++){
                    x_point=(((width_map*(locations[i][0]+180)/360)/width_map)*100).toFixed(0)-2;
                    y_point=(((height_map/2-(width_map/(2*Math.PI))*Math.log(Math.tan(Math.PI/4+(locations[i][1]*Math.PI/180)/2)))/height_map)*100).toFixed(0)-2;
                    points+="<circle cx='"+x_point+"%' cy='"+y_point+"%' r='30' stroke='red' fill='red'/>\n";
                }
                world_map.contentDocument.children[0].innerHTML+=points;
            });
        }
        btn_search.disabled="";
        text_nb_tweets=document.getElementById("nb_tweets");
        refresh_text_nb_tweets(nb_tweets);
    });
    function blink_nb_tweets(){ 
        if (text_nb_tweets.style.visibility=='visible'){ 
            text_nb_tweets.style.visibility='hidden'; 
        } 
        else{ 
            text_nb_tweets.style.visibility='visible'; 
        }
     }; 
    
    function refresh_text_nb_tweets(nb_tweets){
        let x=0;
        let f=function(){
            text_nb_tweets.innerHTML=x;
            if(x<nb_tweets){
                x++;
                setTimeout(f,3000/nb_tweets);
            }
            else{
                interval.push(setInterval(blink_nb_tweets,800)); 
            }
        };
        setTimeout(f,3000/nb_tweets);
    }
});