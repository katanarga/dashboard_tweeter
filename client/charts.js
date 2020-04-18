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

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
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