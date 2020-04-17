window.addEventListener("load",function () {
    let search_bar = document.getElementById("search_bar");
    let btn_search = document.getElementById("btn_search");
    let div_results = document.getElementById("div_results");
    let inQuery = false;
    let interval=[];

    btn_search.addEventListener("click",async function (ev) {
        if(interval.length>0){
            clearInterval(interval.pop());
        }
        inQuery = true;
        btn_search.disabled = "disabled";
        let resTweets = await Tweets.search(search_bar.value);
        let tts = JSON.parse(resTweets);
        let nb_tweets=0;
        let div_content="<div style='clear:both'>";
        let map_places=new Map();
        let map_hashtags=new Map();
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
        }
        div_content+="</div>";
        text_nb_tweets="<h2>Nombre de tweets contenant la chaine '"+search_bar.value+
            "' : <span id='nb_tweets' style='font-size:800%;color:white'>0</span></h2>";
        let pie_chart_and_table_hashtags=create_pie_chart_hashtags(map_hashtags);
        let table_places=create_histogram_country(map_places);
        let text_hashtags="<h2>Répartition des hashtags (les hashtags sont affichés dans le sens des aiguilles d'une montre):</h2>";
        let text_places="<h2 style='clear:both'>Répartition par pays :</h2>";
        let text_tweets="<h2 style='clear:both'>Tweets :</h2>";
        div_results.innerHTML=text_nb_tweets+text_hashtags+pie_chart_and_table_hashtags+text_places+table_places+text_tweets+div_content;
        inQuery=false;
        btn_search.disabled = "";
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
                setTimeout(f,4000/nb_tweets);
            }
            else{
                interval.push(setInterval(blink_nb_tweets,800)); 
            }
        };
        setTimeout(f,4000/nb_tweets);
    }

})

function create_histogram_country(map_places){
    let nb_places=0;
    let table_places="";
    while(nb_places<map_places.size){
        let i=nb_places;
        let j=nb_places;
        let x=0;
        table_places+="<table style='clear:both'><tr>";
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


function create_pie_chart_hashtags(map_hashtags){
    let nb_total_hashtags=0;
    for(let [k,v] of map_hashtags){
        nb_total_hashtags+=v;
    }
    let style_pie_chart="<style type='text/css'>\n"+
    "#pieChart{\n"+
        "margin : auto;"+
        "border-radius: 50%;"+
        "width: 400px;"+
        "height: 400px;"+
        "background:"+ 
          "conic-gradient("
    ;
    let i=1;
    let color="";
    let colors=[];
    let sum_percent=0;
    let current_percent=0;
    let table_color_hashtags="<table><tr>";
    for(let [k,v] of map_hashtags){
        current_percent=v/nb_total_hashtags*100;
        color=getRandomRgb();
        colors.push(color);
        table_color_hashtags+="<td><b>"+k+" ("+current_percent.toFixed(2)+"%)</b></td>";
        sum_percent+=current_percent;
        if(i==1){
            style_pie_chart+=color+" "+sum_percent+"%,";
        }
        else if(i!=map_hashtags.size){
            style_pie_chart+=color+" 0 "+sum_percent+"%,";
        }
        else{
            style_pie_chart+=color+" 0 );}";
        }
        if(i%10==0){
            table_color_hashtags+="</tr><tr>";
            for(let j=i-10;j<=i;j++){
                table_color_hashtags+="<td style='background-color:"+colors[j]+"'><br></td>";
            }
            table_color_hashtags+="<tr>";
        }
        i++;
    }
    i=i-1;
    if(i%10!=0){
        table_color_hashtags+="<tr>";
            for(let j=i-i%10+1;j<=i;j++){
                table_color_hashtags+="<td style='background-color:"+colors[j-1]+"';width:10%><br></td>";
            }
            table_color_hashtags+="</tr><tr>";
    }
    style_pie_chart+="</style>";
    table_color_hashtags+="</tr></table>";
    return style_pie_chart+"<div id='pieChart'></div>"+table_color_hashtags;
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}